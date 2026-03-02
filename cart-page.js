// Cart page rendering and interactions.

document.addEventListener("DOMContentLoaded", () => {
  const itemsContainer = document.getElementById("cart-items");
  const summaryContainer = document.getElementById("cart-summary");

  function renderCart() {
    const cart = luxeGetCart();
    const products = window.LuxeProducts || [];

    if (itemsContainer) {
      itemsContainer.innerHTML = "";
      if (cart.length === 0) {
        itemsContainer.innerHTML =
          '<div class="la-empty">Your cart is currently empty. Discover your next 18k gold-plated favourite in the <a href="shop.html">shop</a>.</div>';
      } else {
        cart.forEach((entry) => {
          const product = products.find((p) => p.id === entry.productId);
          if (!product) return;
          const row = document.createElement("div");
          row.className = "la-cart-item";
          row.innerHTML = `
            <div class="la-cart-thumb">
              <img src="${product.image}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;border-radius:16px;" />
            </div>
            <div class="la-cart-info">
              <div class="la-cart-title">${product.name}</div>
              <div class="la-cart-meta">${product.material}</div>
              <div class="la-cart-meta">₹${product.price} each</div>
              <div class="la-quantity-row" style="margin-top:0.35rem;">
                <div class="la-quantity-controls" data-product-id="${product.id}">
                  <button class="la-quantity-btn" data-action="dec" type="button">−</button>
                  <span class="la-quantity-value">${entry.quantity}</span>
                  <button class="la-quantity-btn" data-action="inc" type="button">+</button>
                </div>
              </div>
            </div>
            <div class="la-cart-actions">
              <button class="la-remove-btn" data-remove-id="${product.id}" type="button">Remove</button>
              <div class="la-price">₹${product.price * entry.quantity}</div>
            </div>
          `;
          itemsContainer.appendChild(row);
        });
      }
    }

    if (summaryContainer) {
      const totals = luxeCartTotals();
      totals.total = totals.subtotal + totals.shipping;
      summaryContainer.innerHTML = `
        <h2 style="margin-top:0;margin-bottom:0.9rem;">Order summary</h2>
        <div class="la-summary-row">
          <span>Items</span>
          <span>${totals.itemCount}</span>
        </div>
        <div class="la-summary-row">
          <span>Subtotal</span>
          <span>₹${totals.subtotal}</span>
        </div>
        <div class="la-summary-row">
          <span>Shipping</span>
          <span>${
            totals.shipping === 0 ? "Complimentary" : "₹" + totals.shipping
          }</span>
        </div>
        <div class="la-summary-row la-summary-total">
          <span>Total</span>
          <span>₹${totals.total}</span>
        </div>
        <button class="la-btn la-btn-primary" id="btn-checkout" style="margin-top:1.1rem;width:100%;">Checkout</button>
        <p class="la-muted" style="margin-top:0.7rem;font-size:0.8rem;">Checkout is simulated for this demo store. No real payment is processed.</p>
      `;
    }
  }

  itemsContainer?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const removeBtn = target.closest("[data-remove-id]");
    if (removeBtn) {
      const id = removeBtn.getAttribute("data-remove-id");
      if (id) {
        luxeRemoveFromCart(id);
        renderCart();
      }
      return;
    }

    const qtyControl = target.closest(".la-quantity-controls");
    if (qtyControl) {
      const productId = qtyControl.getAttribute("data-product-id");
      const action = target.getAttribute("data-action");
      if (!productId || !action) return;
      const cart = luxeGetCart();
      const item = cart.find((c) => c.productId === productId);
      if (!item) return;
      if (action === "dec" && item.quantity > 1) item.quantity -= 1;
      if (action === "inc") item.quantity += 1;
      luxeSaveCart(cart);
      luxeUpdateNavCartCount();
      renderCart();
    }
  });

  summaryContainer?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.id === "btn-checkout") {
      alert(
        "Thank you for choosing Luxe by Aysh.\n\nIn a full integration this would hand over to the Java backend to process a simulated checkout."
      );
    }
  });

  renderCart();
});

