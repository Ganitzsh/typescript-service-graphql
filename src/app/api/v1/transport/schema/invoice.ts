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
    rate: String!
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

export const address = gql`
  type Address {
    addressLine1: String!
    addressLine2: String!
    city: String!
    country: String!
    zipCode: String!
  }
`;

export const company = gql`
  type Company {
    name: String!
    address: Address!
    taxNumber: String!
  }
`;

export const invoice = gql`
  type InvoicePage {
    data: [Invoice!]!
    total: Int!
    cursor: ID
  }

  type Invoice implements Node {
    id: ID!

    phases: [Phase!]!
    modifier: Modifier

    total: String!
    subtotal: String!
    currency: String!

    issuer: Company
    recipient: Company
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
  address,
  company,
  invoice,
  query,
  mutation,
]);

export default schema;
