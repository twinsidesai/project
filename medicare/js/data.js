/* MediTrack — shared data, cart, UI helpers */

const PRODUCTS = [
  { id: 1, name: 'Paracetamol 500mg', category: 'tablets', price: 45, oldPrice: 60, stock: 240, badge: 'Best Seller', desc: 'Fast relief from fever and mild to moderate pain. Pack of 20 tablets.', icon: '💊', unit: 'strip' },
  { id: 2, name: 'Amoxicillin 250mg', category: 'antibiotics', price: 120, oldPrice: null, stock: 85, badge: 'Rx', desc: 'Broad-spectrum antibiotic for bacterial infections. Capsule form.', icon: '💉', unit: 'strip' },
  { id: 3, name: 'Vitamin C 1000mg', category: 'vitamins', price: 199, oldPrice: 249, stock: 160, badge: 'Sale', desc: 'Immune support chewable tablets with citrus flavor. Bottle of 60.', icon: '🍊', unit: 'bottle' },
  { id: 4, name: 'Cough Syrup Menthol', category: 'syrups', price: 95, oldPrice: null, stock: 72, badge: null, desc: 'Soothing menthol formula for dry and productive cough. 100ml.', icon: '🧴', unit: 'bottle' },
  { id: 5, name: 'Digital Thermometer', category: 'devices', price: 299, oldPrice: 399, stock: 45, badge: 'New', desc: 'Quick-read digital thermometer with fever alert beep.', icon: '🌡️', unit: 'pcs' },
  { id: 6, name: 'Blood Pressure Monitor', category: 'devices', price: 1899, oldPrice: 2299, stock: 28, badge: 'Popular', desc: 'Automatic arm cuff BP monitor with memory for 2 users.', icon: '❤️', unit: 'pcs' },
  { id: 7, name: 'Ibuprofen 400mg', category: 'tablets', price: 68, oldPrice: null, stock: 190, badge: null, desc: 'Anti-inflammatory pain relief. Pack of 15 tablets.', icon: '💊', unit: 'strip' },
  { id: 8, name: 'Omega-3 Fish Oil', category: 'vitamins', price: 449, oldPrice: 499, stock: 110, badge: 'Sale', desc: 'Heart and brain health softgels. 60 capsules.', icon: '🐟', unit: 'bottle' },
  { id: 9, name: 'Antiseptic Liquid 100ml', category: 'first-aid', price: 85, oldPrice: null, stock: 200, badge: null, desc: 'Multi-purpose antiseptic for cuts, scrapes and household use.', icon: '🩹', unit: 'bottle' },
  { id: 10, name: 'Insulin Syringes 1ml', category: 'devices', price: 150, oldPrice: null, stock: 12, badge: 'Low Stock', desc: 'Sterile disposable syringes. Pack of 10.', icon: '💉', unit: 'pack' },
  { id: 11, name: 'Cetirizine 10mg', category: 'tablets', price: 35, oldPrice: 45, stock: 300, badge: 'Best Seller', desc: 'Non-drowsy allergy relief. Pack of 10 tablets.', icon: '💊', unit: 'strip' },
  { id: 12, name: 'Hand Sanitizer 500ml', category: 'first-aid', price: 129, oldPrice: null, stock: 95, badge: null, desc: '70% alcohol gel with moisturizers. Pump bottle.', icon: '🫧', unit: 'bottle' },
  { id: 13, name: 'Azithromycin 500mg', category: 'antibiotics', price: 210, oldPrice: null, stock: 54, badge: 'Rx', desc: 'Once-daily antibiotic course. Pack of 3 tablets.', icon: '💉', unit: 'strip' },
  { id: 14, name: 'Multivitamin Adults', category: 'vitamins', price: 329, oldPrice: 399, stock: 140, badge: 'Sale', desc: 'Complete daily multivitamin for adults. 30 tablets.', icon: '✨', unit: 'bottle' },
  { id: 15, name: 'Pediatric Cough Syrup', category: 'syrups', price: 110, oldPrice: null, stock: 66, badge: null, desc: 'Child-friendly formula for ages 2+. 60ml bottle.', icon: '🧴', unit: 'bottle' },
  { id: 16, name: 'First Aid Kit Pro', category: 'first-aid', price: 799, oldPrice: 999, stock: 38, badge: 'New', desc: 'Complete home & travel first aid kit with 40+ essentials.', icon: '🧰', unit: 'kit' }
];

