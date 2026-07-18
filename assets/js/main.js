// 모바일 내비 토글 + 현재 페이지 표시 + 스크롤 리빌 + 문의 폼 검증
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // 현재 페이지 내비 하이라이트
  var path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    if (a.getAttribute("href") === path) a.setAttribute("aria-current", "page");
  });

  // 스크롤 리빌 (reduced-motion 존중)
  var motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (motionOK && "IntersectionObserver" in window) {
    var targets = document.querySelectorAll(
      "section h2, section .lede, .fact-card, .prop-card, .service, .process > div, .timeline > div, .evidence-points > div, .gallery img, .duo figure, .map-wrap, .roster li, .prose h2, .prose ul, .form-grid .field"
    );
    var groups = {};
    targets.forEach(function (el) {
      if (el.closest(".hero")) return; // 히어로는 로드 애니메이션 사용
      el.classList.add("reveal");
      var key = el.parentElement ? Array.prototype.indexOf.call(document.querySelectorAll("*"), el.parentElement) : 0;
      groups[key] = (groups[key] || 0) + 1;
      el.style.setProperty("--d", Math.min((groups[key] - 1) * 0.07, 0.42) + "s");
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  }

  var form = document.querySelector("form.enquiry");
  if (form) {
    form.addEventListener("submit", function (e) {
      var valid = true;
      form.querySelectorAll("[required]").forEach(function (input) {
        var field = input.closest(".field");
        var bad = !input.value.trim() || (input.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value));
        field.classList.toggle("invalid", bad);
        if (bad) valid = false;
      });
      if (!valid) {
        e.preventDefault();
        form.querySelector(".invalid input, .invalid textarea, .invalid select").focus();
      }
    });
  }

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
