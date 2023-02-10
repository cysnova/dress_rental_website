let cart = JSON.parse(localStorage.getItem("cart")) || {};
let products = JSON.parse(localStorage.getItem("products")) || [];
let cartAmount = window.localStorage.getItem("cartAmount");
cartAmount = parseInt(cartAmount);
document.getElementById("cartAmount").textContent = cartAmount;


function findProduct(pid){

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === pid) {
        return products[i];
    }
  }
}

function generateCartItems(){
  var container = document.getElementsByClassName("cart-container")[0]
  let total = 0;
  for(const pid in cart){
    const product = findProduct(pid);
    const unitPrice = product.price;
    const quantity = cart[pid];
    var subtotal = unitPrice * quantity;
    total += subtotal;
    container.innerHTML+=`<div class="card cart-card">
    <div class="card-overlay">
      <h2 class="card-overlay-heading">${product.name}</h2>
      <h3 class="card-overlay-paragraph">Product Price: ${product.price}</h3>
      <div class="buttons">
        <div class="quantity">${cart[pid]} item</div>
      </div>
      <div class="subTotal">$${subtotal}</div>
      <i class="bi bi-trash3-fill" onclick="removeItem('${pid}')"></i>
    </div>
    <img src="${product.img}" class="container-card-img" />
  </div>`
  }
  
  console.log("Total Amount", total);
  
  
  
document.getElementsByClassName("totalPrice")[0].innerHTML= "total amount " + ":" + "$" + total;
};


document.body.onload= generateCartItems;




function clearCart() {
  localStorage.removeItem("cart");
  localStorage.removeItem("cartAmount");
 document.getElementById("cartAmount").textContent = 0;
  
  location.reload();
}

if (!isNaN(cartAmount)) {
  document.getElementById("cartAmount").textContent = cartAmount;
} else {
  document.getElementById("cartAmount").textContent = 0;
}

document.getElementsByClassName("btn-clrcart")[0].addEventListener("click", clearCart);
document.getElementsByClassName("btn-checkout")[0].addEventListener("click", function(){
  window.location.replace("#checkout");
});

function removeItem(pid) {
  if (cart[pid]) {
    cartAmount -= cart[pid];
    delete cart[pid];
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartAmount", cartAmount);
    document.getElementById("cartAmount").textContent = cartAmount;
    location.reload();
  }
}