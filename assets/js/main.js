/**
 * THE BEST HOME BAKER - Interactive Experience Engine
 * Handles Mobile Nav, Gallery Filtering, Sizing Calculator, Multi-step Inquiry, and FAQ Accordions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initGalleryFilter();
  initSizingCalculator();
  initInquiryMultiStep();
  initFaqAccordions();
});

/* --------------------------------------------------------------------------
   1. MOBILE NAVIGATION
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav-drawer');
  const closeBtn = document.getElementById('mobile-menu-close');
  const overlay = document.getElementById('mobile-nav-overlay');

  if (!menuBtn || !mobileNav) return;

  function openMenu() {
    mobileNav.classList.remove('translate-x-full');
    if (overlay) overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    menuBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    mobileNav.classList.add('translate-x-full');
    if (overlay) overlay.classList.add('hidden');
    document.body.style.overflow = '';
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileNav.classList.contains('translate-x-full')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   2. GALLERY FILTERING
   -------------------------------------------------------------------------- */
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterButtons.length || !galleryItems.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      // Update button active state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter gallery cards with smooth opacity transition
      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
          item.style.display = 'block';
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          setTimeout(() => {
            if (item.style.opacity === '0') {
              item.style.display = 'none';
            }
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. SIZING & SERVING CALCULATOR
   -------------------------------------------------------------------------- */
function initSizingCalculator() {
  const slider = document.getElementById('guest-slider');
  const guestDisplay = document.getElementById('guest-count-display');
  const tierDisplay = document.getElementById('tier-recommendation');
  const sizeSpecDisplay = document.getElementById('tier-dimensions');
  const portionTipDisplay = document.getElementById('portion-tip');

  if (!slider || !guestDisplay) return;

  function updateSizing(guests) {
    guestDisplay.textContent = guests + ' Guests';

    if (guests <= 25) {
      tierDisplay.textContent = 'Single Tier (Extended Height 8-inch)';
      sizeSpecDisplay.textContent = '8" Round · 4 Layers · 6" Tall';
      portionTipDisplay.textContent = 'Ideal for intimate birthday celebrations, dinner parties, and small anniversaries.';
    } else if (guests <= 45) {
      tierDisplay.textContent = 'Petite 2-Tier Architectural Cake';
      sizeSpecDisplay.textContent = '6" + 8" Rounds · 3-4 Layers Each';
      portionTipDisplay.textContent = 'Statuesque proportion perfect for boutique micro-weddings and milestone celebrations.';
    } else if (guests <= 75) {
      tierDisplay.textContent = 'Classic 2-Tier Grand Celebration Cake';
      sizeSpecDisplay.textContent = '7" + 9" Rounds · Extended 7" Height';
      portionTipDisplay.textContent = 'Generous event-portion slices with dramatic table presence and cutting height.';
    } else if (guests <= 120) {
      tierDisplay.textContent = 'Signature 3-Tier Luxury Wedding Cake';
      sizeSpecDisplay.textContent = '6" + 8" + 10" Rounds · Architectural Stacking';
      portionTipDisplay.textContent = 'Our most requested wedding centerpiece, serving generous catering portions.';
    } else {
      tierDisplay.textContent = 'Grand 4-Tier Masterpiece or 3-Tier + Kitchen Sheet';
      sizeSpecDisplay.textContent = '6" + 8" + 10" + 12" Rounds or Display Tier + Service Cut';
      portionTipDisplay.textContent = 'Engineered for grand ballroom galas and high-capacity wedding celebrations.';
    }
  }

  slider.addEventListener('input', (e) => {
    updateSizing(parseInt(e.target.value, 10));
  });

  // Initialize with initial value
  updateSizing(parseInt(slider.value, 10));
}

/* --------------------------------------------------------------------------
   4. MULTI-STEP CUSTOM INQUIRY FORM
   -------------------------------------------------------------------------- */
function initInquiryMultiStep() {
  const form = document.getElementById('custom-inquiry-form');
  if (!form) return;

  const step1 = document.getElementById('step-1');
  const step2 = document.getElementById('step-2');
  const step3 = document.getElementById('step-3');
  const stepSuccess = document.getElementById('step-success');

  const progressPills = document.querySelectorAll('.progress-step-pill');
  const toStep2Btn = document.getElementById('to-step-2-btn');
  const backTo1Btn = document.getElementById('back-to-1-btn');
  const toStep3Btn = document.getElementById('to-step-3-btn');
  const backTo2Btn = document.getElementById('back-to-2-btn');
  const submitBtn = document.getElementById('submit-inquiry-btn');

  // Live estimate inputs
  const guestInput = document.getElementById('inquiry-guest-count');
  const eventTypeSelect = document.getElementById('inquiry-event-type');
  const estimateDisplay = document.getElementById('live-estimate-display');

  function updateEstimate() {
    if (!estimateDisplay) return;
    const guests = parseInt(guestInput ? guestInput.value : 0, 10) || 40;
    const eventType = eventTypeSelect ? eventTypeSelect.value : 'wedding';
    
    let baseRate = 8.5; // base estimate per serving
    if (eventType === 'wedding') baseRate = 11.5;
    if (eventType === 'petite') baseRate = 6.5;

    const estimatedTotal = Math.round(guests * baseRate);
    const rangeLow = Math.round(estimatedTotal * 0.9);
    const rangeHigh = Math.round(estimatedTotal * 1.15);
    estimateDisplay.textContent = `$${rangeLow} to $${rangeHigh} (Estimate)`;
  }

  if (guestInput) guestInput.addEventListener('input', updateEstimate);
  if (eventTypeSelect) eventTypeSelect.addEventListener('change', updateEstimate);
  updateEstimate();

  function setStep(stepNum) {
    [step1, step2, step3, stepSuccess].forEach(s => {
      if (s) s.classList.add('hidden');
    });

    if (stepNum === 1 && step1) step1.classList.remove('hidden');
    if (stepNum === 2 && step2) step2.classList.remove('hidden');
    if (stepNum === 3 && step3) step3.classList.remove('hidden');
    if (stepNum === 4 && stepSuccess) stepSuccess.classList.remove('hidden');

    // Update progress indicator
    progressPills.forEach((pill, idx) => {
      if (idx + 1 === stepNum) {
        pill.classList.add('bg-[#231B16]', 'text-[#FAF7F2]', 'border-[#231B16]');
        pill.classList.remove('bg-white', 'text-[#4A3E37]', 'border-[#D8CEC6]', 'bg-[#CFB3A9]');
      } else if (idx + 1 < stepNum) {
        pill.classList.add('bg-[#CFB3A9]', 'text-[#231B16]', 'border-[#A09086]');
        pill.classList.remove('bg-white', 'text-[#4A3E37]', 'border-[#D8CEC6]', 'bg-[#231B16]', 'text-[#FAF7F2]');
      } else {
        pill.classList.add('bg-white', 'text-[#4A3E37]', 'border-[#D8CEC6]');
        pill.classList.remove('bg-[#231B16]', 'text-[#FAF7F2]', 'bg-[#CFB3A9]', 'text-[#231B16]', 'border-[#A09086]');
      }
    });

    window.scrollTo({ top: form.offsetTop - 100, behavior: 'smooth' });
  }

  // Step 1 Validation
  if (toStep2Btn) {
    toStep2Btn.addEventListener('click', () => {
      const dateVal = document.getElementById('inquiry-date')?.value;
      const guestsVal = document.getElementById('inquiry-guest-count')?.value;
      const dateErr = document.getElementById('date-error');
      const guestErr = document.getElementById('guest-error');

      let valid = true;

      if (!dateVal) {
        if (dateErr) dateErr.classList.remove('hidden');
        document.getElementById('inquiry-date')?.classList.add('input-error');
        valid = false;
      } else {
        if (dateErr) dateErr.classList.add('hidden');
        document.getElementById('inquiry-date')?.classList.remove('input-error');
      }

      if (!guestsVal || parseInt(guestsVal, 10) < 5) {
        if (guestErr) guestErr.classList.remove('hidden');
        document.getElementById('inquiry-guest-count')?.classList.add('input-error');
        valid = false;
      } else {
        if (guestErr) guestErr.classList.add('hidden');
        document.getElementById('inquiry-guest-count')?.classList.remove('input-error');
      }

      if (valid) setStep(2);
    });
  }

  if (backTo1Btn) backTo1Btn.addEventListener('click', () => setStep(1));
  if (toStep3Btn) toStep3Btn.addEventListener('click', () => setStep(3));
  if (backTo2Btn) backTo2Btn.addEventListener('click', () => setStep(2));

  // Step 3 Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameVal = document.getElementById('inquiry-name')?.value;
      const emailVal = document.getElementById('inquiry-email')?.value;
      const nameErr = document.getElementById('name-error');
      const emailErr = document.getElementById('email-error');

      let valid = true;
      if (!nameVal || nameVal.trim() === '') {
        if (nameErr) nameErr.classList.remove('hidden');
        document.getElementById('inquiry-name')?.classList.add('input-error');
        valid = false;
      } else {
        if (nameErr) nameErr.classList.add('hidden');
        document.getElementById('inquiry-name')?.classList.remove('input-error');
      }

      if (!emailVal || !emailVal.includes('@')) {
        if (emailErr) emailErr.classList.remove('hidden');
        document.getElementById('inquiry-email')?.classList.add('input-error');
        valid = false;
      } else {
        if (emailErr) emailErr.classList.add('hidden');
        document.getElementById('inquiry-email')?.classList.remove('input-error');
      }

      if (valid) {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Securing Consultation...';
        }
        setTimeout(() => {
          setStep(4);
        }, 700);
      }
    });
  }
}

/* --------------------------------------------------------------------------
   5. FAQ ACCORDIONS
   -------------------------------------------------------------------------- */
function initFaqAccordions() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other accordions for clean focus
      accordionItems.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.accordion-trigger')?.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
