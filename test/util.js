const faker = require("faker");

const createProduct = async () => ({
  title: faker.commerce.productName(),
  price: faker.commerce.price(),
  description: faker.lorem.paragraph(),
  thumbnail: faker.image.imageUrl(),
  stock: faker.datatype.number(),
  code: faker.random.alphaNumeric(),
  timestamp: Date.now()
});

module.exports = {
  createProduct: async () => ({
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.lorem.paragraph(),
    thumbnail: faker.image.imageUrl(),
    stock: faker.datatype.number(),
    code: faker.random.alphaNumeric(),
    timestamp: Date.now()
  }),

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
