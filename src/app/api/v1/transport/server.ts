import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import typeDefs from './schema';
import resolvers from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const listen = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT ? parseInt(process.env.PORT, 10) : 4000 },
  });

  console.log(`Server ready at: ${url}`);
};
