import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Order = {
  __typename?: 'Order';
  id?: Maybe<Scalars['ID']>;
  orderedPizzas?: Maybe<Array<Maybe<OrderedPizzas>>>;
  totalAmount?: Maybe<Scalars['Int']>;
  totalPrice?: Maybe<Scalars['Float']>;
};

export type OrderInput = {
  orderedPizzas?: InputMaybe<Array<InputMaybe<OrderedPizzasInput>>>;
  totalAmount: Scalars['Int'];
  totalPrice: Scalars['Float'];
};

export type OrderedPizzas = {
  __typename?: 'OrderedPizzas';
  amount?: Maybe<Scalars['Int']>;
  dough?: Maybe<Scalars['String']>;
  pizzaName?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Int']>;
};

export type OrderedPizzasInput = {
  amount: Scalars['Int'];
  dough: Scalars['String'];
  pizzaName: Scalars['String'];
  price: Scalars['Float'];
  size: Scalars['Int'];
};

export type Pizza = {
  __typename?: 'Pizza';
  id: Scalars['ID'];
  image: Scalars['String'];
  modifications?: Maybe<Array<Maybe<PizzaModification>>>;
  name: Scalars['String'];
  popularity: Scalars['Int'];
};

export type PizzaModification = {
  __typename?: 'PizzaModification';
  dough: Scalars['String'];
  id: Scalars['ID'];
  pizzasIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  price: Scalars['Float'];
  size: Scalars['Int'];
};

export type RootMutation = {
  __typename?: 'RootMutation';
  createOrder?: Maybe<Order>;
};


export type RootMutationCreateOrderArgs = {
  order: OrderInput;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  orders?: Maybe<Array<Maybe<Order>>>;
  pizzas?: Maybe<Array<Maybe<Pizza>>>;
};

export type CreateOrderMutationVariables = Exact<{
  order: OrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'RootMutation', createdOrder?: { __typename?: 'Order', id?: string | null | undefined, totalPrice?: number | null | undefined, totalAmount?: number | null | undefined, orderedPizzas?: Array<{ __typename?: 'OrderedPizzas', pizzaName?: string | null | undefined, dough?: string | null | undefined, size?: number | null | undefined, price?: number | null | undefined, amount?: number | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type GetOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdersQuery = { __typename?: 'RootQuery', orders?: Array<{ __typename?: 'Order', id?: string | null | undefined, totalPrice?: number | null | undefined, totalAmount?: number | null | undefined, orderedPizzas?: Array<{ __typename?: 'OrderedPizzas', pizzaName?: string | null | undefined, dough?: string | null | undefined, size?: number | null | undefined, price?: number | null | undefined, amount?: number | null | undefined } | null | undefined> | null | undefined } | null | undefined> | null | undefined };

export type GetPizzasQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPizzasQuery = { __typename?: 'RootQuery', pizzas?: Array<{ __typename?: 'Pizza', id: string, name: string, image: string, popularity: number, modifications?: Array<{ __typename?: 'PizzaModification', id: string, dough: string, size: number, price: number } | null | undefined> | null | undefined } | null | undefined> | null | undefined };


export const CreateOrderDocument = gql`
    mutation CreateOrder($order: OrderInput!) {
  createdOrder: createOrder(order: $order) {
    id
    totalPrice
    totalAmount
    orderedPizzas {
      pizzaName
      dough
      size
      price
      amount
    }
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      order: // value for 'order'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const GetOrdersDocument = gql`
    query GetOrders {
  orders {
    id
    totalPrice
    totalAmount
    orderedPizzas {
      pizzaName
      dough
      size
      price
      amount
    }
  }
}
    `;

/**
 * __useGetOrdersQuery__
 *
 * To run a query within a React component, call `useGetOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
      }
export function useGetOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
        }
export type GetOrdersQueryHookResult = ReturnType<typeof useGetOrdersQuery>;
export type GetOrdersLazyQueryHookResult = ReturnType<typeof useGetOrdersLazyQuery>;
export type GetOrdersQueryResult = Apollo.QueryResult<GetOrdersQuery, GetOrdersQueryVariables>;
export const GetPizzasDocument = gql`
    query GetPizzas {
  pizzas {
    id
    name
    image
    popularity
    modifications {
      id
      dough
      size
      price
    }
  }
}
    `;

/**
 * __useGetPizzasQuery__
 *
 * To run a query within a React component, call `useGetPizzasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPizzasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPizzasQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPizzasQuery(baseOptions?: Apollo.QueryHookOptions<GetPizzasQuery, GetPizzasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPizzasQuery, GetPizzasQueryVariables>(GetPizzasDocument, options);
      }
export function useGetPizzasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPizzasQuery, GetPizzasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPizzasQuery, GetPizzasQueryVariables>(GetPizzasDocument, options);
        }
export type GetPizzasQueryHookResult = ReturnType<typeof useGetPizzasQuery>;
export type GetPizzasLazyQueryHookResult = ReturnType<typeof useGetPizzasLazyQuery>;
export type GetPizzasQueryResult = Apollo.QueryResult<GetPizzasQuery, GetPizzasQueryVariables>;