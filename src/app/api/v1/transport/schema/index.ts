import * as User from './user';

const typeDefs = `#graphql
  interface Node {
    id: ID!
  }

  ${User.schema}

  type Query {
    ${User.query}
  }

  type Mutation {
    ${User.mutation}
  }
`;

export default typeDefs;
