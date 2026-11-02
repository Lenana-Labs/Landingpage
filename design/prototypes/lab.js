(function () {
  "use strict";

  /* Mobile navigation -------------------------------------------------- */
  var menu = document.getElementById("mobile-menu");
  var open = document.getElementById("menu-open");
  var close = document.getElementById("menu-close");

  if (menu && open && close) {
    var setMenu = function (on) {
      menu.hidden = !on;
      open.setAttribute("aria-expanded", String(on));
      document.body.style.overflow = on ? "hidden" : "";
      (on ? close : open).focus();
    };
    open.addEventListener("click", function () { setMenu(true); });
    close.addEventListener("click", function () { setMenu(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hidden) setMenu(false);
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
  }

  /* Scroll reveals ----------------------------------------------------- */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".reveal");
  if (!reduced && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (i) { io.observe(i); });
  } else {
    items.forEach(function (i) { i.classList.add("is-in"); });
  }

  /* Year --------------------------------------------------------------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
