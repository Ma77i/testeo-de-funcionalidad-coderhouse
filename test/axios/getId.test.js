const axios = require("axios");
const util = require("../util");

const PRODAXIOS_URL = "http://localhost:8080/api/products";

const getById = async () => {
    const product = await util.createProduct()
    const { data } = await axios.get(`${PRODAXIOS_URL}/${product.id}`);
    console.log(data)
    return data;
}

module.exports = getById();
