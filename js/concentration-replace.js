/**
 * concentration-replace.js
 * محاسبه آلیگیشن (رقیق/غلیظ‌سازی) برای تغییر غلظت محلول.
 * نسخه بالینی و بهینه‌شده: محاسبه میزان غلیظ و رقیق برای تهیه یک حجم نهایی مشخص.
 */

window.calculateReplacementMain = function() {
    var Calc = window.MedMateCalc;
    
    // helper ترجمه با interpolation و fallback فارسی
    var tr = function (key, faFallback, vars) {
        if (window.MedMateI18n && typeof window.MedMateI18n.t === 'function') {
            return window.MedMateI18n.t(key, vars);
        }
        var s = faFallback;
        if (vars) { s = s.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; }); }
        return s;
    };

    const currentConc = document.getElementById('currentConc'), 
          desiredConc = document.getElementById('desiredConc'), 
          stockConc = document.getElementById('stockConc'), 
          infusionVolume = document.getElementById('infusionVolume');
          
    const conversionResult = document.getElementById('conversionResult');

    const C_currentVal = parseFloat(currentConc.value), 
          C_desiredVal = parseFloat(desiredConc.value), 
          C_stockVal = parseFloat(stockConc.value), 
          V_infusionVal = parseFloat(infusionVolume.value);

    // --- Error Checks ---
    if (isNaN(C_currentVal) || isNaN(C_desiredVal) || isNaN(C_stockVal) || isNaN(V_infusionVal)) {
        conversionResult.innerHTML = `<div class="result error">${tr('cr.errAllValues','لطفاً تمام مقادیر غلظت و حجم نهایی مورد نیاز را وارد کنید.')}</div>`;
        return;
    }
    if (C_currentVal < 0 || C_desiredVal <= 0 || C_stockVal <= 0 || V_infusionVal <= 0) {
        conversionResult.innerHTML = `<div class="result error">${tr('cr.errPositive','تمام مقادیر باید مثبت باشند (غلظت فعلی می‌تواند صفر باشد).')}</div>`;
        return;
    }
    if (C_stockVal === C_currentVal) {
        conversionResult.innerHTML = `<div class="result error">${tr('cr.errStockEqCurrent','غلظت محلول غلیظ نمی‌تواند با غلظت فعلی یکسان باشد.')}</div>`;
        return;
    }
    if (C_desiredVal <= C_currentVal || C_desiredVal >= C_stockVal) {
        conversionResult.innerHTML = `<div class="result error">${tr('cr.errRange','غلظت مورد نیاز باید بین غلظت فعلی ({cur}%) و غلظت محلول غلیظ ({stock}%) باشد.',{cur:formatNumber(C_currentVal),stock:formatNumber(C_stockVal)})}</div>`;
        return;
    }

    // --- Core Calculation: Alligation Ratio (R) از calc-core ---
    const R = Calc.alligationRatio(C_currentVal, C_desiredVal, C_stockVal);
    if (R === null) {
        conversionResult.innerHTML = `<div class="result error">${tr('cr.errInvalid','مقادیر غلظت نامعتبر هستند.')}</div>`;
        return;
    }

    // استایل‌دهی نتیجه
    let resultHTML = `<div class="conversion-guide" style="border: 1px solid var(--border-color, #ddd); padding: 15px; border-radius: 8px; background-color: var(--bg-tertiary, #f9f9f9); color: var(--text-primary, #2c3e50); text-align: start;">
                      <p style="font-weight: bold; font-size: 1.1em; color: var(--text-primary, #34495E); margin-bottom: 10px;">${tr('cr.desiredConc','✅ غلظت مورد نظر شما: {conc}%',{conc:formatNumber(C_desiredVal)})}</p>
                      <hr style="border: 0; border-top: 1px dashed var(--border-color, #ccc); margin: 10px 0;">`;

    // --- محاسبه مستقیم مقادیر برای ترکیب ---
    const V_stock_infusion = V_infusionVal * R;
    const V_current_infusion = V_infusionVal - V_stock_infusion;

    resultHTML += `<p style="font-weight: bold; font-size: 1.05em; color: #1abc9c; margin-top: 15px;">${tr('cr.prepTitle','🌟 نحوه تهیه {vol} ml محلول با غلظت {conc}%',{vol:formatNumber(V_infusionVal),conc:formatNumber(C_desiredVal)})}</p>`;
    resultHTML += `<ol style="text-align: start; margin-top: 10px; padding-inline-start: 25px; font-size: 0.95em; line-height: 1.8; color: var(--text-primary, #2c3e50);">
                    <li style="color: #e74c3c; font-weight: bold;">${tr('cr.takeStock','{vol} ml از محلول غلیظ {conc}% بکشید.',{vol:formatNumber(V_stock_infusion),conc:formatNumber(C_stockVal)})}</li>
                    <li style="color: #3498db; font-weight: bold;">${tr('cr.takeCurrent','{vol} ml از محلول رقیق {conc}% (به عنوان حلال) بکشید.',{vol:formatNumber(V_current_infusion),conc:formatNumber(C_currentVal)})}</li>
                    <li style="color: var(--text-primary, #2C3E50); font-weight: bold; margin-top: 10px; padding: 5px; background: rgba(26, 188, 156, 0.1); border-radius: 4px;">${tr('cr.combine','👈 این دو را مخلوط کنید تا دقیقاً {vol} ml محلول با غلظت {conc}% حاصل شود.',{vol:formatNumber(V_infusionVal),conc:formatNumber(C_desiredVal)})}</li>
                   </ol></div>`;

    conversionResult.innerHTML = resultHTML;
}
