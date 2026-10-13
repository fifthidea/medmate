'use strict';

const test = require('node:test');
const assert = require('node:assert');
const calc = require('../js/calc-core.js');

test('formatNumber: صحیح‌ها بدون اعشار', () => {
    assert.strictEqual(calc.formatNumber(5), '5');
    assert.strictEqual(calc.formatNumber(5.0), '5');
});

test('formatNumber: حذف صفرهای انتهایی', () => {
    assert.strictEqual(calc.formatNumber(2.5), '2.5');
    assert.strictEqual(calc.formatNumber(2.50), '2.5');
    assert.strictEqual(calc.formatNumber(3.14159), '3.14');
});

test('formatNumber: ورودی نامعتبر رشته خالی می‌دهد', () => {
    assert.strictEqual(calc.formatNumber(null), '');
    assert.strictEqual(calc.formatNumber(undefined), '');
    assert.strictEqual(calc.formatNumber('abc'), '');
});

test('prescribedDosePerHour: mg/h بدون تغییر', () => {
    assert.strictEqual(calc.prescribedDosePerHour(10, 'mg/h'), 10);
});

test('prescribedDosePerHour: mg/min ضربدر ۶۰', () => {
    assert.strictEqual(calc.prescribedDosePerHour(2, 'mg/min'), 120);
});

test('prescribedDosePerHour: mcg/h به mg تقسیم بر ۱۰۰۰', () => {
    assert.strictEqual(calc.prescribedDosePerHour(500, 'mcg/h'), 0.5);
});

test('prescribedDosePerHour: mcg/kg/min با وزن', () => {
    // 5 mcg/kg/min * 70kg * 60 / 1000 = 21 mg/h
    assert.strictEqual(calc.prescribedDosePerHour(5, 'mcg/kg/min', 70), 21);
});

test('prescribedDosePerHour: واحد وزنی بدون وزن معتبر => null', () => {
    assert.strictEqual(calc.prescribedDosePerHour(5, 'mcg/kg/min', 0), null);
    assert.strictEqual(calc.prescribedDosePerHour(5, 'mcg/kg/min', NaN), null);
});

test('prescribedDosePerHour: واحد ناشناخته => null', () => {
    assert.strictEqual(calc.prescribedDosePerHour(5, 'foo/bar'), null);
});

test('infusionRate: محاسبه پایه', () => {
    // (10 mg/h / 200 mg) * 50 ml = 2.5 ml/h
    assert.strictEqual(calc.infusionRate(200, 50, 10), 2.5);
});

test('infusionRate: ورودی نامعتبر => null', () => {
    assert.strictEqual(calc.infusionRate(0, 50, 10), null);
    assert.strictEqual(calc.infusionRate(200, 0, 10), null);
    assert.strictEqual(calc.infusionRate(200, 50, null), null);
});

test('assessInfusionRate: مرزها', () => {
    assert.strictEqual(calc.assessInfusionRate(300), 'high');
    assert.strictEqual(calc.assessInfusionRate(0.05), 'low');
    assert.strictEqual(calc.assessInfusionRate(50), 'ok');
});

test('dropsPerMinute: ساعت', () => {
    // 1000ml * 20 gtt/ml / (2h*60) = 166.67
    const r = calc.dropsPerMinute(1000, 2, 'hours', 20);
    assert.ok(Math.abs(r - 166.666) < 0.01);
});

test('dropsPerMinute: دقیقه', () => {
    // 100ml * 60 gtt/ml / 30min = 200
    assert.strictEqual(calc.dropsPerMinute(100, 30, 'minutes', 60), 200);
});

test('dropsPerMinute: نامعتبر => null', () => {
    assert.strictEqual(calc.dropsPerMinute(0, 2, 'hours', 20), null);
    assert.strictEqual(calc.dropsPerMinute(1000, 0, 'hours', 20), null);
});

test('mlFromPercentage: محلول ۱۰٪، دوز ۵۰۰mg', () => {
    // 10% => 100 mg/ml؛ 500/100 = 5 ml
    assert.strictEqual(calc.mlFromPercentage(10, 500, 'mg'), 5);
});

test('mlFromPercentage: واحد گرم', () => {
    // 2g = 2000mg؛ 5% => 50 mg/ml؛ 2000/50 = 40 ml
    assert.strictEqual(calc.mlFromPercentage(5, 2, 'g'), 40);
});

test('mlFromPercentage: نامعتبر => null', () => {
    assert.strictEqual(calc.mlFromPercentage(0, 500, 'mg'), null);
    assert.strictEqual(calc.mlFromPercentage(10, -1, 'mg'), null);
});

test('alligationRatio: محاسبه پایه', () => {
    // فعلی ۵٪، مطلوب ۱۰٪، غلیظ ۵۰٪ => (10-5)/(50-5) = 0.1111
    const r = calc.alligationRatio(5, 10, 50);
    assert.ok(Math.abs(r - (5 / 45)) < 1e-9);
});

test('alligationRatio: از صفر شروع', () => {
    // فعلی ۰، مطلوب ۱۰، غلیظ ۵۰ => 10/50 = 0.2
    assert.strictEqual(calc.alligationRatio(0, 10, 50), 0.2);
});

test('alligationRatio: مطلوب خارج از بازه => null', () => {
    assert.strictEqual(calc.alligationRatio(5, 4, 50), null);   // کمتر از فعلی
    assert.strictEqual(calc.alligationRatio(5, 60, 50), null);  // بیشتر از غلیظ
    assert.strictEqual(calc.alligationRatio(5, 10, 5), null);   // غلیظ = فعلی
});

test('dropsPerMinute: میکروست (فاکتور ۶۰)', () => {
    // 30ml در 1 ساعت با فاکتور 60 => 30*60/60 = 30 gtt/min
    assert.strictEqual(calc.dropsPerMinute(30, 1, 'hours', 60), 30);
});

test('mEqToMgMl: KCl (74.5 g/mol, ظرفیت ۱)', () => {
    // 10 mEq * (74.5/1) = 745 mg
    const r = calc.mEqToMgMl(10, 74.5, 1);
    assert.ok(Math.abs(r.mg - 745) < 0.001);
});

test('mEqToMgMl: با غلظت محلول ml را حساب می‌کند', () => {
    // 745 mg / 149 mg/ml = 5 ml
    const r = calc.mEqToMgMl(10, 74.5, 1, 149);
    assert.ok(Math.abs(r.ml - 5) < 0.001);
});

test('mEqToMgMl: کلسیم کلراید ظرفیت ۲', () => {
    // 5 mEq * (147/2) = 367.5 mg
    const r = calc.mEqToMgMl(5, 147, 2);
    assert.ok(Math.abs(r.mg - 367.5) < 0.001);
});

test('mEqToMgMl: نامعتبر => null', () => {
    assert.strictEqual(calc.mEqToMgMl(0, 74.5, 1), null);
    assert.strictEqual(calc.mEqToMgMl(10, 0, 1), null);
});
