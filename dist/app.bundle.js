/* app.bundle.js — فایل تولیدشده توسط build.js. مستقیماً ویرایش نکنید.
   منبع: js/*.js (به‌ترتیب js/bundle-order.json). با `npm run build` بازتولید می‌شود. */

/* ===== js/translations.js ===== */
/**
 * translations.js
 * ------------------------------------------------------------
 * دیکشنری ترجمه‌های رابط کاربری MedMate (جدا از منطق i18n).
 * ساختار: window.TRANSLATIONS[key] = { fa, en }
 *
 * فارسی (fa) زبان پیش‌فرض و اصلی برنامه است؛ انگلیسی (en) به‌عنوان
 * زبان دوم اضافه شده است. کلیدها به‌صورت نقطه‌ای (dotted) گروه‌بندی
 * شده‌اند. برای ترجمه‌ی هر عنصر جدید کافیست کلید اینجا اضافه و در HTML
 * صفت data-i18n متناظر گذاشته شود.
 *
 * نکته: واحدها و توکن‌های ریاضیِ فرمول‌ها عمداً ترجمه نمی‌شوند.
 * ------------------------------------------------------------
 */
window.TRANSLATIONS = {
    // --- سربرگ / برند ---
    'app.logo':            { fa: 'DRUGS CALCULATOR', en: 'DRUGS CALCULATOR' },
    'menu.open':           { fa: 'باز کردن منو', en: 'Open Menu' },

    // --- فوتر ---
    'footer.supervisor':   { fa: 'زیر نظر: دکتر امیر سالاری', en: 'Supervised by: Dr. Amir Salari' },
    'footer.supervisorRole':{ fa: 'مدرس طب اورژانس و مراقبت‌های ویژه، دانشگاه علوم پزشکی تهران', en: 'Emergency & Critical Care Instructor, Tehran University of Medical Sciences' },
    'footer.designer':     { fa: 'طراحی و کدنویسی: توکل پیری', en: 'Designed and coded by: Tavakol Piri' },
    'footer.designerRole': { fa: 'پرستار بخش، مجتمع بیمارستانی امام خمینی', en: 'Medical Ward Nurse, Imam Khomeini Hospital Complex' },
    'footer.copyright':    { fa: 'تمامی حقوق برای MedMate محفوظ است - ۲۰۲۵', en: '© All rights reserved for MedMate - 2025' },

    // --- منوی کناری ---
    'menu.intro':          { fa: 'معرفی برنامه', en: 'App Introduction' },
    'menu.update':         { fa: 'بروزرسانی برنامه', en: 'Update App' },
    'menu.installGuide':   { fa: 'دانلود سایر ابزارهای پزشکی', en: 'Download Other Medical Tools' },
    'apps.title':          { fa: 'سایر ابزارهای پزشکی', en: 'Other Medical Tools' },
    'apps.subtitle':       { fa: 'برنامه‌های تخصصی دیگر ما را دریافت کنید.', en: 'Get our other specialized apps.' },
    'apps.abgName':        { fa: 'Blood Gas Expert', en: 'Blood Gas Expert' },
    'apps.abgDesc':        { fa: 'تحلیل تخصصی گازهای خون شریانی (ABG)', en: 'Specialized arterial blood gas (ABG) analysis' },
    'apps.pedName':        { fa: 'PediCalc', en: 'PediCalc' },
    'apps.pedDesc':        { fa: 'محاسبه‌گر دوز داروهای کودکان', en: 'Pediatric drug dose calculator' },
    'apps.download':       { fa: 'دانلود', en: 'Download' },
    'menu.contactTitle':   { fa: 'ارتباط با توسعه‌دهندگان', en: 'Contact the Developers' },
    'menu.person1':        { fa: 'دکتر امیر سالاری', en: 'Dr. Amir Salari' },
    'menu.person2':        { fa: 'توکل پیری', en: 'Tavakol Piri' },
    'menu.themeTitle':     { fa: 'تغییر حالت نمایش', en: 'Toggle theme' },
    'nav.clearTitle':      { fa: 'پاک کردن', en: 'Clear all' },

    // --- دکمه‌ی تغییر زبان (برچسب کوتاه؛ زبانِ مقصدِ تعویض را نشان می‌دهد) ---
    'lang.toggleLabel':    { fa: 'EN', en: 'فا' },
    'lang.toggleAria':     { fa: 'Switch to English', en: 'تغییر به فارسی' },

    // --- عناوین باکس‌ها ---
    'box.drug':            { fa: 'محاسبات دارویی', en: 'Drug Calculations' },
    'box.percentage':      { fa: 'محاسبات داروهای درصدی', en: 'Percentage Drug Calculations' },
    'box.fluidDrip':       { fa: 'محاسبات میزان قطرات سرم', en: 'IV Fluid Drip Rate' },
    'box.microsetDrip':    { fa: 'محاسبات میزان قطرات میکروست', en: 'Microset Drip Rate' },
    'box.concentration':   { fa: 'تغییر غلظت محلول ها', en: 'Solution Concentration Change' },
    'box.meq':             { fa: 'تبدیل mEq به mg و ml', en: 'mEq to mg & ml Conversion' },
    'box.pediatric':       { fa: 'ماشین حساب اورژانس کودکان', en: 'Pediatric Emergency Calculator' },
    'box.reverse':         { fa: 'محاسبه معکوس دوز (Reverse)', en: 'Reverse Dose Calculation' },
    'box.tarkib':          { fa: 'محاسبات داروهای ترکیبی', en: 'Mixed Drug Calculations' },

    // --- باکس پدیاتریک (عناصر اصلی/ساختاری) ---
    'ped.patientInfo':     { fa: 'اطلاعات بیمار', en: 'Patient Information' },
    'ped.weight':          { fa: 'وزن (کیلوگرم)', en: 'Weight (kg)' },
    'ped.weightPlaceholder':{ fa: 'وزن را وارد کنید', en: 'Enter weight' },
    'ped.age':             { fa: 'سن (سال)', en: 'Age (years)' },
    'ped.agePlaceholder':  { fa: 'سن را وارد کنید', en: 'Enter age' },
    'ped.estimatedWeight': { fa: 'وزن تخمینی:', en: 'Estimated weight:' },
    'ped.usePredicted':    { fa: 'استفاده از این وزن', en: 'Use this weight' },
    'ped.groupEmergency':  { fa: 'اورژانس', en: 'Emergency' },
    'ped.groupAnesthesia': { fa: 'بیهوشی', en: 'Anesthesia' },
    'ped.groupCardiac':    { fa: 'قلبی', en: 'Cardiac' },

    // --- باکس محاسبات دارویی ---
    'drug.dose':           { fa: 'دوز دارو:', en: 'Drug Dose:' },
    'drug.dosePh':         { fa: 'دوز دارو', en: 'Drug dose' },
    'drug.syringeVol':     { fa: 'حجم سرنگ یا میکروست (میلی‌لیتر):', en: 'Syringe or Microset Volume (ml):' },
    'drug.syringeVolPh':   { fa: ' حجم سرنگ / میکروست', en: 'Syringe / Microset volume' },
    'drug.prescribed':     { fa: 'دوز تجویزی:', en: 'Prescribed Dose:' },
    'drug.prescribedPh':   { fa: 'دوز تجویزی', en: 'Prescribed dose' },
    'drug.weight':         { fa: 'وزن بیمار (کیلوگرم):', en: 'Patient Weight (kg):' },
    'drug.weightPh':       { fa: 'وزن بیمار', en: 'Patient weight' },
    'drug.method':         { fa: 'روش تزریق:', en: 'Infusion Method:' },
    'drug.pump':           { fa: 'پمپ', en: 'Pump' },
    'drug.microset':       { fa: 'میکروست', en: 'Microset' },

    // --- باکس داروهای درصدی ---
    'perc.percent':        { fa: 'درصد دارو:', en: 'Drug Percentage:' },
    'perc.percentPh':      { fa: 'مثال: 1 برای ۱٪', en: 'e.g., 1 for 1%' },
    'perc.required':       { fa: 'دوز مورد نیاز:', en: 'Required Dose:' },
    'perc.requiredPh':     { fa: 'دوز مورد نیاز', en: 'Required dose' },
    'perc.mg':             { fa: 'میلی‌گرم', en: 'milligram' },
    'perc.g':              { fa: 'گرم', en: 'gram' },

    // --- باکس قطرات سرم ---
    'fluid.volume':        { fa: 'حجم سرم (میلی‌لیتر):', en: 'IV Fluid Volume (ml):' },
    'fluid.volumePh':      { fa: 'حجم سرم', en: 'Fluid volume' },
    'fluid.time':          { fa: 'زمان تزریق:', en: 'Infusion Time:' },
    'fluid.timePh':        { fa: 'مقدار زمان', en: 'Time value' },
    'fluid.egMinutes':     { fa: 'مثال: 30', en: 'e.g., 30' },
    'fluid.egHours':       { fa: 'مثال: 1.5', en: 'e.g., 1.5' },
    'fluid.setType':       { fa: 'نوع ست سرم:', en: 'Drip Set Type:' },
    'fluid.set10':         { fa: '۱۰ قطره/میلی‌لیتر', en: '10 drops/ml' },
    'fluid.set15':         { fa: '۱۵ قطره/میلی‌لیتر', en: '15 drops/ml' },
    'fluid.set20':         { fa: '۲۰ قطره/میلی‌لیتر', en: '20 drops/ml' },

    // --- باکس قطرات میکروست ---
    'micro.volume':        { fa: 'حجم میکروست (میلی‌لیتر):', en: 'Microset Volume (ml):' },
    'micro.volumePh':      { fa: 'حجم میکروست', en: 'Microset volume' },

    // --- واحدهای زمان مشترک ---
    'unit.hours':          { fa: 'ساعت', en: 'Hours' },
    'unit.minutes':        { fa: 'دقیقه', en: 'Minutes' },

    // --- باکس تغییر غلظت ---
    'conc.current':        { fa: 'غلظت محلول رقیق تر (درصد):', en: 'Diluted Solution Concentration (%):' },
    'conc.currentPh':      { fa: 'مثال: 5', en: 'e.g., 5' },
    'conc.desired':        { fa: 'غلظت محلول مورد نظر (درصد):', en: 'Desired Concentration (%):' },
    'conc.desiredPh':      { fa: 'مثال: 10', en: 'e.g., 10' },
    'conc.stock':          { fa: 'غلظت محلول غلیظ تر (درصد):', en: 'Stock Solution Concentration (%):' },
    'conc.stockPh':        { fa: 'مثال: 50', en: 'e.g., 50' },
    'conc.total':          { fa: 'حجم محلول رقیق تر موجود (میلی‌لیتر):', en: 'Available Diluted Volume (ml):' },
    'conc.totalPh':        { fa: 'مثال: 1000', en: 'e.g., 1000' },
    'conc.infusion':       { fa: 'حجم مورد نیاز انفوزیون بیمار (میلی‌لیتر):', en: 'Required Infusion Volume (ml):' },
    'conc.infusionPh':     { fa: 'مثال: 50', en: 'e.g., 50' },

    // --- باکس mEq ---
    'meq.compound':        { fa: 'ترکیب دارویی:', en: 'Drug Compound:' },
    'meq.selectPrompt':    { fa: '-- انتخاب کنید --', en: '-- Select --' },
    'meq.concentration':   { fa: 'غلظت محلول:', en: 'Solution Concentration:' },
    'meq.selectFirst':     { fa: 'ابتدا ترکیب را انتخاب کنید', en: 'Select a compound first' },
    'meq.amount':          { fa: 'مقدار mEq:', en: 'mEq Amount:' },
    'meq.amountPh':        { fa: 'مقدار بر حسب mEq', en: 'Amount in mEq' },

    // --- ترکیبات mEq (نام علمی انگلیسی؛ در انگلیسی فقط نام علمی) ---
    'meq.kcl':             { fa: 'کلرید پتاسیم (KCl)', en: 'Potassium Chloride (KCl)' },
    'meq.nacl':            { fa: 'کلرید سدیم (NaCl)', en: 'Sodium Chloride (NaCl)' },
    'meq.nahco3':          { fa: 'بیکربنات سدیم', en: 'Sodium Bicarbonate (NaHCO₃)' },
    'meq.cacl2':           { fa: 'کلرید کلسیم (CaCl2)', en: 'Calcium Chloride (CaCl₂)' },
    'meq.mgso4':           { fa: 'سولفات منیزیم (MgSO4)', en: 'Magnesium Sulfate (MgSO₄)' },
    'meq.kphos':           { fa: 'فسفات پتاسیم', en: 'Potassium Phosphate' },
    'meq.cagluc':          { fa: 'گلوکونات کلسیم', en: 'Calcium Gluconate' },

    // --- متن‌های نتیجه/خطای تولیدشده در JS (mEq و دارویی) ---
    'res.perMEq':          { fa: 'به ازای هر', en: 'per' },
    'err.selectCompound':  { fa: 'لطفاً ترکیب دارویی را انتخاب کنید!', en: 'Please select a drug compound!' },
    'err.selectConc':      { fa: 'لطفاً غلظت محلول را انتخاب کنید!', en: 'Please select the solution concentration!' },
    'err.badMEq':          { fa: 'لطفاً مقدار mEq را به درستی وارد کنید!', en: 'Please enter a valid mEq amount!' },
    'err.allValues':       { fa: 'لطفاً تمام مقادیر اصلی را وارد کنید.', en: 'Please enter all required values.' },
    'err.positive':        { fa: 'مقادیر وارد شده باید مثبت باشند.', en: 'Entered values must be positive.' },
    'err.enterWeight':     { fa: 'لطفاً وزن بیمار را وارد کنید.', en: 'Please enter the patient weight.' },
    'err.unitMismatch':    { fa: 'واحد دوز دارو و دوز تجویزی همخوانی ندارند.', en: 'Drug dose and prescribed dose units do not match.' },
    'err.badPrescribed':   { fa: 'واحد دوز تجویزی نامعتبر است یا وزن لازم وارد نشده.', en: 'Invalid prescribed dose unit or missing required weight.' },
    'err.calcError':       { fa: 'خطا در محاسبه یا مقادیر ورودی نامعتبر.', en: 'Calculation error or invalid input values.' },
    'err.enterVolTime':    { fa: 'لطفاً حجم و زمان را به درستی وارد کنید.', en: 'Please enter valid volume and time.' },
    'err.enterAllValues':  { fa: 'لطفاً تمام مقادیر را به درستی وارد کنید.', en: 'Please enter all values correctly.' },
    'warn.rateHigh':       { fa: 'نرخ محاسبه‌شده غیرمعمول و بالاست. لطفاً مقادیر ورودی و واحدها را بازبینی کنید.', en: 'The calculated rate is unusually high. Please review the inputs and units.' },
    'warn.rateLow':        { fa: 'نرخ محاسبه‌شده بسیار پایین است. لطفاً مقادیر ورودی و واحدها را بازبینی کنید.', en: 'The calculated rate is very low. Please review the inputs and units.' },
    'res.rate':            { fa: 'RATE', en: 'RATE' },
    'res.dropsPerMin':     { fa: 'قطرات بر دقیقه', en: 'Drops per minute' },
    'res.mlNeeded':        { fa: 'میلی‌لیتر مورد نیاز', en: 'Required ml' },

    // --- پدیاتریک: برچسب‌های ساختاری پرتکرار ---
    'ped.vl.dose':         { fa: 'مقدار تزریق:', en: 'Dose:' },
    'ped.vl.ampConc':      { fa: 'غلظت آمپول:', en: 'Ampoule Conc.:' },
    'ped.vl.maxDose':      { fa: 'حداکثر دوز:', en: 'Max Dose:' },
    'ped.vl.minDose':      { fa: 'حداقل دوز:', en: 'Min Dose:' },
    'ped.vl.doseRange':    { fa: 'محدوده دوز:', en: 'Dose Range:' },
    'ped.vl.infRate':      { fa: 'سرعت تزریق:', en: 'Infusion Rate:' },
    'ped.vl.maxAllowed':   { fa: 'حداکثر مجاز:', en: 'Max Allowed:' },
    'ped.rl.size':         { fa: 'سایز', en: 'Size' },
    'ped.rl.depth':        { fa: 'عمق (دهانی)', en: 'Depth (oral)' },
    'ped.rl.blade':        { fa: 'تیغه لارنگوسکوپ', en: 'Laryngoscope Blade' },
    'ped.rl.lma':          { fa: 'سایز LMA', en: 'LMA Size' },

    // --- پدیاتریک: عنوان کارت‌ها ---
    'ped.ch.ett':          { fa: 'لوله تراشه', en: 'Endotracheal Tube' },
    'ped.ch.equipment':    { fa: 'تجهیزات', en: 'Equipment' },
    'ped.ch.shock':        { fa: 'مقدار شوک', en: 'Shock Energy' },
    'ped.ch.adrenaline':   { fa: 'آدرنالین (اپینفرین)', en: 'Adrenaline (Epinephrine)' },
    'ped.ch.cardiacDrugs': { fa: 'داروهای قلبی', en: 'Cardiac Drugs' },
    'ped.ch.metabolic':    { fa: 'داروهای متابولیک', en: 'Metabolic Drugs' },
    'ped.ch.antidotes':    { fa: 'آنتی دوت و سایر داروها', en: 'Antidotes & Other Drugs' },
    'ped.ch.intubation':   { fa: 'داروهای لوله گذاری (INTUBATION)', en: 'Intubation Drugs' },
    'ped.ch.dopamine':     { fa: 'دوپامین', en: 'Dopamine' },
    'ped.ch.dobutamine':   { fa: 'دوبوتامین', en: 'Dobutamine' },
    'ped.ch.adrenalineShort':{ fa: 'آدرنالین', en: 'Adrenaline' },
    'ped.ch.noradrenaline':{ fa: 'نورآدرنالین', en: 'Noradrenaline' },
    'ped.ch.milrinone':    { fa: 'میلرینون', en: 'Milrinone' },
    'ped.ch.vasopressin':  { fa: 'وازوپرسین', en: 'Vasopressin' },
    'ped.ch.fentanyl':     { fa: 'فنتانیل', en: 'Fentanyl' },
    'ped.ch.morphine':     { fa: 'مرفین', en: 'Morphine' },
    'ped.ch.midazolam':    { fa: 'میدازولام', en: 'Midazolam' },
    'ped.ch.ketamine':     { fa: 'کتامین', en: 'Ketamine' },
    'ped.ch.dexmedetomidine':{ fa: 'دکسمدتومیدین', en: 'Dexmedetomidine' },
    'ped.ch.rocuronium':   { fa: 'روکورونیوم', en: 'Rocuronium' },
    'ped.ch.thiopentone':  { fa: 'تیوپنتون', en: 'Thiopentone' },
    'ped.ch.labetalol':    { fa: 'لابتالول', en: 'Labetalol' },
    'ped.ch.esmolol':      { fa: 'اسمولول', en: 'Esmolol' },
    'ped.ch.nitroprusside':{ fa: 'نیتروپروساید', en: 'Nitroprusside' },
    'ped.ch.amiodarone':   { fa: 'آمیودارون', en: 'Amiodarone' },
    'ped.ch.lidocaine':    { fa: 'لیدوکائین', en: 'Lidocaine' },
    'ped.ch.procainamide': { fa: 'پروکائین آمید', en: 'Procainamide' },
    'ped.ch.isoprenaline': { fa: 'ایزوپرنالین', en: 'Isoprenaline' },
    'ped.ch.ventolin':     { fa: 'ونتولین', en: 'Ventolin (Salbutamol)' },
    'ped.ch.aminophylline':{ fa: 'آمینوفیلین', en: 'Aminophylline' },
    'ped.ch.lasix':        { fa: 'لازیکس', en: 'Lasix (Furosemide)' },
    'ped.ch.actrapid':     { fa: 'آکتراپید', en: 'Actrapid (Insulin)' },

    // --- پدیاتریک: توضیحات دارو (drug-info) ---
    'ped.di.cardiac10k':   { fa: 'برای ایست قلبی (فرمولاسیون 1:10,000, 0.1mg/ml)', en: 'For cardiac arrest (1:10,000 formulation, 0.1mg/ml)' },
    'ped.di.cardiac1k':    { fa: 'برای ایست قلبی (فرمولاسیون 1:1,000, 1mg/ml)', en: 'For cardiac arrest (1:1,000 formulation, 1mg/ml)' },
    'ped.di.anaphylaxis':  { fa: 'برای آنافیلاکسی (فرمولاسیون 1:1,000, 1mg/ml)', en: 'For anaphylaxis (1:1,000 formulation, 1mg/ml)' },
    'ped.di.infants':      { fa: 'شیرخواران و کودکان کوچک', en: 'Infants and young children' },
    'ped.di.olderChildren':{ fa: 'کودکان بزرگتر و نوجوانان', en: 'Older children and adolescents' },
    'ped.di.slowIV':       { fa: 'تزریق آهسته وریدی در 5-10 دقیقه', en: 'Slow IV over 5-10 minutes' },
    'ped.di.dilute3':      { fa: 'رقیق کردن 3 برابر با D5 (حجم تا 2.9ml با D5)', en: 'Dilute 3-fold with D5 (make up to 2.9ml with D5)' },
    'ped.di.dilute5':      { fa: 'رقیق کردن 5 برابر با D5 (حجم تا 9ml با D5)', en: 'Dilute 5-fold with D5 (make up to 9ml with D5)' },

    // --- پدیاتریک: نام داروها (drug-name) ---
    'ped.dn.adr10kIV':     { fa: 'آدرنالین 1:10,000 وریدی/داخل استخوانی (0.01mg/kg)', en: 'Adrenaline 1:10,000 IV/IO (0.01mg/kg)' },
    'ped.dn.adr1kETT':     { fa: 'آدرنالین 1:1,000 لوله تراشه (0.1mg/kg)', en: 'Adrenaline 1:1,000 ETT (0.1mg/kg)' },
    'ped.dn.adr1kIM':      { fa: 'آدرنالین 1:1,000 عضلانی (0.01mg/kg)', en: 'Adrenaline 1:1,000 IM (0.01mg/kg)' },
    'ped.dn.atropine':     { fa: 'آتروپین (0.02mg/kg)', en: 'Atropine (0.02mg/kg)' },
    'ped.dn.amiodarone':   { fa: 'آمیودارون (5mg/kg)', en: 'Amiodarone (5mg/kg)' },
    'ped.dn.atp':          { fa: 'ATP (0.167mg/kg)', en: 'ATP (0.167mg/kg)' },
    'ped.dn.caGluc':       { fa: 'گلوکونات کلسیم 10% (0.5ml/kg)', en: 'Calcium Gluconate 10% (0.5ml/kg)' },
    'ped.dn.d10':          { fa: 'دکستروز D10 (2.5ml/kg)', en: 'Dextrose D10 (2.5ml/kg)' },
    'ped.dn.d50':          { fa: 'دکستروز D50 (0.5ml/kg)', en: 'Dextrose D50 (0.5ml/kg)' },
    'ped.dn.bicarb':       { fa: 'بیکربنات سدیم 8.4% (1ml/kg)', en: 'Sodium Bicarbonate 8.4% (1ml/kg)' },
    'ped.dn.flumazenil':   { fa: 'فلومازنیل (0.01mg/kg)', en: 'Flumazenil (0.01mg/kg)' },
    'ped.dn.lidocaine':    { fa: 'لیدوکائین 2% (1mg/kg)', en: 'Lidocaine 2% (1mg/kg)' },
    'ped.dn.lorazepam':    { fa: 'لورازپام (0.1mg/kg)', en: 'Lorazepam (0.1mg/kg)' },
    'ped.dn.midazolam':    { fa: 'میدازولام (0.1mg/kg)', en: 'Midazolam (0.1mg/kg)' },
    'ped.dn.mgso4':        { fa: 'سولفات منیزیم 50% (40mg/kg)', en: 'Magnesium Sulfate 50% (40mg/kg)' },
    'ped.dn.naloxone':     { fa: 'نالوکسان (0.1mg/kg)', en: 'Naloxone (0.1mg/kg)' },
    'ped.dn.procainamide': { fa: 'پروکائین آمید (15mg/kg)', en: 'Procainamide (15mg/kg)' },
    'ped.dn.ketamine':     { fa: 'کتامین (1mg/kg)', en: 'Ketamine (1mg/kg)' },
    'ped.dn.fentanyl':     { fa: 'فنتانیل (1mcg/kg)', en: 'Fentanyl (1mcg/kg)' },
    'ped.dn.morphine':     { fa: 'مرفین (0.1mg/kg)', en: 'Morphine (0.1mg/kg)' },
    'ped.dn.etomidate':    { fa: 'اتومیدیت (0.3mg/kg)', en: 'Etomidate (0.3mg/kg)' },
    'ped.dn.propofol':     { fa: 'پروپوفول (1mg/kg)', en: 'Propofol (1mg/kg)' },
    'ped.dn.rocuronium':   { fa: 'روکورونیوم (1mg/kg)', en: 'Rocuronium (1mg/kg)' },
    'ped.dn.sux':          { fa: 'سوکسامتونیوم (1.5mg/kg)', en: 'Suxamethonium (1.5mg/kg)' },
    'ped.dn.neostigmine':  { fa: 'نئوستیگمین (0.05mg/kg)', en: 'Neostigmine (0.05mg/kg)' },
    'ped.dn.sugammadex':   { fa: 'سوگامادکس (16mg/kg)', en: 'Sugammadex (16mg/kg)' },

    // --- پدیاتریک: مقادیر حداکثر دوز دوبخشی (کودک/نوجوان) ---
    'ped.vm.child03':      { fa: 'کودک: 0.3mg / نوجوان: 0.5mg', en: 'Child: 0.3mg / Adolescent: 0.5mg' },
    'ped.vm.child05':      { fa: 'کودک: 0.5mg / نوجوان: 1mg', en: 'Child: 0.5mg / Adolescent: 1mg' },

    // --- پدیاتریک: مقادیر اولیه/واحد و متن‌های JS ---
    'ped.init.kg':         { fa: '- کیلوگرم', en: '- kg' },
    'ped.init.cm':         { fa: '- سانتی‌متر', en: '- cm' },
    'ped.init.joule':      { fa: '- ژول', en: '- J' },
    'ped.unit.kg':         { fa: 'کیلوگرم', en: 'kg' },
    'ped.estimatedWeightArrow': { fa: '→ وزن تخمینی:', en: '→ Estimated weight:' },
    'ped.formula.ett':     { fa: '(سن/4) + 4', en: '(Age/4) + 4' },
    'ped.weightTooLow':    { fa: 'وزن نمی‌تواند کمتر از {min} کیلوگرم باشد', en: 'Weight cannot be less than {min} kg' },
    'ped.weightTooHigh':   { fa: 'وزن نمی‌تواند بیشتر از {max} کیلوگرم باشد', en: 'Weight cannot be more than {max} kg' },

    // --- نتیجه‌ی باکس تغییر غلظت (concentration-replace) ---
    'cr.errAllValues':     { fa: 'لطفاً تمام مقادیر غلظت و حجم محلول موجود را وارد کنید.', en: 'Please enter all concentration and available-volume values.' },
    'cr.errPositive':      { fa: 'تمام مقادیر باید مثبت باشند (غلظت فعلی می‌تواند صفر باشد).', en: 'All values must be positive (current concentration may be zero).' },
    'cr.errStockEqCurrent':{ fa: 'غلظت محلول غلیظ نمی‌تواند با غلظت فعلی یکسان باشد.', en: 'Stock concentration cannot equal the current concentration.' },
    'cr.errRange':         { fa: 'غلظت مورد نیاز باید بین غلظت فعلی ({cur}%) و غلظت محلول غلیظ ({stock}%) باشد.', en: 'Desired concentration must be between current ({cur}%) and stock ({stock}%).' },
    'cr.errInvalid':       { fa: 'مقادیر غلظت نامعتبر هستند.', en: 'Concentration values are invalid.' },
    'cr.errInfVol':        { fa: 'حجم مورد نیاز انفوزیون ({inf} ml) نمی‌تواند از حجم محلول رقیق‌تر موجود ({tot} ml) بیشتر باشد.', en: 'Required infusion volume ({inf} ml) cannot exceed the available diluted volume ({tot} ml).' },
    'cr.desiredConc':      { fa: '✅ غلظت مورد نظر شما: {conc}%', en: '✅ Your desired concentration: {conc}%' },
    'cr.prepTitle':        { fa: '🌟 نحوه تهیه ml {vol} از غلظت {conc}%', en: '🌟 How to prepare {vol} ml of {conc}%' },
    'cr.takeStock':        { fa: 'ml {vol} از محلول غلیظ {conc}% بردارید.', en: 'Take {vol} ml of the {conc}% stock solution.' },
    'cr.takeCurrent':      { fa: 'ml {vol} از محلول رقیق {conc}% (محلول موجود) بردارید.', en: 'Take {vol} ml of the {conc}% diluted (available) solution.' },
    'cr.combine':          { fa: '👈 این دو حجم را با هم ترکیب کنید تا ml {vol} از غلظت {conc}% حاصل شود.', en: '👉 Combine these two volumes to obtain {vol} ml of {conc}%.' },
    'cr.methodATitle':     { fa: '🔄 روش (الف): تغییر غلظت کل محلول موجود (ml {vol})', en: '🔄 Method (A): Change the concentration of the whole available solution ({vol} ml)' },
    'cr.replaceVol':       { fa: 'حجم مورد نیاز برای جایگزینی: ml {vol}', en: 'Volume needed for replacement: {vol} ml' },
    'cr.removeStep':       { fa: 'ml {vol} از محلول {conc}% (محلول موجود) خارج کنید (دور بریزید).', en: 'Remove (discard) {vol} ml of the {conc}% (available) solution.' },
    'cr.addStep':          { fa: 'ml {vol} از محلول غلیظ {conc}% به آن اضافه کنید.', en: 'Add {vol} ml of the {conc}% stock solution to it.' },
    'cr.resultStep':       { fa: '👈 غلظت کل محلول ml {vol} به {conc}% تغییر می‌کند.', en: '👉 The concentration of the whole {vol} ml solution changes to {conc}%.' },

    // --- باکس داروهای ترکیبی (tarkib) ---
    'trk.clinicalNote':    { fa: 'توجه بالینی:', en: 'Clinical Note:' },
    'trk.clinicalNoteBody':{ fa: 'ترکیب داروها در یک سرنگ، استقلال تیتراسیون آن‌ها را از بین می‌برد و تنها با تایید سازگاری شیمیایی مجاز است.', en: 'Mixing drugs in one syringe removes independent titration and is only allowed after confirming chemical compatibility.' },
    'trk.tabNew':          { fa: 'ترکیب دارو در یک سرنگ', en: 'Mix Drugs in One Syringe' },
    'trk.tabFix':          { fa: 'ترمیم (تغییر دوز)', en: 'Adjust (Dose Change)' },
    'trk.basicInfo':       { fa: 'اطلاعات پایه', en: 'Basic Information' },
    'trk.weightOpt':       { fa: 'وزن بیمار (kg) - در صورت نیاز:', en: 'Patient Weight (kg) - if needed:' },
    'trk.weight':          { fa: 'وزن بیمار (کیلوگرم):', en: 'Patient Weight (kg):' },
    'trk.egWeight':        { fa: 'مثال: 70', en: 'e.g., 70' },
    'trk.syringeVol':      { fa: 'حجم کل سرنگ (cc):', en: 'Total Syringe Volume (cc):' },
    'trk.pumpRate':        { fa: 'سرعت پمپ (cc/hr):', en: 'Pump Rate (cc/hr):' },
    'trk.drug1':           { fa: 'داروی اول', en: 'First Drug' },
    'trk.drug2':           { fa: 'داروی دوم', en: 'Second Drug' },
    'trk.drugNameOpt':     { fa: 'نام دارو (اختیاری):', en: 'Drug Name (optional):' },
    'trk.egDopamine':      { fa: 'مثال: دوپامین', en: 'e.g., Dopamine' },
    'trk.egHeparin':       { fa: 'مثال: هپارین', en: 'e.g., Heparin' },
    'trk.ampSpec':         { fa: 'مشخصات آمپول یا ویال (پس از حل شدن):', en: 'Ampoule/Vial specs (after dissolving):' },
    'trk.ampThisDrug':     { fa: 'مشخصات آمپول این دارو:', en: 'Ampoule specs for this drug:' },
    'trk.totalAmount':     { fa: 'مقدار کل', en: 'Total amount' },
    'trk.in':              { fa: 'در', en: 'in' },
    'trk.volCc':           { fa: 'حجم(cc)', en: 'Volume (cc)' },
    'trk.physOrder':       { fa: 'اوردر پزشک:', en: 'Physician Order:' },
    'trk.unit':            { fa: 'واحد:', en: 'Unit:' },
    'trk.newUnit':         { fa: 'واحد جدید:', en: 'New Unit:' },
    'trk.eg5':             { fa: 'مثال: 5', en: 'e.g., 5' },
    'trk.eg800':           { fa: 'مثال: 800', en: 'e.g., 800' },
    'trk.eg8':             { fa: 'مثال: 8', en: 'e.g., 8' },
    'trk.eg10':            { fa: 'مثال: 10', en: 'e.g., 10' },
    'trk.eg30':            { fa: 'مثال: 30', en: 'e.g., 30' },
    'trk.calcPrep':        { fa: 'محاسبه دستور آماده‌سازی', en: 'Calculate Preparation Order' },
    'trk.prepOrder':       { fa: 'دستور آماده‌سازی:', en: 'Preparation Order:' },
    'trk.result1':         { fa: 'داروی اول:', en: 'First Drug:' },
    'trk.result2':         { fa: 'داروی دوم:', en: 'Second Drug:' },
    'trk.pumpSetTo':       { fa: 'پمپ تنظیم شود روی:', en: 'Set pump to:' },
    'trk.finalVol':        { fa: 'حجم نهایی با حلال:', en: 'Final volume with diluent:' },
    'trk.highRisk':        { fa: 'هشدار (High Risk):', en: 'Warning (High Risk):' },
    'trk.highRiskBody':    { fa: 'تزریق داروی جدید به سرنگ در حال کار، خطر عدم توزیع یکنواخت دارد. پس از تزریق، سرنگ را به آرامی میکس کنید.', en: 'Injecting a new drug into a running syringe risks uneven distribution. After injection, mix the syringe gently.' },
    'trk.targetDrug':      { fa: 'داروی تغییر یافته (داروی هدف)', en: 'Changed Drug (Target Drug)' },
    'trk.fixedDrug':       { fa: 'داروی ثابت (نباید تغییر کند)', en: 'Fixed Drug (must not change)' },
    'trk.remainingVol':    { fa: 'حجم باقی‌مانده (cc):', en: 'Remaining Volume (cc):' },
    'trk.currentRate':     { fa: 'سرعت فعلی (cc/hr):', en: 'Current Rate (cc/hr):' },
    'trk.oldOrder':        { fa: 'اوردر قبلی:', en: 'Previous Order:' },
    'trk.newOrder':        { fa: 'اوردر جدید:', en: 'New Order:' },
    'trk.orderAmount':     { fa: 'مقدار اوردر:', en: 'Order Amount:' },
    'trk.calcCorrection':  { fa: 'محاسبه دستور اصلاحی', en: 'Calculate Correction Order' },
    'trk.clinicalGuide':   { fa: 'دستورالعمل بالینی:', en: 'Clinical Instruction:' },
    'trk.newPumpRate':     { fa: 'سرعت جدید پمپ:', en: 'New Pump Rate:' },
    'trk.injectionOrder':  { fa: 'دستور تزریق:', en: 'Injection Instruction:' },

    // --- پیام‌ها و نتایج JS باکس ترکیبی (tarkib.js) ---
    'trk.errSyringeVol':   { fa: 'لطفاً حجم سرنگ را به درستی وارد کنید.', en: 'Please enter a valid syringe volume.' },
    'trk.errPumpRate':     { fa: 'لطفاً سرعت پمپ را به درستی وارد کنید.', en: 'Please enter a valid pump rate.' },
    'trk.errAtLeastOne':   { fa: 'لطفاً دوز اوردر حداقل یکی از داروها را وارد کنید.', en: 'Please enter the order dose of at least one drug.' },
    'trk.errWeightNeeded': { fa: 'برای این واحد دارویی، وارد کردن وزن بیمار الزامی است.', en: 'Patient weight is required for this dosing unit.' },
    'trk.errCurrentRate':  { fa: 'لطفاً سرعت فعلی پمپ را به درستی وارد کنید.', en: 'Please enter a valid current pump rate.' },
    'trk.errOrders':       { fa: 'لطفاً مقادیر اوردر داروها را به درستی وارد کنید.', en: 'Please enter valid drug order values.' },
    'trk.errAmpSpecs':     { fa: 'لطفاً مشخصات آمپول‌ها را برای محاسبه دقیق حجم وارد کنید.', en: 'Please enter ampoule specs for accurate volume calculation.' },
    'trk.errWeightNeeded2':{ fa: 'برای واحدهای انتخابی، وارد کردن وزن بیمار الزامی است.', en: 'Patient weight is required for the selected units.' },
    'trk.errUnitMismatch': { fa: 'خطا در تطبیق واحدها', en: 'Unit mismatch error' },
    'trk.draw':            { fa: 'بکشید', en: 'Draw' },
    'trk.noAmpSpec':       { fa: '(مشخصات آمپول وارد نشده)', en: '(Ampoule specs not entered)' },
    'trk.netNeed':         { fa: 'نیاز خالص:', en: 'Net need:' },
    'trk.scenarioIncrease':{ fa: 'سناریو: افزایش دوز', en: 'Scenario: Dose Increase' },
    'trk.scenarioDecrease':{ fa: 'سناریو: کاهش دوز', en: 'Scenario: Dose Decrease' },
    'trk.scenarioNoChange':{ fa: 'بدون تغییر', en: 'No Change' },
    'trk.noChangeMsg':     { fa: 'دوز جدید با دوز قبلی برابر است. نیازی به هیچ اقدامی نیست.', en: 'The new dose equals the previous dose. No action is needed.' },
    'trk.important':       { fa: 'مهم:', en: 'Important:' },
    'trk.increaseMsg':     { fa: 'ابتدا مقدار <strong style="color:#f1c40f;">{cc} سی‌سی</strong> از آمپول داروی تغییر یافته بکشید و مستقیماً به داخل حجم {vol} سی‌سی باقی‌مانده تزریق کنید. <br><br><strong>{importantLabel}</strong> به دلیل افزایش حجم کل مایع، سرعت پمپ باید کمی افزایش یابد تا دوز داروی ثابت دچار افت نشود.', en: 'First draw <strong style="color:#f1c40f;">{cc} cc</strong> from the changed drug ampoule and inject it directly into the remaining {vol} cc volume. <br><br><strong>{importantLabel}</strong> Because the total fluid volume increases, the pump rate must be slightly increased so the fixed drug dose does not drop.' },
    'trk.decreaseMsg':     { fa: 'برای جبران افت داروی ثابت، مقدار <strong style="color:#f1c40f;">{cc} سی‌سی</strong> از آمپول داروی ثابت بکشید و به داخل سرنگ تزریق کنید. سپس سرعت پمپ را روی عدد جدید تنظیم کنید.', en: 'To compensate for the fixed drug drop, draw <strong style="color:#f1c40f;">{cc} cc</strong> from the fixed drug ampoule and inject it into the syringe. Then set the pump to the new rate.' },
    'trk.cc':              { fa: 'سی‌سی', en: 'cc' },

    // --- باکس محاسبه معکوس دوز (Reverse) ---
    'rev.pumpRate':        { fa: 'سرعت تزریق پمپ (ml/h):', en: 'Pump Infusion Rate (ml/h):' },
    'rev.pumpRatePh':      { fa: 'مثلاً: 8', en: 'e.g., 8' },
    'rev.drugAmount':      { fa: 'مقدار داروی داخل سرنگ:', en: 'Drug Amount in Syringe:' },
    'rev.drugAmountPh':    { fa: 'مقدار دارو', en: 'Drug amount' },
    'rev.syringeVol':      { fa: 'حجم اولیه سرنگ (cc):', en: 'Initial Syringe Volume (cc):' },
    'rev.syringeVolPh':    { fa: 'مثلاً: 50', en: 'e.g., 50' },
    'rev.targetUnit':      { fa: 'واحد مورد نظر:', en: 'Target Unit:' },
    'rev.weight':          { fa: 'وزن بیمار (kg):', en: 'Patient Weight (kg):' },
    'rev.weightPh':        { fa: 'وزن بیمار', en: 'Patient weight' },
    'rev.calcBtn':         { fa: 'محاسبه دوز دریافتی بیمار', en: 'Calculate Patient Dose' },
	
	// باکس BMI
	'box.bmi': {fa: 'محاسبه BMI بزرگسالان', en: 'Calculate BMI for adults' },
	'bmi.weight': {fa: 'وزن (کیلوگرم)', en: 'Weight (Kg)' },
	'bmi.height': {fa: 'قد (سانتی متر)', en: 'Height (Cm)' },
	'bmi.weightPh': {fa: 'مثال: 60', en: 'example: 60' },
	'bmi.heightPh': {fa: 'مثال: 170', en: 'example: 170' },
	'btn.calculateBMI': {fa: 'محاسبه', en: 'Calculate BMI' },

    // --- نتیجه/خطای باکس معکوس (در medmate.js) ---
    'rev.errInputs':       { fa: 'لطفاً سرعت پمپ، مقدار دارو و حجم سرنگ را به درستی وارد کنید.', en: 'Please enter valid pump rate, drug amount, and syringe volume.' },
    'rev.errWeight':       { fa: 'برای محاسبه این واحد، وارد کردن وزن بیمار الزامی است.', en: 'Patient weight is required to calculate this unit.' },
    'rev.errUnitMismatch': { fa: 'واحد داروی داخل سرنگ و واحد تجویزی با هم همخوانی ندارند (mg/mcg با U).', en: 'Syringe drug unit and target unit do not match (mg/mcg vs U).' },
    'rev.receiving':       { fa: 'بیمار با این سرعت در حال دریافت دوز زیر است:', en: 'At this rate, the patient is receiving the following dose:' },
    'rev.concInfo':        { fa: '💡 غلظت: هر سی‌سی از این محلول حاوی', en: '💡 Concentration: each cc of this solution contains' },
    'rev.concInfoTail':    { fa: 'دارو است.', en: 'of drug.' },

    // --- alertهای باقی‌مانده tarkib (تب ترمیم) ---
    'trk.errRemainingVol': { fa: 'لطفاً حجم باقی‌مانده را به درستی وارد کنید.', en: 'Please enter a valid remaining volume.' },

    // --- دکمه‌های عمومی ---
    'btn.calculate':       { fa: 'محاسبه', en: 'Calculate' },
    'btn.calculateDrug':   { fa: 'محاسبه دارو', en: 'Calculate Drug' },
    'btn.calculateMl':     { fa: 'محاسبه میلی‌لیتر مورد نیاز', en: 'Calculate Required ml' },
    'btn.calculateReplace':{ fa: 'محاسبه حجم جایگزینی', en: 'Calculate Replacement Volume' },
    'btn.close':           { fa: 'بستن', en: 'Close' },

    // --- مُدال خرید و فعال‌سازی نسخهٔ پرمیوم ---
    'prem.title':          { fa: 'خرید و فعال‌سازی نسخهٔ کامل', en: 'Buy & Activate Premium' },
    'prem.subtitle':       { fa: 'با فعال‌سازی نسخهٔ کامل، به تمامی ماژول‌ها و محاسبات پیشرفته دسترسی نامحدود پیدا می‌کنید.', en: 'Activate the full version for unlimited access to all modules and advanced calculations.' },
    'prem.featuresTitle':  { fa: 'ویژگی‌های نسخهٔ کامل:', en: 'What you get with Premium:' },
    'prem.feat.percentage':{ fa: 'محاسبات داروهای درصدی', en: 'Percentage drug calculations' },
    'prem.feat.fluidDrip': { fa: 'محاسبهٔ میزان قطرات سرم', en: 'IV fluid drip rate' },
    'prem.feat.microsetDrip':{ fa: 'محاسبهٔ میزان قطرات میکروست', en: 'Microset drip rate' },
    'prem.feat.concentration':{ fa: 'تغییر غلظت محلول‌ها', en: 'Solution concentration change' },
    'prem.feat.meq':       { fa: 'تبدیل mEq به mg و ml', en: 'mEq to mg & ml conversion' },
    'prem.feat.pediatric': { fa: 'ماشین‌حساب اورژانس کودکان', en: 'Pediatric emergency calculator' },
    'prem.feat.reverse':   { fa: 'محاسبهٔ معکوس دوز (Reverse)', en: 'Reverse dose calculation' },
    'prem.feat.tarkib':    { fa: 'محاسبات داروهای ترکیبی', en: 'Mixed drug calculations' },
    'prem.feat.allUnits':  { fa: 'دسترسی به تمام واحدهای دوز (mcg، mcg/kg/min و ...)', en: 'Access to all dosing units (mcg, mcg/kg/min, etc.)' },
    'prem.vpnWarning':     { fa: 'توجه مهم: پیش از خرید، حتماً فیلترشکن (VPN) خود را خاموش کنید؛ در غیر این صورت ممکن است پرداخت در کافه‌بازار ناموفق باشد.', en: 'Important: Please turn off your VPN before purchasing; otherwise the Bazaar payment may fail.' },
    'prem.buyBtn':         { fa: 'خرید و فعال‌سازی', en: 'Buy & Activate' },
    'prem.cancelBtn':      { fa: 'انصراف', en: 'Cancel' }
};

