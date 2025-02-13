import { faker } from '@faker-js/faker';
import { config } from '../config/config';

export function generateUserCredentials() {
  return {
    userName: faker.person.fullName(),
    password: config.credentials.password,
  };
}
