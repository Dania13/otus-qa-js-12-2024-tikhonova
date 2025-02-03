import { config } from '../framework/config/config';

describe('bookstore tests', () => {
  const baseURL = config.baseURL;

  it('create existing user', async () => {
    let user = {
      userName: `${config.credentials.userName}1`,
      password: `${config.credentials.password}`,
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
      userName: `${config.credentials.userName}2`,
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
    let user = {
      userName: `${config.credentials.userName}3`,
      password: `${config.credentials.password}`,
    };
    const response = await fetch(`${baseURL}/User`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const answer = await response.json();
    expect(answer.username).toBe(`${user.userName}`);
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
          'Basic ' +
          Buffer.from(user.userName + ':' + user.password).toString('base64');
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
    let user = {
      userName: `${config.credentials.userName}4`,
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
    let user = {
      userName: `${config.credentials.userName}5`,
      password: `${config.credentials.password}`,
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
