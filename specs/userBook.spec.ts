import { addMsg } from 'jest-html-reporters/helper';
import { UserBookService, UserFixture } from '../framework';
import config from '../framework/config/config';

describe('test autorization', () => {
  it('success', async () => {
    const user = {
      userName: `${config.credentials.userName}`,
      password: `${config.credentials.password}`,
    };

    await UserBookService.generateToken(user);
    const response = await UserBookService.authorized(user);
    
    expect(response.status).toBe(200);
    expect(response.data).toBe(true);
  });

  it('without password', async () => {
    const user = {
      userName: `${config.credentials.userName}`,
    };

    const response = await UserBookService.authorized(user);
    
    expect(response.status).toBe(400);
    expect(response.data.code).toBe('1200');
    expect(response.data.message).toBe('UserName and Password required.');
  });

  it('without UserBookService.generateToken', async () => {
    const user = {
      userName: `${config.credentials.userName2}`,
      password: `${config.credentials.password}`,
    };

    const response = await UserBookService.authorized(user);

    expect(response.status).toBe(200);
    expect(response.data).toBe(false);
  });
});

describe('test remove user', () => {  
  it('success', async () => {
    const user = UserFixture.generateUserCredentials();
    addMsg({
      message: `Доступы: ${user.userName}
      ${user.password}`,
    });
    const userID = (await UserBookService.create(user)).data.userID;

    const token = (await UserBookService.generateToken(user)).data.token;

    await UserBookService.authorized(user);
    const response = await UserBookService.delete(userID, token);

    expect(response.status).toBe(204);
    expect(response.data).toBe('');
  });

  it('without UserBookService.authorized', async () => {
    const user = UserFixture.generateUserCredentials();
    const userID = (await UserBookService.create(user)).data.userID;

    await UserBookService.authorized(user);
    // @ts-expect-error
    const response = await UserBookService.delete(userID);

    expect(response.status).toBe(401);
    expect(response.data.code).toBe('1200');
    expect(response.data.message).toBe('User not authorized!');
  });

  it('with not exist user', async () => {
    const user = UserFixture.generateUserCredentials();
    const userID = (await UserBookService.create(user)).data.userID;
    const token = (await UserBookService.generateToken(user)).data.token;

    await UserBookService.delete(userID, token);
    const response = await UserBookService.delete(userID, token);

    expect(response.status).toBe(200);
    expect(response.data.code).toBe('1207');
    expect(response.data.message).toBe('User Id not correct!');
  });
});


describe('test get user', () => {
  let userID: any, user: any, token: any;

  beforeEach(async () => {
    user = UserFixture.generateUserCredentials();
    userID = (await UserBookService.create(user)).data.userID;
  });

  afterEach(async () => {
    await UserBookService.delete(userID, token);
  });
  
  it('success', async () => {
    const token = (await UserBookService.generateToken(user)).data.token;

    await UserBookService.authorized(user);
    const response = await UserBookService.get(userID, token);

    expect(response.status).toBe(200);
    expect(response.data.userId).toBe(userID);
    expect(response.data.username).toBe(user.userName);
  });

  it('without UserBookService.authorized', async () => {
    await UserBookService.authorized(user);
    // @ts-expect-error
    const response = await UserBookService.get(userID);

    expect(response.status).toBe(401);
    expect(response.data.code).toBe('1200');
    expect(response.data.message).toBe('User not authorized!');
  });

  it('with not exist user', async () => {
    const token = (await UserBookService.generateToken(user)).data.token;

    await UserBookService.delete(userID, token);
    const response = await UserBookService.get(userID, token);

    expect(response.status).toBe(401);
    expect(response.data.code).toBe('1207');
    expect(response.data.message).toBe('User not found!');
  });
});
