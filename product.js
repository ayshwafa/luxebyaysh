// Product detail page: render a single product based on ?id=

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("product-detail");
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product =
    id && window.LuxeProducts ? window.LuxeProducts.find((p) => p.id === id) : null;

  if (!container) return;

  if (!product) {
    container.innerHTML = `<p class="la-empty">This piece could not be found. Please return to the <a href="shop.html">shop</a>.</p>`;
    return;
  }

  container.innerHTML = `
    <div class="la-product-detail">
      <div class="la-product-media">
        <img src="${product.image}" alt="${product.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:24px;" />
      </div>
      <div class="la-product-info">
        <p class="la-eyebrow">${product.material}</p>
        <h1>${product.name}</h1>
        <p class="la-product-price">₹${product.price}</p>
        <p class="la-product-description">${product.description}</p>

        <div class="la-quantity-row">
          <span class="la-muted" style="text-transform:uppercase;letter-spacing:0.12em;font-size:0.74rem;">Quantity</span>
          <div class="la-quantity-controls">
            <button class="la-quantity-btn" id="qty-decrease" type="button">−</button>
            <span class="la-quantity-value" id="qty-value">1</span>
            <button class="la-quantity-btn" id="qty-increase" type="button">+</button>
          </div>
        </div>

        <div class="la-product-actions">
          <button class="la-btn la-btn-primary" id="btn-add">Add to cart</button>
          <button class="la-btn la-btn-outline" id="btn-buy">Buy now</button>
        </div>

        <p class="la-muted">Complimentary Luxe by Aysh pouch and polishing cloth with every 18k gold-plated piece.</p>
      </div>
    </div>
  `;

  let quantity = 1;
  const qtyValue = document.getElementById("qty-value");
  const btnDec = document.getElementById("qty-decrease");
  const btnInc = document.getElementById("qty-increase");
  const btnAdd = document.getElementById("btn-add");
  const btnBuy = document.getElementById("btn-buy");

  function updateQtyDisplay() {
    if (qtyValue) qtyValue.textContent = String(quantity);
  }

  btnDec?.addEventListener("click", () => {
    if (quantity > 1) {
      quantity -= 1;
      updateQtyDisplay();
    }
  });

  btnInc?.addEventListener("click", () => {
    quantity += 1;
    updateQtyDisplay();
  });

  btnAdd?.addEventListener("click", () => {
    luxeAddToCart(product.id, quantity);
  });

  btnBuy?.addEventListener("click", () => {
    luxeAddToCart(product.id, quantity);
    window.location.href = "cart.html";
  });
});

