document.addEventListener('DOMContentLoaded', function() {

    let waitingLabelsQueue = [];
    let placedLabels = {};

    const menu = document.getElementById('menu');
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarAppIcon = document.querySelector('.navbar-app-icon');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const boxesContainer = document.querySelector('.boxes-container');
    const adSection = document.getElementById('adSection');
    const footer = document.querySelector('footer');
    const datetimeElement = document.getElementById('datetime');
    const pwaInstallLinkInMenu = document.getElementById('pwaInstallLink');
    const customIcons = document.querySelectorAll('.custom-icon');

    const drugName = document.getElementById('drugName');
    const nurseName = document.getElementById('nurseName');
    const patientName = document.getElementById('patientName');
    const drugDose = document.getElementById('drugDose');
    const drugDoseUnit = document.getElementById('drugDoseUnit');
    const syringeVolume = document.getElementById('syringeVolume');
    const prescribedDose = document.getElementById('prescribedDose');
    const prescribedDoseUnit = document.getElementById('prescribedDoseUnit');
    const weight = document.getElementById('weight');
    const infusionMethodPump = document.querySelector('input[name="infusionMethod"][value="pump"]');
    const weightInputBox = document.getElementById('weightInput');
    const drugResult = document.getElementById('drugResult');
    const saveLabelBtn = document.getElementById('saveLabelBtn');

    const drugPercentage = document.getElementById('drugPercentage');
    const requiredDose = document.getElementById('requiredDose');
    const requiredDoseUnit = document.getElementById('requiredDoseUnit');
    const percentageDrugResult = document.getElementById('percentageDrugResult');
    const fluidVolume = document.getElementById('fluidVolume');
    const infusionTimeValue = document.getElementById('infusionTimeValue');
    const infusionTimeUnit = document.getElementById('infusionTimeUnit');
    const dripSet = document.getElementById('dripSet');
    const fluidResult = document.getElementById('fluidResult');
    const microsetVolume = document.getElementById('microsetVolume');
    const microsetInfusionTimeValue = document.getElementById('microsetInfusionTimeValue');
    const microsetInfusionTimeUnit = document.getElementById('microsetInfusionTimeUnit');
    const microsetResult = document.getElementById('microsetResult');
    const currentConc = document.getElementById('currentConc');
    const desiredConc = document.getElementById('desiredConc');
    const stockConc = document.getElementById('stockConc');
    const totalVolume = document.getElementById('totalVolume');
    const infusionVolume = document.getElementById('infusionVolume'); 
    const conversionResult = document.getElementById('conversionResult');
    const compoundSelect = document.getElementById("compound");
    const concentrationSelect = document.getElementById("concentration");
    const mEqInput = document.getElementById("mEq");
    const mEqToMgResult = document.getElementById("mEqToMgResult");
    
    // GIR - Elements
    const girWeight = document.getElementById('gir-weight');
    const girGlucoseRate = document.getElementById('gir-glucoseRate');
    const girConcentrationInput = document.getElementById('gir-concentration');
    const girWarning = document.getElementById('gir-warning');
    const girResult = document.getElementById('gir-result');
    const girQuickLinksContainer = document.querySelector('.quick-links');
    const girPatientGroup = document.getElementById('gir-patient-group');
    const girCurrentBG = document.getElementById('gir-current-bg');
    const girCurrentRate = document.getElementById('gir-current-rate');
    const girSafetyAlert = document.getElementById('gir-safety-alert');
    const girGestationalAge = document.getElementById('gir-gestational-age');
    const girTrend = document.getElementById('gir-trend');

    const installModal = document.getElementById('install-guide-modal');
    const showInstallGuideBtn = document.getElementById('show-install-guide-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalTabs = document.querySelectorAll('#install-guide-modal .modal-tab-btn');
    const modalTabContents = document.querySelectorAll('#install-guide-modal .modal-tab-content');
    
    const printSheetModal = document.getElementById('print-sheet-modal');
    const openPrintSheetBtn = document.getElementById('openPrintSheetBtn');
    const closePrintSheetModalBtn = document.getElementById('closePrintSheetModalBtn');
    const a4SheetPreview = document.getElementById('a4SheetPreview');
    const waitingLabelsList = document.getElementById('waitingLabelsList');
    const printA4SheetBtn = document.getElementById('printA4SheetBtn');
    const clearA4SheetBtn = document.getElementById('clearA4SheetBtn');
    const printQueueBadge = document.querySelector('.print-queue-badge');

    const promoOverlay = document.getElementById('promo-overlay');
    const closePromoBtn = document.getElementById('close-promo');
    
    function formatNumber(num) {
        const floatNum = parseFloat(num);
        if (isNaN(floatNum)) return '';
        if (floatNum % 1 === 0) {
            return floatNum.toString();
        }
        let formatted = floatNum.toFixed(2);
        return formatted.replace(/\.00$|0$/, '').replace(/\.$/, '');
    }
    
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

    function toggleMenu() { if (menu) menu.classList.toggle('open'); }

    function promptInstall() {
        if (typeof deferredPrompt !== 'undefined' && deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(choice => console.log(`User choice: ${choice.outcome}`));
            deferredPrompt = null;
        } else {
            alert('برای نصب برنامه، از منوی مرورگر خود (سه نقطه) گزینه "Install app" یا "Add to Home screen" را انتخاب کنید.');
        }
    }

    function openBox(box) {
        if (!box) return;
        box.classList.add('active');
        if (boxesContainer) boxesContainer.classList.add('active');
        setTimeout(() => box.scrollIntoView({ behavior: 'smooth', block: 'start' }), 250);
    }

    function closeBox(box) {
        if (!box) return;
        box.classList.add('closing');
        setTimeout(() => {
            box.classList.remove('active', 'closing');
            if (document.querySelectorAll('.box.active').length === 0) {
                if (boxesContainer) boxesContainer.classList.remove('active');
            }
        }, 200);
    }
    
    function updatePrintQueueBadge() {
        if (!printQueueBadge) return;
        const totalItems = waitingLabelsQueue.length + Object.keys(placedLabels).length;
        if (totalItems > 0) {
            printQueueBadge.innerText = totalItems;
            printQueueBadge.style.display = 'flex';
        } else {
            printQueueBadge.style.display = 'none';
        }
    }

    function renderA4Sheet() {
        if (!a4SheetPreview) return;
        a4SheetPreview.innerHTML = '';
        for (let i = 1; i <= 12; i++) {
            const slotId = `slot-${i}`;
            const labelData = placedLabels[slotId];
            const slot = document.createElement('div');
            slot.className = 'label-slot';
            slot.dataset.slotId = i;

            if (labelData) {
                slot.classList.add('filled');
                slot.innerHTML = `
                    <div class="mini-label-preview">
                        <strong>${labelData.drugName}</strong>
                        <span><bdi>${labelData.resultText.replace('RATE: ', '')}</bdi></span>
                    </div>
                    <button class="remove-label-btn" title="حذف از این خانه">&times;</button>
                `;
            } else {
                slot.classList.add('empty');
                slot.innerHTML = `<span class="slot-number">${i}</span>`;
            }
            a4SheetPreview.appendChild(slot);
        }
    }

    function renderWaitingLabels() {
        if (!waitingLabelsList) return;
        waitingLabelsList.innerHTML = '';
        if (waitingLabelsQueue.length === 0) {
            waitingLabelsList.innerHTML = '<p class="no-waiting-labels">لیبلی برای جایگذاری ثبت نشده است.</p>';
            return;
        }

        waitingLabelsQueue.forEach((labelData, index) => {
            const waitingItem = document.createElement('div');
            waitingItem.className = 'waiting-label-item';
            if (index === 0) {
                waitingItem.classList.add('active');
            }
            waitingItem.innerHTML = `
                <span>${labelData.drugName} (<bdi>${labelData.resultText.replace('RATE: ', '')}</bdi>)</span>
                <button class="remove-waiting-label-btn" data-label-id="${labelData.id}" title="حذف کامل">&times;</button>
            `;
            waitingLabelsList.appendChild(waitingItem);
        });
    }

    function openPrintSheet() {
        renderA4Sheet();
        renderWaitingLabels();
        if (printSheetModal) printSheetModal.classList.add('visible');
    }
    
    function closePrintSheet() {
        if (printSheetModal) printSheetModal.classList.remove('visible');
    }

    function handleSaveLabel() {
        if (!drugResult.innerText || drugResult.innerText.includes('لطفاً') || drugResult.innerText.includes('مقادیر')) {
            alert('ابتدا یک محاسبه معتبر انجام دهید.');
            return;
        }

        if (!drugName.value.trim() || !patientName.value.trim() || !nurseName.value.trim()) {
            alert('لطفاً نام دارو، نام بیمار و نام پرستار را وارد کنید.');
            return;
        }

        const labelData = {
            id: Date.now(),
            drugName: drugName.value.trim() || 'بی نام',
            nurseName: nurseName.value.trim() || 'بی نام',
            patientName: patientName.value.trim() || 'بی نام',
            drugDose: drugDose.value,
            drugDoseUnit: drugDoseUnit.options[drugDoseUnit.selectedIndex].text,
            syringeVolume: syringeVolume.value,
            prescribedDose: prescribedDose.value,
            prescribedDoseUnit: prescribedDoseUnit.options[prescribedDoseUnit.selectedIndex].text,
            resultText: drugResult.innerText,
            timestamp: new Date()
        };

        waitingLabelsQueue.push(labelData);
        updatePrintQueueBadge();
        
        saveLabelBtn.innerText = '✓ به لیست اضافه شد';
        saveLabelBtn.disabled = true;
        saveLabelBtn.classList.add('disabled');
    }

    function resetDrugCalculatorUI() {
        if(saveLabelBtn) {
            saveLabelBtn.style.display = 'none';
            saveLabelBtn.disabled = false;
            saveLabelBtn.classList.remove('disabled');
            saveLabelBtn.innerHTML = '<i class="fas fa-plus"></i> افزودن به لیست چاپ';
        }
        if(drugResult) {
            drugResult.innerHTML = '';
        }
    }
    
    function calculateDrug() {
        resetDrugCalculatorUI(); 
        
        const drugDoseVal = parseFloat(drugDose.value), syringeVolumeVal = parseFloat(syringeVolume.value), prescribedDoseVal = parseFloat(prescribedDose.value), weightVal = parseFloat(weight.value);
        if (isNaN(drugDoseVal) || isNaN(syringeVolumeVal) || isNaN(prescribedDoseVal)) { drugResult.innerHTML = `<div class="error">لطفاً تمام مقادیر اصلی را وارد کنید.</div>`; return; }
        if (drugDoseVal <= 0 || syringeVolumeVal <= 0 || prescribedDoseVal <= 0) { drugResult.innerHTML = `<div class="error">مقادیر وارد شده باید مثبت باشند.</div>`; return; }

        const prescribedUnit = prescribedDoseUnit.value;
        const isWeightBased = prescribedUnit.includes('/kg/');
        
        if (isWeightBased) {
            if (isNaN(weightVal)) { drugResult.innerHTML = `<div class="error">لطفاً وزن بیمار را وارد کنید.</div>`; return; }
            if (weightVal <= 0) { drugResult.innerHTML = `<div class="error">وزن بیمار باید یک عدد مثبت باشد.</div>`; return; }
        }
        
        let drugDoseBase = drugDoseUnit.value, // mg, mcg, U
            drugDoseValBaseUnit = drugDoseVal;
            
        // Convert Drug Dose to base Unit (mg or U)
        if (drugDoseBase === 'mcg') {
            drugDoseValBaseUnit = drugDoseVal / 1000;
            drugDoseBase = 'mg';
        }

        let prescribedDoseBaseUnitPerHour;

        switch (prescribedUnit) {
            // mcg/kg/min, mcg/kg/h, mcg/min, mcg/h -> Convert to mg/h
            case 'mcg/kg/min': prescribedDoseBaseUnitPerHour = (prescribedDoseVal * weightVal * 60) / 1000; break;
            case 'mcg/kg/h': prescribedDoseBaseUnitPerHour = (prescribedDoseVal * weightVal) / 1000; break;
            case 'mcg/min': prescribedDoseBaseUnitPerHour = (prescribedDoseVal * 60) / 1000; break;
            case 'mcg/h': prescribedDoseBaseUnitPerHour = prescribedDoseVal / 1000; break;
            // mg/kg/min, mg/kg/h, mg/h, mg/min -> Convert to mg/h
            case 'mg/kg/min': prescribedDoseBaseUnitPerHour = (prescribedDoseVal * weightVal * 60); break;
            case 'mg/kg/h': prescribedDoseBaseUnitPerHour = (prescribedDoseVal * weightVal); break;
            case 'mg/h': prescribedDoseBaseUnitPerHour = prescribedDoseVal; break;
            case 'mg/min': prescribedDoseBaseUnitPerHour = prescribedDoseVal * 60; break;
            // U/kg/min, U/kg/h, U/h -> Convert to U/h
            case 'U/kg/min': prescribedDoseBaseUnitPerHour = (prescribedDoseVal * weightVal * 60); break;
            case 'U/kg/h': prescribedDoseBaseUnitPerHour = (prescribedDoseVal * weightVal); break;
            case 'U/h': prescribedDoseBaseUnitPerHour = prescribedDoseVal; break;

            default: drugResult.innerHTML = `<div class="error">واحد دوز تجویزی نامعتبر است.</div>`; return;
        }

        const doseBaseUnitMismatch = (drugDoseBase === 'mg' && prescribedUnit.includes('U')) || (drugDoseBase === 'U' && !prescribedUnit.includes('U'));
        if (doseBaseUnitMismatch) {
            drugResult.innerHTML = `<div class="error">واحد دوز دارو و دوز تجویزی همخوانی ندارند (mg با U قابل تبدیل نیست).</div>`;
            return;
        }

        const infusionRate = (prescribedDoseBaseUnitPerHour / drugDoseValBaseUnit) * syringeVolumeVal;
        const unit = infusionMethodPump.checked ? 'ml/h' : 'gtt/min';
        
        if (infusionRate <= 0 || !isFinite(infusionRate)) {
             drugResult.innerHTML = `<div class="error">خطا در محاسبه یا مقادیر ورودی نامعتبر.</div>`; return;
        }

        drugResult.innerHTML = `<bdi>${`RATE: ${formatNumber(infusionRate)} ${unit}`}</bdi>`;
        
        if (saveLabelBtn) saveLabelBtn.style.display = 'flex';
    }

    function handleA4SheetPrint() {
        const printContent = document.createElement('div');
        printContent.className = 'a4-sheet-print-render';

        for (let i = 1; i <= 12; i++) {
            const slotId = `slot-${i}`;
            const labelData = placedLabels[slotId];
            const slotContent = document.createElement('div');
            slotContent.className = 'print-label-container';

            if (labelData) {
                const finalConcentration = `${labelData.drugDose} ${labelData.drugDoseUnit} + ${labelData.syringeVolume} ml`;
                const fullPrescribedDose = `${labelData.prescribedDose} ${labelData.prescribedDoseUnit}`;
                const cleanResultText = labelData.resultText.replace('RATE: ', '');
                const printDateTime = labelData.timestamp.toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'});

                slotContent.innerHTML = `
                    <div class="label-header">
                        <img src="/icon192.png" alt="Logo">
                        <strong>MedMate Label</strong>
                    </div>
                    <div class="label-body">
                        <div class="label-item"><span>نام دارو:</span><strong>${labelData.drugName}</strong></div>
                        <div class="label-item"><span>غلظت نهایی:</span><strong><bdi>${finalConcentration}</bdi></strong></div>
                        <div class="label-item"><span>میزان تزریق:</span><strong><bdi>${cleanResultText}</bdi></strong></div>
                        <div class="label-item"><span>دوز تجویزی:</span><strong><bdi>${fullPrescribedDose}</bdi></strong></div>
                        <div class="label-item"><span>نام بیمار:</span><strong>${labelData.patientName}</strong></div>
                        <div class="label-item"><span>پرستار:</span><strong>${labelData.nurseName}</strong></div>
                    </div>
                    <div class="label-footer">
                        <span>تاریخ و ساعت: <bdi>${printDateTime}</bdi></span>
                    </div>`;
            }
            printContent.appendChild(slotContent);
        }
        
        document.body.appendChild(printContent);
        document.body.classList.add('printing-a4-layout');
        
        window.print();
        
        setTimeout(() => {
            if (document.body.contains(printContent)) {
                document.body.removeChild(printContent);
            }
            document.body.classList.remove('printing-a4-layout');
        }, 500);
    }
    
    function calculatePercentageDrug() {
        const drugPercentageVal = parseFloat(drugPercentage.value), requiredDoseVal = parseFloat(requiredDose.value);
        if (isNaN(drugPercentageVal) || isNaN(requiredDoseVal)) { percentageDrugResult.innerText = "لطفاً تمام مقادیر را به درستی وارد کنید."; return; }
        if (drugPercentageVal <= 0 || requiredDoseVal <= 0) { percentageDrugResult.innerText = "مقادیر وارد شده باید مثبت باشند."; return; }
        const requiredDoseMg = requiredDoseUnit.value === 'g' ? requiredDoseVal * 1000 : requiredDoseVal, mlNeeded = (requiredDoseMg / (drugPercentageVal * 10));
        percentageDrugResult.innerText = `میلی‌لیتر مورد نیاز: ${formatNumber(mlNeeded)} ml`;
    }

    function calculateFluid() {
        const fluidVolumeVal = parseFloat(fluidVolume.value), infusionTimeValueVal = parseFloat(infusionTimeValue.value);
        if (isNaN(fluidVolumeVal) || isNaN(infusionTimeValueVal)) { fluidResult.innerText = "لطفاً حجم و زمان را وارد کنید."; return; }
        if (fluidVolumeVal <= 0 || infusionTimeValueVal <= 0) { fluidResult.innerText = "مقادیر حجم و زمان باید مثبت باشند."; return; }
        const totalMinutes = infusionTimeUnit.value === 'hours' ? infusionTimeValueVal * 60 : infusionTimeValueVal, dropsPerMinute = (fluidVolumeVal * parseFloat(dripSet.value)) / totalMinutes;
        fluidResult.innerText = `قطرات بر دقیقه: ${formatNumber(dropsPerMinute)} gtt/min`;
    }

    function calculateMicroset() {
        const microsetVolumeVal = parseFloat(microsetVolume.value), microsetInfusionTimeValueVal = parseFloat(microsetInfusionTimeValue.value);
        if (isNaN(microsetVolumeVal) || isNaN(microsetInfusionTimeValueVal)) { microsetResult.innerText = "لطفاً حجم و زمان را وارد کنید."; return; }
        if (microsetVolumeVal <= 0 || microsetInfusionTimeValueVal <= 0) { microsetResult.innerText = "مقادیر حجم و زمان باید مثبت باشند."; return; }
        const totalMinutes = microsetInfusionTimeUnit.value === 'hours' ? microsetInfusionTimeValueVal * 60 : microsetInfusionTimeValueVal, dropsPerMinute = (microsetVolumeVal * 60) / totalMinutes;
        microsetResult.innerText = `قطرات بر دقیقه: ${formatNumber(dropsPerMinute)} gtt/min`;
    }

    function calculateReplacement() {
        const C_currentVal = parseFloat(currentConc.value), C_desiredVal = parseFloat(desiredConc.value), C_stockVal = parseFloat(stockConc.value), V_totalVal = parseFloat(totalVolume.value), V_infusionVal = parseFloat(infusionVolume.value);
        
        // --- Error Checks ---
        if (isNaN(C_currentVal) || isNaN(C_desiredVal) || isNaN(C_stockVal) || isNaN(V_totalVal)) { 
            conversionResult.innerHTML = `<div class="result error">لطفاً تمام مقادیر غلظت و حجم محلول موجود را وارد کنید.</div>`; 
            return; 
        }
        if (C_currentVal < 0 || C_desiredVal <= 0 || C_stockVal <= 0 || V_totalVal <= 0) { 
            conversionResult.innerHTML = `<div class="result error">تمام مقادیر باید مثبت باشند (غلظت فعلی می‌تواند صفر باشد).</div>`; 
            return; 
        }
        if (C_stockVal === C_currentVal) { 
            conversionResult.innerHTML = `<div class="result error">غلظت محلول غلیظ نمی‌تواند با غلظت فعلی یکسان باشد.</div>`; 
            return; 
        }
        if (C_desiredVal <= C_currentVal || C_desiredVal >= C_stockVal) { 
            conversionResult.innerHTML = `<div class="result error">غلظت مورد نیاز باید بین غلظت فعلی (${formatNumber(C_currentVal)}%) و غلظت محلول غلیظ (${formatNumber(C_stockVal)}%) باشد.</div>`; 
            return; 
        }

        // --- Core Calculation: Alligation Ratio (R) ---
        // Ratio R = (C_desired - C_current) / (C_stock - C_current)
        const R = (C_desiredVal - C_currentVal) / (C_stockVal - C_currentVal);

        let resultHTML = `<div class="conversion-guide" style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; background-color: #f9f9f9; text-align: right;">
                          <p style="font-weight: bold; font-size: 1.1em; color: #34495E; margin-bottom: 10px;">✅ غلظت مورد نظر شما: ${formatNumber(C_desiredVal)}%</p>
                          <hr style="border: 0; border-top: 1px dashed #ccc; margin: 10px 0;">`;
        
        
        // --- METHOD SELECTION ---
        if (!isNaN(V_infusionVal) && V_infusionVal > 0) {
            
            // Method B: Direct Preparation for Infusion Volume (Best for patient use)
            if (V_infusionVal > V_totalVal) {
                 conversionResult.innerHTML = `<div class="result error">حجم مورد نیاز انفوزیون (${formatNumber(V_infusionVal)} ml) نمی‌تواند از حجم محلول رقیق‌تر موجود (${formatNumber(V_totalVal)} ml) بیشتر باشد.</div>`; 
                return;
            }
            
            // V_stock_infusion = V_infusion * R
            const V_stock_infusion = V_infusionVal * R;
            const V_current_infusion = V_infusionVal - V_stock_infusion;

            // Updated title and removed ** from percentages
            resultHTML += `<p style="font-weight: bold; font-size: 1.05em; color: #16A085; margin-top: 15px;">🌟 نحوه تهیه ${formatNumber(V_infusionVal)} ml از غلظت ${formatNumber(C_desiredVal)}%</p>`;
            resultHTML += `<ol style="text-align: right; margin-top: 10px; padding-right: 25px; font-size: 0.95em; line-height: 1.8;">
                            <li style="color: #2980B9;">${formatNumber(V_stock_infusion)} ml از محلول غلیظ ${formatNumber(C_stockVal)}% بردارید.</li>
                            <li style="color: #2980B9;">${formatNumber(V_current_infusion)} ml از محلول رقیق ${formatNumber(C_currentVal)}% (محلول موجود) بردارید.</li>
                            <li style="color: #2C3E50; font-weight: bold; margin-top: 10px;">👈 این دو حجم را با هم ترکیب کنید تا ${formatNumber(V_infusionVal)} ml از غلظت ${formatNumber(C_desiredVal)}% حاصل شود.</li>
                           </ol>`;
        } else {
            // Method A: Replacement for Total Volume (Default if no specific infusion volume is requested)
            // V_replace = V_total * R
            const V_replace = V_totalVal * R;

            // Removed ** from volume and percentages
            resultHTML += `<p style="font-weight: bold; font-size: 1.05em; color: #E67E22; margin-top: 15px;">🔄 روش (الف): تغییر غلظت کل محلول موجود (${formatNumber(V_totalVal)} ml)</p>`;
            resultHTML += `<p style="margin-top: 10px; font-size: 1em;">حجم مورد نیاز برای جایگزینی: ${formatNumber(V_replace)} ml</p>
                            <ol style="text-align: right; margin-top: 10px; padding-right: 25px; font-size: 0.95em; line-height: 1.8;">
                                <li style="color: #C0392B;">${formatNumber(V_replace)} ml از محلول ${formatNumber(C_currentVal)}% (محلول موجود) خارج کنید (دور بریزید).</li>
                                <li style="color: #27AE60;">${formatNumber(V_replace)} ml از محلول غلیظ ${formatNumber(C_stockVal)}% به آن اضافه کنید.</li>
                                <li style="color: #2C3E50; font-weight: bold; margin-top: 10px;">👈 غلظت کل محلول ${formatNumber(V_totalVal)} ml به ${formatNumber(C_desiredVal)}% تغییر می‌کند.</li>
                            </ol>`;
        }
        
        resultHTML += `</div>`; // Close the conversion-guide div
        
        conversionResult.innerHTML = resultHTML;
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
    
    function updateConcentrationOptions() {
        if (!compoundSelect) return;
        const compoundValue = compoundSelect.value;
        concentrationSelect.innerHTML = "";
        if (!compoundValue) { concentrationSelect.innerHTML = '<option value="">ابتدا ترکیب را انتخاب کنید</option>'; return; }
        const compoundName = compoundValue.split(",")[2], options = concentrationData[compoundName];
        if (options) { for (const [text, value] of Object.entries(options)) { const option = document.createElement("option"); option.value = value; option.textContent = text; concentrationSelect.appendChild(option); } }
    }

    function calculateMgFromMEq() {
    const compoundSelect = document.getElementById("compound");
    const concentrationSelect = document.getElementById("concentration");
    const mEqInput = document.getElementById("mEq");
    const mEqToMgResult = document.getElementById("mEqToMgResult");

    if (!compoundSelect || !concentrationSelect || !mEqInput || !mEqToMgResult) return;

    const compoundValue = compoundSelect.value;
    const concentrationValue = concentrationSelect.value;
    const mEqVal = parseFloat(mEqInput.value);

    // اعتبارسنجی
    if (!compoundValue) {
        mEqToMgResult.innerHTML = '<div class="error">لطفاً ترکیب دارویی را انتخاب کنید!</div>';
        return;
    }
    if (!concentrationValue) {
        mEqToMgResult.innerHTML = '<div class="error">لطفاً غلظت محلول را انتخاب کنید!</div>';
        return;
    }
    if (isNaN(mEqVal) || mEqVal <= 0) {
        mEqToMgResult.innerHTML = '<div class="error">لطفاً مقدار mEq را به درستی وارد کنید!</div>';
        return;
    }

    // محاسبات
    const [molarMass, valence, compoundName] = compoundValue.split(",");
    const mg = (mEqVal * (parseFloat(molarMass) / parseInt(valence)));
    const ml = (mEqVal / parseFloat(concentrationValue));

    const selectedConcentrationText = concentrationSelect.options[concentrationSelect.selectedIndex].text;

    const resultHTML = `
        <div class="conversion-result">
            <div class="conversion-line">
                <span class="conversion-value">${formatNumber(mEqVal)}</span><span class="conversion-unit">mEq</span>
                <span class="conversion-equals">=</span>
                <span class="conversion-value">${formatNumber(mg)}</span><span class="conversion-unit">mg</span>
            </div>
            <div class="conversion-line">
                <span class="conversion-value">${formatNumber(ml)}</span><span class="conversion-unit">ml</span>
                <span class="conversion-unit">(${getPersianName(compoundName)} ${selectedConcentrationText})</span>
            </div>
        </div>`;
    mEqToMgResult.innerHTML = resultHTML;
}

    // ==================== GIR ADVANCED FUNCTIONS ====================

    function getSafeGIRRange(patientGroup, gestationalAge = null) {
        const ranges = {
            'preterm-very-low': { min: 4, max: 6, start: 4, maxDailyIncrease: 2 },
            'preterm-low': { min: 4, max: 8, start: 5, maxDailyIncrease: 2.5 },
            'preterm': { min: 4, max: 8, start: 6, maxDailyIncrease: 3 },
            'term': { min: 4, max: 8, start: 6, maxDailyIncrease: 4 },
            'infant': { min: 4, max: 8, start: 6, maxDailyIncrease: 5 },
            'child': { min: 3, max: 6, start: 4, maxDailyIncrease: 5 },
            'adolescent': { min: 2, max: 5, start: 3, maxDailyIncrease: 5 }
        };
        
        let range = ranges[patientGroup] || ranges.child;
        
        if (gestationalAge && patientGroup.includes('preterm')) {
            if (gestationalAge < 28) {
                range = { min: 3, max: 5, start: 3, maxDailyIncrease: 1.5 };
            } else if (gestationalAge < 32) {
                range = { min: 4, max: 6, start: 4, maxDailyIncrease: 2 };
            }
        }
        
        return range;
    }

    function getGlucoseThresholds(patientGroup) {
        const thresholds = {
            'preterm-very-low': { hypo: 45, targetMin: 50, targetMax: 120, hyper: 150, criticalHyper: 180 },
            'preterm-low': { hypo: 45, targetMin: 50, targetMax: 120, hyper: 150, criticalHyper: 180 },
            'preterm': { hypo: 45, targetMin: 60, targetMax: 120, hyper: 150, criticalHyper: 180 },
            'term': { hypo: 50, targetMin: 70, targetMax: 120, hyper: 150, criticalHyper: 180 },
            'infant': { hypo: 60, targetMin: 70, targetMax: 120, hyper: 150, criticalHyper: 180 },
            'child': { hypo: 70, targetMin: 80, targetMax: 140, hyper: 180, criticalHyper: 200 },
            'adolescent': { hypo: 70, targetMin: 80, targetMax: 140, hyper: 180, criticalHyper: 200 }
        };
        
        return thresholds[patientGroup] || thresholds.child;
    }

    function calculateMaintenanceFluid(weight, patientGroup) {
        if (weight <= 10) return weight * 100;
        if (weight <= 20) return 1000 + (weight - 10) * 50;
        return 1500 + (weight - 20) * 20;
    }

    function getBGColorClass(bg, thresholds) {
        if (bg < thresholds.hypo) return 'critical-low';
        if (bg < thresholds.targetMin) return 'low';
        if (bg > thresholds.criticalHyper) return 'critical-high';
        if (bg > thresholds.hyper) return 'high';
        return 'normal';
    }

    function getDoseAdjustmentSuggestions(currentBG, currentGIR, targetGIR, thresholds, trend, safeRange) {
        let suggestions = '<div class="suggestions-container"><h5>💡 پیشنهادات اصلاح دوز:</h5>';

        // فقط اگر قند خون وارد شده و عدد معتبر هست
        if (currentBG !== null && !isNaN(currentBG) && currentBG > 0) {
            if (currentBG < thresholds.hypo) {
                const emergencyGIR = Math.min(safeRange.max, currentGIR + 2);
                suggestions += `
                    <div class="suggestion critical">
                        <strong>🔴 هیپوگلیسمی بحرانی!</strong>
                        <ul>
                            <li>بولوس دکستروز 10%: 2 ml/kg</li>
                            <li>افزایش فوری GIR به ${emergencyGIR} mg/kg/min</li>
                            <li>پایش قند خون هر 30 دقیقه</li>
                            <li>مشاوره فوری با پزشک</li>
                        </ul>
                    </div>
                `;
            } else if (currentBG < thresholds.targetMin) {
                const adjustedGIR = Math.min(safeRange.max, currentGIR + 1);
                suggestions += `
                    <div class="suggestion warning">
                        <strong>🟡 قند خون پایین</strong>
                        <ul>
                            <li>افزایش GIR به ${adjustedGIR} mg/kg/min</li>
                            <li>پایش قند خون هر 1-2 ساعت</li>
                        </ul>
                    </div>
                `;
            } else if (currentBG > thresholds.criticalHyper) {
                suggestions += `
                    <div class="suggestion critical">
                        <strong>🔴 هایپرگلیسمی بحرانی!</strong>
                        <ul>
                            <li>کاهش GIR به ${safeRange.min} mg/kg/min</li>
                            <li>در نظر گرفتن انسولین</li>
                            <li>مشاوره فوری با پزشک</li>
                        </ul>
                    </div>
                `;
            } else if (currentBG > thresholds.hyper) {
                const adjustedGIR = Math.max(safeRange.min, currentGIR - 1);
                suggestions += `
                    <div class="suggestion warning">
                        <strong>🟠 قند خون بالا</strong>
                        <ul>
                            <li>کاهش GIR به ${adjustedGIR} mg/kg/min</li>
                            <li>پایش قند خون هر 2-4 ساعت</li>
                        </ul>
                    </div>
                `;
            } else {
                suggestions += `
                    <div class="suggestion success">
                        <strong>✅ قند خون در محدوده هدف</strong>
                        <p>پایش منظم ادامه یابد.</p>
                    </div>
                `;
            }

            if (trend === 'falling' && currentBG < thresholds.targetMin) {
                suggestions += `<div class="suggestion info">📉 روند کاهشی: افزایش محافظه‌کارانه GIR پیشنهاد می‌شود.</div>`;
            } else if (trend === 'rising' && currentBG > thresholds.targetMax) {
                suggestions += `<div class="suggestion info">📈 روند افزایشی: کاهش پیشگیرانه GIR پیشنهاد می‌شود.</div>`;
            }
        } else {
            // اگر قند خون وارد نشده
            suggestions += `
                <div class="suggestion info">
                    <strong>📋 وضعیت GIR:</strong>
                    <p>GIR هدف: ${formatNumber(targetGIR)} mg/kg/min</p>
                    <p>محدوده ایمن: ${safeRange.min}-${safeRange.max} mg/kg/min</p>
                    <p>💡 برای پیشنهادات دقیق‌تر، لطفاً قند خون فعلی را وارد کنید.</p>
                </div>
            `;
        }

        suggestions += '</div>';
        return suggestions;
    }

    function showQuickCalculations(weight, concentration, safeRange) {
        const commonGIRs = [safeRange.start, safeRange.min, safeRange.max];
        const mgPerMl = concentration * 10;
        
        let quickHTML = '';
        
        commonGIRs.forEach(gir => {
            const rate = (gir * weight * 60) / mgPerMl;
            quickHTML += `
                <div class="quick-result-item">
                    <span class="gir-value">GIR ${formatNumber(gir)} mg/kg/min</span>
                    <span class="rate-value">→ ${formatNumber(rate)} ml/hr</span>
                </div>
            `;
        });

        document.getElementById('gir-quick-results').innerHTML = quickHTML;
        document.getElementById('gir-quick-calculations').style.display = 'block';
    }

    function showGirError(message) {
        girResult.innerHTML = `<div class="error-message">${message}</div>`;
        girResult.style.display = 'block';
    }

    function calculateGIR() {
        console.log('calculateGIR function called!');
        
        // پاک کردن نتایج قبلی
        girResult.innerHTML = '';
        girWarning.style.display = 'none';
        girSafetyAlert.style.display = 'none';
        document.getElementById('gir-quick-calculations').style.display = 'none';

        // دریافت مقادیر ورودی
        const weightVal = parseFloat(girWeight.value);
        const targetGirVal = parseFloat(girGlucoseRate.value);
        const concentrationVal = parseFloat(girConcentrationInput.value);
        const patientGroup = girPatientGroup.value;
        const currentBGVal = girCurrentBG.value.trim() === '' ? null : parseFloat(girCurrentBG.value);
        const currentRateVal = girCurrentRate.value.trim() === '' ? null : parseFloat(girCurrentRate.value);
        const gestationalAge = girGestationalAge.value.trim() === '' ? null : parseFloat(girGestationalAge.value);
        const trend = girTrend.value;

        console.log('Input values:', { weightVal, targetGirVal, concentrationVal, patientGroup, currentBGVal, currentRateVal, gestationalAge, trend });

        // اعتبارسنجی ورودی‌های اصلی
        if (isNaN(weightVal) || isNaN(targetGirVal) || isNaN(concentrationVal)) {
            showGirError('لطفاً وزن، GIR هدف و غلظت را وارد کنید.');
            return;
        }

        if (weightVal <= 0 || targetGirVal <= 0 || concentrationVal <= 0) {
            showGirError('تمام مقادیر اصلی باید مثبت باشند.');
            return;
        }

        // محاسبات اصلی
        const mgPerMl = concentrationVal * 10;
        const targetRate = (targetGirVal * weightVal * 60) / mgPerMl;
        const maintenanceFluid = calculateMaintenanceFluid(weightVal, patientGroup);

        // بررسی محدوده ایمن
        const safeRange = getSafeGIRRange(patientGroup, gestationalAge);
        const thresholds = getGlucoseThresholds(patientGroup);

        let resultHTML = '';
        let alerts = [];

        // 1. محاسبه نرخ تزریق هدف
        resultHTML += `
            <div class="result-section">
                <h4>🎯 نتایج محاسبه اصلی</h4>
                <div class="result-item">
                    <span class="result-label">نرخ تزریق هدف:</span>
                    <span class="result-value highlight">${formatNumber(targetRate)} ml/hr</span>
                </div>
                <div class="result-item">
                    <span class="result-label">با دکستروز:</span>
                    <span class="result-value">D${formatNumber(concentrationVal)}%</span>
                </div>
                <div class="result-item">
                    <span class="result-label">مایع نگهدارنده مورد نیاز:</span>
                    <span class="result-value">${formatNumber(maintenanceFluid)} ml/day</span>
                </div>
            </div>
        `;

        // 2. بررسی ایمنی GIR
        if (targetGirVal < safeRange.min) {
            alerts.push({
                type: 'warning',
                message: `GIR هدف (${formatNumber(targetGirVal)}) کمتر از حداقل توصیه شده (${safeRange.min} mg/kg/min) است.`
            });
        } else if (targetGirVal > safeRange.max) {
            alerts.push({
                type: 'danger',
                message: `⚠️ GIR هدف (${formatNumber(targetGirVal)}) بیشتر از حداکثر ایمن (${safeRange.max} mg/kg/min) است!`
            });
        } else {
            alerts.push({
                type: 'success',
                message: `✅ GIR هدف در محدوده ایمن (${safeRange.min}-${safeRange.max} mg/kg/min) قرار دارد.`
            });
        }

        // 3. بررسی حجم تزریق
        const maxSafeRate = maintenanceFluid / 24;
        if (targetRate > maxSafeRate * 1.2) {
            alerts.push({
                type: 'warning',
                message: `نرخ تزریق (${formatNumber(targetRate)} ml/hr) بالاتر از حجم ایمن است. پیشنهاد: افزایش غلظت دکستروز.`
            });
        }

        // 4. مانیتورینگ و اصلاح بر اساس قند خون
        if (currentBGVal !== null && !isNaN(currentBGVal) && currentRateVal !== null && !isNaN(currentRateVal)) {
            const currentGir = (currentRateVal * concentrationVal * 10) / (weightVal * 60);
            
            resultHTML += `
                <div class="result-section">
                    <h4>📊 وضعیت فعلی</h4>
                    <div class="result-item">
                        <span class="result-label">GIR فعلی:</span>
                        <span class="result-value">${formatNumber(currentGir)} mg/kg/min</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">قند خون:</span>
                        <span class="result-value ${getBGColorClass(currentBGVal, thresholds)}">${formatNumber(currentBGVal)} mg/dL</span>
                    </div>
            `;

            const suggestions = getDoseAdjustmentSuggestions(currentBGVal, currentGir, targetGirVal, thresholds, trend, safeRange);
            resultHTML += suggestions;
            
            resultHTML += `</div>`;
        } else if (currentBGVal !== null && !isNaN(currentBGVal)) {
            // فقط قند خون وارد شده
            resultHTML += `
                <div class="result-section">
                    <h4>📊 وضعیت فعلی</h4>
                    <div class="result-item">
                        <span class="result-label">قند خون:</span>
                        <span class="result-value ${getBGColorClass(currentBGVal, thresholds)}">${formatNumber(currentBGVal)} mg/dL</span>
                    </div>
            `;

            const suggestions = getDoseAdjustmentSuggestions(currentBGVal, targetGirVal, targetGirVal, thresholds, trend, safeRange);
            resultHTML += suggestions;
            
            resultHTML += `</div>`;
        }

        // 5. نمایش هشدارها
        if (alerts.length > 0) {
            let alertHTML = '<div class="alerts-container">';
            alerts.forEach(alert => {
                alertHTML += `<div class="alert alert-${alert.type}">${alert.message}</div>`;
            });
            alertHTML += '</div>';
            girSafetyAlert.innerHTML = alertHTML;
            girSafetyAlert.style.display = 'block';
        }

        // 6. محاسبات سریع برای GIRهای مختلف
        showQuickCalculations(weightVal, concentrationVal, safeRange);

        girResult.innerHTML = resultHTML;
        girResult.style.display = 'block';
        
        console.log('GIR calculation completed!');
    }

    function setGirConcentration(conc, element) {
        if (girConcentrationInput) girConcentrationInput.value = conc;
        document.querySelectorAll('.quick-link').forEach(btn => btn.classList.remove('active'));
        if (element) element.classList.add('active');
        checkConcentrationWarning();
    }

    function setQuickGIR(girValue, element) {
        if (girGlucoseRate) girGlucoseRate.value = girValue;
        document.querySelectorAll('.quick-gir').forEach(btn => btn.classList.remove('active'));
        if (element) element.classList.add('active');
    }

    function checkConcentrationWarning() {
        if (!girWarning) return;
        const concentration = parseFloat(girConcentrationInput.value);
        let message = '';
        if (concentration > 25) { 
            message = '⚠️ هشدار: غلظت های بالای D25W فقط از راه کاتتر مرکزی و با دستور مستقیم پزشک قابل تزریق هستند.'; 
        } else if (concentration > 12.5) { 
            message = 'توجه: غلظت های بین D12.5W تا D25W نیاز به خط وریدی مناسب دارند.'; 
        } else if (concentration < 5) { 
            message = 'توجه: غلظت های زیر D5W ممکن است حجم تزریق بالایی نیاز داشته باشند.'; 
        }
        girWarning.textContent = message;
        girWarning.style.display = message ? 'block' : 'none';
    }

    // ==================== END GIR ADVANCED FUNCTIONS ====================

    function adjustTimeInput(unitElement, timeInputElement) {
        if (!unitElement || !timeInputElement) return;
        const isMinutes = unitElement.value === 'minutes';
        timeInputElement.step = isMinutes ? '1' : '0.1';
        timeInputElement.min = isMinutes ? '1' : '0.1';
        timeInputElement.placeholder = isMinutes ? 'مثال: 30' : 'مثال: 1.5';
    }

    function toggleWeightInput() {
        if (weightInputBox && prescribedDoseUnit) {
            const unit = prescribedDoseUnit.value;
            const isWeightBased = unit.includes('/kg/');
            weightInputBox.style.display = isWeightBased ? 'block' : 'none';
        }
    }

    function handleIconErrors() {
        if (customIcons) {
            customIcons.forEach(icon => {
                icon.onerror = function() {
                    this.style.display = 'none';
                    const replacement = document.createElement('i'), altText = this.alt;
                    let iconClass = 'fas fa-question-circle';
                    if (altText.includes('پمپ')) iconClass = 'fas fa-tachometer-alt';
                    else if (altText.includes('ویال')) iconClass = 'fas fa-prescription-bottle-alt';
                    else if (altText.includes('سرم')) iconClass = 'fas fa-tint';
                    else if (altText.includes('میکروست')) iconClass = 'fas fa-tint-slash';
                    else if (altText.includes('اطفال')) iconClass = 'fas fa-baby';
                    else if (altText.includes('تبدیل') || altText.includes('غلظت')) iconClass = 'fas fa-exchange-alt';
                    else if (altText.includes('MDCalc')) iconClass = 'fas fa-calculator';
                    else if (altText.includes('GIR')) iconClass = 'fas fa-tint';
                    replacement.className = iconClass;
                    Object.assign(replacement.style, { fontSize: '40px', marginBottom: '15px', color: '#2c3e50', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' });
                    this.parentNode.insertBefore(replacement, this);
                    this.remove();
                };
            });
        }
    }

    function updateDateTime() {
        if (datetimeElement) {
            const now = new Date(), options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
            datetimeElement.innerText = now.toLocaleDateString('fa-IR', options);
        }
    }

    function switchTab(tabId) {
        if (installModal) {
            const currentModalTabs = installModal.querySelectorAll('.modal-tab-btn');
            const currentModalTabContents = installModal.querySelectorAll('.modal-tab-content');
            currentModalTabContents.forEach(content => content.classList.remove('active'));
            currentModalTabs.forEach(tab => tab.classList.remove('active'));
            installModal.querySelector(`#tab-${tabId}`)?.classList.add('active');
            installModal.querySelector(`.modal-tab-btn[data-tab="${tabId}"]`)?.classList.add('active');
        }
    }

    function showPromoModal() {
        if (promoOverlay) {
            const promoImg = promoOverlay.querySelector('#promo-modal img');
            if (promoImg && promoImg.getAttribute('src') && promoImg.getAttribute('src').trim() !== '') {
                promoOverlay.classList.add('visible');
            }
        }
    }

    function hidePromoModal() {
        if (promoOverlay) {
            promoOverlay.classList.remove('visible');
        }
    }

    // Event Listeners
    if(openPrintSheetBtn) openPrintSheetBtn.addEventListener('click', openPrintSheet);
    if(closePrintSheetModalBtn) closePrintSheetModalBtn.addEventListener('click', closePrintSheet);
    if(clearA4SheetBtn) clearA4SheetBtn.addEventListener('click', () => {
        if (confirm('آیا مطمئن هستید که می‌خواهید کل برگه و لیست انتظار را پاک کنید؟')) {
            waitingLabelsQueue = [];
            placedLabels = {};
            updatePrintQueueBadge();
            renderA4Sheet();
            renderWaitingLabels();
        }
    });
    if(printA4SheetBtn) printA4SheetBtn.addEventListener('click', handleA4SheetPrint);

    if(a4SheetPreview) a4SheetPreview.addEventListener('click', e => {
        const slot = e.target.closest('.label-slot');
        if (!slot) return;
        
        const slotIdNumber = slot.dataset.slotId;
        const slotId = `slot-${slotIdNumber}`;

        if (slot.classList.contains('empty')) {
            if (waitingLabelsQueue.length > 0) {
                const labelToPlace = waitingLabelsQueue.shift();
                placedLabels[slotId] = labelToPlace;
                renderA4Sheet();
                renderWaitingLabels();
                updatePrintQueueBadge();
            } else {
                alert('لیبلی در لیست انتظار برای جایگذاری وجود ندارد.');
            }
        } else if (e.target.classList.contains('remove-label-btn')) {
            const labelToRemove = placedLabels[slotId];
            delete placedLabels[slotId];
            waitingLabelsQueue.unshift(labelToRemove);
            renderA4Sheet();
            renderWaitingLabels();
            updatePrintQueueBadge();
        }
    });

    if(waitingLabelsList) waitingLabelsList.addEventListener('click', e => {
        if (e.target.classList.contains('remove-waiting-label-btn')) {
            const labelId = parseInt(e.target.dataset.labelId, 10);
            waitingLabelsQueue = waitingLabelsQueue.filter(label => label.id !== labelId);
            renderWaitingLabels();
            updatePrintQueueBadge();
        }
    });
    
    if (showInstallGuideBtn && installModal) {
        showInstallGuideBtn.addEventListener('click', (e) => {
            e.preventDefault();
            installModal.classList.add('visible');
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            if (/android/i.test(userAgent)) { switchTab('android'); }
            else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) { switchTab('ios'); }
            else { switchTab('windows'); }
        });
    }
    if (closeModalBtn) { closeModalBtn.addEventListener('click', () => installModal.classList.remove('visible')); }
    if (installModal) { installModal.addEventListener('click', (e) => { if (e.target === installModal) { installModal.classList.remove('visible'); } }); }
    
    if (modalTabs) {
        modalTabs.forEach(tab => { tab.addEventListener('click', () => switchTab(tab.dataset.tab)); });
    }

    if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);
    if (navbarAppIcon) { navbarAppIcon.addEventListener('click', () => { window.location.reload(); }); }
    
    if (pwaInstallLinkInMenu) {
        pwaInstallLinkInMenu.addEventListener('click', (e) => {
            e.preventDefault();
            promptInstall();
        });
    }

    if (boxesContainer) {
        boxesContainer.addEventListener('click', function(e) {
            const header = e.target.closest('.box-header');
            const closeButton = e.target.closest('.close-btn');
            if (closeButton) {
                closeBox(closeButton.closest('.box'));
                return;
            }
            if (header) {
                const box = header.parentElement;
                if (box.getAttribute('data-link')) {
                    window.open(box.getAttribute('data-link'), '_blank');
                    return;
                }
                const isActive = box.classList.contains('active');
                document.querySelectorAll('.box.active').forEach(activeBox => {
                    if (activeBox !== box) closeBox(activeBox);
                });
                if (!isActive) openBox(box);
                else closeBox(box);
            }
        });
    }
    
    // Calculator Event Listeners
    document.getElementById('calculateDrugBtn')?.addEventListener('click', calculateDrug);
    document.getElementById('saveLabelBtn')?.addEventListener('click', handleSaveLabel);
    document.getElementById('calculatePercentageDrugBtn')?.addEventListener('click', calculatePercentageDrug);
    document.getElementById('calculateFluidBtn')?.addEventListener('click', calculateFluid);
    document.getElementById('calculateMicrosetBtn')?.addEventListener('click', calculateMicroset);
    document.getElementById('calculateReplacementBtn')?.addEventListener('click', calculateReplacement);
    document.getElementById('calculateMgFromMEqBtn')?.addEventListener('click', calculateMgFromMEq);
    document.getElementById('calculateGirBtn')?.addEventListener('click', calculateGIR);
    

    // GIR Event Listeners
    const quickGirButtons = document.querySelectorAll('.quick-gir');
    quickGirButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const girValue = parseFloat(this.getAttribute('data-gir'));
            setQuickGIR(girValue, this);
        });
    });

    // Auto-fill gestational age based on patient group
    if (girPatientGroup && girGestationalAge) {
        girPatientGroup.addEventListener('change', function() {
            const group = this.value;
            if (group.includes('preterm')) {
                girGestationalAge.placeholder = "ضروری برای نوزاد نارس";
            } else {
                girGestationalAge.placeholder = "اختیاری";
            }
        });
    }

    if (prescribedDoseUnit) prescribedDoseUnit.addEventListener('change', toggleWeightInput);
    if (infusionTimeUnit) infusionTimeUnit.addEventListener('change', () => adjustTimeInput(infusionTimeUnit, infusionTimeValue));
    if (microsetInfusionTimeUnit) microsetInfusionTimeUnit.addEventListener('change', () => adjustTimeInput(microsetInfusionTimeUnit, microsetInfusionTimeValue));
    if (compoundSelect) compoundSelect.addEventListener('change', updateConcentrationOptions);
    if (girConcentrationInput) girConcentrationInput.addEventListener('change', checkConcentrationWarning);
    if (girQuickLinksContainer) {
        girQuickLinksContainer.addEventListener('click', (e) => {
            if (e.target.matches('.quick-link')) {
                const concentration = e.target.getAttribute('data-concentration');
                setGirConcentration(concentration, e.target);
            }
        });
    }

    if (closePromoBtn) {
        closePromoBtn.addEventListener('click', hidePromoModal);
    }
    if (promoOverlay) {
        promoOverlay.addEventListener('click', (e) => {
            if (e.target === promoOverlay) {
                hidePromoModal();
            }
        });
    }
    
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeToggleCheckbox) themeToggleCheckbox.checked = true;
        } else {
            document.body.classList.remove('dark-mode');
            if (themeToggleCheckbox) themeToggleCheckbox.checked = false;
        }
    };
    
    const toggleTheme = () => {
        if (!themeToggleCheckbox) return;
        const isDarkMode = themeToggleCheckbox.checked;
        const newTheme = isDarkMode ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    if (themeToggleCheckbox) {
        themeToggleCheckbox.addEventListener('change', toggleTheme);
    }
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }
    }
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    updateDateTime();
    setInterval(updateDateTime, 1000);
    toggleWeightInput();
    adjustTimeInput(infusionTimeUnit, infusionTimeValue);
    adjustTimeInput(microsetInfusionTimeUnit, microsetInfusionTimeValue);
    handleIconErrors();
    updatePrintQueueBadge();

    if (!sessionStorage.getItem('promoShown')) {
        setTimeout(() => {
            showPromoModal();
            sessionStorage.setItem('promoShown', 'true');
        }, 1000);
    }
});


