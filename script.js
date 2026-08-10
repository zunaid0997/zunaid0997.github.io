/* ==========================================================================
   MOHD ZUNAID FIT | Interactive Application Logic
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
});
