/* MediTrack — page-specific behaviors */

function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dotsWrap = document.querySelector('.slider-nav');
  if (!slides.length) return;

  let index = 0;
  let timer;

  if (dotsWrap) {
    dotsWrap.innerHTML = Array.from(slides)
      .map((_, i) => `<button class="dot${i === 0 ? ' active' : ''}" data-slide="${i}" aria-label="Go to slide ${i + 1}"></button>`)
      .join('');
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle('active', n === index));
    document.querySelectorAll('.dot').forEach((d, n) => d.classList.toggle('active', n === index));
  }

  function next() {
    goTo(index + 1);
  }

  function prev() {
    goTo(index - 1);
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(next, 5500);
  }

  document.querySelector('[data-next]')?.addEventListener('click', () => {
    next();
    startAuto();
  });
  document.querySelector('[data-prev]')?.addEventListener('click', () => {
    prev();
    startAuto();
  });
  dotsWrap?.addEventListener('click', (e) => {
    const dot = e.target.closest('.dot');
    if (!dot) return;
    goTo(Number(dot.dataset.slide));
    startAuto();
  });

  goTo(0);
  startAuto();
}

function initHomeProducts() {
  const grid = document.getElementById('featured-products');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.slice(0, 8).map(renderProductCard).join('');
}

function initHomeCategories() {
  const grid = document.getElementById('home-categories');
  if (!grid) return;
  grid.innerHTML = CATEGORIES.slice(0, 6)
    .map(
      (c) => `
    <a class="cat-item" href="products.html?category=${c.id}">
      <div class="cat-icon">${c.icon}</div>
      <h3>${c.name}</h3>
      <span>${c.count} items</span>
    </a>`
    )
    .join('');
}

function initCategoriesPage() {
  const grid = document.getElementById('categories-grid');
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(
    (c) => `
    <a class="cat-item" href="products.html?category=${c.id}">
      <div class="cat-icon">${c.icon}</div>
      <h3>${c.name}</h3>
      <span>${c.count} products</span>
      <p style="margin-top:0.5rem;font-size:0.82rem;color:var(--muted)">${c.desc}</p>
    </a>`
  ).join('');
}

function initProductsPage() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const params = new URLSearchParams(location.search);
  const searchInput = document.getElementById('product-search');
  const catSelect = document.getElementById('category-filter');
  const sortSelect = document.getElementById('sort-filter');

  if (catSelect) {
    catSelect.innerHTML =
      '<option value="">All categories</option>' +
      CATEGORIES.map((c) => `<option value="${c.id}">${c.name}</option>`).join('');
    if (params.get('category')) catSelect.value = params.get('category');
  }

  function apply() {
    let list = [...PRODUCTS];
    const q = (searchInput?.value || '').trim().toLowerCase();
    const cat = catSelect?.value || '';
    const sort = sortSelect?.value || 'featured';

    if (cat) list = list.filter((p) => p.category === cat);
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));

    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));

    grid.innerHTML = list.length
      ? list.map(renderProductCard).join('')
      : '<p style="grid-column:1/-1;color:var(--muted)">No products match your filters.</p>';

    const countEl = document.getElementById('product-count');
    if (countEl) countEl.textContent = `${list.length} product${list.length === 1 ? '' : 's'}`;
  }

  searchInput?.addEventListener('input', apply);
  catSelect?.addEventListener('change', apply);
  sortSelect?.addEventListener('change', apply);
  apply();
}

