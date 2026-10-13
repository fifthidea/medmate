/**
 * calc-core.js
 * ------------------------------------------------------------
 * توابع محاسباتی خالص (بدون وابستگی به DOM) برای MedMate.
 * این ماژول هم در مرورگر (از طریق window.MedMateCalc) و هم در
 * محیط Node (برای تست با node:test) قابل استفاده است.
 *
 * جداسازی منطق محاسبه از DOM باعث می‌شود بتوان صحت فرمول‌ها را
 * به‌صورت خودکار تست کرد — که برای اپلیکیشن دارویی حیاتی است.
 * ------------------------------------------------------------
 */
(function (root, factory) {
    var api = factory();
    if (typeof module === 'object' && module.exports) {
        module.exports = api;      // Node / تست
    }
    if (root) {
        root.MedMateCalc = api;    // مرورگر
        // سازگاری عقب‌رو: formatNumber به‌صورت سراسری در دسترس باشد تا
        // ماژول‌های نمایشی نیازی به تعریف تکراری نداشته باشند.
        if (typeof root.formatNumber === 'undefined') {
            root.formatNumber = api.formatNumber;
        }
    }
})(typeof window !== 'undefined' ? window : null, function () {
    'use strict';

    /**
     * قالب‌بندی عدد برای نمایش: حذف اعشار اضافی و صفرهای انتهایی.
     */
    function formatNumber(num) {
        if (num === undefined || num === null || isNaN(parseFloat(num))) return '';
        var floatNum = parseFloat(num);
        if (floatNum % 1 === 0) {
            return floatNum.toString();
        }
        var formatted = floatNum.toFixed(2);
        formatted = formatted.replace(/\.?0+$/, '');
        return formatted;
    }

    /**
     * تبدیل دوز تجویزی به مقدار پایه (mg یا U) بر ساعت.
     * @returns {number|null} مقدار بر ساعت، یا null اگر واحد وزنی باشد و وزن نامعتبر.
     */
    function prescribedDosePerHour(prescribedDose, unit, weight) {
        var w = parseFloat(weight);
        var d = parseFloat(prescribedDose);
        if (isNaN(d)) return null;
        var needsWeight = unit.indexOf('/kg/') !== -1;
        if (needsWeight && (isNaN(w) || w <= 0)) return null;

        switch (unit) {
            case 'mcg/kg/min': return (d * w * 60) / 1000;
            case 'mcg/kg/h':   return (d * w) / 1000;
            case 'mcg/min':    return (d * 60) / 1000;
            case 'mcg/h':      return d / 1000;
            case 'mg/kg/min':  return (d * w * 60);
            case 'mg/kg/h':    return (d * w);
            case 'mg/h':       return d;
            case 'mg/min':     return d * 60;
            case 'U/kg/min':   return (d * w * 60);
            case 'U/kg/h':     return (d * w);
            case 'U/h':        return d;
            default:           return null;
        }
    }

    /**
     * محاسبه نرخ انفوزیون (ml/h یا gtt/min بسته به روش).
     * drugDose به mg یا U، درصورت mcg بودن باید قبلاً به mg تبدیل شود.
     * @returns {number|null}
     */
    function infusionRate(drugDoseBaseUnit, syringeVolume, prescribedPerHour) {
        var dd = parseFloat(drugDoseBaseUnit);
        var sv = parseFloat(syringeVolume);
        if (isNaN(dd) || isNaN(sv) || dd <= 0 || sv <= 0) return null;
        if (prescribedPerHour === null || isNaN(prescribedPerHour)) return null;
        var rate = (prescribedPerHour / dd) * sv;
        if (!isFinite(rate) || rate <= 0) return null;
        return rate;
    }

    /**
     * ارزیابی ایمنی نرخ انفوزیون. برمی‌گرداند: 'high' | 'low' | 'ok'.
     */
    function assessInfusionRate(rate) {
        if (rate > 250) return 'high';
        if (rate < 0.1) return 'low';
        return 'ok';
    }

    /**
     * قطرات سرم بر دقیقه.
     * @returns {number|null}
     */
    function dropsPerMinute(fluidVolume, timeValue, timeUnit, dripFactor) {
        var v = parseFloat(fluidVolume);
        var t = parseFloat(timeValue);
        var f = parseFloat(dripFactor);
        if (isNaN(v) || isNaN(t) || isNaN(f) || v <= 0 || t <= 0 || f <= 0) return null;
        var totalMinutes = timeUnit === 'hours' ? t * 60 : t;
        return (v * f) / totalMinutes;
    }

    /**
     * حجم (ml) مورد نیاز از یک محلول درصدی برای رسیدن به دوز خواسته‌شده.
     * درصد به معنای g در 100ml است؛ پس هر ml معادل percentage*10 میلی‌گرم.
     * @returns {number|null}
     */
    function mlFromPercentage(percentage, requiredDose, doseUnit) {
        var p = parseFloat(percentage);
        var d = parseFloat(requiredDose);
        if (isNaN(p) || isNaN(d) || p <= 0 || d <= 0) return null;
        var doseMg = doseUnit === 'g' ? d * 1000 : d;
        return doseMg / (p * 10);
    }

    /**
     * نسبت آلیگیشن (alligation) برای رقیق/غلیظ کردن محلول‌ها.
     * R = (مطلوب - فعلی) / (غلیظ - فعلی) → کسری از حجم که باید از محلول غلیظ باشد.
     * @returns {number|null} در بازه (0,1) یا null اگر ورودی نامعتبر باشد.
     */
    function alligationRatio(currentConc, desiredConc, stockConc) {
        var cc = parseFloat(currentConc);
        var cd = parseFloat(desiredConc);
        var cs = parseFloat(stockConc);
        if (isNaN(cc) || isNaN(cd) || isNaN(cs)) return null;
        if (cc < 0 || cd <= 0 || cs <= 0) return null;
        if (cs === cc) return null;
        // غلظت مطلوب باید بین فعلی و غلیظ باشد.
        if (cd <= cc || cd >= cs) return null;
        return (cd - cc) / (cs - cc);
    }

    /**
     * تبدیل mEq به mg و ml.
     * molarMass: جرم مولی (g/mol)، valence: ظرفیت، concentrationMgPerMl: غلظت محلول.
     * @returns {{mg:number, ml:number}|null}
     */
    function mEqToMgMl(mEq, molarMass, valence, concentrationMgPerMl) {
        var e = parseFloat(mEq);
        var m = parseFloat(molarMass);
        var v = parseFloat(valence);
        var c = parseFloat(concentrationMgPerMl);
        if (isNaN(e) || isNaN(m) || isNaN(v) || e <= 0 || m <= 0 || v <= 0) return null;
        // mg = mEq * (جرم مولی / ظرفیت)
        var mg = e * (m / v);
        var result = { mg: mg };
        if (!isNaN(c) && c > 0) {
            result.ml = mg / c;
        }
        return result;
    }

    return {
        formatNumber: formatNumber,
        prescribedDosePerHour: prescribedDosePerHour,
        infusionRate: infusionRate,
        assessInfusionRate: assessInfusionRate,
        dropsPerMinute: dropsPerMinute,
        mlFromPercentage: mlFromPercentage,
        alligationRatio: alligationRatio,
        mEqToMgMl: mEqToMgMl
    };
});
