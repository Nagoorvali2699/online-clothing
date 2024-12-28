// Sample product data (replace with your actual data)
const products = [
    { id: 1, name: "Green Polo", price: 25, category: "men", image: "green_polo.jpg" },
    { id: 2, name: "Blue Dress", price: 40, category: "women", image: "blue_dress.jpg" },
    { id: 3, name: "Black Dress", price: 40, category: "women", image: "black_dress.jpg" },
    { id: 4, name: "green shirt", price: 100, category: "men", image: "green_shirt.jpg" },
    { id: 5, name: "white shirt", price: 400, category: "men", image: "white_shirt.jpg" },
];

// Function to display products
function displayProducts(filteredProducts) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = "";

    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productList.appendChild(productDiv);
    });
}

// Function to add to cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);

    // Check if product already exists in cart
    const existingProduct = cart.find(p => p.id === productId);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(); 
}

// Function to update cart count (optional)
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // ... (logic to update a cart count badge in the UI) ...
}

// Function to handle search and filter
function filterProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;

    let filteredProducts = products.filter(product => {
        return (
            product.name.toLowerCase().includes(searchInput) &&
            (categoryFilter === 'all' || product.category === categoryFilter)
        );
    });

    displayProducts(filteredProducts);
}

// Initial product display
displayProducts(products);

// Event listeners
document.getElementById('searchInput').addEventListener('input', filterProducts);
document.getElementById('categoryFilter').addEventListener('change', filterProducts);
document.getElementById('viewCartBtn').addEventListener('click', () => {
    // Redirect to a separate cart page (you'll need to create a cart.html file)
    window.location.href = 'cart.html'; 
});

// ... (add functions for cart page functionality in cart.html and script.js) ...