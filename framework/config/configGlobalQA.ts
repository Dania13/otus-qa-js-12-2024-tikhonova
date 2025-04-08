import 'dotenv/config';

export default {
  baseURL: process.env.TEST_GLOBALQA_BASE_URL ?? '',
};
