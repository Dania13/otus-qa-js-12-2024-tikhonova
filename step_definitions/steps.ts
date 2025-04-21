const { I, config, loginPage } = inject();
// Add in your custom step files

Given('Пользователь открывает страницу авторизации', () => {
  loginPage.visit();
});

When('Пользователь вводит правильные учетные данные', () => {
  const { user } = config.credentials;
  loginPage.login(user);
});

Then(
  'Пользователь успешно авторизован и перенаправлен на главную страницу',
  () => {
    I.waitInUrl('/inventory.html');
  },
);

When(
  'Пользователь вводит логин {string} и пароль {string}',
  (userName: string, password: string) => {
    loginPage.login({
      userName,
      password,
    });
  },
);

When('Пользователь не вводит пароль', () => {
  const { user } = config.credentials;
  loginPage.fillName(user.userName);
  loginPage.submitForm();
});

When('Пользователь не вводит логин', () => {
  const { user } = config.credentials;
  loginPage.fillPassword(user.password);
  loginPage.submitForm();
});

Then('Отображается ошибка {string}', (errorText: string) => {
  loginPage.expectingError(errorText);
});
