import { faker } from '@faker-js/faker';

describe('bookstore tests', () => {
  const baseURL = 'https://bookstore.demoqa.com/Account/v1';

  it('create existing user', async () => {
    const name = faker.person.fullName();
    let user = {
      userName: `${name}`,
      password: 'Qwerty123!',
    };

    await fetch(`${baseURL}/User`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const response = await fetch(`${baseURL}/User`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const answer = await response.json();
    expect(answer.message).toBe('User exists!');
    expect(answer.code).toBe('1204');
  });
  it('create user with non valid password', async () => {
    let user = {
      userName: 'test',
      password: 'Qwerty',
    };

    const response = await fetch(`${baseURL}/User`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const answer = await response.json();
    expect(answer.message).toBe(
      "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.",
    );
    expect(answer.code).toBe('1300');
  });
  it('create user success', async () => {
    const name = faker.person.fullName();
    let user = {
      userName: `${name}`,
      password: 'Qwerty123!',
    };
    const response = await fetch(`${baseURL}/User`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const answer = await response.json();
    expect(answer.username).toBe(name);
    expect(answer.userID).not.toBe(undefined);
    expect(typeof answer.userID).toBe('string');

    const userID = answer.userID;
    try {
      await fetch(`${baseURL}/GenerateToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
    } catch (error) {
      console.error(error);
    }

    try {
      (async () => {
        const auth =
          'Basic ' + Buffer.from(name + ':' + user.password).toString('base64');
        const myHeaders = new Headers();
        myHeaders.append('Authorization', auth);
        await fetch(`${baseURL}/User/${userID}`, {
          method: 'DELETE',
          headers: myHeaders,
          redirect: 'follow',
        });
      })();
    } catch (error) {
      console.error(error);
    }
  });
  it('generate token with error', async () => {
    const name = faker.person.fullName();
    let user = {
      userName: `${name}`,
    };

    const response = await fetch(`${baseURL}/GenerateToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const answer = await response.json();
    expect(answer.code).toBe('1200');
    expect(answer.message).toBe('UserName and Password required.');
  });

  it('generate token success', async () => {
    const name = faker.person.fullName();
    let user = {
      userName: `${name}`,
      password: 'Qwerty123!',
    };

    await fetch(`${baseURL}/User`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const response = await fetch(`${baseURL}/GenerateToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const answer = await response.json();
    expect(answer.token).not.toBe(undefined);
    expect(typeof answer.token).toBe('string');
    expect(answer.status).toBe('Success');
  });
});
