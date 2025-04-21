Feature: Авторизация BDD

  Scenario: Успешная авторизация
    Given Пользователь открывает страницу авторизации
    When Пользователь вводит правильные учетные данные
    Then Пользователь успешно авторизован и перенаправлен на главную страницу

  Scenario Outline: Успешная авторизация параметризованная
    Given Пользователь открывает страницу авторизации
    When Пользователь вводит логин "<userName>" и пароль "<password>"
    Then Пользователь успешно авторизован и перенаправлен на главную страницу
    Examples:
      | userName | password |
      | problem_user | secret_sauce |
      | error_user | secret_sauce |
      | visual_user | secret_sauce |

  Scenario: Невозможно авторизоваться без пароля
    Given Пользователь открывает страницу авторизации
    When Пользователь не вводит пароль
    Then Отображается ошибка "Epic sadface: Password is required"

  Scenario: Невозможно авторизоваться без имени
    Given Пользователь открывает страницу авторизации
    When Пользователь не вводит логин
    Then Отображается ошибка "Epic sadface: Username is required"

  Scenario: Невозможно авторизоваться заблокированному пользователю
    Given Пользователь открывает страницу авторизации
    When Пользователь вводит логин "locked_out_user" и пароль "secret_sauce"
    Then Отображается ошибка "Epic sadface: Sorry, this user has been locked out."

  Scenario: Невозможно авторизоваться несущетвующему пользователю
    Given Пользователь открывает страницу авторизации
    When Пользователь вводит логин "test" и пароль "test"
    Then Отображается ошибка "Epic sadface: Username and password do not match any user in this service"
