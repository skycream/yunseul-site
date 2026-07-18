// 모바일 내비 토글 + 문의 폼 검증
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
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
