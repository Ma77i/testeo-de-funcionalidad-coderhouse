const axios = require("axios");
const createProduct = require("../util");

const PRODAXIOS_URL = "http://localhost:8080/api/products";

const addProduct = async () => {
  const product = createProduct();
  const { data } = await axios.post(PRODAXIOS_URL, product);
  console.log(data);
};

module.exports = addProduct();