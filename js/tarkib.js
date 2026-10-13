// ==========================================
// TARKIB MODULE (Mix & Fix Drugs in Pump) - VALIDATIONS
// formatNumber به‌صورت سراسری از js/calc-core.js تأمین می‌شود.
// ==========================================

// helper ترجمه با interpolation و fallback فارسی
function ttr(key, faFallback, vars) {
    if (window.MedMateI18n && typeof window.MedMateI18n.t === 'function') {
        return window.MedMateI18n.t(key, vars);
    }
    var s = faFallback;
    if (vars) { s = s.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; }); }
    return s;
}

// تابع برای ایجاد هشدار بصری (چشمک قرمز)
function highlightInput(input) {
    if (!input) return;
    input.style.border = "2px solid #e74c3c";
    input.style.backgroundColor = "#fadbd8";
    setTimeout(() => {
        input.style.border = "";
        input.style.backgroundColor = "";
    }, 3000);
    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    input.focus();
}

window.openTarkibTab = function(evt, tabName, targetEl) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tarkib-tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tarkib-tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    // پشتیبانی از هر دو حالت: فراخوانی با event یا با المان مستقیم (event delegation)
    var activeEl = targetEl || (evt && evt.currentTarget);
    if (activeEl) activeEl.className += " active";
};

// --- Event delegation برای دکمه‌های ماژول ترکیب (سازگار با WebView اندروید) ---
document.addEventListener('click', function(e) {
    var tabBtn = e.target.closest('.tarkib-tab-link[data-tarkib-tab]');
    if (tabBtn) {
        window.openTarkibTab(null, tabBtn.getAttribute('data-tarkib-tab'), tabBtn);
        return;
    }
    var actionBtn = e.target.closest('[data-tarkib-action]');
    if (actionBtn) {
        var action = actionBtn.getAttribute('data-tarkib-action');
        if (action === 'calc-universal' && typeof window.calculateUniversalDoses === 'function') {
            window.calculateUniversalDoses();
        } else if (action === 'calc-correction' && typeof window.calculateCorrection === 'function') {
            window.calculateCorrection();
        }
    }
});

window.syncUnits = function() {
    const oldUnit = document.getElementById('oldUnitA');
    const lockedDisplay = document.getElementById('lockedUnitDisplay');
    if(oldUnit && lockedDisplay) {
        lockedDisplay.innerText = oldUnit.value + "";
    }
};

document.addEventListener('DOMContentLoaded', function() {
    window.syncUnits();
});

function normalizeToHourlyDose(dose, unit, weight) {
    let hourly = dose;
    if (unit.includes('kg')) {
        if (isNaN(weight) || weight <= 0) return null;
        hourly = hourly * weight;
    }
    if (unit.includes('min')) {
        hourly = hourly * 60;
    }
    return hourly;
}

