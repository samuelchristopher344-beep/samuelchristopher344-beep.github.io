const btn = document.querySelector(".menu-btn");
const mobile = document.querySelector(".mobile");
if (btn && mobile) {
  btn.addEventListener("click", () => {
    const open = !mobile.hidden;
    mobile.hidden = open;
    btn.setAttribute("aria-expanded", String(!open));
    btn.setAttribute("aria-label", open ? "Open menu" : "Close menu");
  });
}

const form = document.getElementById("contact-form");
if (form) {
  const key = "cflx-contact-draft";
  try {
    const draft = JSON.parse(localStorage.getItem(key) || "null");
    if (draft) {
      for (const [name, value] of Object.entries(draft)) {
        if (form.elements[name]) form.elements[name].value = value;
      }
    }
  } catch {}
  const save = () => {
    const data = Object.fromEntries(new FormData(form).entries());
    localStorage.setItem(key, JSON.stringify(data));
  };
  form.addEventListener("input", save);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const subject = encodeURIComponent(`[christoflightX-1] ${data.topic || "Project discussion"}`);
    const body = encodeURIComponent(`Name: ${data.name || ""}\nFrom: ${data.from || ""}\n\n${data.message || ""}`);
    window.location.href = `mailto:samuelchristopher344@gmail.com?subject=${subject}&body=${body}`;
  });
}

document.querySelectorAll("[data-copy]").forEach((el) => {
  el.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(el.getAttribute("data-copy") || "");
      el.textContent = "Copied";
      setTimeout(() => (el.textContent = "Copy address"), 1600);
    } catch {}
  });
});

const search = document.querySelector("[data-filter]");
const grid = document.querySelector("[data-grid]");
if (search && grid) {
  search.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    let n = 0;
    grid.querySelectorAll(".card").forEach((card) => {
      const hit = !q || card.textContent.toLowerCase().includes(q);
      card.hidden = !hit;
      if (hit) n += 1;
    });
    let empty = grid.querySelector(".empty-msg");
    if (!n) {
      if (!empty) {
        empty = document.createElement("p");
        empty.className = "empty-msg muted";
        empty.textContent = "No articles match that search.";
        grid.append(empty);
      }
    } else if (empty) {
      empty.remove();
    }
  });
}
