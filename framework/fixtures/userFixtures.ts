import { faker } from '@faker-js/faker';
import config from '../config/configBookstore';

export function generateUserCredentials() {
  return {
    userName: faker.person.fullName(),
    password: config.credentials.password,
  };
}
