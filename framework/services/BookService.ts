import supertest from 'supertest';
import config from '../config/config';

const bookedForUser = async (token: string, userID: string, isbn: string) => {
  // @ts-expect-error
  const response = await supertest(config.baseURL)
    .post('/BookStore/v1/Books')
    .set('Authorization', 'Bearer ' + token)
    .send({
      userId: userID,
      collectionOfIsbns: [
        {
          isbn: isbn,
        },
      ],
    });

  return {
    headers: response.headers,
    status: response.status,
    data: await response.body,
  };
};

const changedBook = async (token: string, userID: string, oldISBN: string, newISBN: string) => {
  // @ts-expect-error
  const response = await supertest(config.baseURL)
    .put(`/BookStore/v1/Books/${oldISBN}`)
    .set('Authorization', 'Bearer ' + token)
    .send({
      isbn: newISBN,
      userId: userID,
    });

  return {
    headers: response.headers,
    status: response.status,
    data: await response.body,
  };
};

const bookInfo = async (ISBN: string) => {
  const response = await supertest(`${config.baseURL}`).get(
    `/BookStore/v1/Book?ISBN=${ISBN}`,
  );

  return {
    headers: response.headers,
    status: response.status,
    data: await response.body,
  };
};

const deleteBookforUser = async (token: string, userID: string, ISBN: string) => {
  // @ts-expect-error
  const response = await supertest(config.baseURL)
    .delete('/BookStore/v1/Book')
    .set('Authorization', 'Bearer ' + token)
    .send({
      isbn: ISBN,
      userId: userID,
    });

  return {
    headers: response.headers,
    status: response.status,
    data: await response.body,
  };
};

export default {
  booked: bookedForUser,
  change: changedBook,
  info: bookInfo,
  delete: deleteBookforUser,
};
