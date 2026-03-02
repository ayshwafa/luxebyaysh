// Home page behaviour: featured collections and footer year.

document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("footer-year");
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  const featuredContainer = document.getElementById("featured-collections");
  if (!featuredContainer || !window.LuxeProducts) return;

  const featured = window.LuxeProducts.filter((p) => p.featured);
  featured.forEach((product) => {
    const card = document.createElement("article");
    card.className = "la-card";
    card.innerHTML = `
      <div class="la-card-media">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="la-card-body">
        <h3 class="la-card-title">${product.name}</h3>
        <p class="la-price">₹${product.price}</p>
        <p class="la-muted">${product.material} • Signature piece</p>
        <div class="la-card-footer">
          <a href="product.html?id=${product.id}" class="la-btn la-btn-outline">View product</a>
          <button class="la-btn la-btn-primary" data-product-id="${product.id}">
            Add to cart
          </button>
        </div>
      </div>
    `;
    featuredContainer.appendChild(card);
  });

  featuredContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const btn = target.closest("button[data-product-id]");
    if (!btn) return;
    const id = btn.getAttribute("data-product-id");
    if (!id) return;
    luxeAddToCart(id, 1);
  });
});

