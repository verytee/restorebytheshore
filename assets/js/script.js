document.addEventListener("DOMContentLoaded", () => {
  const consentContact = document.getElementById("consentContact");
  const consentEligibility = document.getElementById("consentEligibility");
  const submitBtn = document.getElementById("submitBtn");
  const form = document.getElementById("contactFormElement");
  const nextField = form?.querySelector('input[name="_next"]');
  const navbar = document.querySelector(".site-navbar");
  const fadeItems = document.querySelectorAll(".fade-up");
  const navCollapse = document.getElementById("navbarNav");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  // Keep thank-you URL aligned with live domain
  if (nextField && window.location.protocol.startsWith("http")) {
    nextField.value = `${window.location.origin}/thankyou.html`;
  }

  // Enable submit button only when both consents are checked
  const updateSubmitState = () => {
    if (!submitBtn || !consentContact || !consentEligibility) return;
    submitBtn.disabled = !(consentContact.checked && consentEligibility.checked);
  };

  if (consentContact && consentEligibility) {
    consentContact.addEventListener("change", updateSubmitState);
    consentEligibility.addEventListener("change", updateSubmitState);
    updateSubmitState();
  }

  // Bootstrap-style client-side validation
  if (form) {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity() || (submitBtn && submitBtn.disabled)) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add("was-validated");
    });
  }

  // Reveal on scroll
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    fadeItems.forEach((item) => observer.observe(item));
  } else {
    fadeItems.forEach((item) => item.classList.add("visible"));
  }

  // Navbar styling on scroll
  const updateNavbarState = () => {
    if (!navbar) return;
    navbar.classList.toggle("is-scrolled", window.scrollY > 20);
  };

  updateNavbarState();
  window.addEventListener("scroll", updateNavbarState, { passive: true });

  // Close mobile menu when nav link is clicked
  if (navCollapse && window.bootstrap) {
    const bsCollapse = new bootstrap.Collapse(navCollapse, { toggle: false });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 992 && navCollapse.classList.contains("show")) {
          bsCollapse.hide();
        }
      });
    });
  }

  // Add active class based on visible section
  const sections = document.querySelectorAll("main section[id], header[id]");

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("id");

          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        });
      },
      {
        threshold: 0.45,
        rootMargin: "-20% 0px -35% 0px",
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }
});