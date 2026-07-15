// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// Close mobile menu after clicking a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-link");

function setActiveLink() {
  let currentId = "";
  const scrollPos = window.scrollY + 120;

  sections.forEach((section) => {
    if (scrollPos >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentId}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();

// ===== NAVBAR BACKGROUND ON SCROLL =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.25)";
  } else {
    navbar.style.boxShadow = "none";
  }
});

// ===== BACK TO TOP =====
document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== CONTACT FORM VALIDATION =====
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

function showError(fieldId, message) {
  const errorEl = document.getElementById(`${fieldId}Error`);
  const row = document.getElementById(fieldId).closest(".form-row");
  errorEl.textContent = message;
  row.classList.toggle("invalid", Boolean(message));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  let valid = true;

  if (name.length < 2) {
    showError("name", "Please enter your name.");
    valid = false;
  } else {
    showError("name", "");
  }

  if (!isValidEmail(email)) {
    showError("email", "Please enter a valid email.");
    valid = false;
  } else {
    showError("email", "");
  }

  if (message.length < 10) {
    showError("message", "Message should be at least 10 characters.");
    valid = false;
  } else {
    showError("message", "");
  }

  if (!valid) {
    formStatus.textContent = "";
    return;
  }

  // No backend wired up yet — simulate a successful send
  formStatus.textContent = `Thanks, ${name}! Your message has been noted.`;
  form.reset();

  setTimeout(() => {
    formStatus.textContent = "";
  }, 5000);
});
