/**
 * drug-main.js
 * منطق محاسبه از js/calc-core.js (MedMateCalc) استفاده می‌کند.
 * formatNumber به‌صورت سراسری از calc-core تأمین می‌شود.
 */

window.calculateDrugMain = function() {
    var Calc = window.MedMateCalc;
    var tr = function (key, faFallback) {
        return (window.MedMateI18n && typeof window.MedMateI18n.t === 'function') ? window.MedMateI18n.t(key) : faFallback;
    };
    const drugDose = document.getElementById('drugDose'),
        syringeVolume = document.getElementById('syringeVolume'),
        prescribedDose = document.getElementById('prescribedDose'),
        prescribedDoseUnit = document.getElementById('prescribedDoseUnit'),
        weight = document.getElementById('weight'),
        infusionMethodPump = document.querySelector('input[name="infusionMethod"][value="pump"]'),
        drugResult = document.getElementById('drugResult');

    const drugDoseVal = parseFloat(drugDose.value),
        syringeVolumeVal = parseFloat(syringeVolume.value),
        prescribedDoseVal = parseFloat(prescribedDose.value),
        weightVal = parseFloat(weight.value);

    if (isNaN(drugDoseVal) || isNaN(syringeVolumeVal) || isNaN(prescribedDoseVal)) { drugResult.innerHTML = `<div class="error">${tr('err.allValues','لطفاً تمام مقادیر اصلی را وارد کنید.')}</div>`; return; }
    if (drugDoseVal <= 0 || syringeVolumeVal <= 0 || prescribedDoseVal <= 0) { drugResult.innerHTML = `<div class="error">${tr('err.positive','مقادیر وارد شده باید مثبت باشند.')}</div>`; return; }

    const prescribedUnit = prescribedDoseUnit.value;
    const isWeightBased = prescribedUnit.includes('/kg/');

    if (isWeightBased && (isNaN(weightVal) || weightVal <= 0)) {
        drugResult.innerHTML = `<div class="error">${tr('err.enterWeight','لطفاً وزن بیمار را وارد کنید.')}</div>`; return;
    }

    // تبدیل دوز دارو به واحد پایه (mcg → mg)
    let drugDoseBase = document.getElementById('drugDoseUnit').value,
        drugDoseValBaseUnit = drugDoseVal;
    if (drugDoseBase === 'mcg') {
        drugDoseValBaseUnit = drugDoseVal / 1000;
        drugDoseBase = 'mg';
    }

    // بررسی همخوانی واحد دوز دارو و دوز تجویزی
    const doseBaseUnitMismatch = (drugDoseBase === 'mg' && prescribedUnit.includes('U')) || (drugDoseBase === 'U' && !prescribedUnit.includes('U'));
    if (doseBaseUnitMismatch) {
        drugResult.innerHTML = `<div class="error">${tr('err.unitMismatch','واحد دوز دارو و دوز تجویزی همخوانی ندارند.')}</div>`;
        return;
    }

    // محاسبه دوز تجویزی بر ساعت (منطق مشترک از calc-core)
    const prescribedPerHour = Calc.prescribedDosePerHour(prescribedDoseVal, prescribedUnit, weightVal);
    if (prescribedPerHour === null) {
        drugResult.innerHTML = `<div class="error">${tr('err.badPrescribed','واحد دوز تجویزی نامعتبر است یا وزن لازم وارد نشده.')}</div>`; return;
    }

    // محاسبه نرخ انفوزیون (منطق مشترک از calc-core)
    const infusionRate = Calc.infusionRate(drugDoseValBaseUnit, syringeVolumeVal, prescribedPerHour);
    const unit = infusionMethodPump.checked ? 'ml/h' : 'gtt/min';

    if (infusionRate === null) {
        drugResult.innerHTML = `<div class="error">${tr('err.calcError','خطا در محاسبه یا مقادیر ورودی نامعتبر.')}</div>`; return;
    }

    // --- Safety guard: هشدار برای نرخ انفوزیون خارج از محدوده معمول ---
    // این فقط یک هشدار احتیاطی است و جایگزین قضاوت بالینی نیست.
    let warningHtml = '';
    const safety = Calc.assessInfusionRate(infusionRate);
    const warnStyle = 'color:#b45309;background:#fef3c7;border:1px solid #fcd34d;border-radius:8px;padding:8px;margin-top:8px;font-size:12px;';
    if (safety === 'high') {
        warningHtml = `<div class="warning" style="${warnStyle}"><bdi>⚠️ ${tr('warn.rateHigh','نرخ محاسبه‌شده غیرمعمول و بالاست. لطفاً مقادیر ورودی و واحدها را بازبینی کنید.')}</bdi></div>`;
    } else if (safety === 'low') {
        warningHtml = `<div class="warning" style="${warnStyle}"><bdi>⚠️ ${tr('warn.rateLow','نرخ محاسبه‌شده بسیار پایین است. لطفاً مقادیر ورودی و واحدها را بازبینی کنید.')}</bdi></div>`;
    }

    drugResult.innerHTML = `<bdi>${tr('res.rate','RATE')}: ${formatNumber(infusionRate)} ${unit}</bdi>${warningHtml}`;
};
