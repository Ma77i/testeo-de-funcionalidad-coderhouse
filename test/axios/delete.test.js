const axios = require("axios");
const util = require("../util");

const PRODAXIOS_URL = "http://localhost:8080/api/products";

const deleteProduct = async () => {
  const product = util.createProduct();
  // POST test
  const { data } = await axios.post(PRODAXIOS_URL, product);
  // GET ID test
  const getId = await axios.get(`${PRODAXIOS_URL}/${data._id}`);
  console.log("Data: ", getId.data);
  // DELETE test
  const del = await axios.delete(`${PRODAXIOS_URL}/${data._id}`);
  console.log("Deleted: ", del.data);
  // PUT test
  const put = await axios.put(`${PRODAXIOS_URL}/${data._id}`, product);
  console.log("Updated: ", put.data);
};

module.exports = deleteProduct();