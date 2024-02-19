import { describe, it, expect, vi } from 'vitest';
import { registerUser, authenticateUser } from '../database'; // Adjust the path as necessary

// Mock bcrypt
vi.mock('bcrypt', () => ({
  hash: vi.fn((password, saltRounds, callback) => callback(null, `hashed_${password}`)),
  compare: vi.fn((password, hash, callback) => callback(null, password === hash.replace('hashed_', ''))),
}));

// Mock sqlite3
const mockRun = vi.fn((sql, params, callback) => callback(null));
const mockGet = vi.fn((sql, params, callback) => {
  if (params[0] === 'existing_user') {
    return callback(null, { username: 'existing_user', password: `hashed_correct_password` });
  }
  return callback(null, null);
});

vi.mock('sqlite3', () => ({
  verbose: vi.fn(() => ({
    Database: vi.fn().mockImplementation(() => ({
      run: mockRun,
      get: mockGet,
    })),
  })),
}));


describe('registerUser', () => {
    it('should hash the password and store the user in the database', async () => {
      const callback = vi.fn();
      await registerUser('test_user', 'test_password', callback);
  
      expect(callback).toHaveBeenCalledWith(null);
      expect(mockRun).toHaveBeenCalledWith(
        `INSERT INTO users (username, password) VALUES (?, ?)`,
        ['test_user', `hashed_test_password`],
        expect.any(Function)
      );
    });
  });

  describe('authenticateUser', () => {
    it('should authenticate a user with correct credentials', async () => {
      const callback = vi.fn();
      await authenticateUser('existing_user', 'correct_password', callback);
  
      expect(callback).toHaveBeenCalledWith(null, { username: 'existing_user', password: `hashed_correct_password` });
    });
  
    it('should not authenticate a user with incorrect credentials', async () => {
      const callback = vi.fn();
      await authenticateUser('existing_user', 'wrong_password', callback);
  
      expect(callback).toHaveBeenCalledWith(null, false);
    });
  });
  