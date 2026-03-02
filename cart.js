// Shared cart utilities for Luxe by Aysh.
// Cart is stored in localStorage so it persists between page visits.

const CART_KEY = "luxeByAyshCart";

function luxeGetCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function luxeSaveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function luxeFindProduct(productId) {
  return (window.LuxeProducts || []).find((p) => p.id === productId) || null;
}

function luxeAddToCart(productId, quantity) {
  const qty = Math.max(1, quantity || 1);
  const product = luxeFindProduct(productId);
  if (!product) return;

  const cart = luxeGetCart();
  const existing = cart.find((item) => item.productId === productId);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ productId, quantity: qty });
  }
  luxeSaveCart(cart);
  luxeUpdateNavCartCount();
}

function luxeUpdateQuantity(productId, quantity) {
  const cart = luxeGetCart();
  const item = cart.find((c) => c.productId === productId);
  if (!item) return;
  const qty = Math.max(1, quantity || 1);
  item.quantity = qty;
  luxeSaveCart(cart);
  luxeUpdateNavCartCount();
}

function luxeRemoveFromCart(productId) {
  const cart = luxeGetCart().filter((c) => c.productId !== productId);
  luxeSaveCart(cart);
  luxeUpdateNavCartCount();
}

function luxeCartTotals() {
  const cart = luxeGetCart();
  let itemCount = 0;
  let subtotal = 0;
  cart.forEach((entry) => {
    const product = luxeFindProduct(entry.productId);
    if (!product) return;
    itemCount += entry.quantity;
    subtotal += product.price * entry.quantity;
  });
  return {
    itemCount,
    subtotal,
    shipping: subtotal > 150 ? 0 : subtotal > 0 ? 8 : 0,
    total: 0, // filled below
  };
}

function luxeUpdateNavCartCount() {
  const countSpan = document.getElementById("nav-cart-count");
  if (!countSpan) return;
  const cart = luxeGetCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  countSpan.textContent = String(count);
}

document.addEventListener("DOMContentLoaded", () => {
  luxeUpdateNavCartCount();
});

