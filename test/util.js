const faker = require("faker");


module.exports = {
  getAllProducts: async () => {
    const { data } = await axios.get(PRODAXIOS_URL);
    return data;
  },
  createProduct: async () => ({
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.lorem.paragraph(),
    thumbnail: faker.image.imageUrl(),
    stock: faker.datatype.number(),
    code: faker.random.alphaNumeric(),
    timestamp: Date.now()
  }),

  getProductId: async () => {
    const { data } = await axios.get(PRODAXIOS_URL);
    return data[0]._id;
  },

  deleteProduct: async (product) => {
    const res = await request(app)
      .delete(`/api/products/${product._id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(200);
  },

  updateProduct: async (product) => {
    const res = await request(app)
  }
};
