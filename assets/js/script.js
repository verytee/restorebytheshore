  const consentContact = document.getElementById('consentContact');
  const consentEligibility = document.getElementById('consentEligibility');
  const btn = document.getElementById('submitBtn');
  const form = document.getElementById('contactFormElement');
  const nextField = form ? form.querySelector('input[name="_next"]') : null;

  if (nextField && window.location.protocol.startsWith('http')) {
    nextField.value = `${window.location.origin}/thankyou.html`;
  }

  const updateSubmitState = () => {
    if (!btn || !consentContact || !consentEligibility) {
      return;
    }
    btn.disabled = !(consentContact.checked && consentEligibility.checked);
  };

  if (consentContact && consentEligibility) {
    consentContact.addEventListener('change', updateSubmitState);
    consentEligibility.addEventListener('change', updateSubmitState);
    updateSubmitState();
  }

  // Scroll animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (!nav) {
      return;
    }
    nav.style.boxShadow = window.scrollY > 50 ? '0 4px 20px rgba(0,0,0,0.25)' : 'none';
  });
