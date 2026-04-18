function toggleProjects() {
  const hidden = document.querySelectorAll(".hidden-proj");
  const btn = document.getElementById("show-more-btn");
  const isExpanded = btn.getAttribute("aria-expanded") === "true";
  const nextExpanded = !isExpanded;

  hidden.forEach((el) => {
    el.style.display = nextExpanded ? "block" : "none";
  });

  btn.textContent = nextExpanded ? "Show less" : "Show all projects";
  btn.setAttribute("aria-expanded", String(nextExpanded));
}

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-grid");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (hero && !prefersReducedMotion) {
    hero.style.opacity = "0";
    hero.style.transform = "translateY(30px)";

    setTimeout(() => {
      hero.style.transition = "opacity .8s ease, transform .8s ease";
      hero.style.opacity = "1";
      hero.style.transform = "translateY(0)";
    }, 100);
  }

  const animatedItems = document.querySelectorAll(".proj-card,.skill-group,.stat-card,.about-text");
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.1 });

    animatedItems.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity .6s ease,transform .6s ease";
      obs.observe(el);
    });
  } else {
    animatedItems.forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  }
});
