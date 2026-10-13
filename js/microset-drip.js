/**
 * microset-drip.js
 * میکروست همیشه فاکتور 60 قطره/میلی‌لیتر دارد.
 * منطق محاسبه از js/calc-core.js (MedMateCalc) استفاده می‌کند.
 */

window.calculateMicrosetMain = function() {
    var tr = function (key, faFallback) { return (window.MedMateI18n && typeof window.MedMateI18n.t === "function") ? window.MedMateI18n.t(key) : faFallback; };
    var Calc = window.MedMateCalc;
    const microsetVolume = document.getElementById('microsetVolume');
    const microsetInfusionTimeValue = document.getElementById('microsetInfusionTimeValue');
    const microsetInfusionTimeUnit = document.getElementById('microsetInfusionTimeUnit');
    const microsetResult = document.getElementById('microsetResult');

    const dropsPerMinute = Calc.dropsPerMinute(
        microsetVolume.value,
        microsetInfusionTimeValue.value,
        microsetInfusionTimeUnit.value,
        60
    );

    if (dropsPerMinute === null) {
        microsetResult.innerHTML = `<div class="error">${tr("err.enterVolTime","لطفاً حجم و زمان را به درستی وارد کنید.")}</div>`;
        return;
    }

    microsetResult.innerHTML = `<bdi>${tr("res.dropsPerMin","قطرات بر دقیقه")}: ${formatNumber(dropsPerMinute)} gtt/min</bdi>`;
};
