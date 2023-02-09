import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Address = {
  __typename?: 'Address';
  addressLine1: Scalars['String'];
  addressLine2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  zipCode: Scalars['String'];
};

export type Company = {
  __typename?: 'Company';
  address: Address;
  name: Scalars['String'];
  taxNumber: Scalars['String'];
};

export type CostItem = {
  __typename?: 'CostItem';
  item: Item;
  quantity: Scalars['String'];
  subtotal: Scalars['String'];
  total: Scalars['String'];
};

export type Invoice = Node & {
  __typename?: 'Invoice';
  currency: Scalars['String'];
  finalized: Scalars['Boolean'];
  id: Scalars['ID'];
  issuer?: Maybe<Company>;
  modifier?: Maybe<Modifier>;
  phases: Array<Phase>;
  recipient?: Maybe<Company>;
  subtotal: Scalars['String'];
  total: Scalars['String'];
};

export type InvoicePage = {
  __typename?: 'InvoicePage';
  cursor?: Maybe<Scalars['ID']>;
  data: Array<Invoice>;
  total: Scalars['Int'];
};

export type InvoicePageInput = {
  cursor?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Int']>;
};

export type Item = {
  __typename?: 'Item';
  description: Scalars['String'];
  name: Scalars['String'];
  rate: Scalars['String'];
  taxRate: TaxRate;
  type: ItemType;
};

export enum ItemType {
  PerHour = 'PerHour',
  Quantity = 'Quantity'
}

export type Modifier = {
  __typename?: 'Modifier';
  category: ModifierCategory;
  label: Scalars['String'];
  type: ModifierType;
  value: Scalars['String'];
};

export enum ModifierCategory {
  Discount = 'Discount',
  Fee = 'Fee'
}

export enum ModifierType {
  Amount = 'Amount'
}

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
};

export type Node = {
  id: Scalars['ID'];
};

export type Phase = Node & {
  __typename?: 'Phase';
  id: Scalars['ID'];
  items: Array<Maybe<CostItem>>;
  modifier?: Maybe<Modifier>;
  subtotal: Scalars['String'];
  total: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  invoice: Invoice;
  invoices: InvoicePage;
};


export type QueryInvoiceArgs = {
  id: Scalars['ID'];
};


export type QueryInvoicesArgs = {
  args?: InputMaybe<InvoicePageInput>;
};

export type TaxRate = {
  __typename?: 'TaxRate';
  label: Scalars['String'];
  value: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: ResolverTypeWrapper<Address>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Company: ResolverTypeWrapper<Company>;
  CostItem: ResolverTypeWrapper<CostItem>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Invoice: ResolverTypeWrapper<Invoice>;
  InvoicePage: ResolverTypeWrapper<InvoicePage>;
  InvoicePageInput: InvoicePageInput;
  Item: ResolverTypeWrapper<Item>;
  ItemType: ItemType;
  Modifier: ResolverTypeWrapper<Modifier>;
  ModifierCategory: ModifierCategory;
  ModifierType: ModifierType;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolversTypes['Invoice'] | ResolversTypes['Phase'];
  Phase: ResolverTypeWrapper<Phase>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  TaxRate: ResolverTypeWrapper<TaxRate>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address;
  Boolean: Scalars['Boolean'];
  Company: Company;
  CostItem: CostItem;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Invoice: Invoice;
  InvoicePage: InvoicePage;
  InvoicePageInput: InvoicePageInput;
  Item: Item;
  Modifier: Modifier;
  Mutation: {};
  Node: ResolversParentTypes['Invoice'] | ResolversParentTypes['Phase'];
  Phase: Phase;
  Query: {};
  String: Scalars['String'];
  TaxRate: TaxRate;
};

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  addressLine1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  addressLine2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zipCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = {
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  taxNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CostItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['CostItem'] = ResolversParentTypes['CostItem']> = {
  item?: Resolver<ResolversTypes['Item'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subtotal?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvoiceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Invoice'] = ResolversParentTypes['Invoice']> = {
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  finalized?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  issuer?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
  modifier?: Resolver<Maybe<ResolversTypes['Modifier']>, ParentType, ContextType>;
  phases?: Resolver<Array<ResolversTypes['Phase']>, ParentType, ContextType>;
  recipient?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
  subtotal?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvoicePageResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvoicePage'] = ResolversParentTypes['InvoicePage']> = {
  cursor?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  data?: Resolver<Array<ResolversTypes['Invoice']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  taxRate?: Resolver<ResolversTypes['TaxRate'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ItemType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModifierResolvers<ContextType = any, ParentType extends ResolversParentTypes['Modifier'] = ResolversParentTypes['Modifier']> = {
  category?: Resolver<ResolversTypes['ModifierCategory'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ModifierType'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Invoice' | 'Phase', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type PhaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Phase'] = ResolversParentTypes['Phase']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Array<Maybe<ResolversTypes['CostItem']>>, ParentType, ContextType>;
  modifier?: Resolver<Maybe<ResolversTypes['Modifier']>, ParentType, ContextType>;
  subtotal?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  invoice?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType, RequireFields<QueryInvoiceArgs, 'id'>>;
  invoices?: Resolver<ResolversTypes['InvoicePage'], ParentType, ContextType, Partial<QueryInvoicesArgs>>;
};

export type TaxRateResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxRate'] = ResolversParentTypes['TaxRate']> = {
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>;
  Company?: CompanyResolvers<ContextType>;
  CostItem?: CostItemResolvers<ContextType>;
  Invoice?: InvoiceResolvers<ContextType>;
  InvoicePage?: InvoicePageResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  Modifier?: ModifierResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  Phase?: PhaseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  TaxRate?: TaxRateResolvers<ContextType>;
};

