document.addEventListener('DOMContentLoaded', () => {
  // Get login status and checkout button elements
  const loginStatus = document.getElementById('login-status');
  const checkoutBtn = document.getElementById('checkout-btn');
  const isLoggedIn = localStorage.getItem('loggedIn');

  // Check if the user is logged in
  if (isLoggedIn) {
    loginStatus.textContent = `Logged in as ${localStorage.getItem('username')}`;
    checkoutBtn.disabled = false;
  } else {
    loginStatus.textContent = 'Not logged in';
    checkoutBtn.disabled = true;
  }

  // Cart management elements
  const cartItems = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Update cart display
  const updateCart = () => {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - $${item.price}`;

      // Add a remove button for each item
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.style.marginLeft = '10px';
      removeBtn.addEventListener('click', () => removeFromCart(index));

      li.appendChild(removeBtn);
      cartItems.appendChild(li);

      total += item.price;
    });

    totalPriceElement.textContent = `Total: $${total}`;
  };

  // Remove item from the cart
  const removeFromCart = (index) => {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  };

  // Add items to the cart when a product is bought
  const buyButtons = document.querySelectorAll('.buy-btn');
  buyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      const price = parseInt(button.getAttribute('data-price'));
      cart.push({ name, price });
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
      alert(`${name} added to cart!`);
    });
  });

  updateCart();

  // Cart modal functionality
  const cartModal = document.getElementById('cart-modal');
  const viewCartBtn = document.getElementById('view-cart-btn');
  const closeBtn = document.querySelector('.close-btn');

  // Open cart modal
  viewCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'block';
  });

  // Close cart modal
  closeBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
  });

  // Close modal if the user clicks outside of it
  window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
      cartModal.style.display = 'none';
    }
  });

  // Proceed to checkout
  checkoutBtn.addEventListener('click', () => {
    window.location.href = 'checkout.html';
  });
});
