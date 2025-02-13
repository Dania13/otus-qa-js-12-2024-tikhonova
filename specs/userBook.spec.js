import { config } from '../framework/config/config';
import { generateUserCredentials } from '../framework/fixtures/userFixtures';
import {
  authorized,
  createUser,
  deleteUser,
  generateToken,
  infoUser,
} from '../framework/services/UserBookService';

describe('test autorization', () => {
  it('success', async () => {
    const user = {
      userName: `${config.credentials.userName}`,
      password: `${config.credentials.password}`,
    };

    await generateToken(user);
    const response = await authorized(user);

    expect(response.status).toBe(200);
    expect(response.data).toBe(true);
  });

  it('without password', async () => {
    const user = {
      userName: `${config.credentials.userName}`,
    };

    const response = await authorized(user);

    expect(response.status).toBe(400);
    expect(response.data.code).toBe('1200');
    expect(response.data.message).toBe('UserName and Password required.');
  });

  it('without generateToken', async () => {
    const user = {
      userName: `${config.credentials.userName2}`,
      password: `${config.credentials.password}`,
    };

    const response = await authorized(user);

    expect(response.status).toBe(200);
    expect(response.data).toBe(false);
  });
});

describe('test remove user', () => {
  it('success', async () => {
    const user = generateUserCredentials();
    const userID = (await createUser(user)).data.userID;

    const token = (await generateToken(user)).data.token;

    await authorized(user);
    const response = await deleteUser(userID, token);

    expect(response.status).toBe(204);
    expect(response.data).toBe('');
  });

  it('without authorized', async () => {
    const user = generateUserCredentials();
    const userID = (await createUser(user)).data.userID;

    await authorized(user);
    const response = await deleteUser(userID);

    expect(response.status).toBe(401);
    expect(response.data.code).toBe('1200');
    expect(response.data.message).toBe('User not authorized!');
  });

  it('with not exist user', async () => {
    const user = generateUserCredentials();
    const userID = (await createUser(user)).data.userID;
    const token = (await generateToken(user)).data.token;

    await deleteUser(userID, token);
    const response = await deleteUser(userID, token);

    expect(response.status).toBe(200);
    expect(response.data.code).toBe('1207');
    expect(response.data.message).toBe('User Id not correct!');
  });
});

describe('test info user', () => {
  it('success', async () => {
    const user = generateUserCredentials();
    const userID = (await createUser(user)).data.userID;
    const token = (await generateToken(user)).data.token;

    await authorized(user);
    const response = await infoUser(userID, token);
    expect(response.status).toBe(200);
    expect(response.data.userId).toBe(userID);
    expect(response.data.username).toBe(user.userName);
  });

  it('without authorized', async () => {
    const user = generateUserCredentials();
    const userID = (await createUser(user)).data.userID;

    await authorized(user);
    const response = await infoUser(userID);

    expect(response.status).toBe(401);
    expect(response.data.code).toBe('1200');
    expect(response.data.message).toBe('User not authorized!');
  });

  it('with not exist user', async () => {
    const user = generateUserCredentials();
    const userID = (await createUser(user)).data.userID;
    const token = (await generateToken(user)).data.token;

    await deleteUser(userID, token);
    const response = await infoUser(userID, token);

    expect(response.status).toBe(401);
    expect(response.data.code).toBe('1207');
    expect(response.data.message).toBe('User not found!');
  });
});
