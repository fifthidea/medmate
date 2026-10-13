/**
 * percentage-calc.js
 * منطق محاسبه از js/calc-core.js (MedMateCalc) استفاده می‌کند.
 */

window.calculatePercentageDrugMain = function() {
    var tr = function (key, faFallback) { return (window.MedMateI18n && typeof window.MedMateI18n.t === "function") ? window.MedMateI18n.t(key) : faFallback; };
    var Calc = window.MedMateCalc;
    const drugPercentage = document.getElementById('drugPercentage');
    const requiredDose = document.getElementById('requiredDose');
    const requiredDoseUnit = document.getElementById('requiredDoseUnit');
    const percentageDrugResult = document.getElementById('percentageDrugResult');

    const mlNeeded = Calc.mlFromPercentage(
        drugPercentage.value,
        requiredDose.value,
        requiredDoseUnit.value
    );

    if (mlNeeded === null) {
        percentageDrugResult.innerHTML = `<div class="error">${tr("err.enterAllValues","لطفاً تمام مقادیر را به درستی وارد کنید.")}</div>`;
        return;
    }

    percentageDrugResult.innerHTML = `<bdi>${tr("res.mlNeeded","میلی‌لیتر مورد نیاز")}: ${formatNumber(mlNeeded)} ml</bdi>`;
};
