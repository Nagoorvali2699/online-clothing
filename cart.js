function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    let totalPrice = 0;

    cartItemsContainer.innerHTML = ''; // Clear previous items

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button onclick="changeQuantity(${item.id}, 'decrease')">-</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity(${item.id}, 'increase')">+</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = totalPrice;
}

function changeQuantity(productId, action) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find(p => p.id === productId);

    if (product) {
        if (action === 'increase') {
            product.quantity++;
        } else if (action === 'decrease' && product.quantity > 1) {
            product.quantity--;
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Reload cart after change
}

function goBack() {
    window.location.href = "index.html";
}

function checkout() {
    alert("Proceeding to checkout...");
}

loadCart(); // Load the cart on page load