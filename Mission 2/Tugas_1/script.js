document.addEventListener("DOMContentLoaded", function () {
  const productsContainer = document.querySelector(".products");
  const cartItems = document.querySelector(".cart-items");
  const subtotal = document.getElementById("subtotal");
  const tax = document.getElementById("tax");
  const total = document.getElementById("total");

  let cart = [];

  // Mengambil data produk dari JSON
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      // Menampilkan produk di halaman
      data.forEach((product, index) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>Harga: Rp${product.price}</p>
          <button class="minus">-</button>
          <span class="quantity">0</span>
          <button class="plus">+</button>
          <button class="addToCart">Tambah ke Cart</button>
        `;

        productsContainer.appendChild(productDiv);

        const addToCartBtn = productDiv.querySelector(".addToCart");
        const quantityElement = productDiv.querySelector(".quantity");
        const plusBtn = productDiv.querySelector(".plus");
        const minusBtn = productDiv.querySelector(".minus");

        let quantity = 0;

        plusBtn.addEventListener("click", () => {
          quantity++;
          quantityElement.textContent = quantity;
        });

        minusBtn.addEventListener("click", () => {
          if (quantity > 0) {
            quantity--;
            quantityElement.textContent = quantity;
          }
        });

        addToCartBtn.addEventListener("click", () => {
          if (quantity > 0) {
            const productInfo = {
              name: product.name,
              price: product.price,
              quantity: quantity,
              image: product.image,
            };

            const existingProductIndex = cart.findIndex((item) => item.name === productInfo.name);

            if (existingProductIndex !== -1) {
              cart[existingProductIndex].quantity += quantity;
            } else {
              cart.push(productInfo);
            }

            updateCartUI();
            // Reset quantity ke 0 setelah menambahkan ke Cart
            quantity = 0;
            quantityElement.textContent = quantity;
          }
        });
      });
    })
    .catch((error) => console.error("Error fetching data:", error));

  // Fungsi untuk memperbarui tampilan Cart
  function updateCartUI() {
    cartItems.innerHTML = "";
    let subtotalAmount = 0;
    let totalHarga = 0;

    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      totalHarga = item.price * item.quantity;

      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <p>${item.name}</p>
        <p>Rp${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Total: Rp${totalHarga}</p>
        <button class="removeFromCart" data-name="${item.name}">Hapus</button>
      `;

      cartItems.appendChild(cartItem);

      subtotalAmount += item.price * item.quantity;
    });

    const taxAmount = subtotalAmount * 0.11;
    const totalAmount = subtotalAmount + taxAmount;

    subtotal.textContent = subtotalAmount;
    tax.textContent = taxAmount;
    total.textContent = totalAmount;

    // Event listener untuk tombol Hapus di Cart
    const removeFromCartBtns = document.querySelectorAll(".removeFromCart");
    removeFromCartBtns.forEach((removeBtn) => {
      removeBtn.addEventListener("click", () => {
        const productName = removeBtn.getAttribute("data-name");
        const productIndex = cart.findIndex((item) => item.name === productName);

        if (productIndex !== -1) {
          cart.splice(productIndex, 1);
          updateCartUI();
        }
      });
    });
  }
});
