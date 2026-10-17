/*
* MOBILE MENU
*/

function openMenuMobile(){
  const drawerMenu = document.querySelector(".drawerMenu");
  if(!drawerMenu) return;
  drawerMenu.classList.add("opened")
}

function closeMenuMobile(){
  const drawerMenu = document.querySelector(".drawerMenu");
  if(!drawerMenu) return;
  drawerMenu.classList.remove("opened")
}

const btnsOpenMenu = document.querySelectorAll(".btnOpenMenuMobile");
const btnsCloseMenu = document.querySelectorAll(".btnCloseMenuMobile");

btnsOpenMenu.forEach(btn => btn.addEventListener("click", openMenuMobile));
btnsCloseMenu.forEach(btn => btn.addEventListener("click", closeMenuMobile));

// Close the menu when a navigation link is clicked
document.querySelectorAll('.nav-links .nav-link').forEach(link => {
  link.addEventListener('click', closeMenuMobile);
});

/*
* SCROLL EFFECTS
* - Reveal sections on scroll
* - Highlight the active menu link for the visible section
*/

// Reveal each element once, the first time it enters the viewport
const revealElements = document.querySelectorAll(".reveal-on-scroll");

if (revealElements.length && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(el => revealObserver.observe(el));
} else {
  // No IntersectionObserver support: show everything immediately
  revealElements.forEach(el => el.classList.add("is-visible"));
}

// Mark a section as active when it crosses the middle of the screen
const sections = document.querySelectorAll("main section[id]");
const navLinksWithTarget = document.querySelectorAll("[data-target]");

if (sections.length && navLinksWithTarget.length && "IntersectionObserver" in window) {
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentSectionId = entry.target.id;

        navLinksWithTarget.forEach(link => {
          link.classList.toggle("active-link", link.dataset.target === currentSectionId);
        });
      }
    });
  }, {
    rootMargin: "-45% 0px -50% 0px",
    threshold: 0
  });

  sections.forEach(section => spyObserver.observe(section));
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();