import { faker } from '@faker-js/faker';
const name = faker.person.fullName();

export const config = {
  baseURL: 'https://bookstore.demoqa.com/Account/v1',
  credentials: {
    userName: `${name}`,
    password: 'Qwerty123!',
  },
};
