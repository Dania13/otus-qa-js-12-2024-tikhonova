/* eslint-disable playwright/no-standalone-expect */
import { UserBookService, UserFixture } from '../framework';
import { config } from '../framework/config/config';

describe('bookstore tests', () => {
  it('create existing user', async () => {
    let user = {
      userName: `${config.credentials.userName}`,
      password: `${config.credentials.password}`,
    };

    const response = await UserBookService.create(user);

    expect(response.data.message).toBe('User exists!');
    expect(response.data.code).toBe('1204');
  });
  it('create user with non valid password', async () => {
    let user = {
      userName: `${UserFixture.generateUserCredentials().userName}`,
      password: 'Qwerty',
    };

    const response = await UserBookService.create(user);

    expect(response.data.message).toBe(
      "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.",
    );
    expect(response.data.code).toBe('1300');
  });
  it('create user success', async () => {
    let user = UserFixture.generateUserCredentials();
    const response = await UserBookService.create(user);

    expect(response.data.username).toBe(`${user.userName}`);
    const userID = response.data.userID;
    expect(userID).not.toBe(undefined);
    expect(typeof response.data.userID).toBe('string');

    const token = (await UserBookService.generateToken(user)).data.token;
    await UserBookService.delete(userID, token);
  });
  it('generate token with error', async () => {
    let user = {
      userName: `${UserFixture.generateUserCredentials().userName}`,
    };

    const response = await UserBookService.generateToken(user);

    expect(response.data.code).toBe('1200');
    expect(response.data.message).toBe('UserName and Password required.');
  });

  it('generate token success', async () => {
    let user = UserFixture.generateUserCredentials();

    await UserBookService.create(user);

    const response = await UserBookService.generateToken(user);

    expect(response.data.token).not.toBe(undefined);
    expect(typeof response.data.token).toBe('string');
    expect(response.data.status).toBe('Success');
  });
});
