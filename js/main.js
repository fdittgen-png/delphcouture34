/* Progressive enhancement: work, services and contact links are already HTML. */
(() => {
  "use strict";
  const menu = document.getElementById("mobile-menu");
  const menuToggle = document.getElementById("menu-toggle");
  const lightbox = document.getElementById("lightbox");
  const supportsDialog =
    typeof HTMLDialogElement !== "undefined" &&
    typeof HTMLDialogElement.prototype.showModal === "function";
  const syncScrollLock = () =>
    document.body.classList.toggle(
      "modal-open",
      !!document.querySelector("dialog[open]"),
    );

  if (supportsDialog && menu && menuToggle) {
    document.documentElement.classList.add("js");
    menuToggle.hidden = false;
    menuToggle.addEventListener("click", () => {
      menu.showModal();
      menuToggle.setAttribute("aria-expanded", "true");
      syncScrollLock();
    });
    document
      .getElementById("menu-close")
      .addEventListener("click", () => menu.close());
    menu.addEventListener("close", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      syncScrollLock();
    });
    menu.addEventListener("click", (event) => {
      if (
        event.target === menu &&
        event.clientX < menu.getBoundingClientRect().left
      )
        menu.close();
    });
    menu.querySelectorAll("nav a").forEach((link) =>
      link.addEventListener("click", () => {
        menu.close();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          target.addEventListener(
            "blur",
            () => target.removeAttribute("tabindex"),
            { once: true },
          );
        }
      }),
    );
    menu
      .querySelectorAll(".mobile-phone")
      .forEach((link) => link.addEventListener("click", () => menu.close()));
    window
      .matchMedia("(min-width: 801px)")
      .addEventListener("change", (event) => {
        if (event.matches && menu.open) menu.close();
      });
  }

  // Keep anchor destinations clear when the header wraps or stops being sticky.
  const header = document.querySelector(".site-header");
  if (header) {
    const syncHeaderOffset = () => {
      const height =
        getComputedStyle(header).position === "sticky"
          ? Math.ceil(header.getBoundingClientRect().height)
          : 0;
      document.documentElement.style.setProperty(
        "--header-offset",
        `${height + 12}px`,
      );
    };
    syncHeaderOffset();
    if (typeof ResizeObserver === "function") {
      new ResizeObserver(syncHeaderOffset).observe(header);
    }
    window.addEventListener("resize", syncHeaderOffset, { passive: true });
  }

  const cards = Array.from(document.querySelectorAll(".work"));
  const filters = Array.from(document.querySelectorAll("[data-filter]"));
  const toolbar = document.getElementById("portfolio-toolbar");
  if (toolbar && cards.length) {
    toolbar.hidden = false;
    filters.forEach((filter) =>
      filter.addEventListener("click", () => {
        const selected = filter.dataset.filter;
        filters.forEach((button) => {
          const active = button === filter;
          button.classList.toggle("active", active);
          button.setAttribute("aria-pressed", String(active));
        });
        cards.forEach((card) => {
          card.hidden =
            selected !== "all" && card.dataset.category !== selected;
        });
        const count = cards.filter((card) => !card.hidden).length;
        document.getElementById("portfolio-count").textContent =
          `${count} création${count > 1 ? "s" : ""} à découvrir`;
      }),
    );
  }

  if (supportsDialog && lightbox) {
    const image = document.getElementById("lightbox-img");
    const caption = document.getElementById("lightbox-caption");
    const counter = document.getElementById("lightbox-counter");
    const previous = document.getElementById("lightbox-prev");
    const next = document.getElementById("lightbox-next");
    let activeItems = [];
    let activeIndex = 0;
    let opener = null;
    const showImage = (index) => {
      activeIndex = (index + activeItems.length) % activeItems.length;
      const item = activeItems[activeIndex];
      image.src = item.href;
      image.alt = item.querySelector("img").alt;
      caption.textContent = item
        .closest("figure")
        .querySelector("h3").textContent;
      counter.textContent = `${activeIndex + 1} / ${activeItems.length}`;
      previous.hidden = next.hidden = activeItems.length < 2;
    };
    document.querySelectorAll("[data-gallery]").forEach((link) =>
      link.addEventListener("click", (event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
          return;
        event.preventDefault();
        activeItems = cards
          .filter((card) => !card.hidden)
          .map((card) => card.querySelector("[data-gallery]"));
        opener = link;
        showImage(activeItems.indexOf(link));
        lightbox.showModal();
        syncScrollLock();
      }),
    );
    previous.addEventListener("click", () => showImage(activeIndex - 1));
    next.addEventListener("click", () => showImage(activeIndex + 1));
    document
      .getElementById("lightbox-close")
      .addEventListener("click", () => lightbox.close());
    lightbox.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        showImage(activeIndex + (event.key === "ArrowLeft" ? -1 : 1));
      }
    });
    lightbox.addEventListener("click", (event) => {
      if (event.target !== lightbox) return;
      const rect = lightbox.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
        lightbox.close();
    });
    lightbox.addEventListener("close", () => {
      syncScrollLock();
      if (opener && opener.isConnected) opener.focus({ preventScroll: true });
    });
  }
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
