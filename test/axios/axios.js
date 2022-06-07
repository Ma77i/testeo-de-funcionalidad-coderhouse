const axios = require("axios");

const PRODAXIOS_URL = "http://localhost:8080/api/products";

const getProducts = async () => {
  const { data } = await axios.get(PRODAXIOS_URL);
  console.log(data);
};

module.exports = getProducts();
