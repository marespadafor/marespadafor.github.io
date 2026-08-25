(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  /* Hide the "scroll for more" hint once a rail has been scrolled or fits. */
  document.querySelectorAll(".rail").forEach(function (rail) {
    var hint = rail.parentNode.querySelector(".rail__hint");
    if (!hint) return;
    function check() {
      hint.style.display = rail.scrollWidth > rail.clientWidth + 4 ? "" : "none";
    }
    check();
    window.addEventListener("resize", check);
    rail.addEventListener("scroll", function () {
      if (rail.scrollLeft > 8) hint.style.opacity = "0";
    }, { passive: true });
  });

  var bar = document.querySelector(".progress i");
  if (bar) {
    var tick = function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var p = h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0;
      bar.style.setProperty("--p", p.toFixed(2) + "%");
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
  }

  var targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;
  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("is-in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
  targets.forEach(function (el) { io.observe(el); });
})();
