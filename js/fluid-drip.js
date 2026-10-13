/**
 * fluid-drip.js
 * منطق محاسبه از js/calc-core.js (MedMateCalc) استفاده می‌کند.
 */

window.calculateFluidMain = function() {
    var tr = function (key, faFallback) { return (window.MedMateI18n && typeof window.MedMateI18n.t === "function") ? window.MedMateI18n.t(key) : faFallback; };
    var Calc = window.MedMateCalc;
    const fluidVolume = document.getElementById('fluidVolume');
    const infusionTimeValue = document.getElementById('infusionTimeValue');
    const infusionTimeUnit = document.getElementById('infusionTimeUnit');
    const dripSet = document.getElementById('dripSet');
    const fluidResult = document.getElementById('fluidResult');

    const dropsPerMinute = Calc.dropsPerMinute(
        fluidVolume.value,
        infusionTimeValue.value,
        infusionTimeUnit.value,
        dripSet.value
    );

    if (dropsPerMinute === null) {
        fluidResult.innerHTML = `<div class="error">${tr("err.enterVolTime","لطفاً حجم و زمان را به درستی وارد کنید.")}</div>`;
        return;
    }

    fluidResult.innerHTML = `<bdi>${tr("res.dropsPerMin","قطرات بر دقیقه")}: ${formatNumber(dropsPerMinute)} gtt/min</bdi>`;
};
