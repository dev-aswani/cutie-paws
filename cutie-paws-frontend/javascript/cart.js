// This is the file that provides the functionality on the cart.html page, allowing the users to modify
// the cart, remove services and buy the services in the cart, which adds them to the chosen
// services.
let card;
let image;
let serviceName;
let cost;
let quantity;
let quantityCounter;
let decrementButton;
let incrementButton;
let removeIcon;
let serviceNameContainer;
let serviceNameHeader;
let serviceCostContainer;
let serviceCostHeader;
let serviceQuantityContainer;
let serviceQuantityHeader;
let serviceRemoveContainer;
let serviceRemoveHeader;
let totalServiceCostContainer;
let totalServiceCostHeader;
let totalServiceCost;
let checkoutContainer;
let checkoutSumTotalContainer;
let checkoutSumTotalHeader;
let checkoutSumTotal;
checkoutSumTotal = document.createElement("p");
checkoutSumTotal.id = "checkout-sum-total";

let checkoutBuyButton;
let checkoutBuyButtonLink;
document.getElementById("logout-button").addEventListener("click", (event) => {
   localStorage.setItem("user", JSON.stringify(null));
   localStorage.setItem("services",JSON.stringify(null));
   localStorage.setItem("cart",JSON.stringify(null));
   localStorage.setItem("chosenServices",JSON.stringify(null));
});
function generateCartCards() {
   checkoutSumTotal.innerText = "$0";
   const cardsContainer = document.getElementById("cart-container") || [];
   while (cardsContainer.firstChild) {
      cardsContainer.removeChild(cardsContainer.firstChild);
   }
   const cards = JSON.parse(localStorage.getItem('cart'))
   if (cards.cart.length == 0) {
      const emptyCartCard = document.createElement("div");
      emptyCartCard.className = "services empty-cart";
      emptyCartCard.innerText = "Your cart is empty. \n\nGo to Services We Offer to add more.";
      cardsContainer.appendChild(emptyCartCard);
   }
   for (let i = 1; i <= cards.cart.length; i++) {
      card = document.createElement("div");
      card.className = "services";
      card.id = "service-" + i;
      image = document.createElement("img");
      image.src = cards.cart[i - 1].image_link;
      image.className = "service-image";
      image.id = "service-image-" + i;
      card.appendChild(image);
      serviceNameContainer = document.createElement("div");
      serviceNameContainer.className = "service-name-container";
      serviceNameContainer.id = "service-name-container-" + i;
      serviceNameHeader = document.createElement("p");
      serviceNameHeader.className = "service-name-header";
      serviceNameHeader.innerText = "Service Name";
      serviceName = document.createElement("p");
      serviceName.id = "service-name-" + i
      serviceName.innerText = cards.cart[i - 1].title;
      serviceName.className = "service-name";
      serviceNameContainer.appendChild(serviceNameHeader);
      serviceNameContainer.appendChild(serviceName);
      card.appendChild(serviceNameContainer);
      serviceCostContainer = document.createElement("div");
      serviceCostContainer.className = "service-cost-container";
      serviceCostContainer.id = "service-cost-container-" + i;
      serviceCostHeader = document.createElement("p");
      serviceCostHeader.className = "service-cost-header";
      serviceCostHeader.id = "service-cost-header-" + i;
      serviceCostHeader.innerText = "Unit Price";
      cost = document.createElement("p");
      cost.className = "service-cost";
      cost.id = "service-cost-" + i;
      cost.innerText = cards.cart[i - 1].unit_price;
      serviceCostContainer.appendChild(serviceCostHeader);
      serviceCostContainer.appendChild(cost);
      card.appendChild(serviceCostContainer);
      quantityCounter = document.createElement("div");
      quantityCounter.className = "quantity-counter";
      decrementButton = document.createElement("button");
      decrementButton.className = "decrement button";
      decrementButton.innerText = "-";
      decrementButton.id = "decrement-" + i;
      decrementButton.onclick = function() {
         const id = this.id.substring(10);
         changeQuantity(id, -1);
       };
      incrementButton = document.createElement("button");
      incrementButton.className = "increment button";
      incrementButton.id = "increment-" + i;
      incrementButton.innerText = "+";
      incrementButton.onclick = function() {
         const id = this.id.substring(10);
         changeQuantity(id, 1);
       };
      serviceQuantityContainer = document.createElement("div");
      serviceQuantityContainer.className = "service-quantity-container";
      serviceQuantityContainer.id = "service-quantity-container-" + i;
      serviceQuantityHeader = document.createElement("p");
      serviceQuantityHeader.className = "service-quantity-header";
      serviceQuantityHeader.innerText = "Quantity";
      quantity = document.createElement("input");
      quantity.type = "text";
      quantity.name = "service-quantity";
      quantity.className = "service-quantity";
      quantity.id = "service-quantity-" + i;
      quantity.disabled=true;
      quantity.value = cards.cart[i - 1].quantity;
      quantityCounter.appendChild(decrementButton);
      quantityCounter.appendChild(quantity);
      quantityCounter.appendChild(incrementButton);
      serviceQuantityContainer.appendChild(serviceQuantityHeader);
      serviceQuantityContainer.appendChild(quantityCounter);
      card.appendChild(serviceQuantityContainer);
      totalServiceCostContainer = document.createElement("div");
      totalServiceCostContainer.className = "total-service-cost-container";
      totalServiceCostContainer.id = "total-service-cost-container-" + i;
      totalServiceCostHeader = document.createElement("p");
      totalServiceCostHeader.className = "total-service-cost-header";
      totalServiceCostHeader.id = "total-service-cost-header-" + i;
      totalServiceCostHeader.innerText = "Total Price";
      totalServiceCost = document.createElement("p");
      totalServiceCost.className = "total-service-cost";
      totalServiceCost.id = "total-service-cost-" + i;
      totalServiceCost.innerText = "AED " + cards.cart[i-1].sum_total;
      totalServiceCostContainer.appendChild(totalServiceCostHeader);
      totalServiceCostContainer.appendChild(totalServiceCost);
      card.appendChild(totalServiceCostContainer);
      serviceRemoveContainer = document.createElement("div");
      serviceRemoveContainer.className = "service-remove-container";
      serviceRemoveContainer.id = "service-remove-container-" + i;
      serviceRemoveHeader = document.createElement("p");
      serviceRemoveHeader.className = "service-remove-header";
      serviceRemoveHeader.id = "service-remove-header-" + i;
      serviceRemoveHeader.innerText = "Remove";
      removeIcon = document.createElement("img");
      removeIcon.src = "../images/remove.png";
      removeIcon.className = "remove-service";
      removeIcon.id = "remove-service-" + i;
      removeIcon.onclick = function(){
         const id =this.id.substring(15)
         handleRemoveClick(id)};
      serviceRemoveContainer.appendChild(serviceRemoveHeader);
      serviceRemoveContainer.appendChild(removeIcon);
      card.appendChild(serviceRemoveContainer);
      document.getElementById("cart-container").appendChild(card);
      checkoutSumTotal.innerText = "AED " +
         cards.grand_total;
   }
   if (cards.cart.length) {

      checkoutCardGenerator();
   }
   updateCartItemCount();
}

