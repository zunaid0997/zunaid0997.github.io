/* ==========================================================================
   MOHD ZUNAID | Interactive Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Navbar Sticky & Scroll Background Change
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    const isScrolled = window.scrollY > 20;
    if (navbar && navbar.classList.contains('scrolled') !== isScrolled) {
      navbar.classList.toggle('scrolled', isScrolled);
    }
  }, { passive: true });

  // Mobile Navigation Toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('mobile-open')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });
  }

  // Floating Drawer & Blurred Backdrop Toggle
  const drawerTriggerBtn = document.getElementById('drawerTriggerBtn');
  const floatingDrawer = document.getElementById('floatingDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');

  function openDrawer() {
    if (floatingDrawer && drawerBackdrop) {
      floatingDrawer.classList.add('active');
      drawerBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (floatingDrawer && drawerBackdrop) {
      floatingDrawer.classList.remove('active');
      drawerBackdrop.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  if (drawerTriggerBtn) drawerTriggerBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Body Mass Index (BMI) Calculator Form Handler
  const bmiCalcForm = document.getElementById('bmiCalcForm');
  const bmiResults = document.getElementById('bmiResults');
  const bmiScoreVal = document.getElementById('bmiScoreVal');
  const bmiCategoryBadge = document.getElementById('bmiCategoryBadge');
  const bmiPin = document.getElementById('bmiPin');
  const bmiIdealRange = document.getElementById('bmiIdealRange');
  const bmiAdviceText = document.getElementById('bmiAdviceText');

  if (bmiCalcForm) {
    bmiCalcForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const weight = parseFloat(document.getElementById('bmiWeight').value);
      const heightCm = parseFloat(document.getElementById('bmiHeight').value);

      if (!weight || !heightCm) return;

      const heightM = heightCm / 100;
      const bmi = (weight / (heightM * heightM)).toFixed(1);
      const bmiNum = parseFloat(bmi);

      // Ideal Weight Range (BMI 18.5 to 24.9)
      const minIdeal = (18.5 * heightM * heightM).toFixed(1);
      const maxIdeal = (24.9 * heightM * heightM).toFixed(1);

      bmiScoreVal.textContent = bmi;
      bmiIdealRange.textContent = `${minIdeal} kg – ${maxIdeal} kg`;

      // Determine Category, Badge Class & Pointer Pin Position
      let category = '';
      let badgeClass = '';
      let badgeIcon = '';
      let advice = '';
      let pinPercentage = 0;

      if (bmiNum < 18.5) {
        category = 'Underweight';
        badgeClass = 'bmi-badge bmi-under';
        badgeIcon = '<i class="fas fa-info-circle"></i>';
        advice = 'Below recommended range. Focus on nutrient-dense caloric surplus & strength training.';
        pinPercentage = Math.max(5, (bmiNum / 18.5) * 18.5);
      } else if (bmiNum >= 18.5 && bmiNum <= 24.9) {
        category = 'Normal Weight';
        badgeClass = 'bmi-badge bmi-normal';
        badgeIcon = '<i class="fas fa-check-circle"></i>';
        advice = 'Optimal healthy weight range! Maintain progressive training and balanced nutrition.';
        pinPercentage = 18.5 + (((bmiNum - 18.5) / 6.4) * 30);
      } else if (bmiNum >= 25.0 && bmiNum <= 29.9) {
        category = 'Overweight';
        badgeClass = 'bmi-badge bmi-over';
        badgeIcon = '<i class="fas fa-exclamation-triangle"></i>';
        advice = 'Above optimal range. Structured lean deficit and daily activity can optimize your health.';
        pinPercentage = 48.5 + (((bmiNum - 25.0) / 4.9) * 25);
      } else {
        category = 'Obese';
        badgeClass = 'bmi-badge bmi-obese';
        badgeIcon = '<i class="fas fa-notes-medical"></i>';
        advice = 'Higher risk range. Consult with MOHD ZUNAID for a structured body recomposition program.';
        pinPercentage = Math.min(95, 73.5 + (((bmiNum - 30.0) / 10) * 21.5));
      }

      bmiCategoryBadge.className = badgeClass;
      bmiCategoryBadge.innerHTML = `${badgeIcon} ${category}`;
      bmiAdviceText.textContent = advice;
      bmiPin.style.left = `${pinPercentage}%`;

      bmiResults.classList.add('active');
      bmiResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // Mailbox Consultation Form Submission Handler
  const consultationForm = document.getElementById('consultationForm');
  const modalOverlay = document.getElementById('modalOverlay');
  const closeModal = document.getElementById('closeModal');
  const modalMsg = document.getElementById('modalMsg');
  const directMailLink = document.getElementById('directMailLink');

  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('cName').value.trim();
      const userEmail = document.getElementById('cEmail').value.trim();
      const phone = document.getElementById('cPhone').value.trim();
      const goal = document.getElementById('cGoal').value;
      const message = document.getElementById('cMessage').value.trim();

      const recipientEmail = "kzunaid0997@gmail.com";
      const emailSubject = encodeURIComponent(`New Consultation Request: ${name} (${goal})`);
      const emailBody = encodeURIComponent(
`Hi MOHD ZUNAID,

You have received a new consultation query from your website:

- Client Name: ${name}
- Email: ${userEmail}
- Phone / WhatsApp: ${phone}
- Primary Goal: ${goal}

Fitness Details / Message:
"${message}"

-- 
Sent from MOHD ZUNAID FIT Website Mailbox`
      );

      const mailtoUrl = `mailto:${recipientEmail}?subject=${emailSubject}&body=${emailBody}`;

      if (directMailLink) {
        directMailLink.href = mailtoUrl;
      }

      // Automatically launch user's default email client
      window.location.href = mailtoUrl;

      // Update Modal Content
      modalMsg.innerHTML = `Thank you <strong>${name}</strong>! Your message has been prepared for <strong>kzunaid0997@gmail.com</strong>.<br><br>If your mail app didn't open automatically, click <strong>"Open Mail Client"</strong> below.`;
      
      modalOverlay.classList.add('active');
      consultationForm.reset();
    });
  }

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  /* --- Featured Instagram Reel Video Player Controls --- */
  const reelVideo = document.getElementById('trainerReelVideo');
  const reelBigPlayBtn = document.getElementById('reelBigPlayBtn');
  const reelPlayPauseBtn = document.getElementById('reelPlayPauseBtn');
  const reelOverlayControls = document.getElementById('reelOverlayControls');
  const reelMuteBtn = document.getElementById('reelMuteBtn');
  const reelSoundToggleBtn = document.getElementById('reelSoundToggleBtn');
  const soundToggleIcon = document.getElementById('soundToggleIcon');
  const muteIconBar = document.getElementById('muteIconBar');
  const reelSeekBar = document.getElementById('reelSeekBar');

  const reelRewindBtn = document.getElementById('reelRewindBtn');
  const reelForwardBtn = document.getElementById('reelForwardBtn');

  if (reelVideo) {
    // Ensure video NEVER plays automatically on page load (User must click to play)
    reelVideo.autoplay = false;
    reelVideo.pause();

    let isUserSeeking = false;

    const formatTime = (seconds) => {
      if (isNaN(seconds)) return "00:00";
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const togglePlay = () => {
      if (reelVideo.paused) {
        reelVideo.play();
        reelOverlayControls.classList.add('playing');
        reelPlayPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        reelBigPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        reelVideo.pause();
        reelOverlayControls.classList.remove('playing');
        reelPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        reelBigPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
    };

    const toggleSound = () => {
      reelVideo.muted = !reelVideo.muted;
      if (reelVideo.muted) {
        if (muteIconBar) muteIconBar.className = 'fas fa-volume-mute';
        if (soundToggleIcon) soundToggleIcon.className = 'fas fa-volume-mute';
        if (reelSoundToggleBtn) reelSoundToggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i> Sound Off (Click to Unmute)';
      } else {
        if (muteIconBar) muteIconBar.className = 'fas fa-volume-up';
        if (soundToggleIcon) soundToggleIcon.className = 'fas fa-volume-up';
        if (reelSoundToggleBtn) reelSoundToggleBtn.innerHTML = '<i class="fas fa-volume-up"></i> Sound On (Audio Active)';
      }
    };

    if (reelBigPlayBtn) reelBigPlayBtn.addEventListener('click', togglePlay);
    if (reelPlayPauseBtn) reelPlayPauseBtn.addEventListener('click', togglePlay);
    if (reelOverlayControls) reelOverlayControls.addEventListener('click', (e) => {
      if (e.target === reelOverlayControls || e.target === reelBigPlayBtn || reelBigPlayBtn.contains(e.target)) {
        togglePlay();
      }
    });
    if (reelMuteBtn) reelMuteBtn.addEventListener('click', toggleSound);
    if (reelSoundToggleBtn) reelSoundToggleBtn.addEventListener('click', toggleSound);

    // Update time display on timeupdate
    reelVideo.addEventListener('timeupdate', () => {
      if (!isNaN(reelVideo.duration) && reelVideo.duration > 0) {
        if (reelTimeDisplay) {
          reelTimeDisplay.textContent = `${formatTime(reelVideo.currentTime)} / ${formatTime(reelVideo.duration)}`;
        }
      }
    });

    reelVideo.addEventListener('ended', () => {
      reelOverlayControls.classList.remove('playing');
      reelPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      reelBigPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
  }

  /* ==========================================================================
     Website Visit View Counter Logic
     ========================================================================== */
  const NAV_VIEW_VAL = document.getElementById('navViewCountVal');
  const HERO_VIEW_VAL = document.getElementById('heroViewCountVal');
  const DRAWER_VIEW_VAL = document.getElementById('drawerViewCountVal');
  const FOOTER_VIEW_VAL = document.getElementById('footerViewCountVal');
  const MODAL_TOTAL_VIEWS_VAL = document.getElementById('modalTotalViewsVal');
  const MODAL_USER_VISITS_VAL = document.getElementById('modalUserVisitsVal');
  const MODAL_LAST_VISIT_TIME = document.getElementById('modalLastVisitTime');

  const NAV_VIEW_BTN = document.getElementById('navViewCountBtn');
  const HERO_VIEW_BTN = document.getElementById('heroViewStatBtn');
  const DRAWER_VIEW_BTN = document.getElementById('drawerViewStatBtn');
  const FOOTER_VIEW_BTN = document.getElementById('footerViewCountBtn');
  
  const VIEWS_MODAL_OVERLAY = document.getElementById('viewsModalOverlay');
  const CLOSE_VIEWS_MODAL_ICON = document.getElementById('closeViewsModalIcon');
  const CLOSE_VIEWS_MODAL_BTN = document.getElementById('closeViewsModalBtn');
  const SIM_VISIT_BTN = document.getElementById('simVisitBtn');

  // LocalStorage keys
  const STORAGE_KEY_TOTAL_VIEWS = 'mohd_zunaid_site_views';
  const STORAGE_KEY_USER_VISITS = 'mohd_zunaid_user_visits';

  // Base starting view count (starts from 0)
  const DEFAULT_BASE_VIEWS = 0;

  function getStoredViews() {
    const stored = localStorage.getItem(STORAGE_KEY_TOTAL_VIEWS);
    // Reset if missing or if it had the old 1200+ mockup base
    if (!stored || parseInt(stored, 10) >= 1248) {
      localStorage.setItem(STORAGE_KEY_TOTAL_VIEWS, '0');
      return 0;
    }
    return parseInt(stored, 10) || 0;
  }

  function getStoredUserVisits() {
    const stored = localStorage.getItem(STORAGE_KEY_USER_VISITS);
    return stored ? parseInt(stored, 10) : 0;
  }

  function formatNumber(num) {
    return num.toLocaleString();
  }

  function formatDate(dateObj) {
    return dateObj.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  // Increment total website views and user visits on every site visit/reload
  let currentTotalViews = getStoredViews() + 1;
  let currentUserVisits = getStoredUserVisits() + 1;
  const currentLastVisitTime = formatDate(new Date());

  localStorage.setItem(STORAGE_KEY_TOTAL_VIEWS, currentTotalViews.toString());
  localStorage.setItem(STORAGE_KEY_USER_VISITS, currentUserVisits.toString());

  // Animated Counter Function
  function animateCounter(targetNum) {
    const duration = 1200; // ms
    const startTime = performance.now();
    const startNum = targetNum > 35 ? targetNum - 35 : 0;

    function updateFrame(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic formula
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(startNum + (targetNum - startNum) * easeProgress);

      const formattedVal = formatNumber(currentVal);
      if (NAV_VIEW_VAL) NAV_VIEW_VAL.textContent = formattedVal;
      if (HERO_VIEW_VAL) HERO_VIEW_VAL.innerHTML = `<i class="fas fa-eye" style="color: var(--accent-red); margin-right: 4px;"></i> ${formattedVal}`;
      if (DRAWER_VIEW_VAL) DRAWER_VIEW_VAL.textContent = formattedVal;
      if (FOOTER_VIEW_VAL) FOOTER_VIEW_VAL.textContent = formattedVal;
      if (MODAL_TOTAL_VIEWS_VAL) MODAL_TOTAL_VIEWS_VAL.textContent = formattedVal;

      if (progress < 1) {
        requestAnimationFrame(updateFrame);
      }
    }

    requestAnimationFrame(updateFrame);
  }

  function updateAllViewDisplays() {
    const formattedViews = formatNumber(currentTotalViews);
    const formattedUserVisits = formatNumber(currentUserVisits);

    if (NAV_VIEW_VAL) NAV_VIEW_VAL.textContent = formattedViews;
    if (HERO_VIEW_VAL) HERO_VIEW_VAL.innerHTML = `<i class="fas fa-eye" style="color: var(--accent-red); margin-right: 4px;"></i> ${formattedViews}`;
    if (DRAWER_VIEW_VAL) DRAWER_VIEW_VAL.textContent = formattedViews;
    if (FOOTER_VIEW_VAL) FOOTER_VIEW_VAL.textContent = formattedViews;
    if (MODAL_TOTAL_VIEWS_VAL) MODAL_TOTAL_VIEWS_VAL.textContent = formattedViews;
    if (MODAL_USER_VISITS_VAL) MODAL_USER_VISITS_VAL.textContent = formattedUserVisits;
    if (MODAL_LAST_VISIT_TIME) MODAL_LAST_VISIT_TIME.textContent = currentLastVisitTime;
  }

  // Run initial animated counter
  animateCounter(currentTotalViews);
  updateAllViewDisplays();

  // Modal Open / Close Handlers
  function openViewsModal() {
    if (VIEWS_MODAL_OVERLAY) {
      updateAllViewDisplays();
      VIEWS_MODAL_OVERLAY.classList.add('active');
    }
  }

  function closeViewsModal() {
    if (VIEWS_MODAL_OVERLAY) {
      VIEWS_MODAL_OVERLAY.classList.remove('active');
    }
  }

  if (NAV_VIEW_BTN) NAV_VIEW_BTN.addEventListener('click', openViewsModal);
  if (HERO_VIEW_BTN) HERO_VIEW_BTN.addEventListener('click', openViewsModal);
  if (DRAWER_VIEW_BTN) DRAWER_VIEW_BTN.addEventListener('click', openViewsModal);
  if (FOOTER_VIEW_BTN) FOOTER_VIEW_BTN.addEventListener('click', openViewsModal);

  if (CLOSE_VIEWS_MODAL_ICON) CLOSE_VIEWS_MODAL_ICON.addEventListener('click', closeViewsModal);
  if (CLOSE_VIEWS_MODAL_BTN) CLOSE_VIEWS_MODAL_BTN.addEventListener('click', closeViewsModal);

  if (VIEWS_MODAL_OVERLAY) {
    VIEWS_MODAL_OVERLAY.addEventListener('click', (e) => {
      if (e.target === VIEWS_MODAL_OVERLAY) closeViewsModal();
    });
  }

  // Simulate +1 Visit View Button in Modal
  if (SIM_VISIT_BTN) {
    SIM_VISIT_BTN.addEventListener('click', () => {
      currentTotalViews += 1;
      currentUserVisits += 1;
      localStorage.setItem(STORAGE_KEY_TOTAL_VIEWS, currentTotalViews.toString());
      localStorage.setItem(STORAGE_KEY_USER_VISITS, currentUserVisits.toString());

      updateAllViewDisplays();

      // Trigger pulse animation effect on views display
      if (MODAL_TOTAL_VIEWS_VAL) {
        MODAL_TOTAL_VIEWS_VAL.classList.remove('view-pulse-anim');
        void MODAL_TOTAL_VIEWS_VAL.offsetWidth; // trigger reflow
        MODAL_TOTAL_VIEWS_VAL.classList.add('view-pulse-anim');
      }

      // Visual button feedback
      const origText = SIM_VISIT_BTN.innerHTML;
      SIM_VISIT_BTN.innerHTML = '<i class="fas fa-check-circle"></i> +1 View Counted!';
      SIM_VISIT_BTN.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

      setTimeout(() => {
        SIM_VISIT_BTN.innerHTML = origText;
        SIM_VISIT_BTN.style.background = '';
      }, 1200);
    });
  }
});

