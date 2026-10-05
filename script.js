const menuData = {
  appetizers: {
    name: 'Appetizers',
    items: [
      { name: 'Crispy Spring Rolls', price: '$8.99', desc: 'Golden rolls filled with vegetables and savory herbs.' },
      { name: 'Edamame Dumplings', price: '$9.50', desc: 'Steamed dumplings with fresh beans and ginger aroma.' },
      { name: 'Spicy Wonton Bites', price: '$10.99', desc: 'Crisp dumplings served with chili garlic sauce.' },
      { name: 'Peking Duck Pancakes', price: '$14.99', desc: 'Tender duck with hoisin sauce and fresh scallions.' }
    ]
  },
  soups: {
    name: 'Soups & Broths',
    items: [
      { name: 'Hot & Sour Soup', price: '$7.99', desc: 'Classic soup with tofu, mushrooms, and a balanced kick.' },
      { name: 'Wonton Noodle Soup', price: '$11.50', desc: 'Comforting broth with delicate dumplings and noodles.' },
      { name: 'Chicken Corn Soup', price: '$8.50', desc: 'Smooth and savory classic with sweet corn and chicken.' },
      { name: 'Tom Yum Broth', price: '$12.99', desc: 'Aromatic soup with shrimp, herbs, and citrus spice.' }
    ]
  },
  noodles: {
    name: 'Noodles',
    items: [
      { name: 'Dan Dan Noodles', price: '$13.99', desc: 'Spicy sesame noodles with minced pork and scallions.' },
      { name: 'Singapore Noodles', price: '$14.50', desc: 'Wok-tossed noodles with curry flavor and vegetables.' },
      { name: 'Beef Chow Fun', price: '$16.99', desc: 'Silky flat noodles with beef, bean sprouts, and sauce.' },
      { name: 'Vegetable Lo Mein', price: '$12.99', desc: 'Fresh noodles with crunchy vegetables and savory sauce.' }
    ]
  },
  rice: {
    name: 'Rice Dishes',
    items: [
      { name: 'Yangzhou Fried Rice', price: '$13.99', desc: 'Classic fried rice with vegetables, egg, and shrimp.' },
      { name: 'Steamed Jasmine Rice', price: '$4.99', desc: 'Fragrant rice served warm and fluffy.' },
      { name: 'Bamboo Chicken Rice', price: '$14.50', desc: 'Savory chicken and rice topped with mushroom sauce.' },
      { name: 'Char Siu Rice Bowl', price: '$15.99', desc: 'Roasted pork over steamed rice with vegetables.' }
    ]
  },
  meat: {
    name: 'Meat Specialties',
    items: [
      { name: 'Beef Kung Pao', price: '$18.99', desc: 'Tender beef with peanuts, peppers, and chili.' },
      { name: 'Sweet & Sour Pork', price: '$16.50', desc: 'Crisp pork with pineapple and vibrant sauce.' },
      { name: 'Mongolian Chicken', price: '$15.99', desc: 'Tender chicken with scallions in savory black bean sauce.' },
      { name: 'Peking Duck', price: '$24.99', desc: 'Roasted duck served with pancakes and hoisin glaze.' }
    ]
  },
  seafood: {
    name: 'Seafood',
    items: [
      { name: 'Garlic Shrimp', price: '$17.99', desc: 'Juicy shrimp stir-fried with roasted garlic and vegetables.' },
      { name: 'Cantonese Fish Fillet', price: '$20.99', desc: 'Delicate fish with ginger, scallion, and light sauce.' },
      { name: 'Salt & Pepper Squid', price: '$16.99', desc: 'Crispy squid with aromatic seasoning and chili.' },
      { name: 'Lobster in Ginger Sauce', price: '$27.99', desc: 'Premium lobster served with rich ginger and scallion sauce.' }
    ]
  },
  vegetables: {
    name: 'Vegetables',
    items: [
      { name: 'Bok Choy in Garlic Sauce', price: '$11.99', desc: 'Fresh greens pan-seared with aromatic garlic.' },
      { name: 'Mapo Tofu', price: '$12.50', desc: 'Silky tofu in a savory, peppery sauce.' },
      { name: 'Crispy Green Beans', price: '$11.25', desc: 'Quick-fried beans with chili and garlic.' },
      { name: 'Broccoli in Oyster Sauce', price: '$12.99', desc: 'Tender broccoli served with savory oyster-flavored glaze.' }
    ]
  },
  dessert: {
    name: 'Desserts',
    items: [
      { name: 'Mango Sago', price: '$7.99', desc: 'Refreshing dessert with mango, coconut, and tapioca pearls.' },
      { name: 'Sesame Balls', price: '$6.50', desc: 'Warm, chewy treats with toasted sesame and sweet filling.' },
      { name: 'Lychee Pancake', price: '$8.99', desc: 'Soft pastry with lychee cream and delicate sweetness.' },
      { name: 'Mochi Ice Cream', price: '$7.50', desc: 'Chewy rice cake with rich vanilla and fruit centers.' }
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
