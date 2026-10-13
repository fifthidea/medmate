/**
 * i18n.js
 * ------------------------------------------------------------
 * منطق چندزبانه (i18n) سبک و بدون‌وابستگی برای MedMate.
 * جدا از دیکشنری ترجمه‌ها (js/translations.js) نگهداری می‌شود.
 *
 * - دو زبان: 'fa' (فارسی، RTL، پیش‌فرض) و 'en' (انگلیسی، LTR).
 * - رشته‌های UI از window.TRANSLATIONS خوانده می‌شوند (کلید نقطه‌ای).
 * - انتخاب زبان در localStorage ذخیره و در اجرای بعدی بازیابی می‌شود.
 * - جهت صفحه (dir) و lang روی <html> با زبان هماهنگ می‌شود.
 * - رویداد کلیک دکمه‌ی زبان با event delegation روی document مدیریت
 *   می‌شود (پایدار در WebView اندروید؛ بدون onclick درون‌خطی).
 *
 * صفت‌های پشتیبانی‌شده روی هر المان:
 *   data-i18n="key"              -> textContent
 *   data-i18n-placeholder="key"  -> placeholder
 *   data-i18n-aria="key"         -> aria-label
 *   data-i18n-title="key"        -> title
 *   data-i18n-content="key"      -> content (مثل <meta>)
 * ------------------------------------------------------------
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'medmate_lang';
    var DEFAULT_LANG = 'fa';
    var SUPPORTED = ['fa', 'en'];

    function readStoredLang() {
        try {
            var v = localStorage.getItem(STORAGE_KEY);
            if (v && SUPPORTED.indexOf(v) !== -1) return v;
        } catch (e) { /* ignore */ }
        return DEFAULT_LANG;
    }

    var currentLang = readStoredLang();

    /**
     * ترجمه‌ی یک کلید UI با interpolation اختیاری.
     * اگر کلید نبود، به فارسی و سپس به خود کلید برمی‌گردد.
     * vars: شیئی از مقادیر برای جایگزینی {name} در متن.
     */
    function t(key, vars) {
        var dict = window.TRANSLATIONS || {};
        var entry = dict[key];
        var template = entry ? (entry[currentLang] || entry.fa || key) : key;
        if (vars) {
            template = template.replace(/\{(\w+)\}/g, function (m, k) {
                return (vars[k] !== undefined && vars[k] !== null) ? vars[k] : m;
            });
        }
        return template;
    }

    function isRTL() {
        return currentLang === 'fa';
    }

    /** اعمال ترجمه روی همه‌ی المان‌های دارای صفت data-i18n* در صفحه. */
    function applyStaticTranslations(root) {
        var scope = root || document;
        scope.querySelectorAll('[data-i18n]').forEach(function (el) {
            el.textContent = t(el.getAttribute('data-i18n'));
        });
        scope.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
        });
        scope.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
            el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
        });
        scope.querySelectorAll('[data-i18n-title]').forEach(function (el) {
            el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
        });
        scope.querySelectorAll('[data-i18n-content]').forEach(function (el) {
            el.setAttribute('content', t(el.getAttribute('data-i18n-content')));
        });
        // به‌روزرسانی aria دکمه‌ی تغییر زبان (ساختار toggle خودش برچسب EN/FA دارد)
        var btn = document.getElementById('langToggleBtn');
        if (btn) {
            btn.setAttribute('aria-label', t('lang.toggleAria'));
            btn.setAttribute('aria-checked', currentLang === 'en' ? 'true' : 'false');
        }
    }

    /** اعمال lang/dir روی <html> متناسب با زبان فعلی. */
    function applyLanguage() {
        if (document.documentElement) {
            document.documentElement.lang = currentLang;
            document.documentElement.dir = isRTL() ? 'rtl' : 'ltr';
        }
        document.body && document.body.classList.toggle('lang-en', currentLang === 'en');
    }

    /** تنظیم زبان فعال، ذخیره در localStorage، اعمال جهت و ترجمه‌ها. */
    function setLang(lang) {
        if (SUPPORTED.indexOf(lang) === -1 || lang === currentLang) return;
        currentLang = lang;
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
        applyLanguage();
        applyStaticTranslations();
        // custom-selectها کپی متنی از option‌ها می‌سازند؛ پس از ترجمه باید بازسازی شوند
        if (typeof window.rebuildCustomSelects === 'function') {
            window.rebuildCustomSelects();
        }
    }

    function toggleLang() {
        setLang(currentLang === 'fa' ? 'en' : 'fa');
    }

    // --- مقداردهی اولیه پس از آماده شدن DOM ---
    function init() {
        applyLanguage();
        applyStaticTranslations();
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // --- event delegation روی document برای دکمه‌ی تغییر زبان ---
    document.addEventListener('click', function (e) {
        var toggle = e.target.closest && e.target.closest('#langToggleBtn');
        if (toggle) {
            e.preventDefault();
            toggleLang();
        }
    });

    // در دسترس‌سازی سراسری برای دیباگ / پل WebView
    window.MedMateI18n = {
        t: t,
        getLang: function () { return currentLang; },
        setLang: setLang,
        toggleLang: toggleLang,
        applyLanguage: applyLanguage,
        applyStaticTranslations: applyStaticTranslations,
        isRTL: isRTL
    };
})();