function checkoutCardGenerator() {

   checkoutContainer = document.createElement("div");
   checkoutContainer.className = "services checkout";
   checkoutContainer.id = 'checkout-container';
   checkoutSumTotalContainer = document.createElement("div");
   checkoutSumTotalContainer.className = "checkout-sum-total-container";
   checkoutSumTotalHeader = document.createElement("p");
   checkoutSumTotalHeader.id = "check-out-sum-total-header";
   checkoutSumTotalHeader.innerText = "Sum Total";
   checkoutSumTotalContainer.appendChild(checkoutSumTotalHeader);
   checkoutSumTotalContainer.appendChild(checkoutSumTotal);
   checkoutBuyButton = document.createElement("button");
   checkoutBuyButton.id = "cart-page-buy-button";
   checkoutBuyButton.onclick = handleBuyClick;
   checkoutBuyButtonLink = document.createElement("a");
   checkoutBuyButtonLink.href = "../html/afterCart.html";
   checkoutBuyButtonLink.innerText = "Buy";
   checkoutBuyButton.appendChild(checkoutBuyButtonLink);
   checkoutContainer.appendChild(checkoutSumTotalContainer);
   checkoutContainer.appendChild(checkoutBuyButton);
   document.getElementById("cart-container").appendChild(checkoutContainer);
}

