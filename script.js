// Menu database
const menuData = {
    lunch: {
        name: 'Lunch',
        items: [
            { name: 'Grilled Chicken Bowl', price: '$12.99', desc: 'Marinated chicken with fresh seasonal vegetables and rice' },
            { name: 'Caesar Wrap', price: '$10.99', desc: 'Crispy wrap with romaine lettuce and our special dressing' },
            { name: 'Pasta Primavera', price: '$11.99', desc: 'Fresh pasta with seasonal garden vegetables' },
            { name: 'Turkey Club', price: '$11.50', desc: 'Classic three-layer sandwich with bacon and tomato' },
            { name: 'Salmon Salad', price: '$13.99', desc: 'Grilled salmon over mixed greens with lemon vinaigrette' },
            { name: 'Veggie Burger', price: '$9.99', desc: 'Plant-based burger with all the fixings' }
        ]
    },
    dinner: {
        name: 'Dinner',
        items: [
            { name: 'Ribeye Steak', price: '$28.99', desc: 'Premium 12oz cut with garlic butter and side vegetables' },
            { name: 'Salmon Fillet', price: '$24.99', desc: 'Wild-caught salmon with lemon cream sauce' },
            { name: 'Chicken Marsala', price: '$19.99', desc: 'Tender chicken in rich wine reduction with mushrooms' },
            { name: 'Lobster Tail', price: '$32.99', desc: 'Butter-poached lobster tail with asparagus' },
            { name: 'Duck Breast', price: '$26.99', desc: 'Pan-seared duck with cherry gastrique' },
            { name: 'Lamb Chops', price: '$29.99', desc: 'Herb-crusted lamb chops with rosemary jus' }
        ]
    },
    sushi: {
        name: 'Sushi',
        items: [
            { name: 'California Roll', price: '$8.99', desc: 'Crab, avocado, and cucumber in perfect balance' },
            { name: 'Spicy Tuna Roll', price: '$9.99', desc: 'Premium tuna with sriracha mayo kick' },
            { name: 'Philadelphia Roll', price: '$10.99', desc: 'Salmon and cream cheese in a delicate wrap' },
            { name: 'Dragon Roll', price: '$12.99', desc: 'Shrimp tempura with avocado and teriyaki glaze' },
            { name: 'Volcano Roll', price: '$11.99', desc: 'Spicy toppings that create a flavor explosion' },
            { name: 'Rainbow Roll', price: '$13.99', desc: 'Assorted fresh fish over California roll base' }
        ]
    },
    dessert: {
        name: 'Dessert',
        items: [
            { name: 'Tiramisu', price: '$7.99', desc: 'Classic Italian layered cake with coffee notes' },
            { name: 'Chocolate Lava Cake', price: '$8.99', desc: 'Warm cake with molten chocolate center' },
            { name: 'New York Cheesecake', price: '$6.99', desc: 'Creamy cheesecake with berry topping' },
            { name: 'Crème Brûlée', price: '$7.50', desc: 'Vanilla custard with caramelized sugar crust' },
            { name: 'Strawberry Shortcake', price: '$7.99', desc: 'Fluffy cake with fresh strawberries and cream' },
            { name: 'Chocolate Mousse', price: '$6.99', desc: 'Decadent dark chocolate mousse with whipped cream' }
        ]
    },
    drinks: {
        name: 'Drinks',
        items: [
            { name: 'Fresh Lemonade', price: '$3.99', desc: 'Made fresh daily with real lemons' },
            { name: 'Iced Coffee', price: '$4.50', desc: 'Premium cold brew coffee served over ice' },
            { name: 'Smoothie Bowl', price: '$7.99', desc: 'Seasonal fruit smoothie with granola topping' },
            { name: 'Fresh Juice', price: '$5.99', desc: 'Choose from orange, apple, or carrot' },
            { name: 'Iced Tea', price: '$3.50', desc: 'Refreshing sweet or unsweet iced tea' },
            { name: 'Specialty Cocktail', price: '$9.99', desc: 'Chef\'s special creation of the season' }
        ]
    }
};

const categories = Object.keys(menuData);
let currentSpecial = null;

// Initialize on page load
window.addEventListener('load', () => {
    initializeApp();
});

function initializeApp() {
    selectRandomSpecial();
    setupNavigation();
    renderMenuList('all');
}

// Navigation setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Select random special category
function selectRandomSpecial() {
    const randomIndex = Math.floor(Math.random() * categories.length);
    currentSpecial = categories[randomIndex];
    updateSpecialInfo();
}

function updateSpecialInfo() {
    const categoryName = menuData[currentSpecial].name;
    document.getElementById('special-desc').textContent = `Today's special: ${categoryName} section`;
    document.getElementById('special-category-name').textContent = categoryName;
}

// Page navigation functions
function showMenuPage() {
    hideAllPages();
    document.getElementById('menu-page').classList.add('active');
    renderMenuList('all');
    document.getElementById('category-filter').value = 'all';
    window.scrollTo(0, 70);
}

function showSpecialPage() {
    selectRandomSpecial();
    hideAllPages();
    document.getElementById('special-page').classList.add('active');
    renderSpecialMenu();
    window.scrollTo(0, 70);
}

function showMapPage() {
    hideAllPages();
    document.getElementById('map-page').classList.add('active');
    window.scrollTo(0, 70);
}

function backToHome() {
    hideAllPages();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToMenu() {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
}

function hideAllPages() {
    document.querySelectorAll('.content-page').forEach(page => {
        page.classList.remove('active');
    });
}

// Render menu list
function renderMenuList(category) {
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = '';
    
    let items = [];
    if (category === 'all') {
        for (let cat in menuData) {
            items = items.concat(menuData[cat].items.map(item => ({
                ...item,
                category: menuData[cat].name
            })));
        }
    } else if (menuData[category]) {
        items = menuData[category].items.map(item => ({
            ...item,
            category: menuData[category].name
        }));
    }
    
    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="menu-card-category">${item.category}</div>
            <div class="menu-card-name">${item.name}</div>
            <div class="menu-card-description">${item.desc}</div>
            <div class="menu-card-price">${item.price}</div>
        `;
        grid.appendChild(card);
    });
}

// Filter menu
function filterMenu(category) {
    renderMenuList(category);
}

// Render special menu
function renderSpecialMenu() {
    const grid = document.getElementById('special-grid');
    grid.innerHTML = '';
    
    const items = menuData[currentSpecial].items.map(item => ({
        ...item,
        category: menuData[currentSpecial].name
    }));
    
    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="menu-card-category">${item.category}</div>
            <div class="menu-card-name">${item.name}</div>
            <div class="menu-card-description">${item.desc}</div>
            <div class="menu-card-price">${item.price}</div>
        `;
        grid.appendChild(card);
    });
}