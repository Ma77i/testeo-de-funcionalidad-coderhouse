const faker = require("faker");


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


  updateProduct: async () => ({
    title: "Prueba axios",
    price: 0000,
    description: "prueba axios",
    thumbnail: "",
    stock: 0000,
    code: 0000,
    timestamp: Date.now()
  })
};
