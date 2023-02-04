import { GraphQLResolveInfo } from 'graphql';

import { Context } from '../context';

import * as user from './user';

export type Resolver<TParent = unknown, TArgs = unknown, TRes = unknown> = (
  parent: TParent,
  args: TArgs,
  contextValue: Context,
  info: GraphQLResolveInfo,
) => Promise<TRes>;

export type Resolvers = { [key: string]: Resolver };

type EntityDefinition = {
  query: Resolvers;
  mutation: Resolvers;
};

const entities: [EntityDefinition] = [user];

export default {
  Query: {
    ...entities.reduce((acc, { query }) => ({ ...acc, ...query }), {}),
  },
  Mutation: {
    ...entities.reduce((acc, { mutation }) => ({ ...acc, ...mutation }), {}),
  },
};
