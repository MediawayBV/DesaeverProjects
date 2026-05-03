(() => {
  "use strict";

  // ----- Lucide icons -----
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }

  // ----- Sticky header on scroll -----
  const header = document.querySelector("[data-header]");
  if (header) {
    const onScroll = () => {
      header.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ----- Mobile menu -----
  const toggle = document.querySelector("[data-menu-toggle]");
  const drawer = document.querySelector("[data-mobile-nav]");
  if (toggle && drawer) {
    toggle.addEventListener("click", () => {
      const open = drawer.hasAttribute("hidden");
      if (open) {
        drawer.removeAttribute("hidden");
        toggle.setAttribute("aria-expanded", "true");
      } else {
        drawer.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    drawer.querySelectorAll("[data-mobile-link]").forEach((a) =>
      a.addEventListener("click", () => {
        drawer.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  // ----- Reveal on scroll -----
  const io =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries, obs) => {
            for (const e of entries) {
              if (e.isIntersecting) {
                e.target.classList.add("is-visible");
                obs.unobserve(e.target);
              }
            }
          },
          { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
        )
      : null;
  document.querySelectorAll(".reveal").forEach((el) => {
    if (io) io.observe(el);
    else el.classList.add("is-visible");
  });

  // ----- Before/after sliders -----
  document.querySelectorAll("[data-tile]").forEach((tile) => {
    const range = tile.querySelector("[data-range]");
    const before = tile.querySelector("[data-before]");
    const handle = tile.querySelector("[data-handle]");
    const beforeImg = before && before.querySelector(".project-tile__img");
    if (!range || !before || !handle || !beforeImg) return;

    const apply = (v) => {
      const pct = Math.max(0, Math.min(100, v));
      before.style.width = pct + "%";
      handle.style.left = pct + "%";
      // counter-stretch the inner image so it stays the same visual size as the after image
      beforeImg.style.width = (100 / Math.max(pct, 0.01)) * 100 + "%";
    };
    apply(Number(range.value));
    range.addEventListener("input", () => apply(Number(range.value)));
  });

  // ----- Contact form: async submit to FormSubmit AJAX -----
  const form = document.querySelector("[data-form]");
  if (form) {
    const submitBtn = form.querySelector("[data-submit]");
    const submitLabel = form.querySelector("[data-submit-label]");
    const errorEl = form.querySelector("[data-error]");
    const successEl = form.querySelector("[data-success]");
    const sendingText = submitBtn ? submitBtn.dataset.sending : "";
    const originalLabel = submitLabel ? submitLabel.textContent : "";

    form.addEventListener("submit", async (event) => {
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      event.preventDefault();
      if (errorEl) errorEl.hidden = true;
      if (submitBtn) submitBtn.disabled = true;
      if (submitLabel && sendingText) submitLabel.textContent = sendingText;

      try {
        const data = new FormData(form);
        const payload = {};
        data.forEach((value, key) => {
          payload[key] = value;
        });
        const res = await fetch(form.action, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("submit-failed");
        form.reset();
        if (successEl) {
          successEl.hidden = false;
          successEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        form
          .querySelectorAll("input, select, textarea, button")
          .forEach((el) => {
            if (el.getAttribute("type") !== "hidden") el.disabled = true;
          });
      } catch {
        if (errorEl) errorEl.hidden = false;
        if (submitBtn) submitBtn.disabled = false;
        if (submitLabel) submitLabel.textContent = originalLabel;
      }
    });
  }

  // ----- Footer year -----
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
