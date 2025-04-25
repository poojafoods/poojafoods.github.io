const products = [
  { name: 'CHANA CHOR', price: 140, image: 'fav.jpeg' },
  { name: 'MASAALA CHANA', price: 130, image: 'chana.jpeg' },
  { name: 'VATANA', price: 130, image: 'vatana.jpg' },
  { name: 'BHAKARVADI', price: 140, image: 'bhakar.jpeg' },
  { name: 'FULLVADI', price: 170, image: 'ful.jpeg' },
];

const cart = [];

function renderProducts() {
  const productList = document.getElementById('product-list');
  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-title">${product.name}</div>
      <div>
        <label for="quantity-${index}">Select Quantity:</label>
        <select id="quantity-${index}" onchange="updatePrice(${index})">
          <option value="1000">1kg</option>
          <option value="2000">2kg</option>
          <option value="5000">5kg</option>
          <option value="10000">10kg</option>
          <option value="custom">Custom (grams)</option>
        </select>
        <input type="number" id="custom-quantity-${index}" placeholder="Enter quantity in grams" style="display:none;" oninput="updatePrice(${index})">
      </div>
      <div class="product-price" id="price-${index}">₹${product.price}</div>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

function updatePrice(index) {
  const quantitySelect = document.getElementById(`quantity-${index}`);
  const customQuantityInput = document.getElementById(`custom-quantity-${index}`);
  const selectedValue = quantitySelect.value;
  const pricePerKg = products[index].price;

  if (selectedValue === 'custom') {
    customQuantityInput.style.display = 'block';
    const customQuantity = parseInt(customQuantityInput.value) || 0;
    const price = (pricePerKg / 1000) * customQuantity;
    document.getElementById(`price-${index}`).textContent = `₹${price.toFixed(2)}`;
  } else {
    customQuantityInput.style.display = 'none';
    const price = (pricePerKg / 1000) * parseInt(selectedValue);
    document.getElementById(`price-${index}`).textContent = `₹${price.toFixed(2)}`;
  }
}

function addToCart(index) {
  let quantity = parseInt(document.getElementById(`quantity-${index}`).value);
  const customQuantityInput = document.getElementById(`custom-quantity-${index}`);
  if (!isNaN(parseInt(customQuantityInput.value))) {
    quantity = parseInt(customQuantityInput.value);
  }
  const pricePerKg = products[index].price;
  const price = (pricePerKg / 1000) * quantity;
  cart.push({ name: products[index].name, price, quantity });
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const qty = item.quantity >= 1000 ? `${item.quantity / 1000}kg` : `${item.quantity}g`;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `<span>${item.name} (${qty})</span><span>₹${item.price.toFixed(2)}</span>`;
    cartItems.appendChild(div);
    total += item.price;
  });
  cartTotal.textContent = total.toFixed(2);
}

function proceedToCheckout() {
  showCustomAlert('Proceeding to Checkout');
  location.href = '#checkout';
}

function confirmOrder() {
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const payment = document.getElementById('payment').value;
  const contact = document.getElementById('contact').value;
  showCustomAlert(`Thank you, ${name}! Your order will be delivered to ${address}. Payment Method: ${payment}. Contact number: ${contact}`);
}

function showCustomAlert(message) {
  document.getElementById('customAlertMessage').innerText = message;
  document.getElementById('customAlertBox').style.display = 'block';
  document.getElementById('customOverlay').style.display = 'block';
}

function closeCustomAlert() {
  document.getElementById('customAlertBox').style.display = 'none';
  document.getElementById('customOverlay').style.display = 'none';
}

renderProducts();
