import { describe, it, expect, vi } from 'vitest';
import supertest from 'supertest';
import app from './app'; // Adjust this path to where your Express app is exported
import { registerUser, authenticateUser } from './database'; // Adjust the path as necessary
const request = supertest(app);

// Mock the database functions
vi.mock('./database', () => ({
  registerUser: vi.fn(),
  authenticateUser: vi.fn(),
}));

describe('POST /register', () => {
    it('should register a user successfully', async () => {
      // Mock the `registerUser` to simulate successful registration
      registerUser.mockImplementation((username, password, callback) => callback(null));
  
      const response = await request.post('/register').send({
        username: 'newuser',
        password: 'newpassword',
      });
  
      expect(response.status).toBe(200);
      expect(response.text).toContain('User registered successfully');
    });
  
    it('should return an error if the username is already taken', async () => {
      // Simulate a SQLITE_CONSTRAINT error
      registerUser.mockImplementation((username, password, callback) => callback({ code: 'SQLITE_CONSTRAINT' }));
  
      const response = await request.post('/register').send({
        username: 'existinguser',
        password: 'password',
      });
  
      expect(response.status).toBe(409);
      expect(response.text).toContain('This username is already taken');
    });
  });

  describe('POST /login', () => {
    it('should log in a user successfully', async () => {
      // Mock `authenticateUser` to simulate successful login
      authenticateUser.mockImplementation((username, password, callback) => callback(null, { id: 1, username: 'user', password: 'hashedpassword' }));
  
      const response = await request.post('/login').send({
        username: 'user',
        password: 'password',
      });
  
      expect(response.status).toBe(200);
      expect(response.text).toContain('Logged in successfully');
    });
  
    it('should fail to log in with incorrect credentials', async () => {
      // Simulate login failure
      authenticateUser.mockImplementation((username, password, callback) => callback(null, false));
  
      const response = await request.post('/login').send({
        username: 'user',
        password: 'wrongpassword',
      });
  
      expect(response.status).toBe(200); // Assuming your endpoint responds with 200 and a failure message
      expect(response.text).toContain('Login failed');
    });
  });
  
