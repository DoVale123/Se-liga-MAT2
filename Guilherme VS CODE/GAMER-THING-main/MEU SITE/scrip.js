// Dados dos produtos
const products = [
    {
        id: 1,
        name: "Placa Mãe ASUS ROG",
        price: 1899.90,
        category: "hardware",
        image: "assets/images/placa-mae.jpg"
    },
    {
        id: 2,
        name: "Processador AMD Ryzen 9",
        price: 2899.90,
        category: "hardware",
        image: "assets/images/processador.jpg"
    },
    {
        id: 3,
        name: "Placa de Vídeo RTX 3080",
        price: 5999.90,
        category: "hardware",
        image: "assets/images/placa-video.jpg"
    },
    {
        id: 4,
        name: "Memória RAM 32GB DDR5",
        price: 899.90,
        category: "hardware",
        image: "assets/images/memoria-ram.jpg"
    },
    {
        id: 5,
        name: "SSD NVMe 1TB",
        price: 499.90,
        category: "hardware",
        image: "assets/images/ssd.jpg"
    },
    {
        id: 6,
        name: "Gabinete Gamer RGB",
        price: 699.90,
        category: "hardware",
        image: "assets/images/gabinete.jpg"
    },
    {
        id: 7,
        name: "Fonte 750W 80 Plus Gold",
        price: 799.90,
        category: "hardware",
        image: "assets/images/fonte.jpg"
    },
    {
        id: 8,
        name: "Monitor Gamer 27\" 144Hz",
        price: 1999.90,
        category: "perifericos",
        image: "assets/images/monitor.jpg"
    },
    {
        id: 9,
        name: "Teclado Mecânico RGB",
        price: 499.90,
        category: "perifericos",
        image: "assets/images/teclado.jpg"
    },
    {
        id: 10,
        name: "Mouse Gamer 16000DPI",
        price: 299.90,
        category: "perifericos",
        image: "assets/images/mouse.jpg"
    }
];

// Carrinho de compras
let cart = [];

// Elementos DOM
const productsGrid = document.querySelector('.products-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartCount = document.querySelector('.cart-count');
const addButtons = document.querySelectorAll('.btn-add');

// Função para renderizar produtos
function renderProducts(filter = 'all') {
    productsGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(product => product.category === filter);
    
    filteredProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.dataset.category = product.category;
        
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <span class="category">${product.category}</span>
                <h3>${product.name}</h3>
                <span class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                <button class="btn-add" data-id="${product.id}">Adicionar ao Carrinho</button>
            </div>
        `;
        
        productsGrid.appendChild(productItem);
    });
    
    // Adiciona eventos aos novos botões
    document.querySelectorAll('.btn-add').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Função para adicionar ao carrinho
function addToCart(e) {
    const productId = parseInt(e.target.dataset.id);
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    showNotification(`${product.name} adicionado ao carrinho!`);
}

// Função para atualizar contador do carrinho
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Função para mostrar notificação
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Filtro de produtos
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderProducts(button.dataset.filter);
    });
});

// Adiciona eventos aos botões de destaque
addButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    
    // Smooth scroll para links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Estilo dinâmico para notificação
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--success-color);
        color: white;
        padding: 15px 30px;
        border-radius: 4px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 1000;
    }
    
    .notification.show {
        opacity: 1;
    }
`;
document.head.appendChild(style);