// ==================== MODERN PEDIATRIC CALCULATOR ==================== //

// تعریف drugDatabase به صورت global
let drugDatabase;


function initializeModernPediatricCalculator() {
    console.log('Initializing pediatric calculator...');
    
    // Elements
    const weightInput = document.getElementById('pediatric-weight');
    const ageInput = document.getElementById('pediatric-age');
    const calculationResult = document.getElementById('calculation-result');
    
    if (!weightInput || !ageInput) {
        console.log('Pediatric calculator elements not found');
        return;
    }

    console.log('Pediatric calculator elements found');

    // محدودیت‌های اعتبارسنجی
    const MAX_AGE = 18;
    const MAX_WEIGHT = 150; // کیلوگرم
    const MIN_AGE = 0.1; // 1 ماه
    const MIN_WEIGHT = 0.5; // 500 گرم

    // Weight prediction formula - فرمول استاندارد برای محاسبات دارویی
function predictWeightFromAge(age) {
    if (age <= 1) {
        // نوزادان تا 1 سال: به 10 کیلوگرم برسد
        return (age * 6.5 + 3.5).toFixed(1);
    } else if (age <= 10) {
        // از 1 تا 10 سال: هر سال 2 کیلوگرم اضافه شود
        return (10 + (age - 1) * 2).toFixed(1);
    } else {
        // بالای 10 سال: (2.5kg × age) + 10
        return (age * 2.5 + 10).toFixed(1);
    }
}
    // اعتبارسنجی سن
    function validateAge(age) {
        if (age < MIN_AGE) {
            return { isValid: false, message: `سن نمی‌تواند کمتر از ${MIN_AGE} سال باشد` };
        }
        if (age > MAX_AGE) {
            return { isValid: false, message: `سن نمی‌تواند بیشتر از ${MAX_AGE} سال باشد` };
        }
        return { isValid: true, message: '' };
    }

    // اعتبارسنجی وزن
    function validateWeight(weight) {
        if (weight < MIN_WEIGHT) {
            return { isValid: false, message: `وزن نمی‌تواند کمتر از ${MIN_WEIGHT} کیلوگرم باشد` };
        }
        if (weight > MAX_WEIGHT) {
            return { isValid: false, message: `وزن نمی‌تواند بیشتر از ${MAX_WEIGHT} کیلوگرم باشد` };
        }
        return { isValid: true, message: '' };
    }

    // اعمال استایل خطا
    function showError(input, message) {
        input.style.borderColor = '#dc2626';
        input.style.backgroundColor = '#fef2f2';
        
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        if (message) {
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = '#dc2626';
            errorElement.style.fontSize = '12px';
            errorElement.style.marginTop = '5px';
            errorElement.style.textAlign = 'right';
            errorElement.textContent = message;
            input.parentNode.appendChild(errorElement);
        }
    }

    // حذف استایل خطا
    function clearError(input) {
        input.style.borderColor = '';
        input.style.backgroundColor = '';
        
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    // نمایش وزن تخمینی به صورت متن زیر فیلد وزن
    function showWeightPrediction(age) {
        // حذف پیش‌بینی قبلی اگر وجود دارد
        const existingPrediction = weightInput.parentNode.querySelector('.weight-prediction-text');
        if (existingPrediction) {
            existingPrediction.remove();
        }
        
        if (age && age > 0 && age <= 10 && !weightInput.value) {
            const predicted = predictWeightFromAge(age);
            const predictionElement = document.createElement('div');
            predictionElement.className = 'weight-prediction-text';
            predictionElement.style.color = '#666';
            predictionElement.style.fontSize = '11px';
            predictionElement.style.marginTop = '4px';
            predictionElement.style.textAlign = 'right';
            predictionElement.style.fontStyle = 'italic';
            predictionElement.textContent = `→ وزن تخمینی: ${predicted} کیلوگرم`;
            weightInput.parentNode.appendChild(predictionElement);
        }
    }

    // محاسبات سایز لوله تراشه بر اساس رفرنس‌های استاندارد
    function calculateETTSize(age, weight) {
        if (!age && !weight) return '-';
        
        if (age && age > 0) {
            if (age < 1) {
                if (age < 0.25) return '3.0';
                if (age < 0.5) return '3.5';
                return '3.5-4.0';
            } else if (age <= 2) {
                return '4.0-4.5';
            } else if (age <= 4) {
                return '4.5-5.0';
            } else if (age <= 6) {
                return '5.0-5.5';
            } else if (age <= 8) {
                return '5.5-6.0';
            } else if (age <= 10) {
                return '6.0-6.5';
            } else if (age <= 12) {
                return '6.5-7.0';
            } else if (age <= 14) {
                return '7.0-7.5';
            } else {
                return '7.5-8.0';
            }
        } else if (weight && weight > 0) {
            if (weight < 1) return '2.5';
            if (weight < 2) return '3.0';
            if (weight < 5) return '3.5';
            if (weight < 10) return '4.0';
            if (weight < 15) return '4.5';
            if (weight < 20) return '5.0';
            if (weight < 25) return '5.5';
            if (weight < 30) return '6.0';
            if (weight < 35) return '6.5';
            if (weight < 40) return '7.0';
            if (weight < 50) return '7.5';
            return '8.0';
        }
        
        return '-';
    }

    // محاسبه عمق لوله تراشه بر اساس رفرنس
    function calculateETTDepth(age, weight) {
        if (!age && !weight) return '- cm';
        
        if (age && age > 0) {
            if (age < 1) {
                if (age < 0.25) return '9-10 cm';
                if (age < 0.5) return '10-11 cm';
                return '11-12 cm';
            } else if (age <= 2) {
                return '12-13 cm';
            } else if (age <= 4) {
                return '13-14 cm';
            } else if (age <= 6) {
                return '14-15 cm';
            } else if (age <= 8) {
                return '15-16 cm';
            } else if (age <= 10) {
                return '16-17 cm';
            } else if (age <= 12) {
                return '17-18 cm';
            } else if (age <= 14) {
                return '18-19 cm';
            } else {
                return '19-20 cm';
            }
        } else if (weight && weight > 0) {
            if (weight < 1) return '7-8 cm';
            if (weight < 2) return '8-9 cm';
            if (weight < 5) return '9-10 cm';
            if (weight < 10) return '10-12 cm';
            if (weight < 15) return '12-13 cm';
            if (weight < 20) return '13-14 cm';
            if (weight < 25) return '14-15 cm';
            if (weight < 30) return '15-16 cm';
            if (weight < 35) return '16-17 cm';
            if (weight < 40) return '17-18 cm';
            if (weight < 50) return '18-19 cm';
            return '19-20 cm';
        }
        
        return '- cm';
    }

    // تخمین سن از وزن
    function estimateAgeFromWeight(weight) {
        if (weight <= 10) return weight / 6;
        if (weight <= 20) return (weight - 8) / 2;
        if (weight <= 35) return (weight - 2) / 3.5;
        return (weight - 15) / 2.5;
    }

    // Drug database
    drugDatabase = {
        airway: [
            { 
                name: 'ett-size', 
                customCalc: (w, a) => calculateETTSize(a, w)
            },
            { 
                name: 'ett-depth', 
                customCalc: (w, a) => calculateETTDepth(a, w)
            },
            { 
                name: 'laryngoscopy-blade', 
                customCalc: (w, a) => {
                    const effectiveAge = a || (w ? estimateAgeFromWeight(w) : 0);
                    if (effectiveAge < 0.5) return 'Miller 0';
                    if (effectiveAge < 2) return 'Miller 1';
                    if (effectiveAge < 8) return 'Miller 1-2';
                    if (effectiveAge < 12) return 'Macintosh 2';
                    return 'Macintosh 3';
                }
            },
            { 
                name: 'lma-size', 
                customCalc: (w, a) => {
                    if (w < 5) return '1';
                    if (w < 10) return '1.5';
                    if (w < 20) return '2';
                    if (w < 30) return '2.5';
                    if (w < 50) return '3';
                    if (w < 70) return '4';
                    return '5';
                }
            },
            { 
                name: 'defibrillation-dose', 
                customCalc: (w) => {
                    const minDose = (w * 2).toFixed(0);
                    const maxDose = (w * 4).toFixed(0);
                    return `${minDose} to ${maxDose}J`;
                }
            },
            { 
                name: 'cardioversion-dose', 
                customCalc: (w) => {
                    const dose1 = (w * 0.5).toFixed(0);
                    const dose2 = (w * 1).toFixed(0);
                    const dose3 = (w * 2).toFixed(0);
                    return `${dose1}→${dose2}→${dose3}J`;
                }
            }
        ],
        
        emergency: [
            { name: 'emergency-adrenaline-iv-cardiac', dose: 0.01, concentration: 0.1, unit: 'mg', maxDose: 1 },
            { name: 'emergency-adrenaline-et', dose: 0.1, concentration: 1, unit: 'mg', maxDose: 2.5 },
            { name: 'emergency-adrenaline-im', dose: 0.01, concentration: 1, unit: 'mg', maxDose: 0.3 },
            { name: 'emergency-atropine-dose', dose: 0.02, concentration: 0.6, unit: 'mg', minDose: 0.1, maxDose: 0.5 },
            { name: 'emergency-amiodarone-dose', dose: 5, concentration: 50, unit: 'mg', maxDose: 300 },
            { name: 'emergency-atp-dose', dose: 0.167, concentration: 10, unit: 'mg', maxDose: 20 },
            { name: 'emergency-calcium-gluconate-dose', dose: 0.5, unit: 'ml', maxDose: 20 },
            { name: 'emergency-dextrose-d10-dose', dose: 2.5, unit: 'ml', maxDose: 250 },
            { name: 'emergency-dextrose-d50-dose', dose: 0.5, unit: 'ml', maxDose: 50 },
            { name: 'emergency-bicarb-dose', dose: 1, unit: 'ml', maxDose: 100 },
            { name: 'emergency-flumazenil-dose', dose: 0.01, concentration: 0.1, unit: 'mg', maxDose: 0.2 },
            { name: 'emergency-lignocaine-dose', dose: 1, concentration: 20, unit: 'mg' },
            { name: 'emergency-lorazepam-dose', dose: 0.1, concentration: 2, unit: 'mg', maxDose: 4 },
            { name: 'emergency-midazolam-dose', dose: 0.1, concentration: 5, unit: 'mg', maxDose: 5 },
            { name: 'emergency-mgso4-dose', dose: 40, concentration: 500, unit: 'mg', maxDose: 2000 },
            { name: 'emergency-naloxone-dose', dose: 0.1, concentration: 0.4, unit: 'mg', maxDose: 2 },
            { name: 'emergency-procainamide-dose', dose: 15, concentration: 100, unit: 'mg', maxDose: 1000 }
        ],
        
        intubation: [
            { name: 'intubation-ketamine-dose', dose: 1, concentration: 10, unit: 'mg' },
            { name: 'intubation-midazolam-dose', dose: 0.1, concentration: 5, unit: 'mg', maxDose: 5 },
            { name: 'intubation-fentanyl-dose', dose: 1, concentration: 50, unit: 'mcg', maxDose: 100 },
            { name: 'intubation-morphine-dose', dose: 0.1, concentration: 15, unit: 'mg', maxDose: 10 },
            { name: 'intubation-etomidate-dose', dose: 0.3, concentration: 2, unit: 'mg', maxDose: 20 },
            { name: 'intubation-propofol-dose', dose: 1, concentration: 10, unit: 'mg' },
            { name: 'intubation-rocuronium-dose', dose: 1, concentration: 10, unit: 'mg' },
            { name: 'intubation-suxamethonium-dose', dose: 1.5, concentration: 50, unit: 'mg', maxDose: 100 },
            { name: 'intubation-neostigmine-dose', dose: 0.05, concentration: 2.5, unit: 'mg', maxDose: 2.5 },
            { name: 'intubation-sugammadex-dose', dose: 16, concentration: 100, unit: 'mg' },
            { name: 'intubation-atropine-dose', dose: 0.02, concentration: 0.6, unit: 'mg', minDose: 0.1, maxDose: 0.5 }
        ],

        inotropes: [
            { 
                name: 'inotropes-dopamine-rate', 
                customCalc: (w) => {
                    const concentration = 3000;
                    const minRate = (5 * w * 60) / concentration;
                    const maxRate = (20 * w * 60) / concentration;
                    return `${minRate.toFixed(1)}-${maxRate.toFixed(1)} ml/hr`;
                }
            },
            { 
                name: 'inotropes-dobutamine-rate', 
                customCalc: (w) => {
                    const concentration = 2500;
                    const minRate = (5 * w * 60) / concentration;
                    const maxRate = (20 * w * 60) / concentration;
                    return `${minRate.toFixed(1)}-${maxRate.toFixed(1)} ml/hr`;
                }
            },
            { 
                name: 'inotropes-adrenaline-rate', 
                customCalc: (w) => {
                    const concentration = 50;
                    const minRate = (0.01 * w * 60) / concentration;
                    const maxRate = (0.4 * w * 60) / concentration;
                    return `${minRate.toFixed(1)}-${maxRate.toFixed(1)} ml/hr`;
                }
            },
            { 
                name: 'inotropes-noradrenaline-rate', 
                customCalc: (w) => {
                    const concentration = 50;
                    const minRate = (0.01 * w * 60) / concentration;
                    const maxRate = (0.4 * w * 60) / concentration;
                    return `${minRate.toFixed(1)}-${maxRate.toFixed(1)} ml/hr`;
                }
            },
            { 
                name: 'inotropes-milrinone-rate', 
                customCalc: (w) => {
                    const concentration = 400;
                    const minRate = (0.3 * w * 60) / concentration;
                    const maxRate = (1 * w * 60) / concentration;
                    return `${minRate.toFixed(1)}-${maxRate.toFixed(1)} ml/hr`;
                }
            },
            { 
                name: 'inotropes-vasopressin-rate', 
                customCalc: (w) => {
                    const concentration = 0.2;
                    const minRate = (0.01 * w) / concentration;
                    const maxRate = (0.12 * w) / concentration;
                    return `${minRate.toFixed(1)}-${maxRate.toFixed(1)} ml/hr`;
                }
            }
        ],
        
        sedation: [
            { 
                name: 'sedation-fentanyl-rate', 
                customCalc: (w) => {
                    const concentration = 8;
                    const minRate = (1 * w) / concentration;
                    const maxRate = (4 * w) / concentration;
                    return `${minRate.toFixed(1)}-${maxRate.toFixed(1)} ml/hr`;
                }
            },
            { 
                name: 'sedation-morphine-rate', 
                customCalc: (w) => {
                    const concentration = 200;
                    const minRate = (10 * w) / concentration;
                    const maxRate = (40 * w) / concentration;
                    return `${minRate.toFixed(1)}-${maxRate.toFixed(1)} ml/hr`;
                }
            },
            { 
                name: 'sedation-midazolam-rate', 
                customCalc: (w) => {
                    const concentration = 1000;
                    const minRate = (0.5 * w * 60) / concentration;
                    const maxRate = (20 * w * 60) / concentration;
                    return `${minRate.toFixed(1)}-${maxRate.toFixed(1)} ml/hr`;
                }
            },
            { 
                name: 'sedation-ketamine-rate', 
                customCalc: (w) => {
                    const concentration = 1000;
                    const minRate = (1 * w * 60) / concentration;
                    const maxRate = (10 * w * 60) / concentration;
                    return `${minRate.toFixed(1)}-${maxRate.toFixed(1)} ml/hr`;
                }
            },
            { 
                name: 'sedation-dexmedetomidine-rate', 
                customCalc: (w) => {
                    const concentration = 2;
                    const minRate = (0.2 * w) / concentration;
                    const maxRate = (1 * w) / concentration;
                    return `${minRate.toFixed(1)}-${maxRate.toFixed(1)} ml/hr`;
                }
            },
            { 
                name: 'sedation-rocuronium-rate', 
                customCalc: (w) => {
                    const concentration = 1600;
                    const minRate = (5 * w * 60) / concentration;
                    const maxRate = (15 * w * 60) / concentration;
                    return `${minRate.toFixed(1)}-${maxRate.toFixed(1)} ml/hr`;
                }
            },
            { 
                name: 'sedation-thiopentone-rate', 
                customCalc: (w) => {
                    const concentration = 10;
                    const minRate = (1 * w) / concentration;
                    const maxRate = (5 * w) / concentration;
                    return `${minRate.toFixed(1)}-${maxRate.toFixed(1)} ml/hr`;
                }
            }
        ],
        
        cardiac: [
            { 
                name: 'cardiac-labetalol-rate', 
                customCalc: (w) => {
                    const concentration = 5;
                    const minRate = (0.25 * w) / concentration;
                    const maxRate = (3 * w) / concentration;
                    return `${minRate.toFixed(1)}-${maxRate.toFixed(1)} ml/hr`;
                }
            },
            { 
                name: 'cardiac-esmolol-rate', 
                customCalc: (w) => {
                    const concentration = 10000;
                    const minRate = (25 * w * 60) / concentration;
                    const maxRate = (300 * w * 60) / concentration;
                    return `${minRate.toFixed(1)}-${maxRate.toFixed(1)} ml/hr`;
                }
            },
            { 
                name: 'cardiac-nitroprusside-rate', 
                customCalc: (w) => {
                    const concentration = 1000;
                    const minRate = (0.5 * w * 60) / concentration;
                    const maxRate = (10 * w * 60) / concentration;
                    return `${minRate.toFixed(1)}-${maxRate.toFixed(1)} ml/hr`;
                }
            },
            { 
                name: 'cardiac-amiodarone-rate', 
                customCalc: (w) => {
                    const concentration = 1000;
                    const minRate = (5 * w * 60) / concentration;
                    const maxRate = (15 * w * 60) / concentration;
                    return `${minRate.toFixed(1)}-${maxRate.toFixed(1)} ml/hr`;
                }
            },
            { 
                name: 'cardiac-lignocaine-rate', 
                customCalc: (w) => {
                    const concentration = 8000;
                    const minRate = (15 * w * 60) / concentration;
                    const maxRate = (50 * w * 60) / concentration;
                    return `${minRate.toFixed(1)}-${maxRate.toFixed(1)} ml/hr`;
                }
            },
            { 
                name: 'cardiac-procainamide-rate', 
                customCalc: (w) => {
                    const concentration = 8000;
                    const minRate = (20 * w * 60) / concentration;
                    const maxRate = (80 * w * 60) / concentration;
                    return `${minRate.toFixed(1)}-${maxRate.toFixed(1)} ml/hr`;
                }
            },
            { 
                name: 'cardiac-isoprenaline-rate', 
                customCalc: (w) => {
                    const concentration = 10;
                    const minRate = (0.05 * w * 60) / concentration;
                    const maxRate = (1 * w * 60) / concentration;
                    return `${minRate.toFixed(1)}-${maxRate.toFixed(1)} ml/hr`;
                }
            }
        ],
        
        fluids: [
            { 
                name: 'fluids-ventolin-rate', 
                customCalc: (w) => {
                    const concentration = 500;
                    const minRate = (1 * w * 60) / concentration;
                    let maxRate = (5 * w * 60) / concentration;
                    const maxAllowedRate = 2.4;
                    if (maxRate > maxAllowedRate) maxRate = maxAllowedRate;
                    return `${minRate.toFixed(1)}-${maxRate.toFixed(1)} ml/hr`;
                }
            },
            { 
                name: 'fluids-aminophylline-rate', 
                customCalc: (w) => {
                    const concentration = 5;
                    const minRate = (0.5 * w) / concentration;
                    const maxRate = (1 * w) / concentration;
                    return `${minRate.toFixed(1)}-${maxRate.toFixed(1)} ml/hr`;
                }
            },
            { 
                name: 'fluids-lasix-rate', 
                customCalc: (w) => {
                    const concentration = 2.4;
                    const minRate = (0.25 * w) / concentration;
                    const maxRate = (1 * w) / concentration;
                    return `${minRate.toFixed(1)}-${maxRate.toFixed(1)} ml/hr`;
                }
            },
            { 
                name: 'fluids-actrapid-rate', 
                customCalc: (w) => {
                    const concentration = 0.2;
                    const minRate = (0.05 * w) / concentration;
                    const maxRate = (0.1 * w) / concentration;
                    return `${minRate.toFixed(1)}-${maxRate.toFixed(1)} ml/hr`;
                }
            }
        ],
    };

    // Update all calculations
    function updateAllCalculations() {
        const weight = parseFloat(weightInput.value);
        const age = parseFloat(ageInput.value);
        
        // اعتبارسنجی
        let hasError = false;
        
        if (age && !isNaN(age)) {
            const ageValidation = validateAge(age);
            if (!ageValidation.isValid) {
                showError(ageInput, ageValidation.message);
                hasError = true;
            } else {
                clearError(ageInput);
            }
        } else {
            clearError(ageInput);
        }
        
        if (weight && !isNaN(weight)) {
            const weightValidation = validateWeight(weight);
            if (!weightValidation.isValid) {
                showError(weightInput, weightValidation.message);
                hasError = true;
            } else {
                clearError(weightInput);
            }
        } else {
            clearError(weightInput);
        }
        
        // نمایش وزن تخمینی
        showWeightPrediction(age);
        
        // اگر خطا وجود دارد، محاسبات انجام نشود
        if (hasError) {
            if (calculationResult) {
                calculationResult.innerHTML = '<div style="color: #dc2626; text-align: center;">لطفاً مقادیر معتبر وارد کنید</div>';
            }
            resetAllDrugDisplays();
            return;
        }
        
        // اولویت با وزن وارد شده توسط کاربر است
        let effectiveWeight = weight;
        
        // اگر وزن وارد نشده اما سن وارد شده، از وزن تخمینی استفاده کن
        if (!weight && age && age > 0) {
            effectiveWeight = parseFloat(predictWeightFromAge(age));
        }
        
        if (!effectiveWeight || effectiveWeight <= 0) {
            if (calculationResult) {
                calculationResult.textContent = 'وزن بیمار را وارد کنید تا محاسبات نمایش داده شود';
            }
            resetAllDrugDisplays();
            return;
        }

        let resultHTML = `<strong>محاسبات برای ${effectiveWeight} کیلوگرم`;
        if (age && age > 0) resultHTML += ` (${age} سال)`;
        resultHTML += `:</strong><br><br>`;
        
        let criticalDrugs = [];
        
        // Update each category
        Object.keys(drugDatabase).forEach(category => {
            drugDatabase[category].forEach(drug => {
                let displayText = calculateDrugDose(drug, effectiveWeight, age);
                
                // Update display
                const element = document.getElementById(drug.name);
                if (element) {
                    element.textContent = displayText;
                }
                
                // Check for critical doses
                if (drug.maxDose && effectiveWeight * drug.dose >= drug.maxDose * 0.9) {
                    criticalDrugs.push(drug.name);
                }
            });
        });

        // اضافه کردن زیرنویس برای دفیبریلاسیون و کاردیوورژن
        const defibElement = document.getElementById('defibrillation-dose');
        if (defibElement) {
            // استایل برای عدد اصلی
            defibElement.style.cssText = `
                font-size: 14px;
                font-weight: bold;
                text-align: center;
                width: 100%;
                margin-bottom: 2px;
            `;
            
            let descElement = defibElement.parentNode.querySelector('.dose-description');
            if (!descElement) {
                descElement = document.createElement('div');
                descElement.className = 'dose-description';
                defibElement.parentNode.appendChild(descElement);
            }
            descElement.textContent = 'Defibrillation (2-4J/kg)';
            descElement.style.cssText = `
                font-size: 9px;
                color: #666;
                text-align: center;
                font-weight: bold;
                line-height: 1.2;
                width: 100%;
            `;
        }

        const cardioElement = document.getElementById('cardioversion-dose');
        if (cardioElement) {
            // استایل برای عدد اصلی
            cardioElement.style.cssText = `
                font-size: 14px;
                font-weight: bold;
                text-align: center;
                width: 100%;
                margin-bottom: 2px;
            `;
            
            let descElement = cardioElement.parentNode.querySelector('.dose-description');
            if (!descElement) {
                descElement = document.createElement('div');
                descElement.className = 'dose-description';
                cardioElement.parentNode.appendChild(descElement);
            }
            descElement.textContent = 'Sync.Cardioversion (0.5→1→2J/kg)';
            descElement.style.cssText = `
                font-size: 9px;
                color: #666;
                text-align: center;
                font-weight: bold;
                line-height: 1.2;
                width: 100%;
            `;
        }

        // Show warnings
        if (criticalDrugs.length > 0) {
            resultHTML += `<div style="color: #dc2626; background: #fef2f2; padding: 12px; border-radius: 8px; border-left: 4px solid #dc2626; margin: 12px 0;">
                <strong>⚠️ هشدار دوز حداکثر:</strong> برخی دوزها به محدوده حداکثر نزدیک می‌شوند
            </div>`;
        }

        if (calculationResult) {
            calculationResult.innerHTML = resultHTML;
        }
    }

    // Calculate drug dose
    function calculateDrugDose(drug, effectiveWeight, age) {
        if (drug.customCalc) {
            return drug.customCalc(effectiveWeight, age);
        }
        
        let dose = effectiveWeight * drug.dose;
        
        // Apply limits
        if (drug.minDose && dose < drug.minDose) dose = drug.minDose;
        if (drug.maxDose && dose > drug.maxDose) dose = drug.maxDose;
        
        // Calculate volume
        if (drug.concentration) {
            const volume = dose / drug.concentration;
            
            // فرمت دوز
            let formattedDose;
            if (drug.unit === 'mcg') {
                formattedDose = Math.round(dose).toString();
            } else {
                if (dose < 0.1) {
                    formattedDose = dose.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
                } else if (dose < 1) {
                    formattedDose = dose.toFixed(1).replace(/\.0$/, '');
                } else if (dose === Math.floor(dose)) {
                    formattedDose = dose.toString();
                } else {
                    formattedDose = dose.toFixed(1).replace(/\.0$/, '');
                }
            }
            
            // فرمت حجم
            let formattedVolume;
            if (volume < 0.01) {
                formattedVolume = volume.toFixed(3).replace(/0+$/, '');
            } else if (volume < 0.1) {
                formattedVolume = volume.toFixed(2).replace(/0+$/, '');
            } else if (volume < 1) {
                formattedVolume = volume.toFixed(2).replace(/0+$/, '');
            } else if (volume === Math.floor(volume)) {
                formattedVolume = volume.toString();
            } else {
                formattedVolume = volume.toFixed(1).replace(/\.0$/, '');
            }
            
            return `${formattedDose} ${drug.unit} = ${formattedVolume} ml`;
        } else {
            return `${Math.round(dose)} ${drug.unit}`;
        }
    }

    // Reset displays
    function resetAllDrugDisplays() {
        if (!drugDatabase) return;
        
        Object.keys(drugDatabase).forEach(category => {
            drugDatabase[category].forEach(drug => {
                const element = document.getElementById(drug.name);
                if (element) element.textContent = '-';
            });
        });
    }

    // Tab system
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Deactivate all
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Activate selected
            this.classList.add('active');
            const tabElement = document.getElementById(`tab-${tabId}`);
            if (tabElement) {
                tabElement.classList.add('active');
            }
            
            // بعد از تغییر تب هم محاسبات رو آپدیت کن
            updateAllCalculations();
        });
    });

    // Event listeners با اعتبارسنجی
    if (ageInput) {
        ageInput.addEventListener('input', function() {
            const age = parseFloat(this.value);
            showWeightPrediction(age);
            updateAllCalculations();
        });

        ageInput.addEventListener('change', function() {
            const age = parseFloat(this.value);
            showWeightPrediction(age);
            updateAllCalculations();
        });

        // محدود کردن مقدار سن
        ageInput.addEventListener('blur', function() {
            const age = parseFloat(this.value);
            if (age && !isNaN(age)) {
                if (age < MIN_AGE) {
                    this.value = MIN_AGE;
                } else if (age > MAX_AGE) {
                    this.value = MAX_AGE;
                }
                showWeightPrediction(parseFloat(this.value));
                updateAllCalculations();
            }
        });
    }

    if (weightInput) {
        weightInput.addEventListener('input', function() {
            // وقتی کاربر وزن وارد می‌کند، پیش‌بینی مخفی شود
            const existingPrediction = weightInput.parentNode.querySelector('.weight-prediction-text');
            if (existingPrediction && this.value) {
                existingPrediction.remove();
            }
            updateAllCalculations();
        });

        weightInput.addEventListener('change', function() {
            updateAllCalculations();
        });

        // محدود کردن مقدار وزن
        weightInput.addEventListener('blur', function() {
            const weight = parseFloat(this.value);
            if (weight && !isNaN(weight)) {
                if (weight < MIN_WEIGHT) {
                    this.value = MIN_WEIGHT;
                } else if (weight > MAX_WEIGHT) {
                    this.value = MAX_WEIGHT;
                }
                updateAllCalculations();
            }
        });
    }

    // اضافه کردن event listener برای real-time updates
    if (weightInput) {
        weightInput.addEventListener('keyup', function() {
            updateAllCalculations();
        });
    }

    if (ageInput) {
        ageInput.addEventListener('keyup', function() {
            const age = parseFloat(this.value);
            showWeightPrediction(age);
            updateAllCalculations();
        });
    }

    // Initial calculation
    updateAllCalculations();
    console.log('Pediatric calculator initialized successfully');
}


// فراخوانی تابع هنگام لود صفحه
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing pediatric calculator...');
    initializeModernPediatricCalculator();
});



let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; });
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(reg => {
            reg.addEventListener('updatefound', () => {
                const newWorker = reg.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        if (confirm('نسخه جدیدی از برنامه آماده است! برای اعمال تغییرات، صفحه را مجدداً بارگذاری می‌کنید؟')) { window.location.reload(); }
                    }
                });
            });
        }).catch(error => console.log('Service Worker registration failed:', error));
    });
}
