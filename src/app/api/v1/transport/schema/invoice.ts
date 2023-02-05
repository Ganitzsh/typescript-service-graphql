import { mergeTypeDefs } from '@graphql-tools/merge';
import gql from 'graphql-tag';

const taxRate = gql`
  enum TaxRate {
    Standard
    Low
    None
  }
`;

const modifier = gql`
  enum ModifierType {
    Amount
  }

  enum ModifierCategory {
    Discount
    Fee
  }

  type Modifier {
    type: ModifierType!
    category: ModifierCategory!
    value: String!
  }
`;

const item = gql`
  enum ItemType {
    PerHour
    Quantity
  }

  type Item {
    name: String!
    description: String!
    type: ItemType!
    taxRate: TaxRate!
  }
`;

const phase = gql`
  type CostItem {
    item: Item!
    quantity: String!
    total: String!
    subtotal: String!
  }

  type Phase implements Node {
    id: ID!

    items: [CostItem]!
    modifier: Modifier

    total: String!
    subtotal: String!
  }
`;

export const invoice = gql`
  type InvoicePage {
    data: [Invoice!]!
    cursor: ID
  }

  type Invoice implements Node {
    id: ID!

    phases: [Phase!]!
    modifier: Modifier

    total: String!
    subtotal: String!
  }
`;

export const query = gql`
  input InvoicePageInput {
    limit: Int
    cursor: ID
  }

  extend type Query {
    invoices(args: InvoicePageInput): InvoicePage!
    invoice(id: ID!): Invoice!
  }
`;

export const mutation = gql`
  extend type Mutation {
    _empty: String
  }
`;

const schema = mergeTypeDefs([
  taxRate,
  modifier,
  item,
  phase,
  invoice,
  query,
  mutation,
]);

export default schema;
