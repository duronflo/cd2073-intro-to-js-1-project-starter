/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */

/* Create 3 or more product objects using object literal notation 
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/

const products = [
  {
    name: "cherry",
    price: 1.5,
    quantity: 0,
    productId: 100,
    image: "./images/cherry.jpg"
  },
  {
    name: "orange",
    price: 2,
    quantity: 0,
    productId: 101,
    image: "./images/orange.jpg"
  },
  {
    name: "strawberry",
    price: 3,
    quantity: 0,
    productId: 102,
    image: "./images/strawberry.jpg"
  }
]


/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

/* Declare an empty array named cart to hold the items in the cart */

let cart = [];
/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/

function getProductById(productArry, id) {
  for (let i = 0; i < products.length; i++) {
    if (productArry[i].productId === id) {
      return i;
    }
  }
  // corresponding product not found
  return 0;
}

function addProductToCart(productId) {

  const productIdx = getProductById(products, productId);

  const cartIdx = cart.indexOf(products[productIdx]);
  // check if product is already in cart
  if (cartIdx === -1) {
    // in case product is not there, add it ...
    cart.push(products[productIdx]);
    products[productIdx].quantity += 1;
  }
  else {
    // if product already there, increase quantity
    products[productIdx].quantity += 1;
  }
}

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/

function increaseQuantity(productId) {
  const productIdx = getProductById(products, productId);
  products[productIdx].quantity += 1;
}

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/

function decreaseQuantity(productId) {
  const productIdx = getProductById(products, productId);
  products[productIdx].quantity -= 1;
  if (products[productIdx].quantity === 0) {
    removeProductFromCart(productId);
  }
}


/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/

function removeProductFromCart(productId) {
  const productIdx = getProductById(products, productId);
  const cartIdx = cart.indexOf(products[productIdx]);
  if (cartIdx !== -1) {
    products[productIdx].quantity = 0;
    cart.splice(cartIdx, 1)
  }

}

/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total cost of all products
  - cartTotal should return the total cost of the products in the cart
  Hint: price and quantity can be used to determine total cost
*/
function cartTotal() {
  let total = 0;
  if (cart.length !== 0) {
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].quantity;
    }
    return total;
  }
  return 0;
}

/* Create a function called emptyCart that empties the products from the cart */

function emptyCart() {

  products.forEach(function (product) {
    product.quantity = 0;
    removeProductFromCart(product);
  });
  cart.length = 0;
}
/* Create a function named pay that takes in an amount as an argument
  - amount is the money paid by customer
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
  Hint: cartTotal function gives us cost of all the products in the cart  
*/
let totalPaid = 0;

function pay(amount) {
  totalPaid += amount;
  let remaining = totalPaid - cartTotal();
  if (remaining >= 0) {
    totalPaid = 0;
    emptyCart();
  }

  return remaining;
}
/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/

let currentCurrency = "USD";

// selection can only performed beforehand not during shopping TODO:


function currency(newCurrency) {

  function convProducts(currencyFac) {
    products.forEach(function (product) {
      product.price *= currencyFac;
    })
  }

  switch (newCurrency) {
    case "USD":
      switch (currentCurrency) {
        case "EUR":
          convProducts(1.06);
          break;
        case "YEN":
          convProducts(0.0067);
          break;
        default:
          break;
      }
      break;
    case "EUR":
      switch (currentCurrency) {
        case "USD":
          convProducts(0.94);
          break;
        case "YEN":
          convProducts(0.0063);
          break;
        default:
          break;
      }
      break;
    case "YEN":
      switch (currentCurrency) {
        case "EUR":
          convProducts(158.43);
          break;
        case "USD":
          convProducts(149.66);
          break;
        default:
          break;
      }
      break;
    default:
      // do nothing due to no valid currency
      break;
  }
  currentCurrency = newCurrency;

}

/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  emptyCart,
  currency
}
