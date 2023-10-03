// This is the file that provides the functionality on the chosenServices.html page.
let card;
let image;
let serviceName;
let description;
let quantity;
window.onload = generateServiceCards();
document.getElementById("logout-button").addEventListener("click", (event) => {
   localStorage.setItem("user", JSON.stringify(null));
   localStorage.setItem("services",JSON.stringify(null));
   localStorage.setItem("cart",JSON.stringify(null));
   localStorage.setItem("chosenServices",JSON.stringify(null));
});

function generateServiceCards() {
   let cards = JSON.parse(localStorage.getItem("chosenServices"));
   let cardsContainer = document.getElementById("services-container")
   if (cards.length == 0) {
      const emptyCartCard = document.createElement("div");
      emptyCartCard.className = "services empty-services";
      emptyCartCard.innerText = "You haven't chosen any services. \n\nGo to Services We Offer to choose now.";
      cardsContainer.appendChild(emptyCartCard);
   }
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
      serviceName.id = "service-name-" + i
      card.appendChild(serviceName);
      description = document.createElement("p");
      description.innerText = cards[(i - 1)].description;
      description.className = 'service-description';
      description.id = "service-description-" + i;
      card.appendChild(description);
      quantity = document.createElement("p");
      quantity.className = 'service-quantity';
      quantity.id = "service-quantity-" + i;
      quantity.innerText = 'x' + cards[(i - 1)].quantity;
      card.appendChild(quantity);
      document.getElementById("services-container").appendChild(card);
   }
   updateCartItemCount();

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

