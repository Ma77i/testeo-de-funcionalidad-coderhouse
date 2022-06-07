const axios = require("axios");

const PRODAXIOS_URL = "http://localhost:8080/api/products";

const addProduct = async () => {
  const { data } = await axios.post(PRODAXIOS_URL);
  console.log(data);
};

module.exports = addProduct();