const CATEGORIES = [
  { id: 'tablets', name: 'Tablets', icon: '💊', count: 48, desc: 'Pain relief, fever & daily tablets' },
  { id: 'syrups', name: 'Syrups', icon: '🧴', count: 32, desc: 'Cough, cold & pediatric syrups' },
  { id: 'vitamins', name: 'Vitamins', icon: '🍊', count: 56, desc: 'Supplements & wellness' },
  { id: 'antibiotics', name: 'Antibiotics', icon: '💉', count: 24, desc: 'Prescription antibiotics' },
  { id: 'devices', name: 'Devices', icon: '🌡️', count: 18, desc: 'Monitors & medical devices' },
  { id: 'first-aid', name: 'First Aid', icon: '🩹', count: 41, desc: 'Bandages, antiseptics & kits' },
  { id: 'skincare', name: 'Skincare', icon: '✨', count: 29, desc: 'Dermatology & personal care' },
  { id: 'baby-care', name: 'Baby Care', icon: '👶', count: 22, desc: 'Infant health essentials' }
];

function getCart() {
  try {
    return JSON.parse(localStorage.getItem('meditrack_cart') || '[]');
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('meditrack_cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, qty = 1) {
  const product = PRODUCTS.find((p) => p.id === Number(productId));
  if (!product) return;
  const cart = getCart();
  const existing = cart.find((i) => i.id === product.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: product.id, qty });
  }
  saveCart(cart);
  showToast(`${product.name} added to cart`);
}

function removeFromCart(productId) {
  const cart = getCart().filter((i) => i.id !== Number(productId));
  saveCart(cart);
}

function setCartQty(productId, qty) {
  const cart = getCart();
  const item = cart.find((i) => i.id === Number(productId));
  if (!item) return;
  item.qty = Math.max(1, Number(qty) || 1);
  saveCart(cart);
}

function getCartDetails() {
  return getCart()
    .map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.id);
      if (!product) return null;
      return { ...product, qty: item.qty, lineTotal: product.price * item.qty };
    })
    .filter(Boolean);
}

function getCartTotals() {
  const items = getCartDetails();
  const subtotal = items.reduce((sum, i) => sum + i.lineTotal, 0);
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 49;
  const tax = Math.round(subtotal * 0.05);
  return { items, subtotal, shipping, tax, total: subtotal + shipping + tax };
}

function updateCartBadge() {
  const count = getCart().reduce((sum, i) => sum + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach((el) => {
    el.textContent = count;
    el.style.display = count ? 'grid' : 'none';
  });
}

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 2400);
}

function formatINR(n) {
  return '₹' + Number(n).toLocaleString('en-IN');
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === Number(id));
}

function renderProductCard(p) {
  const stockClass = p.stock < 20 ? (p.stock === 0 ? 'out' : 'low') : '';
  const stockText = p.stock === 0 ? 'Out of stock' : p.stock < 20 ? 'Low stock' : 'In stock';
  return `
    <article class="product-card" data-id="${p.id}" data-category="${p.category}">
      <a href="product-detail.html?id=${p.id}" class="product-img">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <span>${p.icon}</span>
      </a>
      <div class="product-body">
        <div class="product-cat">${p.category.replace('-', ' ')}</div>
        <h3><a href="product-detail.html?id=${p.id}">${p.name}</a></h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-meta">
          <div>
            <div class="price">${formatINR(p.price)}${p.oldPrice ? `<small>${formatINR(p.oldPrice)}</small>` : ''}</div>
            <div class="stock ${stockClass}">${stockText}</div>
          </div>
          <button class="btn btn-primary btn-sm" data-add="${p.id}" ${p.stock === 0 ? 'disabled' : ''}>Add</button>
        </div>
      </div>
    </article>
  `;
}

function initNav() {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  updateCartBadge();

  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add]');
    if (btn) {
      e.preventDefault();
      addToCart(btn.getAttribute('data-add'), 1);
    }
  });
}

document.addEventListener('DOMContentLoaded', initNav);
