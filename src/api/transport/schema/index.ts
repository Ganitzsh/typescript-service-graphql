import { mergeTypeDefs } from '@graphql-tools/merge';
import gql from 'graphql-tag';

import invoice from './invoice';

const typeDefs = gql`
  """
  Nodes are the building blocks of the graph exposed
  by this API
  """
  interface Node {
    id: ID!
  }

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export default mergeTypeDefs([invoice, typeDefs]);
