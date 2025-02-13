import supertest from 'supertest';
import { config } from '../config/config';

export const booked = async (token, userID, isbn) => {
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

export const changedBook = async (token, userID, oldISBN, newISBN) => {
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

export const bookInfo = async (ISBN) => {
  const response = await supertest(`${config.baseURL}`).get(
    `/BookStore/v1/Book?ISBN=${ISBN}`,
  );

  return {
    headers: response.headers,
    status: response.status,
    data: await response.body,
  };
};

export const deleteBookforUser = async (token, userID, ISBN) => {
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
