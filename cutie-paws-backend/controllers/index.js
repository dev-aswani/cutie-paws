// This file serves as an entry point for accessing various controllers related to different resources in the backend
const CartController = require("./CartController");
const PurchaseController = require("./PurchaseController");
const ServiceController = require("./ServiceController");
const UserController = require("./UserController");

module.exports = {
  cart: CartController,
  purchase: PurchaseController,
  service: ServiceController,
  user: UserController,
};