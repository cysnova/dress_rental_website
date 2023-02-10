document.body.onload = generateShop;

var products = []
var cart = {}


async function generateShop(){
  
    console.log("Generating shop...")
    const res = await fetch(
        "https://jsonblob.com/api/1072619027205210112"
    )

    const data = await res.json();
  
     const gallery= document.getElementsByClassName("cards-wrapper")[0];
     products = data.shop;
     for (var shop of products){
      console.log(shop)
      const box = `
      
        <div class="card">
           <div class="card-overlay">
             <h2 class="card-overlay-heading">${shop.name}</h2>
             <h3 class="card-overlay-paragraph">Price: $${shop.price}</h3>
             <div class="buttons" >
             <i class="bi bi-dash-lg" onclick="subtract('${shop.id}')"></i>
             <div class="quantity" data-pid="${shop.id}">0</div> 
             <i class="bi bi-plus-lg" onclick="add('${shop.id}')"></i>
             </div>
             <button type="button" class="card-overlay-btn" onclick="order('${shop.id}')">Order Now</button>
             </div> 
             <img src="${shop.img}" class="card-img" />
          </div>
      `
      gallery.innerHTML +=box
     }

   }


function add(id){
  order(id);
}

function subtract(id){
  if(id in cart){
    if(cart[id] == 1){
      delete cart[id];
    } else{
      cart[id]--;
    }
  }else{
    
    //do nothing
  }
  let quantityDiv = document.querySelector(`.quantity[data-pid="${id}"]`);
  quantityDiv.textContent = cart[id]?cart[id]:0;

  updateCartAmount();  
  saveCart();
  
}

function order(id){
  if(id in cart){
    cart[id]++;
  }else{
    cart[id] = 1;
  }
  // document.querySelector(".quantity[data-pid]").innerText= id;
  let quantityDiv = document.querySelector(`.quantity[data-pid="${id}"]`);
  quantityDiv.textContent = cart[id];
  updateCartAmount();
  saveCart();
}

function saveCart(){
  window.localStorage.setItem("cart", JSON.stringify(cart));
  window.localStorage.setItem("products", JSON.stringify(products));
  
 
 
}

function updateCartAmount(){
  let total = 0;
  for (let id in cart) {
    total += cart[id];
  }
  document.getElementById("cartAmount").textContent = total;

  window.localStorage.setItem("cartAmount", total);
 
  saveCart();
}      

