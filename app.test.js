import { describe, it, expect, beforeEach } from 'vitest';
import supertest from 'supertest';
import app from './app';
import { getUser } from './database'; 
import request from 'supertest';


const api = supertest(app);


describe('POST /register', () => {
  it('should register a user successfully', async () => {
    const username = `testUser_${Date.now()}`; 
    const response = await api.post('/register').send({
      username: username,
      password: 'newpassword',
    });

    const user = await getUser(username);
    expect(user).toBeTruthy(); 
    expect(response.status).toBe(200);

  });

  it('should return an error if the username is already taken', async () => {
    const username = 'existinguser';
    await api.post('/register').send({
      username: username,
      password: 'password',
    });
    const response = await api.post('/register').send({
      username: username,
      password: 'password',
    });

    expect(response.status).toBe(409);
    expect(response.text).toContain('This username is already taken');
  });
});

describe('POST /login', () => {
  it('should log in a user successfully', async () => {
    const username = `user_${Date.now()}`;
    await api.post('/register').send({
      username: username,
      password: 'password',
    });

    const response = await api.post('/login').send({
      username: username,
      password: 'password',
    });

    expect(response.status).toBe(200);
    expect(response.text).toContain('Logged in successfully');
  });

  it('should fail to log in with incorrect credentials', async () => {
    const username = `user_${Date.now()}`;
    await api.post('/register').send({
      username: username,
      password: 'correctpassword',
    });

    const response = await api.post('/login').send({
      username: username,
      password: 'wrongpassword',
    });

    expect(response.status).toBe(200);
    expect(response.text).toContain('Login failed');
  });
});

describe('Home Route Access Control', () => {
  let agent;

  beforeEach(() => {
    agent = request.agent(app); 
    // Use an agent to maintain session state
  });

  it('denies access to /home without login', async () => {
    const response = await agent.get('/home');
    expect(response.status).toBe(200); // Assuming you're just sending back a text response for denied access
    expect(response.text).toBe('You must login to view this page.');
  });

  it('grants access to /home with valid login', async () => {
    // Simulate login
    const username = `user_${Date.now()}`;
    await agent.post('/register').send({
      username: username,
      password: 'validPassword',
    });
    await agent.post('/login').send({ username, password: 'validPassword' }).expect(200);

    // Attempt to access the protected home route
    const response = await agent.get('/home');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to the protected home page!');
  });
});
