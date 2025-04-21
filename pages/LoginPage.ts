const { I } = inject();

class loginPage {
  button: string;
  userName: string;
  password: string;
  errorField: string;

  constructor() {
    //insert your locators
    this.button = '//[@data-test="login-button"]';
    this.userName = '//[@data-test="username"]';
    this.password = '//[@data-test="password"]';
    this.errorField = '//h3[@data-test="error"]';
  }
  // insert your methods here
  visit() {
    I.amOnPage('/');
  }

  fillName(userName: string) {
    I.fillField('#user-name', userName);
  }

  fillPassword(password: string) {
    I.fillField('#password', password);
  }

  submitForm() {
    I.click('#login-button');
  }

  login(credentials: { userName: string; password: string }) {
    this.visit();
    this.fillName(credentials.userName);
    this.fillPassword(credentials.password);
    this.submitForm();
  }

  expectingError(errorText: string) {
    I.seeInField(this.errorField, errorText);
  }
}

// For inheritance
module.exports = new loginPage();
export = loginPage;
