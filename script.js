const menuData = {
  lunch: {
    name: 'Lunch',
    items: [
      { name: 'Grilled Chicken Bowl', price: '$12.99', desc: 'Fresh bowl with grilled chicken, vegetables, and rice.' },
      { name: 'Caesar Wrap', price: '$10.99', desc: 'Crispy wrap with romaine, chicken, and dressing.' },
      { name: 'Pasta Primavera', price: '$11.99', desc: 'Seasonal pasta with fresh vegetables and herbs.' },
      { name: 'Turkey Club', price: '$11.50', desc: 'Classic layered sandwich with bacon and tomato.' }
    ]
  },
  dinner: {
    name: 'Dinner',
    items: [
      { name: 'Ribeye Steak', price: '$28.99', desc: 'Premium grilled steak with garlic butter and sides.' },
      { name: 'Salmon Fillet', price: '$24.99', desc: 'Oven-baked salmon with lemon cream sauce.' },
      { name: 'Chicken Marsala', price: '$19.99', desc: 'Tender chicken in rich wine reduction sauce.' },
      { name: 'Lobster Tail', price: '$32.99', desc: 'Buttery lobster with fresh seasonal vegetables.' }
    ]
  },
  sushi: {
    name: 'Sushi',
    items: [
      { name: 'California Roll', price: '$8.99', desc: 'Crab, cucumber, and avocado in a crispy roll.' },
      { name: 'Spicy Tuna Roll', price: '$9.99', desc: 'Premium tuna with spicy sauce and crunch.' },
      { name: 'Philadelphia Roll', price: '$10.99', desc: 'Salmon and cream cheese in a soft wrap.' },
      { name: 'Dragon Roll', price: '$12.99', desc: 'Shrimp tempura and avocado with umami glaze.' }
    ]
  },
  dessert: {
    name: 'Dessert',
    items: [
      { name: 'Tiramisu', price: '$7.99', desc: 'Classic layered dessert with mascarpone cream.' },
      { name: 'Chocolate Lava Cake', price: '$8.99', desc: 'Warm chocolate cake with molten center.' },
      { name: 'Cheesecake', price: '$6.99', desc: 'Creamy cheesecake topped with berry compote.' },
      { name: 'Crème Brûlée', price: '$7.50', desc: 'Vanilla custard with caramelized sugar crust.' }
    ]
  },
  drinks: {
    name: 'Drinks',
    items: [
      { name: 'Fresh Lemonade', price: '$3.99', desc: 'Perfectly chilled with fresh lemons.' },
      { name: 'Iced Coffee', price: '$4.50', desc: 'Cold brew served over ice and smooth.' },
      { name: 'Smoothie Bowl', price: '$7.99', desc: 'Seasonal fruit blend with crunchy toppings.' },
      { name: 'Fresh Juice', price: '$5.99', desc: 'Orange, apple, or carrot juice blend.' }
    ]
  }
};

const categoryKeys = Object.keys(menuData);
let currentSpecial = null;

function init() {
  selectRandomSpecial();
  renderMenuList('all');
  attachNavState();
}

function attachNavState() {
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(item => item.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

function selectRandomSpecial() {
  const index = Math.floor(Math.random() * categoryKeys.length);
  currentSpecial = categoryKeys[index];
  const categoryName = menuData[currentSpecial].name;
  const specialSummary = document.getElementById('special-summary');
  if (specialSummary) specialSummary.textContent = `Today's special: ${categoryName}`;
  const specialName = document.getElementById('special-name');
  if (specialName) specialName.textContent = categoryName;
}

function showHomePage() {
  hideAllPages();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showMenuPage() {
  hideAllPages();
  const page = document.getElementById('menu-page');
  page.classList.remove('hidden');
  page.classList.add('active');
  renderMenuList('all');
  const filter = document.getElementById('category-filter');
  if (filter) filter.value = 'all';
  window.scrollTo({ top: page.offsetTop - 80, behavior: 'smooth' });
}

function showSpecialPage() {
  hideAllPages();
  selectRandomSpecial();
  const page = document.getElementById('special-page');
  page.classList.remove('hidden');
  page.classList.add('active');
  renderSpecialItems();
  window.scrollTo({ top: page.offsetTop - 80, behavior: 'smooth' });
}

function showMapPage() {
  hideAllPages();
  const page = document.getElementById('map-page');
  page.classList.remove('hidden');
  page.classList.add('active');
  window.scrollTo({ top: page.offsetTop - 80, behavior: 'smooth' });
}

function hideAllPages() {
  document.querySelectorAll('.content-page').forEach(page => {
    page.classList.add('hidden');
    page.classList.remove('active');
  });
}

function renderMenuList(category) {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;

  grid.innerHTML = '';

  let items = [];
  if (category === 'all') {
    for (const key of categoryKeys) {
      const section = menuData[key];
      items = items.concat(section.items.map(item => ({ ...item, category: section.name })));
    }
  } else if (menuData[category]) {
    items = menuData[category].items.map(item => ({ ...item, category: menuData[category].name }));
  }

  items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'menu-card';
    card.innerHTML = `
      <div class="menu-card-category">${item.category}</div>
      <div class="menu-card-name">${item.name}</div>
      <div class="menu-card-description">${item.desc}</div>
      <div class="menu-card-price">${item.price}</div>
    `;
    grid.appendChild(card);
  });
}

function renderSpecialItems() {
  const grid = document.getElementById('special-grid');
  if (!grid) return;

  grid.innerHTML = '';
  const category = menuData[currentSpecial];
  category.items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'menu-card';
    card.innerHTML = `
      <div class="menu-card-category">${category.name}</div>
      <div class="menu-card-name">${item.name}</div>
      <div class="menu-card-description">${item.desc}</div>
      <div class="menu-card-price">${item.price}</div>
    `;
    grid.appendChild(card);
  });
}

function filterMenu(value) {
  renderMenuList(value);
}

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

window.addEventListener('load', init);