/* ===== js/i18n.js ===== */
/**
 * i18n.js
 * ------------------------------------------------------------
 * منطق چندزبانه (i18n) سبک و بدون‌وابستگی برای MedMate.
 * جدا از دیکشنری ترجمه‌ها (js/translations.js) نگهداری می‌شود.
 *
 * - دو زبان: 'fa' (فارسی، RTL، پیش‌فرض) و 'en' (انگلیسی، LTR).
 * - رشته‌های UI از window.TRANSLATIONS خوانده می‌شوند (کلید نقطه‌ای).
 * - انتخاب زبان در localStorage ذخیره و در اجرای بعدی بازیابی می‌شود.
 * - جهت صفحه (dir) و lang روی <html> با زبان هماهنگ می‌شود.
 * - رویداد کلیک دکمه‌ی زبان با event delegation روی document مدیریت
 *   می‌شود (پایدار در WebView اندروید؛ بدون onclick درون‌خطی).
 *
 * صفت‌های پشتیبانی‌شده روی هر المان:
 *   data-i18n="key"              -> textContent
 *   data-i18n-placeholder="key"  -> placeholder
 *   data-i18n-aria="key"         -> aria-label
 *   data-i18n-title="key"        -> title
 *   data-i18n-content="key"      -> content (مثل <meta>)
 * ------------------------------------------------------------
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'medmate_lang';
    var DEFAULT_LANG = 'fa';
    var SUPPORTED = ['fa', 'en'];

    function readStoredLang() {
        try {
            var v = localStorage.getItem(STORAGE_KEY);
            if (v && SUPPORTED.indexOf(v) !== -1) return v;
        } catch (e) { /* ignore */ }
        return DEFAULT_LANG;
    }

    var currentLang = readStoredLang();

    /**
     * ترجمه‌ی یک کلید UI با interpolation اختیاری.
     * اگر کلید نبود، به فارسی و سپس به خود کلید برمی‌گردد.
     * vars: شیئی از مقادیر برای جایگزینی {name} در متن.
     */
    function t(key, vars) {
        var dict = window.TRANSLATIONS || {};
        var entry = dict[key];
        var template = entry ? (entry[currentLang] || entry.fa || key) : key;
        if (vars) {
            template = template.replace(/\{(\w+)\}/g, function (m, k) {
                return (vars[k] !== undefined && vars[k] !== null) ? vars[k] : m;
            });
        }
        return template;
    }

    function isRTL() {
        return currentLang === 'fa';
    }

    /** اعمال ترجمه روی همه‌ی المان‌های دارای صفت data-i18n* در صفحه. */
    function applyStaticTranslations(root) {
        var scope = root || document;
        scope.querySelectorAll('[data-i18n]').forEach(function (el) {
            el.textContent = t(el.getAttribute('data-i18n'));
        });
        scope.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
        });
        scope.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
            el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
        });
        scope.querySelectorAll('[data-i18n-title]').forEach(function (el) {
            el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
        });
        scope.querySelectorAll('[data-i18n-content]').forEach(function (el) {
            el.setAttribute('content', t(el.getAttribute('data-i18n-content')));
        });
        // به‌روزرسانی aria دکمه‌ی تغییر زبان (ساختار toggle خودش برچسب EN/FA دارد)
        var btn = document.getElementById('langToggleBtn');
        if (btn) {
            btn.setAttribute('aria-label', t('lang.toggleAria'));
            btn.setAttribute('aria-checked', currentLang === 'en' ? 'true' : 'false');
        }
    }

    /** اعمال lang/dir روی <html> متناسب با زبان فعلی. */
    function applyLanguage() {
        if (document.documentElement) {
            document.documentElement.lang = currentLang;
            document.documentElement.dir = isRTL() ? 'rtl' : 'ltr';
        }
        document.body && document.body.classList.toggle('lang-en', currentLang === 'en');
    }

    /** تنظیم زبان فعال، ذخیره در localStorage، اعمال جهت و ترجمه‌ها. */
    function setLang(lang) {
        if (SUPPORTED.indexOf(lang) === -1 || lang === currentLang) return;
        currentLang = lang;
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
        applyLanguage();
        applyStaticTranslations();
        // custom-selectها کپی متنی از option‌ها می‌سازند؛ پس از ترجمه باید بازسازی شوند
        if (typeof window.rebuildCustomSelects === 'function') {
            window.rebuildCustomSelects();
        }
    }

    function toggleLang() {
        setLang(currentLang === 'fa' ? 'en' : 'fa');
    }

    // --- مقداردهی اولیه پس از آماده شدن DOM ---
    function init() {
        applyLanguage();
        applyStaticTranslations();
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // --- event delegation روی document برای دکمه‌ی تغییر زبان ---
    document.addEventListener('click', function (e) {
        var toggle = e.target.closest && e.target.closest('#langToggleBtn');
        if (toggle) {
            e.preventDefault();
            toggleLang();
        }
    });

    // در دسترس‌سازی سراسری برای دیباگ / پل WebView
    window.MedMateI18n = {
        t: t,
        getLang: function () { return currentLang; },
        setLang: setLang,
        toggleLang: toggleLang,
        applyLanguage: applyLanguage,
        applyStaticTranslations: applyStaticTranslations,
        isRTL: isRTL
    };
})();

