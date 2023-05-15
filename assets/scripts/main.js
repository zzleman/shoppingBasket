let cart = [];

function getCartCount() {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

function showCart() {
  const cartSection = document.querySelector('#cart-section');
  const cartList = document.querySelector('#cart-list');

  cartList.innerHTML = '';

  cart.forEach(item => {
    const cartItem = document.createElement('li');
    cartItem.className = 'cart-item';

    const productName = document.createElement('span');
    productName.className = 'product-name';
    productName.textContent = item.name;

    const productPrice = document.createElement('span');
    productPrice.className = 'product-price';
    productPrice.textContent = `$${item.price}`;

    const productQuantity = document.createElement('div');
    productQuantity.className = 'product-quantity';

    productQuantity.style.marginRight="170px"

    const decreaseButton = document.createElement('button');
    decreaseButton.textContent = '-';
    decreaseButton.addEventListener('click', () => {
      updateCartItemQuantity(item.name, item.quantity - 1);
    });

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.value = item.quantity;
    quantityInput.min = 0;
    quantityInput.addEventListener('input', () => {
      updateCartItemQuantity(item.name, parseInt(quantityInput.value));
    });

    const increaseButton = document.createElement('button');
    increaseButton.textContent = '+';
    increaseButton.addEventListener('click', () => {
      updateCartItemQuantity(item.name, item.quantity + 1);
    });

    productQuantity.appendChild(decreaseButton);
    productQuantity.appendChild(quantityInput);
    productQuantity.appendChild(increaseButton);

    const removeItemButton = document.createElement('button');
    removeItemButton.className = 'remove-item';
    removeItemButton.textContent = 'X';
    removeItemButton.style.background="red"
    removeItemButton.style.color="white"
    removeItemButton.addEventListener('click', () => {
      removeCartItem(item.name);
    });

    cartItem.appendChild(productName);
    cartItem.appendChild(productPrice);
    cartItem.appendChild(productQuantity);
    cartItem.appendChild(removeItemButton);
    cartList.appendChild(cartItem);
  });

  const totalPrice = document.querySelector('#total-price');
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPrice.textContent = `Total Price: $${total}`;
  cartSection.classList.add('show');
}
function hideCart() {
  const cartSection = document.querySelector('#cart-section');
  cartSection.classList.remove('show');
}

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }
  updateCartCount();
  saveCartToLocalStorage();
}

function updateCartCount() {
  const cartCount = document.querySelector('#cart-count');
  cartCount.textContent = getCartCount();
}

function removeCartItem(name) {
  cart = cart.filter(item => item.name !== name);
  updateCartCount();
  showCart();
  saveCartToLocalStorage();
}

function updateCartItemQuantity(name, quantity) {
  const item = cart.find(item => item.name === name);
  if (item) {
    if (quantity <= 0) {
      const itemIndex = cart.indexOf(item);
      cart.splice(itemIndex, 1);
    } else {
      item.quantity = quantity;
    }
  }
  showCart();
  saveCartToLocalStorage();
}

function clearCart() {
    cart = [];
    updateCartCount();
    hideCart();
    saveCartToLocalStorage();
  }
  
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
function loadCartFromLocalStorage() {
  const cartData = localStorage.getItem('cart');
  if (cartData) {
      cart = JSON.parse(cartData);
      updateCartCount();
    }
  }
  updateCartCount();
  loadCartFromLocalStorage();

  const closeCartBtn = document.querySelector("#close-button");
  closeCartBtn.addEventListener("click", hideCart);
  
  const orderNowBtn = document.querySelector("#order-button");
  orderNowBtn.addEventListener("click", placeOrder);
  function placeOrder() {
    alert("Thank you, your order has been received!");
  }
  
