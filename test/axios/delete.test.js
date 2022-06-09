const axios = require("axios");
const util = require("../util");

const PRODAXIOS_URL = "http://localhost:8080/api/products";

const addProduct = async () => {
  const product = util.deleteProduct();
  const { data } = await axios.delete(PRODAXIOS_URL, product);
  console.log(data);
};

module.exports = addProduct();