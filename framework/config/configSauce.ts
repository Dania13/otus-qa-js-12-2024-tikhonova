import 'dotenv/config';

export default {
  baseURL: process.env.TEST_SAUCE_BASE_URL ?? '',
  credentials: {
    userName: process.env.TEST_SAUCE_USERNAME_SUCCESS ?? '',
    password: process.env.TEST_SAUCE_PASSWORD ?? '',
    userNameFail: process.env.TEST_SAUCE_USERNAME_FAIL ?? '',
  },
};
