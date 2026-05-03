(() => {
  "use strict";

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

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
  const revealIO =
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
    if (revealIO) revealIO.observe(el);
    else el.classList.add("is-visible");
  });

  // ----- Stats counter (count up on scroll into view) -----
  const animateCount = (el) => {
    const target = Number(el.dataset.count || el.textContent || 0);
    if (!Number.isFinite(target) || target === 0) return;
    if (reduceMotion) {
      el.textContent = String(target);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const current = Math.round(target * easeOut(t));
      el.textContent = String(current);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const statsIO =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries, obs) => {
            for (const e of entries) {
              if (e.isIntersecting) {
                animateCount(e.target);
                obs.unobserve(e.target);
              }
            }
          },
          { threshold: 0.4 }
        )
      : null;
  document.querySelectorAll("[data-count]").forEach((el) => {
    if (statsIO) {
      el.textContent = "0";
      statsIO.observe(el);
    } else {
      el.textContent = el.dataset.count;
    }
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
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
