/**
 * pediatric-calc.js - FIXED NUMBER DISPLAY
 */

function formatNumber(num) {
    if (num === undefined || num === null || isNaN(parseFloat(num))) return '';
    const floatNum = parseFloat(num);
    if (floatNum % 1 === 0) {
        return floatNum.toString();
    }
    let formatted = floatNum.toFixed(2);
    formatted = formatted.replace(/\.?0+$/, '');
    return formatted;
}

let drugDatabase;

window.initializeModernPediatricCalculator = function() {
    console.log('Initializing pediatric calculator...');

    const weightInput = document.getElementById('pediatric-weight');
    const ageInput = document.getElementById('pediatric-age');

    if (!weightInput || !ageInput) {
        console.log('Pediatric calculator elements not found');
        return;
    }

    const MAX_AGE = 18;
    const MAX_WEIGHT = 150;
    const MIN_AGE = 0.1;
    const MIN_WEIGHT = 0.5;

    function predictWeightFromAge(age) {
        if (age <= 1) {
            return (age * 6.5 + 3.5).toFixed(1);
        } else if (age <= 10) {
            return (10 + (age - 1) * 2).toFixed(1);
        } else {
            return (age * 2.5 + 10).toFixed(1);
        }
    }

    function validateAge(age) {
        if (age < MIN_AGE) { return { isValid: false, message: `سن نمی‌تواند کمتر از ${MIN_AGE} سال باشد` }; }
        if (age > MAX_AGE) { return { isValid: false, message: `سن نمی‌تواند بیشتر از ${MAX_AGE} سال باشد` }; }
        return { isValid: true, message: '' };
    }

    function ptr(key, faFallback) {
        return (window.MedMateI18n && typeof window.MedMateI18n.t === 'function') ? window.MedMateI18n.t(key) : faFallback;
    }

    function validateWeight(weight) {
        if (weight < MIN_WEIGHT) { return { isValid: false, message: ptr('ped.weightTooLow', 'وزن نمی‌تواند کمتر از {min} کیلوگرم باشد').replace('{min}', MIN_WEIGHT) }; }
        if (weight > MAX_WEIGHT) { return { isValid: false, message: ptr('ped.weightTooHigh', 'وزن نمی‌تواند بیشتر از {max} کیلوگرم باشد').replace('{max}', MAX_WEIGHT) }; }
        return { isValid: true, message: '' };
    }

    function showError(input, message) {
        input.style.borderColor = '#dc2626';
        input.style.backgroundColor = '#fef2f2';

        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) { existingError.remove(); }

        if (message) {
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.cssText = 'color: #dc2626; font-size: 12px; margin-top: 5px; text-align: right;';
            errorElement.textContent = message;
            input.parentNode.appendChild(errorElement);
        }
    }

    function clearError(input) {
        input.style.borderColor = '';
        input.style.backgroundColor = '';
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) { existingError.remove(); }
    }

    function showWeightPrediction(age) {
        const existingPrediction = weightInput.parentNode.querySelector('.weight-prediction-text');
        if (existingPrediction) { existingPrediction.remove(); }

        if (age && age > 0 && age <= 10 && !weightInput.value) {
            const predicted = predictWeightFromAge(age);
            const predictionElement = document.createElement('div');
            predictionElement.className = 'weight-prediction-text';
            predictionElement.style.cssText = 'color: #666; font-size: 11px; margin-top: 4px; text-align: right; font-style: italic;';
            predictionElement.textContent = `${ptr('ped.estimatedWeightArrow', '→ وزن تخمینی:')} ${predicted} ${ptr('ped.unit.kg', 'کیلوگرم')}`;
            weightInput.parentNode.appendChild(predictionElement);
        }
    }

    function calculateETTSize(age, weight) {
        if (!age && !weight) return '-';
        if (age && age > 0) {
            if (age < 1) { return age < 0.25 ? '3.0' : age < 0.5 ? '3.5' : '3.5-4.0'; }
            if (age <= 2) return '4.0-4.5';
            if (age <= 4) return '4.5-5.0';
            if (age <= 6) return '5.0-5.5';
            if (age <= 8) return '5.5-6.0';
            if (age <= 10) return '6.0-6.5';
            if (age <= 12) return '6.5-7.0';
            if (age <= 14) return '7.0-7.5';
            return '7.5-8.0';
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

    function calculateETTDepth(age, weight) {
        if (!age && !weight) return '- cm';
        if (age && age > 0) {
            if (age < 1) { return age < 0.25 ? '9-10 cm' : age < 0.5 ? '10-11 cm' : '11-12 cm'; }
            if (age <= 2) return '12-13 cm';
            if (age <= 4) return '13-14 cm';
            if (age <= 6) return '14-15 cm';
            if (age <= 8) return '15-16 cm';
            if (age <= 10) return '16-17 cm';
            if (age <= 12) return '17-18 cm';
            if (age <= 14) return '18-19 cm';
            return '19-20 cm';
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

    function estimateAgeFromWeight(weight) {
        if (weight <= 10) return weight / 6;
        if (weight <= 20) return (weight - 8) / 2;
        if (weight <= 35) return (weight - 2) / 3.5;
        return (weight - 15) / 2.5;
    }

    drugDatabase = {
        airway: [
            { name: 'ett-size', customCalc: (w, a) => calculateETTSize(a, w) },
            { name: 'ett-depth', customCalc: (w, a) => calculateETTDepth(a, w) },
            { name: 'laryngoscopy-blade', customCalc: (w, a) => {
                const effectiveAge = a || (w ? estimateAgeFromWeight(w) : 0);
                if (effectiveAge < 0.5) return 'Miller 0';
                if (effectiveAge < 2) return 'Miller 1';
                if (effectiveAge < 8) return 'Miller 1-2';
                if (effectiveAge < 12) return 'Macintosh 2';
                return 'Macintosh 3';
            }},
            { name: 'lma-size', customCalc: (w) => {
                if (w < 5) return '1';
                if (w < 10) return '1.5';
                if (w < 20) return '2';
                if (w < 30) return '2.5';
                if (w < 50) return '3';
                if (w < 70) return '4';
                return '5';
            }},
            { name: 'defibrillation-dose', customCalc: (w) => {
                const minDose = (w * 2).toFixed(0);
                const maxDose = (w * 4).toFixed(0);
                return `${formatNumber(minDose)} to ${formatNumber(maxDose)}J`;
            }},
            { name: 'cardioversion-dose', customCalc: (w) => {
                const dose1 = (w * 0.5).toFixed(0);
                const dose2 = (w * 1).toFixed(0);
                const dose3 = (w * 2).toFixed(0);
                return `${formatNumber(dose1)}→${formatNumber(dose2)}→${formatNumber(dose3)}J`;
            }}
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
            { name: 'inotropes-dopamine-rate', customCalc: (w) => { const c = 3000; const minR = (5 * w * 60) / c; const maxR = (20 * w * 60) / c; return `${formatNumber(minR)}-${formatNumber(maxR)} ml/hr`; } },
            { name: 'inotropes-dobutamine-rate', customCalc: (w) => { const c = 2500; const minR = (5 * w * 60) / c; const maxR = (20 * w * 60) / c; return `${formatNumber(minR)}-${formatNumber(maxR)} ml/hr`; } },
            { name: 'inotropes-adrenaline-rate', customCalc: (w) => { const c = 50; const minR = (0.01 * w * 60) / c; const maxR = (0.4 * w * 60) / c; return `${formatNumber(minR)}-${formatNumber(maxR)} ml/hr`; } },
            { name: 'inotropes-noradrenaline-rate', customCalc: (w) => { const c = 50; const minR = (0.01 * w * 60) / c; const maxR = (0.4 * w * 60) / c; return `${formatNumber(minR)}-${formatNumber(maxR)} ml/hr`; } },
            { name: 'inotropes-milrinone-rate', customCalc: (w) => { const c = 400; const minR = (0.3 * w * 60) / c; const maxR = (1 * w * 60) / c; return `${formatNumber(minR)}-${formatNumber(maxR)} ml/hr`; } },
            { name: 'inotropes-vasopressin-rate', customCalc: (w) => { const c = 0.2; const minR = (0.01 * w) / c; const maxR = (0.12 * w) / c; return `${formatNumber(minR)}-${formatNumber(maxR)} ml/hr`; } }
        ],

        sedation: [
            { name: 'sedation-fentanyl-rate', customCalc: (w) => { const c = 8; const minR = (1 * w) / c; const maxR = (4 * w) / c; return `${formatNumber(minR)}-${formatNumber(maxR)} ml/hr`; } },
            { name: 'sedation-morphine-rate', customCalc: (w) => { const c = 200; const minR = (10 * w) / c; const maxR = (40 * w) / c; return `${formatNumber(minR)}-${formatNumber(maxR)} ml/hr`; } },
            { name: 'sedation-midazolam-rate', customCalc: (w) => { const c = 1000; const minR = (0.5 * w * 60) / c; const maxR = (20 * w * 60) / c; return `${formatNumber(minR)}-${formatNumber(maxR)} ml/hr`; } },
            { name: 'sedation-ketamine-rate', customCalc: (w) => { const c = 1000; const minR = (1 * w * 60) / c; const maxR = (10 * w * 60) / c; return `${formatNumber(minR)}-${formatNumber(maxR)} ml/hr`; } },
            { name: 'sedation-dexmedetomidine-rate', customCalc: (w) => { const c = 2; const minR = (0.2 * w) / c; const maxR = (1 * w) / c; return `${formatNumber(minR)}-${formatNumber(maxR)} ml/hr`; } },
            { name: 'sedation-rocuronium-rate', customCalc: (w) => { const c = 1600; const minR = (5 * w * 60) / c; const maxR = (15 * w * 60) / c; return `${formatNumber(minR)}-${formatNumber(maxR)} ml/hr`; } },
            { name: 'sedation-thiopentone-rate', customCalc: (w) => { const c = 10; const minR = (1 * w) / c; const maxR = (5 * w) / c; return `${formatNumber(minR)}-${formatNumber(maxR)} ml/hr`; } }
        ],

        cardiac: [
            { name: 'cardiac-labetalol-rate', customCalc: (w) => { const c = 5; const minR = (0.25 * w) / c; const maxR = (3 * w) / c; return `${formatNumber(minR)}-${formatNumber(maxR)} ml/hr`; } },
            { name: 'cardiac-esmolol-rate', customCalc: (w) => { const c = 10000; const minR = (25 * w * 60) / c; const maxR = (300 * w * 60) / c; return `${formatNumber(minR)}-${formatNumber(maxR)} ml/hr`; } },
            { name: 'cardiac-nitroprusside-rate', customCalc: (w) => { const c = 1000; const minR = (0.5 * w * 60) / c; const maxR = (10 * w * 60) / c; return `${formatNumber(minR)}-${formatNumber(maxR)} ml/hr`; } },
            { name: 'cardiac-amiodarone-rate', customCalc: (w) => { const c = 1000; const minR = (5 * w * 60) / c; const maxR = (15 * w * 60) / c; return `${formatNumber(minR)}-${formatNumber(maxR)} ml/hr`; } },
            { name: 'cardiac-lignocaine-rate', customCalc: (w) => { const c = 8000; const minR = (15 * w * 60) / c; const maxR = (50 * w * 60) / c; return `${formatNumber(minR)}-${formatNumber(maxR)} ml/hr`; } },
            { name: 'cardiac-procainamide-rate', customCalc: (w) => { const c = 8000; const minR = (20 * w * 60) / c; const maxR = (80 * w * 60) / c; return `${formatNumber(minR)}-${formatNumber(maxR)} ml/hr`; } },
            { name: 'cardiac-isoprenaline-rate', customCalc: (w) => { const c = 10; const minR = (0.05 * w * 60) / c; const maxR = (1 * w * 60) / c; return `${formatNumber(minR)}-${formatNumber(maxR)} ml/hr`; } }
        ],

        fluids: [
            { name: 'fluids-ventolin-rate', customCalc: (w) => { const c = 500; const minR = (1 * w * 60) / c; let maxR = (5 * w * 60) / c; const maxAllowedRate = 2.4; if (maxR > maxAllowedRate) maxR = maxAllowedRate; return `${formatNumber(minR)}-${formatNumber(maxR)} ml/hr`; } },
            { name: 'fluids-aminophylline-rate', customCalc: (w) => { const c = 5; const minR = (0.5 * w) / c; const maxR = (1 * w) / c; return `${formatNumber(minR)}-${formatNumber(maxR)} ml/hr`; } },
            { name: 'fluids-lasix-rate', customCalc: (w) => { const c = 2.4; const minR = (0.25 * w) / c; const maxR = (1 * w) / c; return `${formatNumber(minR)}-${formatNumber(maxR)} ml/hr`; } },
            { name: 'fluids-actrapid-rate', customCalc: (w) => { const c = 0.2; const minR = (0.05 * w) / c; const maxR = (0.1 * w) / c; return `${formatNumber(minR)}-${formatNumber(maxR)} ml/hr`; } }
        ],
    };

    function updateAllCalculations() {
        const weight = parseFloat(weightInput.value);
        const age = parseFloat(ageInput.value);

        let hasError = false;
        if (age && !isNaN(age) && !validateAge(age).isValid) { showError(ageInput, validateAge(age).message); hasError = true; } else { clearError(ageInput); }
        if (weight && !isNaN(weight) && !validateWeight(weight).isValid) { showError(weightInput, validateWeight(weight).message); hasError = true; } else { clearError(weightInput); }
        showWeightPrediction(age);

        if (hasError) { resetAllDrugDisplays(); return; }

        let effectiveWeight = weight;
        if (!weight && age && age > 0) { effectiveWeight = parseFloat(predictWeightFromAge(age)); }
        if (!effectiveWeight || effectiveWeight <= 0) { resetAllDrugDisplays(); return; }

        Object.keys(drugDatabase).forEach(category => {
            drugDatabase[category].forEach(drug => {
                let displayText = calculateDrugDose(drug, effectiveWeight, age);
                const element = document.getElementById(drug.name);
                if (element) {
                    element.textContent = displayText;
                }
            });
        });

        ['defibrillation-dose', 'cardioversion-dose'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.cssText = `font-size: 14px; font-weight: bold; text-align: center; width: 100%; margin-bottom: 2px;`;
                let descElement = element.parentNode.querySelector('.dose-description');
                if (!descElement) {
                    descElement = document.createElement('div');
                    descElement.className = 'dose-description';
                    element.parentNode.appendChild(descElement);
                }
                descElement.textContent = id === 'defibrillation-dose' ? 'Defibrillation (2-4J/kg)' : 'Sync.Cardioversion (0.5→1→2J/kg)';
                descElement.style.cssText = `font-size: 9px; color: #666; text-align: center; font-weight: bold; line-height: 1.2; width: 100%;`;
            }
        });
    }

    function calculateDrugDose(drug, effectiveWeight, age) {
        if (drug.customCalc) { return drug.customCalc(effectiveWeight, age); }

        let dose = effectiveWeight * drug.dose;
        if (drug.minDose && dose < drug.minDose) dose = drug.minDose;
        if (drug.maxDose && dose > drug.maxDose) dose = drug.maxDose;

        if (drug.concentration) {
            const volume = dose / drug.concentration;
            let formattedDose = formatNumber(dose);
            let formattedVolume = formatNumber(volume);
            return `${formattedDose} ${drug.unit} = ${formattedVolume} ml`;
        } else {
            return `${formatNumber(dose)} ${drug.unit}`;
        }
    }

    function resetAllDrugDisplays() {
        if (!drugDatabase) return;
        Object.keys(drugDatabase).forEach(category => {
            drugDatabase[category].forEach(drug => {
                const element = document.getElementById(drug.name);
                if (element) element.textContent = '-';
            });
        });
    }

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(`tab-${tabId}`)?.classList.add('active');
            updateAllCalculations();
        });
    });

    [ageInput, weightInput].forEach(input => {
        input.addEventListener('input', updateAllCalculations);
        input.addEventListener('change', updateAllCalculations);
        input.addEventListener('keyup', updateAllCalculations);
        input.addEventListener('blur', function() {
            const val = parseFloat(this.value);
            if (val && !isNaN(val)) {
                if (val < MIN_WEIGHT) { this.value = MIN_WEIGHT; }
                else if (val > MAX_WEIGHT) { this.value = MAX_WEIGHT; }
                else if (this === ageInput && val < MIN_AGE) { this.value = MIN_AGE; }
                else if (this === ageInput && val > MAX_AGE) { this.value = MAX_AGE; }
                updateAllCalculations();
            }
        });
    });

    updateAllCalculations();
    console.log('Pediatric calculator initialized successfully');
}