async function changeQuantity(id,quantity) {
   let email=JSON.parse(localStorage.getItem("user")).email;
   let serviceName = document.getElementById("service-name-" + id).innerText;
   try {
      const result = await addToCart(email,{service_title:serviceName,quantity:quantity});
      if(result.confirmation === "fail"){
          window.location.href="../html/error/html"
      }
      let cart = JSON.parse(localStorage.getItem("cart"));
      const unitPrice=Number(document.getElementById("service-cost-"+id).innerText);
      const quantityElement = document.getElementById("service-quantity-" + id);
      const quantityValue = Number(quantityElement.value) + quantity;
      if(quantityValue<1){
         return;
      }
      quantityElement.value = quantityValue;
      const totalCostElement = document.getElementById(
         "total-service-cost-" + id
      );
      totalCostElement.innerText="AED "+(unitPrice*quantityValue);
      const sumTotalElement = document.getElementById("checkout-sum-total");
      sumTotalElement.innerText = "AED " +
         ((Number(sumTotalElement.innerText.substring(4))) + (quantity*unitPrice));
      let existingService = cart.cart.find(service => service.title === serviceName);
      existingService.quantity+=quantity;
      existingService.sum_total=Number(totalCostElement.innerText.substring(4));
      cart.grand_quantity+=quantity;
      cart.grand_total+=(unitPrice*quantity);
      localStorage.setItem("cart",JSON.stringify(cart));
      updateCartItemCount();
  } catch (error) {
      console.error(error);
  }
}

async function handleRemoveClick(id) {
   try{
      let cart = JSON.parse(localStorage.getItem("cart"));
      let serviceName=(document.getElementById("service-name-" + id).innerText);
      let email=JSON.parse(localStorage.getItem("user")).email;
      let existingService=cart.cart.find(service=>service.title===serviceName);
      const result=await removeFromCart(email,serviceName);
      if(result.confirmation==="fail"){
          return alert("Something went wrong")
      }
      const index = Number(id) - 1;
      cart.cart.splice(index, 1);
      cart.grand_quantity-=Number(existingService.quantity);
      cart.grand_total-=Number(existingService.sum_total)
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartItemCount();
      generateCartCards();
   }catch(error){
      console.error(error);
   }
}

async function handleBuyClick(id) {
   try{
      let email=JSON.parse(localStorage.getItem("user")).email;
      const result=await checkout(email);
      if(result.confirmation==="fail"){
         return alert("Something went wrong");
      }
      let cart=JSON.parse(localStorage.getItem("cart"));
      let chosenServices=JSON.parse(localStorage.getItem("chosenServices"));
      let allServices=JSON.parse(localStorage.getItem("services"));
      let serviceName;
      let existingService;
      for(let i=0;i<cart.cart.length;i++){
         serviceName=cart.cart[i].title;
         existingService=chosenServices.find(service=>service.title===serviceName);
         if(existingService){
            existingService.quantity+=Number(cart.cart[i].quantity);
         }
         else{
            let nonExistingService=allServices.find(service=>service.title===serviceName);
            chosenServices.push({
               "image_link":cart.cart[i].image_link,
               "title":serviceName,
               "description":nonExistingService.description,
               "quantity":Number(cart.cart[i].quantity)
               }
            )
         } 
      }      
      localStorage.setItem("cart", JSON.stringify({grand_total:0,grand_quantity:0,cart:[]}));
      localStorage.setItem("chosenServices", JSON.stringify(chosenServices));
      generateCartCards();
      updateCartItemCount();
      window.location.href="../html/afterCart.html"

   }catch(error){
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
window.onload = generateCartCards();