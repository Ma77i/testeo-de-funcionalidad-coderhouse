const axios = require("axios");
const util = require("../util");

const PRODAXIOS_URL = "http://localhost:8080/api/products";

const addProduct = async () => {
    const product = util.createProduct();
    const { data } = await axios.post(PRODAXIOS_URL, product);
    const getId = await axios.get(`${PRODAXIOS_URL}/${data._id}`);
    console.log(getId.data);
};

module.exports = addProduct();
