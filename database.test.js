import { describe, it, expect, beforeEach } from 'vitest';
import { registerUser, authenticateUser } from './database'; // Adjust the import path as needed
import { resetTestDatabase } from './testHelpers'; // A helper function to reset the database

describe('User Registration and Authentication with Real Dependencies', () => {
  beforeEach(async () => {
    // Reset the test database before each test
    await resetTestDatabase();
  });

  it('successfully registers a new user and authenticates', async () => {
    const username = 'testUser';
    const password = 'testPassword';

    // Attempt to register a new user
    await registerUser(username, password);

    // Attempt to authenticate the newly registered user
    const authenticatedUser = await authenticateUser(username, password);

    // Assert that the user was successfully authenticated
    expect(authenticatedUser).toBeTruthy();
    expect(authenticatedUser.username).toBe(username);

    // Further checks can include ensuring the password is correctly hashed in the database
    // This would typically involve querying the database directly to inspect the stored password hash
  });

  it('fails to authenticate with incorrect password', async () => {
    const username = 'testUser';
    const password = 'testPassword';
    const wrongPassword = 'wrongPassword';

    // Register a new user
    await registerUser(username, password);

    // Attempt to authenticate with an incorrect password
    const authenticatedUser = await authenticateUser(username, wrongPassword);

    // Assert that authentication failed
    expect(authenticatedUser).toBeFalsy();
  });

  // Additional tests for edge cases and failure modes can be added here
});







// import { describe, it, expect, vi } from 'vitest';
// import { registerUser, authenticateUser } from './database'; // Adjust the import path as needed

// // Mock bcrypt
// vi.mock('bcrypt', () => ({
//   hash: vi.fn((password, saltRounds, callback) => callback(null, `hashed_${password}`)),
//   compare: vi.fn((password, hash, callback) => callback(null, password === hash.replace('hashed_', ''))),
// }));

// // Mock sqlite3
// const mockRun = vi.fn((sql, params, callback) => callback(null));
// const mockGet = vi.fn((sql, params, callback) => {
//   if (params[0] === 'existing_user') {
//     return callback(null, { username: 'existing_user', password: `hashed_correct_password` });
//   }
//   return callback(null, null);
// });

// vi.mock('sqlite3', () => ({
//   verbose: vi.fn(() => ({
//     Database: vi.fn().mockImplementation(() => ({
//       run: mockRun,
//       get: mockGet,
//       close: vi.fn(),
//     })),
//   })),
// }));

// describe('User Registration and Authentication', () => {
//   it('successfully registers a new user', (done) => {
//     registerUser('new_user', 'new_password', (err) => {
//       expect(err).toBeNull();
//       expect(mockRun).toHaveBeenCalledOnce();
//       expect(mockRun).toHaveBeenCalledWith(
//         `INSERT INTO users (username, password) VALUES (?, ?)`,
//         ['new_user', `hashed_new_password`],
//         expect.any(Function)
//       );
//       done();
//     });
//   });

//   it('successfully authenticates an existing user with correct password', (done) => {
//     authenticateUser('existing_user', 'correct_password', (err, user) => {
//       expect(err).toBeNull();
//       expect(user).toEqual({ username: 'existing_user', password: `hashed_correct_password` });
//       done();
//     });
//   });

//   it('fails to authenticate an existing user with incorrect password', (done) => {
//     authenticateUser('existing_user', 'incorrect_password', (err, user) => {
//       expect(err).toBeNull();
//       expect(user).toBe(false);
//       done();
//     });
//   });

//   it('fails to authenticate a non-existent user', (done) => {
//     authenticateUser('nonexistent_user', 'any_password', (err, user) => {
//       expect(err).toBeNull();
//       expect(user).toBe(false);
//       done();
//     });
//   });
// });
