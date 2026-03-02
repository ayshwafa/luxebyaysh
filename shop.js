// Shop page: render all products and handle category filtering.

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("product-grid");
  const chips = document.querySelectorAll(".la-chip");
  const products = window.LuxeProducts || [];

  function render(filter) {
    if (!grid) return;
    grid.innerHTML = "";
    const toShow =
      filter && filter !== "all"
        ? products.filter((p) => p.category === filter)
        : products;

    toShow.forEach((product) => {
      const card = document.createElement("article");
      card.className = "la-card";
      card.innerHTML = `
        <div class="la-card-media">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
        </div>
        <div class="la-card-body">
          <h3 class="la-card-title">${product.name}</h3>
          <p class="la-price">₹${product.price}</p>
          <p class="la-muted">${product.material}</p>
          <div class="la-card-footer">
            <a href="product.html?id=${product.id}" class="la-btn la-btn-outline">View product</a>
            <button class="la-btn la-btn-primary" data-product-id="${product.id}">
              Add to cart
            </button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  render("all");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.getAttribute("data-filter") || "all";
      chips.forEach((c) => c.classList.remove("la-chip-active"));
      chip.classList.add("la-chip-active");
      render(filter);
    });
  });

  grid?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const btn = target.closest("button[data-product-id]");
    if (!btn) return;
    const id = btn.getAttribute("data-product-id");
    if (!id) return;
    luxeAddToCart(id, 1);
  });
});