/* ===== js/calc-core.js ===== */
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
        category = 'نرمال';
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

/* ===== js/drug-main.js ===== */
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

/* ===== js/percentage-calc.js ===== */
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

/* ===== js/fluid-drip.js ===== */
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

/* ===== js/microset-drip.js ===== */
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

/* ===== js/concentration-replace.js ===== */
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

/* ===== js/meq-mg-calc.js ===== */
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

/* ===== js/pediatric-calc.js ===== */
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

/* ===== js/tarkib.js ===== */
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

/* ===== js/medmate.js ===== */
/**
 * MedMate - Final & Complete Code (Modularized Core)
 * Version: 22.5 - FIXED NUMBER DISPLAY & PREMIUM LOCKS & REVERSE CALCULATION
 */

//====================== Helper Functions ======================

// تبدیل اعداد فارسی/عربی به انگلیسی
function toEnglishDigits(str) {
    if (str === undefined || str === null) return '';
    if (typeof str === 'number') {
        str = str.toString();
    }
    if (typeof str !== 'string') return str;

    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let result = str;
    persianNumbers.forEach((p, i) => {
        result = result.replace(new RegExp(p, 'g'), englishNumbers[i]);
    });
    arabicNumbers.forEach((a, i) => {
        result = result.replace(new RegExp(a, 'g'), englishNumbers[i]);
    });
    return result;
}

