import { faker } from '@faker-js/faker';

export function generateUserCredentials() {
  return {
    userName: faker.person.fullName(),
    password: 'P@ssw0rd',
  };
}