window.calculateUniversalDoses = function() {
    const weightInput = document.getElementById('patientWeight');
    const weight = parseFloat(weightInput.value);

    const syringeVolInput = document.getElementById('syringeVol');
    const syringeVol = parseFloat(syringeVolInput.value);

    const pumpRateInput = document.getElementById('pumpRate');
    const pumpRate = parseFloat(pumpRateInput.value);

    const d1Name = document.getElementById('drug1Name').value || ttr("trk.result1","داروی اول:").replace(":","");
    const d1DoseStr = document.getElementById('drug1Dose').value;
    const d1Dose = parseFloat(d1DoseStr);
    const d1Unit = document.getElementById('drug1Unit').value;
    const amp1Amount = parseFloat(document.getElementById('amp1Amount').value);
    const amp1Unit = document.getElementById('amp1Unit').value;
    const amp1Vol = parseFloat(document.getElementById('amp1Vol').value);

    const d2Name = document.getElementById('drug2Name').value || ttr("trk.result2","داروی دوم:").replace(":","");
    const d2DoseStr = document.getElementById('drug2Dose').value;
    const d2Dose = parseFloat(d2DoseStr);
    const d2Unit = document.getElementById('drug2Unit').value;
    const amp2Amount = parseFloat(document.getElementById('amp2Amount').value);
    const amp2Unit = document.getElementById('amp2Unit').value;
    const amp2Vol = parseFloat(document.getElementById('amp2Vol').value);

    // اعتبارسنجی اولیه پمپ با هشدارهای تفکیک شده
    if (isNaN(syringeVol) || syringeVol <= 0) {
        alert(ttr("trk.errSyringeVol","لطفاً حجم سرنگ را به درستی وارد کنید."));
        highlightInput(syringeVolInput);
        return;
    }

    if (isNaN(pumpRate) || pumpRate <= 0) {
        alert(ttr("trk.errPumpRate","لطفاً سرعت پمپ را به درستی وارد کنید."));
        highlightInput(pumpRateInput);
        return;
    }

    // بررسی اینکه حداقل یک دارو وارد شده باشد
    if (!d1DoseStr && !d2DoseStr) {
        alert(ttr("trk.errAtLeastOne","لطفاً دوز اوردر حداقل یکی از داروها را وارد کنید.")); return;
    }

    // بررسی نیاز به وزن
    const checkWeightNeeded = (doseStr, unit) => {
        return doseStr && unit.includes('kg') && (isNaN(weight) || weight <= 0);
    };

    if (checkWeightNeeded(d1DoseStr, d1Unit) || checkWeightNeeded(d2DoseStr, d2Unit)) {
        alert(ttr("trk.errWeightNeeded","برای این واحد دارویی، وارد کردن وزن بیمار الزامی است."));
        highlightInput(weightInput);
        return;
    }

    const hoursRunning = syringeVol / pumpRate;

    if (d1DoseStr && !isNaN(d1Dose)) {
        const result1 = calculateDrugAmount(d1Dose, d1Unit, weight, hoursRunning, amp1Amount, amp1Unit, amp1Vol);
        document.getElementById('labelResult1').innerText = d1Name + ":";
        document.getElementById('drug1Result').innerText = result1.text;
        document.getElementById('drug1CcResult').innerText = result1.ccText;
        document.getElementById('labelResult1').parentElement.style.display = "flex";
    } else {
        document.getElementById('labelResult1').parentElement.style.display = "none";
    }

    if (d2DoseStr && !isNaN(d2Dose)) {
        const result2 = calculateDrugAmount(d2Dose, d2Unit, weight, hoursRunning, amp2Amount, amp2Unit, amp2Vol);
        document.getElementById('labelResult2').innerText = d2Name + ":";
        document.getElementById('drug2Result').innerText = result2.text;
        document.getElementById('drug2CcResult').innerText = result2.ccText;
        document.getElementById('labelResult2').parentElement.style.display = "flex";
    } else {
        document.getElementById('labelResult2').parentElement.style.display = "none";
    }

    document.getElementById('pumpResultNew').innerText = unitVal(pumpRate, "cc/hr");
    document.getElementById('volResultNew').innerText = unitVal(syringeVol, "cc");
    document.getElementById('resultBoxNew').style.display = "block";
};

// ترتیب عدد و واحد بر اساس زبان: در فارسی واحد جلوی عدد (mg 210)،
// در انگلیسی عدد جلوی واحد (210 mg).
function unitVal(num, unit) {
    var isFa = !(window.MedMateI18n && window.MedMateI18n.getLang && window.MedMateI18n.getLang() === 'en');
    var n = formatNumber(num);
    return isFa ? (unit + ' ' + n) : (n + ' ' + unit);
}

