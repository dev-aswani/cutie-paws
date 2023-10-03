// This is the file that provides the functionality on the afterCart.html page, allowing the user to add
// items to cart.
let card;
let image;
let serviceName;
let description;
let cost;
document.getElementById("logout-button").addEventListener("click", (event) => {
   localStorage.setItem("user", JSON.stringify(null));
   localStorage.setItem("services",JSON.stringify(null));
   localStorage.setItem("cart",JSON.stringify(null));
   localStorage.setItem("chosenServices",JSON.stringify(null));
});
window.onload = generateServiceCards();

async function generateServiceCards() {
   let cards = JSON.parse(localStorage.getItem("services")) || [];
   for (let i = 1; i <= cards.length; i++) {
      card = document.createElement("div");
      card.className = "services";
      card.id = 'service-' + i;
      image = document.createElement("img");
      image.src = cards[(i - 1)].image_link;
      image.className = "service-image"
      image.id = "service-image-" + i;
      card.appendChild(image);
      serviceName = document.createElement("p");
      serviceName.innerText = cards[(i - 1)].title;
      serviceName.className = "service-name";
      serviceName.id = "service-name-" + i;
      card.appendChild(serviceName);
      description = document.createElement("p");
      description.innerText = cards[(i - 1)].description;
      description.className = 'service-description';
      description.id = "service-description-" + i;
      card.appendChild(description);
      cost = document.createElement("button");
      cost.innerText = "AED "+cards[(i - 1)].unit_price;
      cost.className = "service-cost";
      cost.id = "service-cost-" + i;
      cost.onclick = handleClick;
      card.appendChild(cost);
      document.getElementById("services-container").appendChild(card);

   }
   updateCartItemCount();

}

async function handleClick() {
   let email=JSON.parse(localStorage.getItem("user")).email;
   let serviceName = document.getElementById("service-name-" + this.id.substring(13)).innerText;

   try {
      const result = await addToCart(email,{service_title:serviceName,quantity:1});
      if(result.confirmation === "fail"){
          window.location.href="../html/error.html"
      }
      let cart = JSON.parse(localStorage.getItem("cart"));
      let modalContainer = document.getElementById("modal-container");
      modalContainer.classList.add("active");
      
      let existingService = cart.cart.find(service => service.title === serviceName);
   
      if (existingService) {
         existingService.quantity++;
         existingService.sum_total+=Number(document.getElementById(this.id).innerText.substring(4));
         cart.grand_quantity++;
         cart.grand_total+=Number(document.getElementById(this.id).innerText.substring(4));
      } else {
         cart.grand_quantity++;
         cart.grand_total+=Number(document.getElementById(this.id).innerText.substring(4));
         cart.cart.push({
            "image_link": document.getElementById("service-image-" + this.id.substring(13)).src,
            "title": serviceName,
            "unit_price": Number(document.getElementById(this.id).innerText.substring(4)),
            "quantity": 1,
            "sum_total":Number(document.getElementById(this.id).innerText.substring(4))
         });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      
      updateCartItemCount();
  } catch (error) {
      console.error(error);
  }


}

function updateCartItemCount() {
   const cartCounter = document.getElementById("cart-counter");
   const grand_quantity = Number(JSON.parse(localStorage.getItem("cart")).grand_quantity);

   if (grand_quantity === 0) {
      cartCounter.style.display = "none";
   } else {
     cartCounter.innerText = grand_quantity;
     cartCounter.style.display = "block";
   }
}

document.getElementById("modal-container-x").addEventListener("click", () => {
   let modalContainer = document.getElementById("modal-container");
   modalContainer.classList.remove("active");
});