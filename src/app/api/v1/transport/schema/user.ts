export const schema = `
  type User implements Node {
    id: ID!

    firstName: String!
    lastName: String!
  }
`;

export const query = `
  users: [User]!
`;

export const mutation = `
  addUser(firstName: String!, lastName: String!): User!
`;
