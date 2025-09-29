import { fakerES as faker } from "@faker-js/faker";

export const createProductMock = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.number.int({ max: 500000 }),
    stock: faker.number.int({ min: 1, max: 1000 }),
  };
};
