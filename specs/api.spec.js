import { config } from '../framework/config/config';
import { generateUserCredentials } from '../framework/fixtures/userFixtures';
import {
  createUser,
  deleteUser,
  generateToken,
} from '../framework/services/UserBookService';

describe('bookstore tests', () => {
  it('create existing user', async () => {
    let user = {
      userName: `${config.credentials.userName}`,
      password: `${config.credentials.password}`,
    };

    const response = await createUser(user);

    expect(response.data.message).toBe('User exists!');
    expect(response.data.code).toBe('1204');
  });
  it('create user with non valid password', async () => {
    let user = {
      userName: `${generateUserCredentials().userName}`,
      password: 'Qwerty',
    };

    const response = await createUser(user);

    expect(response.data.message).toBe(
      "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.",
    );
    expect(response.data.code).toBe('1300');
  });
  it('create user success', async () => {
    let user = generateUserCredentials();
    const response = await createUser(user);

    expect(response.data.username).toBe(`${user.userName}`);
    const userID = response.data.userID;
    expect(userID).not.toBe(undefined);
    expect(typeof response.data.userID).toBe('string');

    const token = (await generateToken(user)).data.token;
    await deleteUser(userID, token);
  });
  it('generate token with error', async () => {
    let user = {
      userName: `${generateUserCredentials().userName}`,
    };

    const response = await generateToken(user);

    expect(response.data.code).toBe('1200');
    expect(response.data.message).toBe('UserName and Password required.');
  });

  it('generate token success', async () => {
    let user = generateUserCredentials();

    await createUser(user);

    const response = await generateToken(user);

    expect(response.data.token).not.toBe(undefined);
    expect(typeof response.data.token).toBe('string');
    expect(response.data.status).toBe('Success');
  });
});
