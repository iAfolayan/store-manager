// vars
let cartItems = [];
const cartDisplay = document.querySelector('#cartHolder');
const cart = document.querySelector('.cart');

cartDisplay.addEventListener('click', () => {
  cart.classList.toggle('show-cart');
});

// functions
function getProduct(id) {
  try {
    const products = JSON.parse(localStorage.getItem('products'));
    return products.find(item => item.id === id);
  } catch (e) {
    console.log('unable to get product details');
  }
}

function addToCart(id) {
  const product = getProduct(id);
  const index = cartItems.findIndex(item => item.id === product.id);

  if (index >= 0) {
    cartItems[index].count += 1;
    updateItemDOM(cartItems[index]);
  } else {
    const newItem = Object.assign({}, product, { count: 1 });
    cartItems.push(newItem);
    addItemDOM(newItem);
  }

  calculateTotal();
}

function updateItemDOM(product) {
  const item = document.querySelector(`#${product.id}`);
  const count = item.querySelector(`#qty-${product.id}`);
  count.innerHTML = product.count;
}

function removeItemDOM(productId) {
  const item = document.querySelector(`#${productId}`);
  const cart = document.querySelector('.cartItemsList');
  cart.removeChild(item)
}

function addItemDOM(product) {
  let newItem = document.createElement('li');
  newItem.classList.add('cart-item');
  newItem.setAttribute('id', product.id);
  newItem.innerHTML = `<img src="../assets/images/${product.image}" class="img-thumbnail" id="item-img" alt="">
    <div class="item-text">
      <p id="cart-item-title" class="cart-item-title">${product.productname}</p>
      <span>&#8358;</span>
      <span id="item-price" class="item-price">${product.price}.00</span>
      <span class="countDisplay" id="qty-${product.id}">${product.count}</span>
    </div>
        <img src="../assets/images/deleteCart.png" title="Remove Item" alt="Remove item" onclick="removeFromCart('${product.id}')"  class="item-remove"/>
    <hr>
  `;
  const cart = document.querySelector('.cartItemsList');
  cart.appendChild(newItem);
}

function calculateTotal() {
  const total = cartItems.reduce((curr, next) => {
    curr.count += next.count;
    curr.amount += (next.price * next.count);
    return curr;
  }, { amount: 0, count: 0 });

  document.querySelector('#amount').textContent = total.amount.toFixed(2);
  document.querySelector('.circle').textContent = total.count;
  localStorage.setItem('cartItems', cartItems);
}

function removeFromCart(productId) {
  cartItems = cartItems.filter((item) => {
    return item.id !== productId;
  });

  removeItemDOM(productId);
  calculateTotal();
}
