"use strict";

/* ======================================
   ELEMENT REFERENCES
====================================== */
const nav = document.querySelector(".header");
const navMenu = document.querySelector(".header__nav");
const navToggleBtn = document.querySelector(".header__toggle");
const navTriggers = document.querySelectorAll(".header__nav-item");
const navLinks = document.querySelectorAll(".header__nav-dropdown-link");
const headerBtns = document.querySelectorAll(".header__actions");

/* ======================================
   HELPER FUNCTIONS
====================================== */

// Collapse all open accordion dropdowns
const closeDropdowns = () => {
  for (let i = 0; i < navTriggers.length; i++) {
    navTriggers[i].classList.remove("is-open");
  }
};

// Close the nav panel, reset aria state, and collapse all dropdowns
const closeNav = () => {
  nav.classList.remove("nav-is-open");
  navToggleBtn.setAttribute("aria-expanded", "false");
  closeDropdowns();
};

/* ======================================
   NAV TOGGLE (Hamburger / Close Button)
====================================== */
navToggleBtn.addEventListener("click", () => {
  nav.classList.toggle("nav-is-open");

  // Sync aria-expanded with the nav's current open/closed state
  if (nav.classList.contains("nav-is-open")) {
    navToggleBtn.setAttribute("aria-expanded", "true");
  } else {
    navToggleBtn.setAttribute("aria-expanded", "false");
    closeDropdowns();
  }
});

/* ======================================
   CLOSE NAV ON ESCAPE KEY
====================================== */
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeNav();
});

/* ======================================
   CLOSE NAV ON OUTSIDE CLICK
   Excludes the toggle button to prevent
   the nav from opening and immediately
   closing in the same click.
====================================== */
window.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !navToggleBtn.contains(e.target)) {
    closeNav();
  }
});

/* ======================================
   ACCORDION DROPDOWN LOGIC
   Uses event.target.closest() to find
   the parent nav item regardless of
   which child element was clicked.
====================================== */
const handleMobileNavItem = (event) => {
  const clickedMenuItem = event.target.closest(".header__nav-item");
  if (!clickedMenuItem) return;

  // Toggle: if already open → close it
  if (clickedMenuItem.classList.contains("is-open")) {
    clickedMenuItem.classList.remove("is-open");
  } else {
    // Close all other open dropdowns, then open the clicked one
    closeDropdowns();
    clickedMenuItem.classList.add("is-open");
  }
};

// Attach accordion listener to each nav item
for (let i = 0; i < navTriggers.length; i++) {
  navTriggers[i].addEventListener("click", handleMobileNavItem);
}

/* ======================================
   CLOSE NAV ON DROPDOWN LINK CLICK
   stopPropagation() prevents the click
   from bubbling up to the nav item and
   accidentally triggering the accordion.
====================================== */
for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", (e) => {
    e.stopPropagation();
    closeNav();
  });
}

/* ======================================
   CLOSE NAV ON CTA BUTTON CLICK
   (Log In / Sign Up)
====================================== */
for (let i = 0; i < headerBtns.length; i++) {
  headerBtns[i].addEventListener("click", (e) => {
    e.stopPropagation();
    closeNav();
  });
}
