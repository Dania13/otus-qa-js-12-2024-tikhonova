import { faker } from '@faker-js/faker';
const name = faker.person.fullName();

export const config = {
  baseURL: process.env.BOOKSTORE_BASE_URL,
  credentials: {
    userName: `${name}`,
    password: process.env.BOOKSTORE_PASSWORD,
  },
};
