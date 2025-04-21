/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file');
type config = typeof import('./config');

declare namespace CodeceptJS {
  interface SupportObject {
    I: I;
    current: any;
    loginPage: loginPage;
    config: config;
  }
  interface Methods extends Playwright {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
