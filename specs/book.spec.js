import { generateUserCredentials } from '../framework/fixtures/userFixtures';
import {
  booked,
  bookInfo,
  changedBook,
  deleteBookforUser,
} from '../framework/services/BookService';
import {
  createUser,
  // deleteUser,
  generateToken,
} from '../framework/services/UserBookService';

describe('test booked', () => {
  it('success', async () => {
    const user = generateUserCredentials();
    const userID = (await createUser(user)).data.userID;
    const token = (await generateToken(user)).data.token;
    const isbn = '9781491950296';

    const response = await booked(token, userID, isbn);
    expect(response.status).toBe(201);
    expect(response.data.books[0].isbn).toBe(isbn);
  });

  it('add two books', async () => {
    const user = generateUserCredentials();
    const userID = (await createUser(user)).data.userID;
    const token = (await generateToken(user)).data.token;
    const isbn = ['9781491950296', '9781449325862'];

    await booked(token, userID, isbn[0]);
    const response = await booked(token, userID, isbn[1]);

    expect(response.status).toBe(201);
    expect(response.data.books[0].isbn).toBe(isbn[1]);
  });

  it('with not exist book', async () => {
    const user = generateUserCredentials();
    const userID = (await createUser(user)).data.userID;
    const token = (await generateToken(user)).data.token;
    const isbn = '9781491950297';

    const response = await booked(token, userID, isbn);

    expect(response.status).toBe(400);
    expect(response.data.code).toBe('1205');
    expect(response.data.message).toBe(
      'ISBN supplied is not available in Books Collection!',
    );
  });
});

describe('test update book', () => {
  it('success', async () => {
    const user = generateUserCredentials();
    const userID = (await createUser(user)).data.userID;
    const token = (await generateToken(user)).data.token;
    const isbn = ['9781491950296', '9781449325862'];

    await booked(token, userID, isbn[0]);
    const response = await changedBook(token, userID, isbn[0], isbn[1]);

    expect(response.status).toBe(200);
    expect(response.data.books[0].isbn).toBe(isbn[1]);
    expect(response.data.books.length).toBe(1);
  });

  it("changed book not user's", async () => {
    const user = generateUserCredentials();
    const userID = (await createUser(user)).data.userID;
    const token = (await generateToken(user)).data.token;
    const isbn = ['9781491950296', '9781449325862', '9781449331818'];

    await booked(token, userID, isbn[0]);
    const response = await changedBook(token, userID, isbn[1], isbn[2]);

    expect(response.status).toBe(400);
    expect(response.data.code).toBe('1206');
    expect(response.data.message).toBe(
      "ISBN supplied is not available in User's Collection!",
    );
  });

  it('with not authorized user', async () => {
    const user = generateUserCredentials();
    const userID = (await createUser(user)).data.userID;
    const token = (await generateToken(user)).data.token;
    const isbn = ['9781491950296', '9781449325862'];

    await booked(token, userID, isbn[0]);
    const response = await changedBook(token + '2', userID, isbn[0], isbn[1]);

    expect(response.status).toBe(401);
    expect(response.data.code).toBe('1200');
    expect(response.data.message).toBe('User not authorized!');
  });
});

describe('test info book', () => {
  it('success', async () => {
    const isbn = '9781491950296';
    const response = await bookInfo(isbn);

    expect(response.status).toBe(200);
    expect(response.data.isbn).toBe(isbn);
    expect(response.data.title).toBe('Programming JavaScript Applications');
  });

  it('with not exsist book', async () => {
    const isbn = '9781491950297';
    const response = await bookInfo(isbn);

    expect(response.status).toBe(400);
    expect(response.data.code).toBe('1205');
    expect(response.data.message).toBe(
      'ISBN supplied is not available in Books Collection!',
    );
  });

  it('without book', async () => {
    const response = await bookInfo();

    expect(response.status).toBe(400);
    expect(response.data.code).toBe('1205');
    expect(response.data.message).toBe(
      'ISBN supplied is not available in Books Collection!',
    );
  });
});

describe('test delete book', () => {
  it('success', async () => {
    const user = generateUserCredentials();
    const userID = (await createUser(user)).data.userID;
    const token = (await generateToken(user)).data.token;
    const isbn = '9781491950296';

    await booked(token, userID, isbn);
    const response = await deleteBookforUser(token, userID, isbn);

    expect(response.status).toBe(204);
  });

  it('with one book out of two', async () => {
    const user = generateUserCredentials();
    const userID = (await createUser(user)).data.userID;
    const token = (await generateToken(user)).data.token;
    const isbn = ['9781491950296', '9781449325862'];

    await booked(token, userID, isbn[0]);
    await booked(token, userID, isbn[1]);
    const response = await deleteBookforUser(token, userID, isbn[0]);

    expect(response.status).toBe(204);
  });

  it('with not exist book for user', async () => {
    const user = generateUserCredentials();
    const userID = (await createUser(user)).data.userID;
    const token = (await generateToken(user)).data.token;
    const isbn = ['9781491950296', '9781449325862'];

    await booked(token, userID, isbn[0]);
    const response = await deleteBookforUser(token, userID, isbn[1]);

    expect(response.status).toBe(400);
    expect(response.data.code).toBe('1206');
    expect(response.data.message).toBe(
      "ISBN supplied is not available in User's Collection!",
    );
  });
});
