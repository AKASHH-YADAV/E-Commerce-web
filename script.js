// 🔹 Product Data
const products = [
  { id: 1, name: "Shoes", price: 1000, img: "https://via.placeholder.com/150" },
  { id: 2, name: "Watch", price: 1500, img: "https://via.placeholder.com/150" },
  { id: 3, name: "Bag", price: 800, img: "https://via.placeholder.com/150" },
  { id: 4, name: "Headphones", price: 1200, img: "https://via.placeholder.com/150" }
];

// 🔹 Load Cart from LocalStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 🔹 Display Products
function displayProducts(filter = "") {
  let output = "";

  let filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  filteredProducts.forEach(p => {
    output += `
      <div class="col-md-4 mb-3">
        <div class="card p-3 text-center">
          <img src="${p.img}" class="img-fluid mb-2">
          <h5>${p.name}</h5>
          <p>₹${p.price}</p>
          <button class="btn btn-primary" onclick="addToCart(${p.id})">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  });

  let container = document.getElementById("product-list");
  if (container) container.innerHTML = output;
}

// 🔹 Add to Cart
function addToCart(id) {
  let item = cart.find(p => p.id === id);

  if (item) {
    item.qty++;
  } else {
    let product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }

  updateStorage();
  updateCartCount();
  alert("Added to cart!");
}

// 🔹 Show Cart Items
function showCart() {
  let output = "";
  let total = 0;

  cart.forEach((item, index) => {
    output += `
      <div class="card p-3 mb-2">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h5>${item.name}</h5>
            <p>₹${item.price} × ${item.qty}</p>
          </div>
          <div>
            <button onclick="changeQty(${index},1)" class="btn btn-success btn-sm">+</button>
            <button onclick="changeQty(${index},-1)" class="btn btn-warning btn-sm">-</button>
            <button onclick="removeItem(${index})" class="btn btn-danger btn-sm">Remove</button>
          </div>
        </div>
      </div>
    `;
    total += item.price * item.qty;
  });

  let cartContainer = document.getElementById("cart-items");
  let totalContainer = document.getElementById("total");

  if (cartContainer) cartContainer.innerHTML = output;
  if (totalContainer) totalContainer.innerText = "Total: ₹" + total;
}

// 🔹 Change Quantity
function changeQty(index, change) {
  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  updateStorage();
  showCart();
  updateCartCount();
}

// 🔹 Remove Item
function removeItem(index) {
  cart.splice(index, 1);

  updateStorage();
  showCart();
  updateCartCount();
}

// 🔹 Update LocalStorage
function updateStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// 🔹 Cart Count Badge (Optional but Advanced ⭐)
function updateCartCount() {
  let count = cart.reduce((sum, item) => sum + item.qty, 0);

  let badge = document.getElementById("cart-count");
  if (badge) badge.innerText = count;
}

// 🔹 Search Function
let searchBox = document.getElementById("search");
if (searchBox) {
  searchBox.addEventListener("keyup", (e) => {
    displayProducts(e.target.value);
  });
}
// 🔹 Show Order Summary
function showOrderSummary() {
  let output = "";
  let total = 0;

  cart.forEach(item => {
    output += `
      <p>${item.name} - ₹${item.price} × ${item.qty}</p>
    `;
    total += item.price * item.qty;
  });

  output += `<h4>Total: ₹${total}</h4>`;

  let summary = document.getElementById("order-summary");
  if (summary) summary.innerHTML = output;
}

// 🔹 Payment Function
function makePayment() {
  let name = document.getElementById("name").value;
  let card = document.getElementById("card").value;
  let expiry = document.getElementById("expiry").value;
  let cvv = document.getElementById("cvv").value;

  // Simple Validation
  if (!name || !card || !expiry || !cvv) {
    alert("Please fill all details!");
    return;
  }

  if (card.length < 12) {
    alert("Invalid Card Number!");
    return;
  }

  // Fake Payment Success
  alert("✅ Payment Successful!");

  // Clear Cart
  cart = [];
  localStorage.removeItem("cart");

  // Redirect to Home
  window.location.href = "index.html";
}
// 🔹 Auto Run Functions
displayProducts();
showCart();
updateCartCount();