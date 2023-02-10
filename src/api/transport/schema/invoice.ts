import { mergeTypeDefs } from '@graphql-tools/merge';
import gql from 'graphql-tag';

const taxRate = gql`
  """
  The tax rate is a percentage value representing
  any tax that can be applied to a cost item.
  """
  type TaxRate {
    label: String!
    value: String!
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

  """
  Modifiers represent a one-off fee or discount that can be
  applied to a Phase or the whole Invoice
  """
  type Modifier {
    type: ModifierType!
    category: ModifierCategory!
    label: String!
    value: String!
  }
`;

const item = gql`
  enum ItemType {
    PerHour
    Quantity
  }

  """
  Items are the building blocks of a Phase. They represent
  a service or product that can be billed to a client.
  """
  type Item {
    name: String!
    description: String!
    type: ItemType!
    rate: String!
    taxRate: TaxRate!
  }
`;

const phase = gql`
  """
  CostItems represent a single item in a Phase. They are
  embedding an item and its calculated cost and quantity.
  """
  type CostItem {
    item: Item!
    quantity: String!
    total: String!
    subtotal: String!
  }

  """
  Phases are a collection of CostItems that can be billed. It is
  possible to attach a Modifier to it as well.
  """
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
    addressLine2: String
    city: String!
    country: String!
    zipCode: String!
  }
`;

export const company = gql`
  """
  Company is a legal entity that can be invoiced.
  """
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

  """
  Invoice is a collection of Phases that can be billed to a client.
  """
  type Invoice implements Node {
    id: ID!

    phases: [Phase!]!
    modifier: Modifier

    total: String!
    subtotal: String!
    currency: String!

    issuer: Company
    recipient: Company

    """
    When this is true, the invoice has been finalized and can no longer be edited.
    """
    finalized: Boolean!
  }
`;

export const query = gql`
  input InvoicePageInput {
    limit: Int
    cursor: ID
  }

  extend type Query {
    """
    The invoices query returns a paginated list of invoices.
    """
    invoices(args: InvoicePageInput): InvoicePage!

    """
    The invoice query returns a single invoice by its ID.
    """
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
