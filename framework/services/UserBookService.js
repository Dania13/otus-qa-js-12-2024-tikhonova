import axios from 'axios';
import { config } from '../config/config';

const client = axios.create({
  baseURL: config.baseURL,
  validateStatus: () => true,
});

export const authorized = async ({ userName, password }) => {
  const response = await client.post(`${config.baseURL}/Authorized`, {
    userName,
    password,
  });

  return {
    headers: response.headers,
    status: response.status,
    data: await response.data,
  };
};

export const generateToken = async ({ userName, password }) => {
  const response = await client.post(`${config.baseURL}/GenerateToken`, {
    userName,
    password,
  });

  return {
    headers: response.headers,
    status: response.status,
    data: await response.data,
  };
};
export const createUser = async ({ userName, password }) => {
  const response = await client.post(`${config.baseURL}/User`, {
    userName,
    password,
  });

  return {
    headers: response.headers,
    status: response.status,
    data: await response.data,
  };
};

export const deleteUser = async (userID, token) => {
  const response = await client.delete(`${config.baseURL}/User/${userID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    headers: response.headers,
    status: response.status,
    data: await response.data,
  };
};

export const infoUser = async (userID, token) => {
  const response = await client.get(`${config.baseURL}/User/${userID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    headers: response.headers,
    status: response.status,
    data: await response.data,
  };
};
