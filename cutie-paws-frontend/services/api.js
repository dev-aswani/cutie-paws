// This file provides a set of functions to interact with various endpoints of the API, such as creating user accounts, logging in, retrieving services, managing a user's cart, and viewing purchased services. The BASE_URL variable is used as the base URL for the API endpoints.
const BASE_URL = "http://localhost:8080";

// sign up
const createAccount = async (user) => {
    return fetch(`${BASE_URL}/users`, {
      mode: "cors",
      cache: "no-cache",
      method: "post",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then((response) => {
        return response.json()
    }).then(data => data)
    .catch((error) => error);
  };

// check if account exists
const checkIfAccountExists = async (email) => {
  return fetch(`${BASE_URL}/users/${email}`, {
    mode: "cors",
    cache: "no-cache",
    method: "get",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
  })
  .then((response) => {
      return response.json()
  }).then(data => data)
  .catch((error) => error);
};

// login
const login = async (user) => {
  return fetch(`${BASE_URL}/users/login`, {
    mode: "cors",
    cache: "no-cache",
    method: "post",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  .then((response) => {
      return response.json()
  }).then(data => data)
  .catch((error) => error);
};




// get all services
const getServices = async () => {
  return fetch(`${BASE_URL}/services`, {
    mode: "cors",
    cache: "no-cache",
    method: "get",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
};


// add service to cart
const addToCart = async (email,service) => {
  return fetch(`${BASE_URL}/carts/${email}`, {
    mode: "cors",
    cache: "no-cache",
    method: "post",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(service)
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
};



// get cart
const getCart = async (email) => {
  return fetch(`${BASE_URL}/carts/${email}`, {
    mode: "cors",
    cache: "no-cache",
    method: "get",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
};

// remove item from cart
const removeFromCart = async (email,service_title) => {
  return fetch(`${BASE_URL}/carts/${email}`, {
    mode: "cors",
    cache: "no-cache",
    method: "delete",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body:JSON.stringify({service_title})
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
};

// checkout
const checkout = async (email) => {
  return fetch(`${BASE_URL}/purchases/${email}`, {
    mode: "cors",
    cache: "no-cache",
    method: "post",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
};

// view my services
const getChosenServices = async (email) => {
  return fetch(`${BASE_URL}/purchases/${email}`, {
    mode: "cors",
    cache: "no-cache",
    method: "get",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
};