function initProductDetail() {
  const wrap = document.getElementById('product-detail');
  if (!wrap) return;

  const id = new URLSearchParams(location.search).get('id') || '1';
  const p = getProductById(id);
  if (!p) {
    wrap.innerHTML = '<p>Product not found. <a href="products.html">Browse products</a></p>';
    return;
  }

  document.title = `${p.name} — MediTrack`;

  wrap.innerHTML = `
    <div class="detail-img">${p.icon}</div>
    <div class="detail-info">
      <div class="product-cat">${p.category.replace('-', ' ')}</div>
      <h1>${p.name}</h1>
      <p style="color:var(--muted)">${p.desc}</p>
      <div class="detail-price">${formatINR(p.price)}${p.oldPrice ? ` <small style="font-size:1rem;color:var(--muted);text-decoration:line-through;font-weight:500">${formatINR(p.oldPrice)}</small>` : ''}</div>
      <p class="stock ${p.stock < 20 ? 'low' : ''}">${p.stock} units available · Sold per ${p.unit}</p>
      <div class="qty-control">
        <button type="button" id="qty-minus">−</button>
        <input type="number" id="detail-qty" value="1" min="1" max="${p.stock}" />
        <button type="button" id="qty-plus">+</button>
      </div>
      <div class="detail-actions">
        <button class="btn btn-primary" id="detail-add">Add to Cart</button>
        <a class="btn btn-outline" href="checkout.html" id="buy-now">Buy Now</a>
      </div>
      <div class="detail-specs">
        <h3>Product details</h3>
        <ul>
          <li><span>SKU</span><span>MT-${String(p.id).padStart(4, '0')}</span></li>
          <li><span>Category</span><span>${p.category}</span></li>
          <li><span>Unit</span><span>${p.unit}</span></li>
          <li><span>Prescription</span><span>${p.badge === 'Rx' ? 'Required' : 'Not required'}</span></li>
        </ul>
      </div>
    </div>
  `;

  const qtyInput = document.getElementById('detail-qty');
  document.getElementById('qty-minus').addEventListener('click', () => {
    qtyInput.value = Math.max(1, Number(qtyInput.value) - 1);
  });
  document.getElementById('qty-plus').addEventListener('click', () => {
    qtyInput.value = Math.min(p.stock, Number(qtyInput.value) + 1);
  });
  document.getElementById('detail-add').addEventListener('click', () => {
    addToCart(p.id, Number(qtyInput.value) || 1);
  });
  document.getElementById('buy-now').addEventListener('click', (e) => {
    e.preventDefault();
    addToCart(p.id, Number(qtyInput.value) || 1);
    location.href = 'checkout.html';
  });
}

function initCartPage() {
  const list = document.getElementById('cart-list');
  const summary = document.getElementById('cart-summary');
  if (!list) return;

  function render() {
    const { items, subtotal, shipping, tax, total } = getCartTotals();

    if (!items.length) {
      list.innerHTML = `
        <div class="empty-cart">
          <div class="icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add medicines and health products to continue.</p>
          <a href="products.html" class="btn btn-primary">Browse Products</a>
        </div>`;
      if (summary) summary.style.display = 'none';
      return;
    }

    if (summary) summary.style.display = 'block';

    list.innerHTML = `<div class="cart-table">${items
      .map(
        (i) => `
      <div class="cart-item" data-id="${i.id}">
        <div class="cart-item-img">${i.icon}</div>
        <div>
          <h4>${i.name}</h4>
          <div style="font-size:0.85rem;color:var(--muted)">${formatINR(i.price)} / ${i.unit}</div>
          <button class="remove" data-remove="${i.id}">Remove</button>
        </div>
        <div class="qty-control">
          <button type="button" data-dec="${i.id}">−</button>
          <input type="number" value="${i.qty}" min="1" data-qty="${i.id}" />
          <button type="button" data-inc="${i.id}">+</button>
        </div>
        <div class="cart-item-price">${formatINR(i.lineTotal)}</div>
      </div>`
      )
      .join('')}</div>`;

    document.getElementById('sum-subtotal').textContent = formatINR(subtotal);
    document.getElementById('sum-shipping').textContent = shipping ? formatINR(shipping) : 'Free';
    document.getElementById('sum-tax').textContent = formatINR(tax);
    document.getElementById('sum-total').textContent = formatINR(total);
  }

  list.addEventListener('click', (e) => {
    const remove = e.target.closest('[data-remove]');
    const dec = e.target.closest('[data-dec]');
    const inc = e.target.closest('[data-inc]');
    if (remove) {
      removeFromCart(remove.dataset.remove);
      render();
    }
    if (dec) {
      const id = dec.dataset.dec;
      const item = getCart().find((c) => c.id === Number(id));
      if (item) setCartQty(id, item.qty - 1);
      render();
    }
    if (inc) {
      const id = inc.dataset.inc;
      const item = getCart().find((c) => c.id === Number(id));
      if (item) setCartQty(id, item.qty + 1);
      render();
    }
  });

  list.addEventListener('change', (e) => {
    const input = e.target.closest('[data-qty]');
    if (input) {
      setCartQty(input.dataset.qty, input.value);
      render();
    }
  });

  render();
}

