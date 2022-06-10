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
  // PUT test
  const update = await util.updateProduct()
  try {
    const put = await axios.put(`${PRODAXIOS_URL}/${data._id}`, update);
    console.log("Updated: ", put.data);
  } catch (error) {
    console.log("Error: ", error);    
  }
  // GET test
  const getAll = await axios.get(PRODAXIOS_URL);
  console.log("All: ", getAll.data);
  // DELETE test
  const del = await axios.delete(`${PRODAXIOS_URL}/${data._id}`);
  console.log("Deleted: ", del.data);
};

module.exports = deleteProduct();