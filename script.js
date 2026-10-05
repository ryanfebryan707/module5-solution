"use strict";

// Data menu dengan berbagai kategori
const menuCategories = {
    'makan-siang': {
        name: 'Makan Siang',
        items: [
            { id: 1, name: 'Nasi Goreng Ayam', price: 45000, description: 'Nasi goreng dengan ayam, telur, dan sayuran segar' },
            { id: 2, name: 'Mie Kuah Lezat', price: 35000, description: 'Mie dalam kuah kaldu daging dengan tahu dan sayuran' },
            { id: 3, name: 'Soto Ayam', price: 30000, description: 'Soto tradisional dengan ayam, kunyit, dan bumbu rempah' },
            { id: 4, name: 'Gado-Gado', price: 25000, description: 'Sayuran segar dengan saus kacang dan kerupuk' }
        ]
    },
    'makan-malam': {
        name: 'Makan Malam',
        items: [
            { id: 5, name: 'Ribeye Premium', price: 185000, description: 'Daging sapi premium panggang dengan kentang dan saus' },
            { id: 6, name: 'Salmon Asap', price: 165000, description: 'Salmon dipanggang dengan lemon butter sauce' },
            { id: 7, name: 'Chicken Alfredo', price: 85000, description: 'Ayam dengan pasta dan saus alfredo lembut' },
            { id: 8, name: 'Seafood Mix Grilled', price: 145000, description: 'Udang dan cumi panggang dengan herbs' }
        ]
    },
    'sushi': {
        name: 'Sushi',
        items: [
            { id: 9, name: 'California Roll', price: 65000, description: 'Sushi roll dengan kepiting, mentimun, dan alpukat' },
            { id: 10, name: 'Spicy Tuna Roll', price: 55000, description: 'Tuna pedas dengan mayo dan serrano' },
            { id: 11, name: 'Philadelphia Roll', price: 75000, description: 'Salmon segar dan cream cheese dalam satu gigitan' },
            { id: 12, name: 'Dragon Roll', price: 85000, description: 'Udang tempura dengan alpukat dan saus teriyaki' }
        ]
    },
    'dessert': {
        name: 'Dessert',
        items: [
            { id: 13, name: 'Tiramisu Italia', price: 55000, description: 'Tiramisu tradisional dengan mascarpone dan kopi' },
            { id: 14, name: 'Chocolate Lava Cake', price: 48000, description: 'Kue cokelat hangat dengan lava center' },
            { id: 15, name: 'Basque Cheesecake', price: 65000, description: 'Cheesecake dengan crust yang unik dan creamy' },
            { id: 16, name: 'Matcha Ice Cream', price: 35000, description: 'Es krim matcha dengan taburan cokelat' }
        ]
    },
    'minuman': {
        name: 'Minuman',
        items: [
            { id: 17, name: 'Lychee Iced Tea', price: 28000, description: 'Teh melati dingin dengan leci dan es' },
            { id: 18, name: 'Citrus Sparkler', price: 32000, description: 'Lemon, jeruk, soda, dan daun mint' },
            { id: 19, name: 'House Cold Brew', price: 30000, description: 'Kopi seduh dingin yang bersih dan berkarakter' },
            { id: 20, name: 'Mango Smoothie', price: 38000, description: 'Smoothie mangga segar dengan yogurt' }
        ]
    }
};

const categoryKeys = Object.keys(menuCategories);
let currentSpecialCategory = null;

// Format harga
const currency = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
});

// Set tahun di footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile navigation
const navToggle = document.querySelector('.nav-toggle');
const navigation = document.getElementById('main-nav');

function closeNavigation() {
    navigation.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Buka navigasi');
}

navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') !== 'true';
    navigation.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Tutup navigasi' : 'Buka navigasi');
});

navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeNavigation()));

window.matchMedia('(min-width: 769px)').addEventListener('change', event => {
    if (event.matches) closeNavigation();
});

// Update active nav
const sections = document.querySelectorAll('#beranda, #menu-page, #tentang');
const navLinks = navigation.querySelectorAll('a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Fungsi untuk menampilkan halaman
function showPage(pageId) {
    // Sembunyikan semua page
    document.querySelectorAll('.page-section').forEach(page => {
        page.style.display = 'none';
    });
    
    // Tampilkan page yang dipilih
    const page = document.getElementById(pageId);
    if (page) {
        page.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Event listener untuk tiles
document.getElementById('menu-tile').addEventListener('click', () => {
    showPage('menu-list');
    renderMenuList('all');
});

document.getElementById('special-tile').addEventListener('click', () => {
    selectRandomCategory();
});

document.getElementById('map-tile').addEventListener('click', () => {
    showPage('map');
});

// Fungsi untuk memilih kategori acak
function selectRandomCategory() {
    const randomIndex = Math.floor(Math.random() * categoryKeys.length);
    currentSpecialCategory = categoryKeys[randomIndex];
    
    showPage('special-category');
    renderSpecialCategory();
    
    // Update special tile
    const categoryName = menuCategories[currentSpecialCategory].name;
    document.getElementById('special-category-name').textContent = `Kategori: ${categoryName}`;
}

// Render menu list
function renderMenuList(category = 'all') {
    const menuGrid = document.getElementById('menu-grid');
    menuGrid.innerHTML = '';
    
    let allItems = [];
    if (category === 'all') {
        Object.values(menuCategories).forEach(cat => {
            allItems = allItems.concat(cat.items);
        });
    } else {
        allItems = menuCategories[category].items;
    }
    
    allItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'menu-item';
        itemDiv.innerHTML = `
            <div class="menu-item-category">${getItemCategory(item.id)}</div>
            <div class="menu-item-name">${item.name}</div>
            <div class="menu-item-description">${item.description}</div>
            <div class="menu-item-price">${currency.format(item.price)}</div>
        `;
        menuGrid.appendChild(itemDiv);
    });
}

// Render special category
function renderSpecialCategory() {
    const specialGrid = document.getElementById('special-grid');
    const specialTitle = document.getElementById('special-title');
    
    const categoryData = menuCategories[currentSpecialCategory];
    specialTitle.textContent = categoryData.name;
    
    specialGrid.innerHTML = '';
    categoryData.items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'menu-item';
        itemDiv.innerHTML = `
            <div class="menu-item-category">${categoryData.name.toUpperCase()}</div>
            <div class="menu-item-name">${item.name}</div>
            <div class="menu-item-description">${item.description}</div>
            <div class="menu-item-price">${currency.format(item.price)}</div>
        `;
        specialGrid.appendChild(itemDiv);
    });
}

// Fungsi untuk mendapatkan kategori item
function getItemCategory(itemId) {
    for (const [key, category] of Object.entries(menuCategories)) {
        const item = category.items.find(i => i.id === itemId);
        if (item) return category.name.toUpperCase();
    }
    return 'MENU';
}

// Filter kategori menu
document.getElementById('category-filter').addEventListener('change', (e) => {
    renderMenuList(e.target.value);
});

// Tombol kategori acak baru
document.getElementById('new-special').addEventListener('click', () => {
    selectRandomCategory();
});

// Tombol refresh special di tile
document.getElementById('refresh-special').addEventListener('click', () => {
    selectRandomCategory();
});

// Back buttons
document.querySelectorAll('.back-button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.page-section').forEach(page => {
            page.style.display = 'none';
        });
        window.location.hash = '#menu-page';
    });
});

// Initialize special category saat pertama kali
window.addEventListener('load', () => {
    selectRandomCategory();
});