function initCheckoutPage() {
  const form = document.getElementById('checkout-form');
  const orderBox = document.getElementById('order-summary');
  if (!form || !orderBox) return;

  const { items, subtotal, shipping, tax, total } = getCartTotals();

  if (!items.length) {
    orderBox.innerHTML = `
      <h3>Order summary</h3>
      <p style="color:var(--muted);margin-bottom:1rem">Your cart is empty.</p>
      <a href="products.html" class="btn btn-outline btn-block">Shop now</a>`;
    form.querySelector('button[type="submit"]').disabled = true;
    return;
  }

  orderBox.innerHTML = `
    <h3>Order summary</h3>
    ${items.map((i) => `<div class="order-line"><span>${i.name} × ${i.qty}</span><span>${formatINR(i.lineTotal)}</span></div>`).join('')}
    <div class="summary-row" style="margin-top:1rem"><span>Subtotal</span><span>${formatINR(subtotal)}</span></div>
    <div class="summary-row"><span>Shipping</span><span>${shipping ? formatINR(shipping) : 'Free'}</span></div>
    <div class="summary-row"><span>Tax (5%)</span><span>${formatINR(tax)}</span></div>
    <div class="summary-row total"><span>Total</span><span>${formatINR(total)}</span></div>
  `;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const orderId = 'MT' + Date.now().toString().slice(-8);
    localStorage.removeItem('meditrack_cart');
    updateCartBadge();
    location.href = `order-success.html?order=${orderId}`;
  });
}

function initAuth() {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const alert = document.getElementById('login-alert');
    const users = JSON.parse(localStorage.getItem('meditrack_users') || '[]');
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user && !(email === 'admin@meditrack.com' && password === 'admin123')) {
      alert.className = 'alert alert-error show';
      alert.textContent = 'Invalid email or password.';
      return;
    }

    const session = user || { name: 'Admin', email, role: 'admin' };
    localStorage.setItem('meditrack_user', JSON.stringify(session));
    alert.className = 'alert alert-success show';
    alert.textContent = 'Login successful! Redirecting…';
    setTimeout(() => {
      location.href = session.role === 'admin' ? 'dashboard.html' : 'index.html';
    }, 800);
  });

  registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;
    const alert = document.getElementById('reg-alert');

    if (password !== confirm) {
      alert.className = 'alert alert-error show';
      alert.textContent = 'Passwords do not match.';
      return;
    }
    if (password.length < 6) {
      alert.className = 'alert alert-error show';
      alert.textContent = 'Password must be at least 6 characters.';
      return;
    }

    const users = JSON.parse(localStorage.getItem('meditrack_users') || '[]');
    if (users.some((u) => u.email === email)) {
      alert.className = 'alert alert-error show';
      alert.textContent = 'An account with this email already exists.';
      return;
    }

    users.push({ name, email, phone, password, role: 'customer' });
    localStorage.setItem('meditrack_users', JSON.stringify(users));
    localStorage.setItem('meditrack_user', JSON.stringify({ name, email, role: 'customer' }));
    alert.className = 'alert alert-success show';
    alert.textContent = 'Account created! Redirecting…';
    setTimeout(() => {
      location.href = 'index.html';
    }, 800);
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const alert = document.getElementById('contact-alert');
    alert.className = 'alert alert-success show';
    alert.textContent = 'Message sent! We will get back to you soon.';
    form.reset();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSlider();
  initHomeProducts();
  initHomeCategories();
  initCategoriesPage();
  initProductsPage();
  initProductDetail();
  initCartPage();
  initCheckoutPage();
  initAuth();
  initContactForm();
});
