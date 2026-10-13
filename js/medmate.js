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
    document.getElementById('calculateReplacementBtn')?.addEventListener('click', function(e) {
        if (typeof window.calculateReplacementMain === 'function') {
            window.calculateReplacementMain();
            setTimeout(fixAllNumbers, 50);
        }
	document.getElementById('calculateBMIBtn')?.addEventListener('click', function() {
		if (typeof window.calculateBMIMain === 'function') {
			window.calculateBMIMain();
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