import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddOrderInput = {
  customerInfo: CustomerInfoInput;
  orderInfo: OrderInfoInput;
};

export type AddTemplateInput = {
  pdf_filename?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CustomerInfo = {
  __typename?: 'CustomerInfo';
  addressOne: Scalars['String']['output'];
  addressTwo?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type CustomerInfoInput = {
  addressOne: Scalars['String']['input'];
  addressTwo?: InputMaybe<Scalars['String']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addOrder: Order;
  addTemplate: Template;
};


export type MutationAddOrderArgs = {
  input: AddOrderInput;
};


export type MutationAddTemplateArgs = {
  input: AddTemplateInput;
};

export type Order = {
  __typename?: 'Order';
  customerInfo: CustomerInfo;
  id: Scalars['ID']['output'];
  orderInfo: OrderInfo;
};

export type OrderInfo = {
  __typename?: 'OrderInfo';
  delivery: Scalars['String']['output'];
  location: Scalars['String']['output'];
  otherOne?: Maybe<Scalars['String']['output']>;
  otherTwo?: Maybe<Scalars['String']['output']>;
  performer: Scalars['String']['output'];
  priceEuro: Scalars['Float']['output'];
  priceInfo?: Maybe<Scalars['String']['output']>;
  timeInfo?: Maybe<Scalars['String']['output']>;
  timeOfDelivery: Scalars['String']['output'];
};

export type OrderInfoInput = {
  delivery: Scalars['String']['input'];
  location: Scalars['String']['input'];
  otherOne?: InputMaybe<Scalars['String']['input']>;
  otherTwo?: InputMaybe<Scalars['String']['input']>;
  performer: Scalars['String']['input'];
  priceEuro: Scalars['Float']['input'];
  priceInfo?: InputMaybe<Scalars['String']['input']>;
  timeInfo?: InputMaybe<Scalars['String']['input']>;
  timeOfDelivery: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  allOrders?: Maybe<Array<Maybe<Order>>>;
  allTemplates?: Maybe<Array<Maybe<Template>>>;
};

export type Template = {
  __typename?: 'Template';
  id: Scalars['ID']['output'];
  pdf_filename: Scalars['String']['output'];
  title: Scalars['String']['output'];
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
  AddOrderInput: AddOrderInput;
  AddTemplateInput: AddTemplateInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CustomerInfo: ResolverTypeWrapper<CustomerInfo>;
  CustomerInfoInput: CustomerInfoInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Order: ResolverTypeWrapper<Order>;
  OrderInfo: ResolverTypeWrapper<OrderInfo>;
  OrderInfoInput: OrderInfoInput;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Template: ResolverTypeWrapper<Template>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddOrderInput: AddOrderInput;
  AddTemplateInput: AddTemplateInput;
  Boolean: Scalars['Boolean']['output'];
  CustomerInfo: CustomerInfo;
  CustomerInfoInput: CustomerInfoInput;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Mutation: {};
  Order: Order;
  OrderInfo: OrderInfo;
  OrderInfoInput: OrderInfoInput;
  Query: {};
  String: Scalars['String']['output'];
  Template: Template;
};

export type CustomerInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerInfo'] = ResolversParentTypes['CustomerInfo']> = {
  addressOne?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  addressTwo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addOrder?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<MutationAddOrderArgs, 'input'>>;
  addTemplate?: Resolver<ResolversTypes['Template'], ParentType, ContextType, RequireFields<MutationAddTemplateArgs, 'input'>>;
};

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  customerInfo?: Resolver<ResolversTypes['CustomerInfo'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  orderInfo?: Resolver<ResolversTypes['OrderInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderInfo'] = ResolversParentTypes['OrderInfo']> = {
  delivery?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  otherOne?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  otherTwo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  performer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priceEuro?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  priceInfo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timeInfo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timeOfDelivery?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allOrders?: Resolver<Maybe<Array<Maybe<ResolversTypes['Order']>>>, ParentType, ContextType>;
  allTemplates?: Resolver<Maybe<Array<Maybe<ResolversTypes['Template']>>>, ParentType, ContextType>;
};

export type TemplateResolvers<ContextType = any, ParentType extends ResolversParentTypes['Template'] = ResolversParentTypes['Template']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pdf_filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CustomerInfo?: CustomerInfoResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderInfo?: OrderInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Template?: TemplateResolvers<ContextType>;
};

