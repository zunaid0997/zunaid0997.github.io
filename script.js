/* ==========================================================================
   MOHD ZUNAID FIT | Interactive Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Navbar Sticky & Scroll Background Change
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

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

  // Daily Calorie & Macro Estimator Calculator Form
  const macroCalcForm = document.getElementById('macroCalcForm');
  const calcResults = document.getElementById('calcResults');
  const targetCaloriesEl = document.getElementById('targetCalories');
  const tdeeDescEl = document.getElementById('tdeeDesc');
  const proteinValEl = document.getElementById('proteinVal');
  const carbValEl = document.getElementById('carbVal');
  const fatValEl = document.getElementById('fatVal');

  if (macroCalcForm) {
    macroCalcForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const gender = document.getElementById('gender').value;
      const age = parseFloat(document.getElementById('age').value);
      const weight = parseFloat(document.getElementById('weight').value);
      const height = parseFloat(document.getElementById('height').value);
      const activity = parseFloat(document.getElementById('activity').value);
      const goal = document.getElementById('goal').value;

      if (!weight || !height || !age) return;

      // Mifflin-St Jeor Equation for BMR
      let bmr = (10 * weight) + (6.25 * height) - (5 * age);
      if (gender === 'male') {
        bmr += 5;
      } else {
        bmr -= 161;
      }

      // Total Daily Energy Expenditure (TDEE)
      let tdee = bmr * activity;
      let targetCalories = tdee;
      let goalText = '';

      if (goal === 'fatloss') {
        targetCalories = tdee * 0.8; // 20% deficit
        goalText = `Calculated for Fat Loss (-20% caloric deficit, TDEE: ${Math.round(tdee)} kcal)`;
      } else if (goal === 'muscle') {
        targetCalories = tdee * 1.15; // 15% surplus
        goalText = `Calculated for Muscle Gain (+15% caloric surplus, TDEE: ${Math.round(tdee)} kcal)`;
      } else {
        goalText = `Calculated for Maintenance (TDEE: ${Math.round(tdee)} kcal)`;
      }

      targetCalories = Math.round(targetCalories);

      // Macro Distributions (30% Protein, 45% Carbs, 25% Fat)
      // Protein: 4 kcal/g, Carbs: 4 kcal/g, Fat: 9 kcal/g
      const proteinGrams = Math.round((targetCalories * 0.30) / 4);
      const carbGrams = Math.round((targetCalories * 0.45) / 4);
      const fatGrams = Math.round((targetCalories * 0.25) / 9);

      // Render Results
      targetCaloriesEl.textContent = `${targetCalories} kcal / day`;
      tdeeDescEl.textContent = goalText;
      proteinValEl.textContent = `${proteinGrams}g`;
      carbValEl.textContent = `${carbGrams}g`;
      fatValEl.textContent = `${fatGrams}g`;

      calcResults.classList.add('active');
      calcResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
