// import { describe, it, expect, beforeEach, afterAll } from 'vitest';
// import { registerUser, authenticateUser, getUser } from './database';

// // Helper function to reset the test database before each test
// async function resetTestDatabase() {
//   // Implement the logic to reset your database before each test.
//   // This might involve deleting all rows from the `users` table or dropping and recreating the table.
// }

// describe('User Registration and Authentication with Real Dependencies', () => {
//   beforeEach(async () => {
//     await resetTestDatabase();
//   });

//   it('successfully registers a new user', async () => {
//     const username = 'testUser_'+ new Date();
//     const password = 'testPassword';
    
//     await new Promise((resolve, reject) => {
//       registerUser(username, password, (err) => {
//         if (err) reject(err);
//         else resolve();
//       });
//     });

//     const user = await getUser(username);
//     expect(user).toBeTruthy();
//     expect(user.username).toBe(username);
//     // Note: We do not directly verify the password as it's hashed.
//   });

//   it('successfully authenticates a registered user', async () => {
//     const username = 'authUser_'+ new Date();
//     const password = 'authPass';

//     await new Promise((resolve, reject) => {
//       registerUser(username, password, (err) => {
//         if (err) reject(err);
//         else resolve();
//       });
//     });

//     const authResult = await new Promise((resolve, reject) => {
//       authenticateUser(username, password, (err, user) => {
//         if (err) reject(err);
//         else resolve(user);
//       });
//     });

//     expect(authResult).toBeTruthy();
//     expect(authResult.username).toBe(username);
//   });

//   it('fails to authenticate with incorrect password', async () => {
//     const username = 'wrongPassUser_'+new Date();
//     const password = 'correctPassword';
//     const wrongPassword = 'wrongPassword';

//     await new Promise((resolve, reject) => {
//       registerUser(username, password, (err) => {
//         if (err) reject(err);
//         else resolve();
//       });
//     });

//     const authResult = await new Promise((resolve) => {
//       authenticateUser(username, wrongPassword, (err, user) => {
//         resolve(user); // Expecting false or null for incorrect password
//       });
//     });

//     expect(authResult).toBeFalsy();
//   });

//   // Additional tests can be added here
// });

// // Optional: Clean up or close the database connection after all tests
// afterAll(() => {
//   // Your logic to close the database connection, if necessary
// });