function calculateDrugAmount(dose, unit, weight, hoursRunning, ampAmount, ampUnit, ampVol) {
    const hourlyDose = normalizeToHourlyDose(dose, unit, weight);
    if (hourlyDose === null) return { error: true };

    let totalAmount = hourlyDose * hoursRunning;
    const baseUnit = unit.split('/')[0];

    let formattedText = "";
    let ccText = "";

    // فقط مقدار و واحد (بدون برچسب «نیاز خالص:»)
    if (baseUnit === "mcg") {
        if (totalAmount >= 1000) formattedText = unitVal(totalAmount / 1000, "mg");
        else formattedText = unitVal(totalAmount, "mcg");
    } else if (baseUnit === "mg") {
        formattedText = unitVal(totalAmount, "mg");
    } else if (baseUnit === "U") {
        formattedText = unitVal(totalAmount, "u");
    } else {
        formattedText = unitVal(totalAmount, baseUnit);
    }

    if (!isNaN(ampAmount) && !isNaN(ampVol) && ampAmount > 0 && ampVol > 0) {
        let normalizedTotalAmount = totalAmount;
        if (baseUnit === "mcg" && ampUnit === "mg") normalizedTotalAmount = totalAmount / 1000;
        else if (baseUnit === "mg" && ampUnit === "mcg") normalizedTotalAmount = totalAmount * 1000;
        else if (baseUnit !== ampUnit && (baseUnit === "U" || ampUnit === "U")) ccText = ttr("trk.errUnitMismatch","خطا در تطبیق واحدها");

        if (ccText === "") {
            const drawVolume = (normalizedTotalAmount / ampAmount) * ampVol;
            // فقط مقدار و واحد سی‌سی (بدون برچسب «بکشید»)
            ccText = unitVal(drawVolume, "cc");
        }
    } else {
        ccText = ttr("trk.noAmpSpec","(مشخصات آمپول وارد نشده)");
    }
    // بدون برچسب «نیاز خالص:» — فقط مقدار میلی‌گرم
    return { error: false, text: formattedText, ccText: ccText };
}