// فرمت کردن اعداد با اعداد انگلیسی
function formatNumber(num, decimals = null) {
    if (num === undefined || num === null || isNaN(parseFloat(num))) return '';
    const floatNum = parseFloat(num);
    let formatted;
    if (decimals !== null) {
        formatted = floatNum.toFixed(decimals);
    } else {
        if (floatNum % 1 === 0) {
            formatted = floatNum.toString();
        } else {
            formatted = floatNum.toFixed(2);
        }
    }

    if (formatted.includes('.')) {
        formatted = formatted.replace(/0+$/, '').replace(/\.$/, '');
    }

    return '\u200E' + toEnglishDigits(formatted);
}

// اصلاح تمام اعداد در یک المنت و فرزندان آن
function fixNumbersInElement(element) {
    if (!element) return;
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    let node;
    const textNodes = [];
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }
    textNodes.forEach(textNode => {
        const originalText = textNode.textContent;
        const fixedText = toEnglishDigits(originalText);
        if (originalText !== fixedText) {
            textNode.textContent = fixedText;
        }
    });
}

// اصلاح تمام اعداد در صفحه
function fixAllNumbers() {
    document.querySelectorAll('.box.active, .result, .result-value, .value-dose, .primary-val, .cc-val, .calc-result, .drug-field, .conversion-result, .tarkib-result-box').forEach(el => {
        fixNumbersInElement(el);
    });
    fixNumbersInElement(document.body);
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

function updateConcentrationOptions() {
    const concentrationData = window.concentrationData || {};
    const compoundSelect = document.getElementById("compound");
    const concentrationSelect = document.getElementById("concentration");

    if (!compoundSelect || !concentrationSelect) return;

    const wrapper = concentrationSelect.closest('.custom-select-wrapper');
    if (!wrapper) return;
    const triggerSpan = wrapper.querySelector('.custom-select-trigger span');
    const optionsContainer = wrapper.querySelector('.custom-options');
    const trigger = wrapper.querySelector('.custom-select-trigger');

    concentrationSelect.innerHTML = "";
    optionsContainer.innerHTML = "";

    const compoundValue = compoundSelect.value;

    if (!compoundValue) {
        var selectFirstTxt = (window.MedMateI18n && window.MedMateI18n.t) ? window.MedMateI18n.t('meq.selectFirst') : 'ابتدا ترکیب را انتخاب کنید';
        concentrationSelect.innerHTML = '<option value="" data-i18n="meq.selectFirst">' + selectFirstTxt + '</option>';
        triggerSpan.textContent = selectFirstTxt;
        trigger.classList.add('placeholder');
        return;
    }

    const compoundName = compoundValue.split(",")[2];
    const options = concentrationData[compoundName];

    if (options) {
        let isFirstOption = true;
        let optionIndex = 0;

        for (const [text, value] of Object.entries(options)) {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = text;
            concentrationSelect.appendChild(option);

            const customOption = document.createElement('span');
            customOption.classList.add('custom-option');
            customOption.textContent = text;
            customOption.dataset.value = value;
            customOption.style.transitionDelay = `${optionIndex * 0.03}s`;

            customOption.addEventListener('click', function() {
                if (optionsContainer.querySelector('.selected')) {
                    optionsContainer.querySelector('.selected').classList.remove('selected');
                }
                this.classList.add('selected');

                triggerSpan.textContent = this.textContent;
                concentrationSelect.value = this.dataset.value;
                concentrationSelect.dispatchEvent(new Event('change'));

                trigger.classList.remove('placeholder');
                wrapper.querySelector('.custom-select').classList.remove('open');
            });

            optionsContainer.appendChild(customOption);

            if (isFirstOption) {
                option.selected = true;
                customOption.classList.add('selected');
                triggerSpan.textContent = text;
                trigger.classList.remove('placeholder');
                isFirstOption = false;
            }
            optionIndex++;
        }
        concentrationSelect.dispatchEvent(new Event('change'));
    }
}

//====================== Main Application Logic ======================
document.addEventListener('DOMContentLoaded', function() {

    // --- Premium Content Locking Logic (Poolakey) ---
    let isPremiumUser = true;
    if (typeof Android !== 'undefined') {
        isPremiumUser = true(); //Android.isPremium
    } else {
        // برای حالت تست در مرورگر کامپیوتر
        isPremiumUser = true;
    }

    if (!isPremiumUser) {
        const boxes = document.querySelectorAll('.box');

        // حلقه از ایندکس 1 شروع می‌شود تا باکس اول (محاسبات دارویی) باز بماند
        for (let i = 1; i < boxes.length; i++) {
            // باکس‌های لینک‌دار (مثل دانلود نسخه پیشرفته) را قفل نمی‌کنیم
            if (!boxes[i].hasAttribute('data-link')) {
                boxes[i].classList.add('locked-box');

                const lockOverlay = document.createElement('div');
                lockOverlay.className = 'lock-overlay';

                // قرار دادن فقط آیکون بدون نوشته اضافی
                lockOverlay.innerHTML = '<div class="lock-icon-container"><i class="fas fa-lock"></i></div>';

                boxes[i].appendChild(lockOverlay);

                lockOverlay.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    // نمایش مدال شیک پریمیوم
                    showChicPremiumModal();
                });
            }
        }

        // --- کدهای جدید برای قفل کردن واحدهای محاسبات دارویی ---
        const drugDoseSelect = document.getElementById('drugDoseUnit');
        if (drugDoseSelect) {
            Array.from(drugDoseSelect.options).forEach(option => {
                if (option.value !== 'mg') option.disabled = true;
            });
            drugDoseSelect.value = 'mg'; // ثابت کردن روی پارامتر مجاز
        }

        const prescribedDoseSelect = document.getElementById('prescribedDoseUnit');
        if (prescribedDoseSelect) {
            Array.from(prescribedDoseSelect.options).forEach(option => {
                if (option.value !== 'mg/h') option.disabled = true;
            });
            prescribedDoseSelect.value = 'mg/h'; // ثابت کردن روی پارامتر مجاز
        }
        // ---------------------------------------------------------
    }

    // تابع جدید برای ساخت و نمایش مُدال شیک
    // کمکی: ترجمه‌ی کلید با fallback در صورت نبود سیستم i18n
    function tr(key) {
        if (window.MedMateI18n && typeof window.MedMateI18n.t === 'function') {
            return window.MedMateI18n.t(key);
        }
        var dict = window.TRANSLATIONS || {};
        var entry = dict[key];
        return entry ? (entry.fa || key) : key;
    }

    // ساخت و نمایش مُدال تأییدِ خرید (خرید و فعال‌سازی / انصراف)
    // به‌جای انتقال مستقیم به پرداخت، ابتدا ویژگی‌های نسخهٔ کامل و هشدار
    // خاموش‌کردن فیلترشکن نمایش داده می‌شود؛ پرداخت فقط با تأیید کاربر آغاز می‌شود.
    function showChicPremiumModal() {
        // همیشه مُدال را دوباره می‌سازیم تا متن با زبانِ فعلی (fa/en) هماهنگ باشد
        let existing = document.getElementById('chic-premium-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'chic-premium-modal';
        modal.className = 'chic-modal-overlay';

        // لیست ویژگی‌های نسخهٔ پرمیوم (بر اساس ماژول‌های قفل‌شدهٔ برنامه)
        const featureKeys = [
            'prem.feat.percentage',
            'prem.feat.fluidDrip',
            'prem.feat.microsetDrip',
            'prem.feat.concentration',
            'prem.feat.meq',
            'prem.feat.pediatric',
            'prem.feat.reverse',
            'prem.feat.tarkib',
            'prem.feat.allUnits'
        ];
        const featuresHtml = featureKeys.map(function (k) {
            // آیتم آخر (دسترسی به همهٔ واحدها) متن بلندتری دارد؛ تمام‌عرض نمایش داده می‌شود
            var cls = (k === 'prem.feat.allUnits') ? ' class="prem-feat-full"' : '';
            return '<li' + cls + '><i class="fas fa-check-circle"></i><span>' + tr(k) + '</span></li>';
        }).join('');

        modal.innerHTML = `
            <div class="chic-modal-content premium-purchase">
                <div class="chic-modal-icon">
                    <i class="fas fa-crown"></i>
                </div>
                <h3 class="chic-modal-title">${tr('prem.title')}</h3>
                <p class="chic-modal-text">${tr('prem.subtitle')}</p>

                <div class="prem-features-title">${tr('prem.featuresTitle')}</div>
                <ul class="prem-features-list">${featuresHtml}</ul>

                <div class="prem-vpn-warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>${tr('prem.vpnWarning')}</span>
                </div>

                <div class="prem-actions">
                    <button type="button" class="prem-btn prem-btn-buy" id="premBuyBtn">
                        <i class="fas fa-crown"></i> ${tr('prem.buyBtn')}
                    </button>
                    <button type="button" class="prem-btn prem-btn-cancel" id="premCancelBtn">
                        ${tr('prem.cancelBtn')}
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // نمایش با انیمیشن
        requestAnimationFrame(() => {
            modal.classList.add('show');
        });
    }

    function closeChicPremiumModal() {
        const modal = document.getElementById('chic-premium-modal');
        if (!modal) return;
        modal.classList.remove('show');
        setTimeout(() => { if (modal && modal.parentNode) modal.remove(); }, 400);
    }

    // event delegation روی document (پایدار در WebView اندروید؛ بدون onclick درون‌خطی)
    document.addEventListener('click', function (e) {
        const target = e.target;
        if (!target || !target.closest) return;

        // دکمهٔ «خرید و فعال‌سازی» → آغاز پرداخت درون‌برنامه‌ای
        if (target.closest('#premBuyBtn')) {
            e.preventDefault();
            if (typeof Android !== 'undefined' && typeof Android.purchasePremium === 'function') {
                Android.purchasePremium();
            } else {
                console.log('انتقال به کافه بازار (شبیه‌سازی)');
            }
            closeChicPremiumModal();
            return;
        }

        // دکمهٔ «انصراف» یا کلیک روی پس‌زمینهٔ تیره → بستن بدون پرداخت
        if (target.closest('#premCancelBtn') || target.id === 'chic-premium-modal') {
            e.preventDefault();
            closeChicPremiumModal();
        }
    });
    // ------------------------------------------------------------------

    // --- MutationObserver برای اصلاح خودکار اعداد ---
    const observer = new MutationObserver(function(mutations) {
        let needsFix = false;
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        if (node.classList && (
                            node.classList.contains('result') ||
                            node.classList.contains('result-value') ||
                            node.classList.contains('value-dose') ||
                            node.classList.contains('primary-val') ||
                            node.classList.contains('cc-val') ||
                            node.classList.contains('calc-result') ||
                            node.classList.contains('drug-field') ||
                            node.classList.contains('conversion-result') ||
                            node.classList.contains('tarkib-result-box')
                        )) {
                            needsFix = true;
                        }
                        if (node.querySelectorAll) {
                            if (node.querySelectorAll('.result, .result-value, .value-dose, .primary-val, .cc-val, .calc-result, .drug-field, .conversion-result, .tarkib-result-box').length > 0) {
                                needsFix = true;
                            }
                        }
                    }
                });
            }
            if (mutation.type === 'characterData') {
                needsFix = true;
            }
        });
        if (needsFix) {
            setTimeout(fixAllNumbers, 10);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });

    // --- Menu & Video Player Logic ---
    const menuToggleBtn = document.querySelector('.menu-toggle');
    const menuWrapper = document.getElementById('menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const body = document.body;

    const openMenu = () => { if (menuWrapper && menuOverlay) body.classList.add('menu-is-open'); };
    const closeMenu = () => { if (menuWrapper && menuOverlay) body.classList.remove('menu-is-open'); };

    if (menuToggleBtn) { menuToggleBtn.addEventListener('click', () => { body.classList.contains('menu-is-open') ? closeMenu() : openMenu(); }); }
    if (menuOverlay) { menuOverlay.addEventListener('click', closeMenu); }
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && body.classList.contains('menu-is-open')) { closeMenu(); } });

    const videoModal = document.getElementById('video-player-modal');
    const videoContainer = document.getElementById('video-container');
    const closeVideoModalBtn = document.getElementById('close-video-modal-btn');
    const closeVideoModal = () => { if (videoModal) videoModal.classList.remove('visible'); if (videoContainer) videoContainer.innerHTML = ''; };

    if (menuWrapper) {
        menuWrapper.addEventListener('click', (e) => {
            const videoLink = e.target.closest('a.video-link');
            const actionLink = e.target.closest('a[data-action]');
            if (videoLink) {
                e.preventDefault();
                const videoSrc = videoLink.getAttribute('data-video-src');
                if (videoSrc && videoContainer && videoModal) {
                    closeMenu();
                    videoContainer.innerHTML = `<iframe src="${videoSrc}" allow="autoplay" allowfullscreen="true" frameborder="0"></iframe>`;
                    videoModal.classList.add('visible');
                }
            } else if (actionLink) {
                const action = actionLink.getAttribute('data-action');
                if (action === 'update-check') {
                    // در نسخه‌ی اندروید (WebView با پل Android) از مکانیزم بروزرسانی
                    // داخل‌برنامه‌ای استفاده می‌شود؛ در غیر این صورت (وب/مرورگر) به
                    // لینک href (صفحه‌ی کافه‌بازار) هدایت می‌شود.
                    if (typeof Android !== 'undefined' && typeof Android.startUpdateCheck === 'function') {
                        e.preventDefault();
                        Android.startUpdateCheck();
                        closeMenu();
                    } else {
                        // preventDefault نمی‌کنیم تا مرورگر لینک href را باز کند.
                        closeMenu();
                    }
                } else {
                    e.preventDefault();
                    closeMenu();
                }
            } else if (e.target.closest('a')) {
                closeMenu();
            }
        });
    }

    if (closeVideoModalBtn) closeVideoModalBtn.addEventListener('click', closeVideoModal);
    if (videoModal) videoModal.addEventListener('click', (e) => { if (e.target === videoModal) closeVideoModal(); });

    // --- DOM Caching and Fullscreen Logic ---
    let originalBoxPosition = null;
    const navBar = document.querySelector('.nav-bar-container');
    const navbarAppIcon = document.querySelector('.navbar-app-icon');
    const boxesContainer = document.querySelector('.boxes-container');
    const datetimeElement = document.getElementById('datetime');
    const pwaInstallLinkInMenu = document.getElementById('pwaInstallLink');
    const customIcons = document.querySelectorAll('.custom-icon');

    const prescribedDoseUnit = document.getElementById('prescribedDoseUnit');
    const infusionTimeUnit = document.getElementById('infusionTimeUnit');
    const infusionTimeValue = document.getElementById('infusionTimeValue');
    const microsetInfusionTimeUnit = document.getElementById('microsetInfusionTimeUnit');
    const microsetInfusionTimeValue = document.getElementById('microsetInfusionTimeValue');
    const weightInputBox = document.getElementById('weightInput');
    const compoundSelect = document.getElementById("compound");

    const installModal = document.getElementById('install-guide-modal');
    const showInstallGuideBtn = document.getElementById('show-install-guide-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalTabs = document.querySelectorAll('#install-guide-modal .modal-tab-btn');
    const promoOverlay = document.getElementById('promo-overlay');
    const closePromoBtn = document.getElementById('close-promo');

    function openBox(box) {
        if (!box || box.classList.contains('active')) return;
        const originalColor = window.getComputedStyle(box).backgroundColor;
        box.style.backgroundColor = originalColor;
        const navBarHeight = navBar ? navBar.offsetHeight : 0;
        box.style.top = `${navBarHeight}px`;
        originalBoxPosition = { parent: box.parentElement, nextSibling: box.nextElementSibling };
        document.body.appendChild(box);
        setTimeout(() => {
            box.classList.add('active');
            document.body.classList.add('fullscreen-active');
            setTimeout(fixAllNumbers, 50);
        }, 10);
        if (boxesContainer) boxesContainer.classList.add('box-is-active');
    }

    function closeBox(box) {
        if (!box || !originalBoxPosition) return;
        box.classList.remove('active');
        document.body.classList.remove('fullscreen-active');
        setTimeout(() => {
            box.style.backgroundColor = '';
            box.style.top = '';
            if (originalBoxPosition.nextSibling) {
                originalBoxPosition.parent.insertBefore(box, originalBoxPosition.nextSibling);
            } else {
                originalBoxPosition.parent.appendChild(box);
            }
            originalBoxPosition = null;
            if (boxesContainer) boxesContainer.classList.remove('box-is-active');
        }, 350);
    }

    function promptInstall() {
        if (typeof deferredPrompt !== 'undefined' && deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(choice => console.log(`User choice: ${choice.outcome}`));
            deferredPrompt = null;
        } else {
            alert('برای نصب برنامه، از منوی مرورگر خود (سه نقطه) گزینه "Install app" یا "Add to Home screen" را انتخاب کنید.');
        }
    }

    function adjustTimeInput(unitElement, timeInputElement) {
        if (!unitElement || !timeInputElement) return;
        const isMinutes = unitElement.value === 'minutes';
        timeInputElement.step = isMinutes ? '1' : '0.1';
        timeInputElement.min = isMinutes ? '1' : '0.1';
        // کلید ترجمه را روی المان می‌گذاریم تا با تغییر زبان هم درست به‌روز شود،
        // و متن فعلی را با زبان جاری تنظیم می‌کنیم.
        const phKey = isMinutes ? 'fluid.egMinutes' : 'fluid.egHours';
        const fallback = isMinutes ? 'مثال: 30' : 'مثال: 1.5';
        timeInputElement.setAttribute('data-i18n-placeholder', phKey);
        timeInputElement.placeholder = (window.MedMateI18n && window.MedMateI18n.t) ? window.MedMateI18n.t(phKey) : fallback;
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
                    replacement.className = iconClass;
                    Object.assign(replacement.style, { fontSize: '40px', marginBottom: '15px', color: '#2c3e50', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' });
                    this.parentNode.insertBefore(replacement, this);
                    this.remove();
                };
            });
        }
    }

    let onlineBaseTime = null;
    let syncPerformanceTime = null;

    async function syncOnlineTime() {
        try {
            const response = await fetch(
                'https://timeapi.io/api/Time/current/zone?timeZone=Asia/Tehran',
                { cache: 'no-store' }
            );

            if (!response.ok) {
                throw new Error('Online time request failed');
            }

            const data = await response.json();

            // ساخت زمان مستقل از منطقه زمانی سیستم
            onlineBaseTime = Date.UTC(
                data.year,
                data.month - 1,
                data.day,
                data.hour,
                data.minute,
                data.seconds,
                data.milliSeconds || 0
            );

            syncPerformanceTime = performance.now();
            updateDateTime();
        } catch (error) {
            console.warn('Online time sync failed:', error);

            if (onlineBaseTime === null && datetimeElement) {
                datetimeElement.innerText = 'خطا در دریافت زمان آنلاین';
            }
        }
    }

    function updateDateTime() {
        if (!datetimeElement || onlineBaseTime === null) return;

        const now = new Date(
            onlineBaseTime + performance.now() - syncPerformanceTime
        );

        const parts = new Intl.DateTimeFormat(
            'en-US-u-ca-persian-nu-latn',
            {
                timeZone: 'UTC',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }
        ).formatToParts(now);

        const p = {};
        parts.forEach(part => p[part.type] = part.value);

        const time = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'UTC',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hourCycle: 'h23'
        }).format(now);

        datetimeElement.innerText =
            `${p.year}/${p.month}/${p.day} ${time}`;
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

    // بازسازی custom-selectها: wrapperها را باز می‌کند و select اصلی را برمی‌گرداند،
    // سپس دوباره می‌سازد. برای هماهنگی با تغییر زبان (متن option‌ها تازه ترجمه شده‌اند).
    window.rebuildCustomSelects = function () {
        document.querySelectorAll('.custom-select-wrapper').forEach(function (wrapper) {
            var sel = wrapper.querySelector('select');
            if (!sel) { wrapper.remove(); return; }
            sel.style.display = '';
            wrapper.parentNode.insertBefore(sel, wrapper);
            wrapper.remove();
        });
        initializeCustomSelects();
    };

    function initializeCustomSelects() {
        document.querySelectorAll('select').forEach(originalSelect => {
            if (originalSelect.closest('.custom-select-wrapper')) {
                return;
            }

            const wrapper = document.createElement('div');
            wrapper.classList.add('custom-select-wrapper');

            const customSelect = document.createElement('div');
            customSelect.classList.add('custom-select');

            const trigger = document.createElement('div');
            trigger.classList.add('custom-select-trigger');

            const triggerSpan = document.createElement('span');

            const selectedOption = originalSelect.options[originalSelect.selectedIndex];
            triggerSpan.textContent = selectedOption.textContent;
            if (selectedOption.disabled) {
                trigger.classList.add('placeholder');
            }

            trigger.appendChild(triggerSpan);

            const optionsContainer = document.createElement('div');
            optionsContainer.classList.add('custom-options');

            let optionIndex = 0;
            for (const option of originalSelect.options) {
                const customOption = document.createElement('span');
                customOption.classList.add('custom-option');
                customOption.style.transitionDelay = `${optionIndex * 0.03}s`;

                if (option.disabled) {
                    customOption.classList.add('locked-option');
                    customOption.innerHTML = `${option.textContent} <i class="fas fa-lock" style="font-size:10px; margin-right:5px; color:#f39c12;"></i>`;
                    customOption.style.color = '#999';
                    customOption.style.cursor = 'not-allowed';

                    customOption.addEventListener('click', function(e) {
                        e.stopPropagation(); // فقط جلوگیری از بسته شدن منوی کشویی، بدون نمایش مدال پرداخت
                    });
                } else {
                    customOption.textContent = option.textContent;
                    customOption.dataset.value = option.value;

                    if (option.selected) {
                        customOption.classList.add('selected');
                    }

                    customOption.addEventListener('click', function() {
                        if (optionsContainer.querySelector('.selected')) {
                            optionsContainer.querySelector('.selected').classList.remove('selected');
                        }
                        this.classList.add('selected');

                        triggerSpan.textContent = this.textContent;
                        originalSelect.value = this.dataset.value;
                        originalSelect.dispatchEvent(new Event('change'));

                        trigger.classList.remove('placeholder');
                        customSelect.classList.remove('open');
                    });
                }

                optionsContainer.appendChild(customOption);
                optionIndex++;
            }

            customSelect.appendChild(trigger);
            customSelect.appendChild(optionsContainer);
            wrapper.appendChild(customSelect);

            originalSelect.parentNode.insertBefore(wrapper, originalSelect);
            wrapper.appendChild(originalSelect);

            originalSelect.style.display = 'none';

            trigger.addEventListener('click', () => {
                customSelect.classList.toggle('open');
            });
        });

        document.addEventListener('click', function(e) {
            document.querySelectorAll('.custom-select.open').forEach(select => {
                if (!select.contains(e.target)) {
                    select.classList.remove('open');
                }
            });
        });
    }

    // --- Event Listeners ---

    if (showInstallGuideBtn && installModal) {
        showInstallGuideBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeMenu();
            installModal.classList.add('visible');
        });
    }
    if (closeModalBtn) { closeModalBtn.addEventListener('click', () => installModal.classList.remove('visible')); }
    if (installModal) { installModal.addEventListener('click', (e) => { if (e.target === installModal) { installModal.classList.remove('visible'); } }); }

    if (modalTabs) {
        modalTabs.forEach(tab => { tab.addEventListener('click', () => switchTab(tab.dataset.tab)); });
    }

    // پاک‌کردن محتویات همه‌ی باکس‌ها (به‌جای رفرش صفحه) با کلیک روی لوگوی نوار بالا
    function clearAllInputs() {
        // از selector مبتنی بر .box استفاده می‌شود (نه .boxes-container) تا باکسِ
        // بازشده که به body منتقل شده نیز پوشش داده شود.
        // خالی کردن همه‌ی ورودی‌های عددی و متنی
        document.querySelectorAll('.box input[type="number"], .box input[type="text"]').forEach(function (inp) {
            inp.value = '';
        });
        // بازگرداندن select‌ها به گزینه‌ی اول و همگام‌سازی نمایش custom-select
        document.querySelectorAll('.box select').forEach(function (sel) {
            sel.selectedIndex = 0;
            sel.dispatchEvent(new Event('change'));
        });
        // پاک‌کردن نواحی نتیجه
        document.querySelectorAll('.box .result, .box [id$="Result"]').forEach(function (el) {
            el.innerHTML = '';
        });
        // پنهان کردن جعبه‌های نتیجه‌ی ترکیبی
        ['resultBoxNew', 'resultBoxFix'].forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
        // بازسازی custom-selectها تا نمایش با مقادیر بازنشانی‌شده هماهنگ شود
        if (typeof window.rebuildCustomSelects === 'function') window.rebuildCustomSelects();
    }
    window.clearAllInputs = clearAllInputs;

    if (navbarAppIcon) {
        navbarAppIcon.style.cursor = 'pointer';
        navbarAppIcon.addEventListener('click', clearAllInputs);
    }

    if (pwaInstallLinkInMenu) {
        pwaInstallLinkInMenu.addEventListener('click', (e) => {
            e.preventDefault();
            closeMenu();
            promptInstall();
        });
    }

    if (boxesContainer) {
        boxesContainer.addEventListener('click', function(e) {
            const header = e.target.closest('.box-header');
            if (header) {
                const box = header.parentElement;
                if (box.getAttribute('data-link')) {
                    window.open(box.getAttribute('data-link'), '_blank');
                    return;
                }
                const isActive = box.classList.contains('active');
                if (!isActive) {
                    openBox(box);
                }
            }
        });
    }

    document.body.addEventListener('click', function(e) {
        const closeButton = e.target.closest('.close-btn');
        if (closeButton) {
            const activeBox = closeButton.closest('.box.active');
            if (activeBox) {
                closeBox(activeBox);
            }
            return;
        }

        const icon = e.target.closest('.custom-icon');
        const activeBox = e.target.closest('.box.active');

        if (icon && activeBox && activeBox.contains(icon)) {
            closeBox(activeBox);
        }
    });


    // --- محاسبه دارو بدون محدودیت برای واحدهای باز ---
    const calculateDrugBtn = document.getElementById('calculateDrugBtn');
    if (calculateDrugBtn) {
        calculateDrugBtn.addEventListener('click', function(e) {
            if (typeof window.calculateDrugMain === 'function') {
                window.calculateDrugMain();
                setTimeout(fixAllNumbers, 50);
            }
        }, true);
    }

    // اضافه شدن شنونده دکمه محاسبه معکوس
    document.getElementById('calculateReverseBtn')?.addEventListener('click', function(e) {
        if (typeof window.calculateReverseMain === 'function') {
            window.calculateReverseMain();
            setTimeout(fixAllNumbers, 50);
        }
    });

    const reverseTargetUnitSelect = document.getElementById('reverseTargetUnit');
    if (reverseTargetUnitSelect) {
        reverseTargetUnitSelect.addEventListener('change', toggleReverseWeightInput);
    }
    // یک بار فراخوانی اولیه برای تنظیم وضعیت نمایش فیلد وزن
    if (typeof toggleReverseWeightInput === 'function') {
        toggleReverseWeightInput();
    }
    // ------------------------------------------------------------------


    document.getElementById('calculatePercentageDrugBtn')?.addEventListener('click', function(e) {
        if (typeof window.calculatePercentageDrugMain === 'function') {
            window.calculatePercentageDrugMain();
            setTimeout(fixAllNumbers, 50);
        }
    });
    document.getElementById('calculateFluidBtn')?.addEventListener('click', function(e) {
        if (typeof window.calculateFluidMain === 'function') {
            window.calculateFluidMain();
            setTimeout(fixAllNumbers, 50);
        }
    });
    document.getElementById('calculateMicrosetBtn')?.addEventListener('click', function(e) {
        if (typeof window.calculateMicrosetMain === 'function') {
            window.calculateMicrosetMain();
            setTimeout(fixAllNumbers, 50);
        }
    });
	document.getElementById('calculateBMIBtn')?.addEventListener('click', function() {
		if (typeof window.calculateBMIMain === 'function') {
			window.calculateBMIMain();
			setTimeout(fixAllNumbers, 50);
		}
	});
    document.getElementById('calculateReplacementBtn')?.addEventListener('click', function(e) {
        if (typeof window.calculateReplacementMain === 'function') {
            window.calculateReplacementMain();
            setTimeout(fixAllNumbers, 50);
        }
    });
    document.getElementById('compound')?.addEventListener('change', updateConcentrationOptions);
    document.getElementById('calculateMgFromMEqBtn')?.addEventListener('click', function(e) {
        if (typeof window.calculateMgFromMEqMain === 'function') {
            window.calculateMgFromMEqMain();
            setTimeout(fixAllNumbers, 50);
        }
    });

    if (prescribedDoseUnit) prescribedDoseUnit.addEventListener('change', toggleWeightInput);
    if (infusionTimeUnit) infusionTimeUnit.addEventListener('change', () => adjustTimeInput(infusionTimeUnit, infusionTimeValue));
    if (microsetInfusionTimeUnit) microsetInfusionTimeUnit.addEventListener('change', () => adjustTimeInput(microsetInfusionTimeUnit, microsetInfusionTimeValue));
    if (compoundSelect) compoundSelect.addEventListener('change', updateConcentrationOptions);

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

	syncOnlineTime();

	setInterval(updateDateTime, 1000);
	setInterval(syncOnlineTime, 5 * 60 * 1000);
	
    toggleWeightInput();
    adjustTimeInput(infusionTimeUnit, infusionTimeValue);
    adjustTimeInput(microsetInfusionTimeUnit, microsetInfusionTimeValue);
    handleIconErrors();

    initializeCustomSelects();

    if (!sessionStorage.getItem('promoShown')) {
        setTimeout(() => {
            showPromoModal();
            sessionStorage.setItem('promoShown', 'true');
        }, 1000);
    }

    window.addEventListener('load', function() {
        setTimeout(function() {
            if (typeof window.initializeModernPediatricCalculator === 'function') {
                window.initializeModernPediatricCalculator();
                setTimeout(fixAllNumbers, 100);
            }
            if (typeof updateConcentrationOptions === 'function') {
                updateConcentrationOptions();
            }
            fixAllNumbers();
        }, 500);
    });
});

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; });
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('https://fifthidea.github.io/medmate/sw.js').then(reg => {
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

// ====================== توابع محاسبات معکوس اضافه شده در انتهای فایل ======================

function toggleReverseWeightInput() {
    const targetUnit = document.getElementById('reverseTargetUnit');
    const weightContainer = document.getElementById('reverseWeightContainer');

    if (targetUnit && weightContainer) {
        if (targetUnit.value.includes('kg')) {
            weightContainer.style.display = 'block';
        } else {
            weightContainer.style.display = 'none';
        }
    }
}
window.toggleReverseWeightInput = toggleReverseWeightInput;

function calculateReverseMain() {
    var rtr = function (key, faFallback) {
        return (window.MedMateI18n && typeof window.MedMateI18n.t === 'function') ? window.MedMateI18n.t(key) : faFallback;
    };
    const rate = parseFloat(document.getElementById('reverseRate').value);
    const drugAmount = parseFloat(document.getElementById('reverseDrugAmount').value);
    const drugUnit = document.getElementById('reverseDrugUnit').value;
    const syringeVol = parseFloat(document.getElementById('reverseSyringeVolume').value);
    const targetUnit = document.getElementById('reverseTargetUnit').value;
    const weightInput = document.getElementById('reverseWeight').value;
    const weight = parseFloat(weightInput);
    const resultDiv = document.getElementById('reverseResult');

    if (isNaN(rate) || isNaN(drugAmount) || isNaN(syringeVol) || rate <= 0 || drugAmount <= 0 || syringeVol <= 0) {
        resultDiv.innerHTML = `<div class="error" style="width: 100%;">${rtr('rev.errInputs','لطفاً سرعت پمپ، مقدار دارو و حجم سرنگ را به درستی وارد کنید.')}</div>`;
        return;
    }

    const isWeightBased = targetUnit.includes('kg');
    const hasWeight = !isNaN(weight) && weight > 0;

    if (isWeightBased && !hasWeight) {
        resultDiv.innerHTML = `<div class="error" style="width: 100%;">${rtr('rev.errWeight','برای محاسبه این واحد، وارد کردن وزن بیمار الزامی است.')}</div>`;
        return;
    }

    const isDrugU = (drugUnit === 'U');
    const isTargetU = targetUnit.includes('U');
    if (isDrugU !== isTargetU) {
        resultDiv.innerHTML = `<div class="error" style="width: 100%;">${rtr('rev.errUnitMismatch','واحد داروی داخل سرنگ و واحد تجویزی با هم همخوانی ندارند (mg/mcg با U).')}</div>`;
        return;
    }

    const concPerMl = drugAmount / syringeVol;
    let totalPerHour = concPerMl * rate;
    let finalResult = 0;

    if (isTargetU) {
        finalResult = totalPerHour;
    } else {
        let amountInMg = (drugUnit === 'mcg') ? (totalPerHour / 1000) : totalPerHour;
        if (targetUnit.includes('mcg')) {
            finalResult = amountInMg * 1000;
        } else {
            finalResult = amountInMg;
        }
    }

    if (targetUnit.includes('/min')) {
        finalResult = finalResult / 60;
    }

    if (isWeightBased) {
        finalResult = finalResult / weight;
    }

    resultDiv.innerHTML = `
        <div style="font-size: 13px; color: var(--text-secondary, #5a6b7b); margin-bottom: 5px;">${rtr('rev.receiving','بیمار با این سرعت در حال دریافت دوز زیر است:')}</div>
        <div style="direction:ltr; display:flex; justify-content:center; align-items:center; gap: 8px;">
            <bdi style="font-weight:900; color:#27ae60; font-size:22px; font-family:'Courier New', monospace; background:rgba(39, 174, 96, 0.12); padding:4px 12px; border-radius:6px; border:1px solid rgba(39, 174, 96, 0.35); box-shadow: 0 2px 4px rgba(0,0,0,0.05);">${formatNumber(finalResult, 3)}</bdi>
            <span style="font-family:monospace; color:var(--text-secondary, #34495e); font-weight:bold; font-size:16px;">${targetUnit}</span>
        </div>
        <div style="font-size: 13.5px; font-weight: bold; color: var(--text-primary, #2c3e50); margin-top: 12px; padding-top: 10px; border-top: 1px dashed var(--border-color, rgba(0,0,0,0.2));">
            ${rtr('rev.concInfo','💡 غلظت: هر سی‌سی از این محلول حاوی')} <bdi style="font-family:monospace; font-weight:900; color:#e74c3c; direction: ltr; display: inline-block;">${formatNumber(concPerMl, 2)} ${drugUnit}</bdi> ${rtr('rev.concInfoTail','دارو است.')}
        </div>
    `;

    if (typeof fixAllNumbers === 'function') fixAllNumbers();
}
window.calculateReverseMain = calculateReverseMain;

