// Menu data
const menuData = {
    lunch: {
        name: 'Lunch',
        items: [
            { name: 'Grilled Chicken Bowl', price: '$12.99', desc: 'Marinated chicken with fresh vegetables' },
            { name: 'Caesar Wrap', price: '$10.99', desc: 'Crispy wrap with romaine and dressing' },
            { name: 'Pasta Primavera', price: '$11.99', desc: 'Fresh pasta with seasonal vegetables' },
            { name: 'Turkey Club', price: '$11.50', desc: 'Classic three-layer sandwich' }
        ]
    },
    dinner: {
        name: 'Dinner',
        items: [
            { name: 'Ribeye Steak', price: '$28.99', desc: 'Premium cut with garlic butter' },
            { name: 'Salmon Fillet', price: '$24.99', desc: 'Wild-caught with lemon sauce' },
            { name: 'Chicken Marsala', price: '$19.99', desc: 'Tender chicken in wine reduction' },
            { name: 'Lobster Tail', price: '$32.99', desc: 'Butter-poached with asparagus' }
        ]
    },
    sushi: {
        name: 'Sushi',
        items: [
            { name: 'California Roll', price: '$8.99', desc: 'Crab, avocado, cucumber' },
            { name: 'Spicy Tuna Roll', price: '$9.99', desc: 'Tuna with sriracha mayo' },
            { name: 'Philadelphia Roll', price: '$10.99', desc: 'Salmon and cream cheese' },
            { name: 'Dragon Roll', price: '$12.99', desc: 'Shrimp tempura with avocado' }
        ]
    },
    dessert: {
        name: 'Dessert',
        items: [
            { name: 'Tiramisu', price: '$7.99', desc: 'Classic Italian layered cake' },
            { name: 'Chocolate Lava Cake', price: '$8.99', desc: 'Warm cake with molten center' },
            { name: 'Cheesecake', price: '$6.99', desc: 'New York style with berry topping' },
            { name: 'Crème Brûlée', price: '$7.50', desc: 'Vanilla custard with caramel crust' }
        ]
    },
    drinks: {
        name: 'Drinks',
        items: [
            { name: 'Fresh Lemonade', price: '$3.99', desc: 'Made daily with fresh lemons' },
            { name: 'Iced Coffee', price: '$4.50', desc: 'Premium cold brew coffee' },
            { name: 'Smoothie Bowl', price: '$7.99', desc: 'Seasonal fruit smoothie' },
            { name: 'Fresh Juice', price: '$5.99', desc: 'Orange, apple, or carrot blend' }
        ]
    }
};

const categories = Object.keys(menuData);
let currentSpecial = null;

// Initialize
window.addEventListener('load', () => {
    setRandomSpecial();
    setupNavigation();
});

// Setup navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('nav-active');
            }
        });
    });
}

// Set random special category
function setRandomSpecial() {
    const randomIndex = Math.floor(Math.random() * categories.length);
    currentSpecial = categories[randomIndex];
    updateSpecialInfo();
}

function updateSpecialInfo() {
    const categoryName = menuData[currentSpecial].name;
    document.getElementById('special-info').textContent = `Today's special: ${categoryName}`;
    document.getElementById('special-category-name').textContent = categoryName;
}

// Navigate functions
function navigateToMenu() {
    hideAllPages();
    document.getElementById('menu-page').classList.add('active');
    renderMenuList('all');
    window.scrollTo(0, 0);
}

function navigateToSpecial() {
    setRandomSpecial();
    hideAllPages();
    document.getElementById('special-page').classList.add('active');
    renderSpecialMenu();
    window.scrollTo(0, 0);
}

function navigateToMap() {
    hideAllPages();
    document.getElementById('map-page').classList.add('active');
    window.scrollTo(0, 0);
}

function backToHome() {
    hideAllPages();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function hideAllPages() {
    document.querySelectorAll('.page-hidden').forEach(page => {
        page.classList.remove('active');
    });
}

// Render menu list
function renderMenuList(category) {
    const grid = document.getElementById('menu-items-grid');
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
    
    items.forEach(item => {
        const card = document.createElement('div');
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

// Filter menu
function filterMenu(category) {
    renderMenuList(category);
}

// Render special menu
function renderSpecialMenu() {
    const grid = document.getElementById('special-items-grid');
    grid.innerHTML = '';
    
    const items = menuData[currentSpecial].items.map(item => ({
        ...item,
        category: menuData[currentSpecial].name
    }));
    
    items.forEach(item => {
        const card = document.createElement('div');
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