window.calculateCorrection = function() {
    const weightInput = document.getElementById('patientWeightFix');
    const weight = parseFloat(weightInput.value);

    const remainingVolInput = document.getElementById('remainingVol');
    const remainingVol = parseFloat(remainingVolInput.value);

    const currentRateInput = document.getElementById('currentRate');
    const currentRate = parseFloat(currentRateInput.value);

    const oldDoseAStr = document.getElementById('oldDoseA').value;
    const oldDoseA = parseFloat(oldDoseAStr);
    const oldUnitA = document.getElementById('oldUnitA').value;
    const newDoseAStr = document.getElementById('newDoseA').value;
    const newDoseA = parseFloat(newDoseAStr);
    const newUnitA = oldUnitA;

    const ampAmountA = parseFloat(document.getElementById('ampAmountA').value);
    const ampUnitA = document.getElementById('ampUnitA').value;
    const ampVolA = parseFloat(document.getElementById('ampVolA').value);

    const doseBStr = document.getElementById('doseB').value;
    const doseB = parseFloat(doseBStr);
    const unitB = document.getElementById('unitB').value;
    const ampAmountB = parseFloat(document.getElementById('ampAmountB').value);
    const ampUnitB = document.getElementById('ampUnitB').value;
    const ampVolB = parseFloat(document.getElementById('ampVolB').value);

    // اعتبارسنجی مقادیر پایه پمپ با هشدارهای اختصاصی
    if (isNaN(remainingVol) || remainingVol <= 0) {
        alert(ttr("trk.errRemainingVol","لطفاً حجم باقی‌مانده را به درستی وارد کنید."));
        highlightInput(remainingVolInput);
        return;
    }

    if (isNaN(currentRate) || currentRate <= 0) {
        alert(ttr("trk.errCurrentRate","لطفاً سرعت فعلی پمپ را به درستی وارد کنید."));
        highlightInput(currentRateInput);
        return;
    }

    if (isNaN(oldDoseA) || isNaN(newDoseA) || isNaN(doseB)) {
        alert(ttr("trk.errOrders","لطفاً مقادیر اوردر داروها را به درستی وارد کنید."));
        return;
    }

    if (isNaN(ampAmountA) || isNaN(ampVolA) || isNaN(ampAmountB) || isNaN(ampVolB)) {
        alert(ttr("trk.errAmpSpecs","لطفاً مشخصات آمپول‌ها را برای محاسبه دقیق حجم وارد کنید."));
        return;
    }

    const checkWeightNeeded = (doseStr, unit) => doseStr && unit.includes('kg') && (isNaN(weight) || weight <= 0);

    if (checkWeightNeeded(oldDoseAStr, oldUnitA) || checkWeightNeeded(newDoseAStr, newUnitA) || checkWeightNeeded(doseBStr, unitB)) {
        alert(ttr("trk.errWeightNeeded2","برای واحدهای انتخابی، وارد کردن وزن بیمار الزامی است."));
        highlightInput(weightInput);
        return;
    }

    const hourlyOldA = normalizeToHourlyDose(oldDoseA, oldUnitA, weight);
    const hourlyNewA = normalizeToHourlyDose(newDoseA, newUnitA, weight);
    const hourlyB = normalizeToHourlyDose(doseB, unitB, weight);

    const currentConcentrationA = hourlyOldA / currentRate;
    const currentConcentrationB = hourlyB / currentRate;

    let newPumpRate = currentRate;
    let instructionText = "";
    let badgeClass = "";
    let badgeText = "";

    if (hourlyNewA > hourlyOldA) {
        badgeText = ttr("trk.scenarioIncrease","سناریو: افزایش دوز");
        badgeClass = "badge-increase";

        const requiredConcentrationA = hourlyNewA / currentRate;
        const concentrationDeficitA = requiredConcentrationA - currentConcentrationA;
        const pureAmountToAddA = concentrationDeficitA * remainingVol;

        let normalizedPureAmountA = pureAmountToAddA;
        const baseUnitA = newUnitA.split('/')[0];
        if (baseUnitA === "mcg" && ampUnitA === "mg") normalizedPureAmountA = pureAmountToAddA / 1000;
        else if (baseUnitA === "mg" && ampUnitA === "mcg") normalizedPureAmountA = pureAmountToAddA * 1000;

        const ccToAddA = (normalizedPureAmountA / ampAmountA) * ampVolA;
        const newTotalVolume = remainingVol + ccToAddA;
        newPumpRate = currentRate * (newTotalVolume / remainingVol);

        instructionText = ttr("trk.increaseMsg","ابتدا مقدار <strong style=\"color:#f1c40f;\">{cc} سی‌سی</strong> از آمپول داروی تغییر یافته بکشید و مستقیماً به داخل حجم {vol} سی‌سی باقی‌مانده تزریق کنید. <br><br><strong>{importantLabel}</strong> به دلیل افزایش حجم کل مایع، سرعت پمپ باید کمی افزایش یابد تا دوز داروی ثابت دچار افت نشود.", {cc: formatNumber(ccToAddA), vol: formatNumber(remainingVol), importantLabel: ttr("trk.important","مهم:")});

    } else if (hourlyNewA < hourlyOldA) {
        badgeText = ttr("trk.scenarioDecrease","سناریو: کاهش دوز");
        badgeClass = "badge-decrease";

        const theoreticalNewRate = hourlyNewA / currentConcentrationA;
        const requiredConcentrationB = hourlyB / theoreticalNewRate;
        const concentrationDeficitB = requiredConcentrationB - currentConcentrationB;
        const pureAmountToAddB = concentrationDeficitB * remainingVol;

        let normalizedPureAmountB = pureAmountToAddB;
        const baseUnitB = unitB.split('/')[0];
        if (baseUnitB === "mcg" && ampUnitB === "mg") normalizedPureAmountB = pureAmountToAddB / 1000;
        else if (baseUnitB === "mg" && ampUnitB === "mcg") normalizedPureAmountB = pureAmountToAddB * 1000;

        const ccToAddB = (normalizedPureAmountB / ampAmountB) * ampVolB;
        const newTotalVolume = remainingVol + ccToAddB;
        newPumpRate = theoreticalNewRate * (newTotalVolume / remainingVol);

        instructionText = ttr("trk.decreaseMsg","برای جبران افت داروی ثابت، مقدار <strong style=\"color:#f1c40f;\">{cc} سی‌سی</strong> از آمپول داروی ثابت بکشید و به داخل سرنگ تزریق کنید. سپس سرعت پمپ را روی عدد جدید تنظیم کنید.", {cc: formatNumber(ccToAddB)});

    } else {
        badgeText = ttr("trk.scenarioNoChange","بدون تغییر");
        badgeClass = "badge-decrease";
        instructionText = ttr("trk.noChangeMsg","دوز جدید با دوز قبلی برابر است. نیازی به هیچ اقدامی نیست.");
    }

    const badgeEl = document.getElementById('actionType');
    badgeEl.className = "action-badge " + badgeClass;
    badgeEl.innerText = badgeText;

    document.getElementById('newPumpRateResult').innerText = unitVal(newPumpRate, "cc/hr");
    document.getElementById('injectionInstruction').innerHTML = instructionText;
    document.getElementById('resultBoxFix').style.display = "block";
};