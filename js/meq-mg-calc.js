/* ===== BMI Calculator ===== */

window.calculateBMIMain = function() {
    const weightInput = document.getElementById('bmiweight');
    const heightInput = document.getElementById('bmiheight');
    const result = document.getElementById('bmiResult');

    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);

    // Validate inputs
    if (!Number.isFinite(weight) || !Number.isFinite(height) ||
        weight <= 0 || height <= 0) {
        result.innerHTML = `
            <div class="result error">
                لطفا مقادیر صحیح وارد کنید.
            </div>`;
        return;
    }

    // Convert height from cm to meters
    const heightInMeters = height / 100;

    // Calculate BMI
    const bmi = weight / (heightInMeters * heightInMeters);

    // Determine adult BMI category
    let category;

    if (bmi < 18.5) {
        category = 'لاغر';
    } else if (bmi < 25) {
        category = 'طبیعی';
    } else if (bmi < 30) {
        category = 'چاق';
    } else {
        category = 'خیلی چاق';
    }

    // Display result
    result.innerHTML = `
        <div>
            <p><strong>شاخص توده بدنی:</strong> ${bmi.toFixed(1)}</p>
            <p><strong>دسته:</strong> ${category}</p>
        </div>`;
};


/**
 * meq-mg-calc.js
 * formatNumber به‌صورت سراسری از js/calc-core.js تأمین می‌شود.
 */

function getPersianName(englishName) {
    const names = {
        "Potassium Chloride": "کلرید پتاسیم",
        "Sodium Chloride": "کلرید سدیم",
        "Sodium Bicarbonate": "بیکربنات سدیم",
        "Calcium Chloride": "کلرید کلسیم",
        "Magnesium Sulfate": "سولفات منیزیم",
        "Potassium Phosphate": "فسفات پتاسیم",
        "Calcium Gluconate": "گلوکونات کلسیم"
    };
    return names[englishName] || englishName;
}

const concentrationData = {
    "Potassium Chloride": { "10%": 1.3, "7.5%": 1.0, "15%": 2.0 },
    "Sodium Chloride": { "0.9%": 0.15, "3%": 0.5, "5%": 0.9 },
    "Sodium Bicarbonate": { "8.4%": 1.0, "7.5%": 0.9, "4.2%": 0.5 },
    "Calcium Chloride": { "10%": 1.4, "5%": 0.7 },
    "Magnesium Sulfate": { "50%": 4.0, "20%": 1.6 },
    "Potassium Phosphate": { "4.4": 3.0 },
    "Calcium Gluconate": { "10%": 0.5 }
};

window.calculateMgFromMEqMain = function() {
    const compoundSelect = document.getElementById("compound");
    const concentrationSelect = document.getElementById("concentration");
    const mEqInput = document.getElementById("mEq");
    const mEqToMgResult = document.getElementById("mEqToMgResult");

    const compoundValue = compoundSelect.value;
    const concentrationValue = concentrationSelect.value;
    const mEqVal = parseFloat(mEqInput.value);

    // helper ترجمه با fallback امن به متن فارسی
    var tr = function (key, faFallback) {
        return (window.MedMateI18n && typeof window.MedMateI18n.t === 'function') ? window.MedMateI18n.t(key) : faFallback;
    };

    if (!compoundValue) { mEqToMgResult.innerHTML = `<div class="result error">${tr('err.selectCompound','لطفاً ترکیب دارویی را انتخاب کنید!')}</div>`; return; }
    if (!concentrationValue) { mEqToMgResult.innerHTML = `<div class="result error">${tr('err.selectConc','لطفاً غلظت محلول را انتخاب کنید!')}</div>`; return; }
    if (isNaN(mEqVal) || mEqVal <= 0) { mEqToMgResult.innerHTML = `<div class="result error">${tr('err.badMEq','لطفاً مقدار mEq را به درستی وارد کنید!')}</div>`; return; }

    const [molarMass, valence, compoundName] = compoundValue.split(",");
    const mg = (mEqVal * (parseFloat(molarMass) / parseInt(valence)));
    const ml = (mEqVal / parseFloat(concentrationValue));
    const selectedConcentrationText = concentrationSelect.options[concentrationSelect.selectedIndex].text;
    // نام ترکیب از متن گزینه‌ی انتخاب‌شده (که با زبان فعلی هماهنگ است) گرفته می‌شود
    const compoundLabel = compoundSelect.options[compoundSelect.selectedIndex].text;

    const resultHTML = `
        <div class="conversion-result">
            <div class="conversion-line">
                <span class="conversion-value">${formatNumber(ml)}</span><span class="conversion-unit"> ml</span>
                <span class="conversion-equals"> = </span>
                <span class="conversion-value">${formatNumber(mg)}</span><span class="conversion-unit"> mg</span>
            </div>
            <div class="compound-info">${compoundLabel} ${selectedConcentrationText} (${tr('res.perMEq','به ازای هر')} ${formatNumber(mEqVal)} mEq)</div>
        </div>`;
    mEqToMgResult.innerHTML = resultHTML;
}

window.concentrationData = concentrationData;