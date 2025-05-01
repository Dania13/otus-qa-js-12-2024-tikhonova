Feature('login');

Scenario('Успешная авторизация', ({ I, loginPage, config }) => {
  loginPage.login({
    userName: config.credentials.user.userName,
    password: config.credentials.user.password,
  });
  I.waitInUrl('/inventory.html');
});

Scenario('Нельзя авторизоваться без пароля', ({ loginPage, config }) => {
  loginPage.login({
    userName: config.credentials.user.userName,
    password: '',
  });
  loginPage.expectingError('Epic sadface: Password is required');
});

Scenario('Нельзя авторизоваться без имени', ({ loginPage, config }) => {
  loginPage.login({
    userName: '',
    password: config.credentials.user.password,
  });
  loginPage.expectingError('Epic sadface: Username is required');
});

Scenario(
  'Нельзя авторизоваться несуществующему пользователю',
  ({ loginPage }) => {
    loginPage.login({
      userName: 'user',
      password: 'secret',
    });
    loginPage.expectingError(
      'Epic sadface: Username and password do not match any user in this service',
    );
  },
);

Scenario(
  'Нельзя авторизоваться заблокированному пользователю',
  ({ loginPage, config }) => {
    loginPage.login({
      userName: 'locked_out_user',
      password: config.credentials.user.password,
    });
    loginPage.expectingError(
      'Epic sadface: Sorry, this user has been locked out.',
    );
  },
);
