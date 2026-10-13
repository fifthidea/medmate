#!/usr/bin/env node
/**
 * build.js
 * ------------------------------------------------------------
 * اسکریپت ساخت سبک و بدون‌وابستگی برای MedMate.
 *
 * این اپ استاتیک است و مرورگر هیچ مکانیزم بومی برای include کردن
 * قطعات HTML ندارد. برای اینکه فایل منبع index.html کوچک و قابل
 * نگهداری بماند، بخش‌های بزرگ (مثل ماشین‌حساب پدیاتریک) در پوشه
 * partials/ نگهداری می‌شوند و این اسکریپت آنها را داخل index.html
 * در محل marker مربوطه جای‌گذاری می‌کند.
 *
 * خروجی نهایی (index.html) دقیقاً همان چیزی است که مرورگر می‌بیند؛
 * بنابراین هیچ وابستگی runtime یا fetch اضافه نمی‌شود.
 *
 * نحوه استفاده:
 *   node build.js
 *
 * marker در index.html به این شکل است:
 *   <!-- INCLUDE: partials/pediatric-box.html -->
 *   ...محتوای تزریق‌شده...
 *   <!-- END INCLUDE: partials/pediatric-box.html -->
 *
 * همچنین CSS برای نگهداری آسان‌تر به فایل‌های منطقی در css/parts/
 * تقسیم شده است. این اسکریپت آن‌ها را به‌ترتیب css/parts/order.json
 * به یک css/styles.css واحد (که مستقیماً در تولید سرو می‌شود) concat می‌کند.
 * ------------------------------------------------------------
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const INDEX = path.join(ROOT, 'index.html');
const CSS_PARTS_DIR = path.join(ROOT, 'css', 'parts');
const CSS_OUT = path.join(ROOT, 'css', 'styles.css');
const JS_DIR = path.join(ROOT, 'js');
const JS_BUNDLE_OUT = path.join(ROOT, 'dist', 'app.bundle.js');

/**
 * ساخت یک باندل تک‌فایلی از اسکریپت‌های js/ به‌ترتیب js/bundle-order.json.
 * این کار تعداد درخواست‌های شبکه را از چند فایل به یک فایل کاهش می‌دهد و
 * بارگذاری را سریع‌تر می‌کند. باندل یک اسکریپت classic (غیرماژول) است تا در
 * WebView اندروید هنگام سرو از file:///android_asset/ نیز کار کند.
 */
function buildJs() {
    var orderPath = path.join(JS_DIR, 'bundle-order.json');
    if (!fs.existsSync(orderPath)) {
        console.warn('⚠️  js/bundle-order.json یافت نشد؛ build JS رد شد.');
        return;
    }
    var order = JSON.parse(fs.readFileSync(orderPath, 'utf8'));
    var header = '/* app.bundle.js — فایل تولیدشده توسط build.js. مستقیماً ویرایش نکنید.\n' +
        '   منبع: js/*.js (به‌ترتیب js/bundle-order.json). با `npm run build` بازتولید می‌شود. */\n';
    var pieces = order.map(function (name) {
        var p = path.join(JS_DIR, name);
        if (!fs.existsSync(p)) {
            console.warn('⚠️  فایل JS یافت نشد: ' + name);
            return '';
        }
        var code = fs.readFileSync(p, 'utf8').replace(/\s+$/, '');
        // هر ماژول در یک بلوک با کامنت جداکننده تا در باندل قابل ردیابی باشد
        return '\n/* ===== js/' + name + ' ===== */\n' + code + '\n';
    });
    if (!fs.existsSync(path.dirname(JS_BUNDLE_OUT))) {
        fs.mkdirSync(path.dirname(JS_BUNDLE_OUT), { recursive: true });
    }
    fs.writeFileSync(JS_BUNDLE_OUT, header + pieces.join('') + '\n', 'utf8');
    console.log('✓ JS باندل شد از ' + order.length + ' فایل → dist/app.bundle.js');
}

function buildCss() {
    const orderPath = path.join(CSS_PARTS_DIR, 'order.json');
    if (!fs.existsSync(orderPath)) {
        console.warn('⚠️  css/parts/order.json یافت نشد؛ build CSS رد شد.');
        return;
    }
    const order = JSON.parse(fs.readFileSync(orderPath, 'utf8'));
    const pieces = order.map(function (name) {
        const p = path.join(CSS_PARTS_DIR, name);
        if (!fs.existsSync(p)) {
            console.warn('⚠️  بخش CSS یافت نشد: ' + name);
            return '';
        }
        // هر بخش را با یک خط جدید انتهایی نرمال می‌کنیم تا اتصال تمیز باشد.
        return fs.readFileSync(p, 'utf8').replace(/\s+$/, '');
    });
    fs.writeFileSync(CSS_OUT, pieces.join('\n') + '\n', 'utf8');
    console.log('✓ CSS ساخته شد از ' + order.length + ' بخش → css/styles.css');
}

function build() {
    let html = fs.readFileSync(INDEX, 'utf8');
    const includeRe = /(<!-- INCLUDE: (.+?) -->)([\s\S]*?)(<!-- END INCLUDE: \2 -->)/g;

    let count = 0;
    html = html.replace(includeRe, function (match, startTag, file, _old, endTag) {
        const partialPath = path.join(ROOT, file.trim());
        if (!fs.existsSync(partialPath)) {
            console.warn('⚠️  partial یافت نشد: ' + file);
            return match;
        }
        let partial = fs.readFileSync(partialPath, 'utf8').replace(/\s+$/, '');
        // حذف خطوط راهنمای بالای partial (کامنت‌های مربوط به build) از خروجی نهایی
        partial = partial.replace(
            /^<!-- partials\/.+? -->\n<!-- این فایل توسط build\.js.+? -->\n/,
            ''
        );
        count++;
        console.log('✓ تزریق شد: ' + file);
        return startTag + '\n' + partial + '\n        ' + endTag;
    });

    fs.writeFileSync(INDEX, html, 'utf8');
    console.log('\n✓ HTML ساخته شد. ' + count + ' partial تزریق شد.');
}

buildCss();
buildJs();
build();
console.log('\nساخت کامل شد.');
