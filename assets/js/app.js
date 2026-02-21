(function () {
  // Set year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mark active nav link robustly
  var path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.classList.add("active");
  });

  // Reveal on scroll
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduced) {
    var els = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      }, { rootMargin: "0px 0px -10% 0px" });
      els.forEach(function (el) { io.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add("is-visible"); });
    }
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Extra click bounce for links
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a");
    if (!a) return;
    if (reduced) return;
    a.classList.remove("clicked");
    // Force reflow
    void a.offsetWidth;
    a.classList.add("clicked");
    setTimeout(function(){ a.classList.remove("clicked"); }, 220);
  });
})();
