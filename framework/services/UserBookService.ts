import axios from 'axios';
import config from '../config/configBookstore';
import { Credentials } from '../models';

const client = axios.create({
  baseURL: config.baseURL,
  validateStatus: () => true,
});

const authorizedUser = async ({ userName, password }: Credentials) => {
  const response = await client.post(
    `${config.baseURL}/Account/v1/Authorized`,
    {
      userName,
      password,
    },
  );

  return {
    headers: response.headers,
    status: response.status,
    data: await response.data,
  };
};

const generateToken = async ({ userName, password }: Credentials) => {
  const response = await client.post(
    `${config.baseURL}/Account/v1/GenerateToken`,
    {
      userName,
      password,
    },
  );

  return {
    headers: response.headers,
    status: response.status,
    data: await response.data,
  };
};

const createUser = async ({ userName, password }: Credentials) => {
  const response = await client.post(`${config.baseURL}/Account/v1/User`, {
    userName,
    password,
  });

  return {
    headers: response.headers,
    status: response.status,
    data: await response.data,
  };
};

const deleteUser = async (userID: string, token: string) => {
  const response = await client.delete(
    `${config.baseURL}/Account/v1/User/${userID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return {
    headers: response.headers,
    status: response.status,
    data: await response.data,
  };
};

export const infoUser = async (userID: string, token: string) => {
  const response = await client.get(
    `${config.baseURL}/Account/v1/User/${userID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return {
    headers: response.headers,
    status: response.status,
    data: await response.data,
  };
};

export default {
  authorized: authorizedUser,
  generateToken: generateToken,
  create: createUser,
  delete: deleteUser,
  get: infoUser,
};
