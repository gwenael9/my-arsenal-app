import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Goal = {
  __typename?: 'Goal';
  date: Scalars['String']['output'];
  id: Scalars['String']['output'];
  link: Scalars['String']['output'];
  player?: Maybe<Player>;
};

export type InputCreateGoal = {
  date: Scalars['String']['input'];
  link: Scalars['String']['input'];
  playerId: Scalars['String']['input'];
};

export type InputCreatePlayer = {
  age: Scalars['Float']['input'];
  country: Scalars['String']['input'];
  name: Scalars['String']['input'];
  number: Scalars['Float']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createGoal: Goal;
  createPlayer: Player;
};


export type MutationCreateGoalArgs = {
  infos: InputCreateGoal;
};


export type MutationCreatePlayerArgs = {
  infos: InputCreatePlayer;
};

export type Player = {
  __typename?: 'Player';
  age: Scalars['Float']['output'];
  country: Scalars['String']['output'];
  goals?: Maybe<Array<Goal>>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  number: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  getPlayerById: Player;
  goals: Array<Goal>;
  players: Array<Player>;
};


export type QueryGetPlayerByIdArgs = {
  playerId: Scalars['String']['input'];
};

export type PlayersQueryVariables = Exact<{ [key: string]: never; }>;


export type PlayersQuery = { __typename?: 'Query', players: Array<{ __typename?: 'Player', id: string, name: string, age: number, country: string, number: number, goals?: Array<{ __typename?: 'Goal', id: string, date: string, link: string }> | null }> };


export const PlayersDocument = gql`
    query Players {
  players {
    id
    name
    age
    country
    number
    goals {
      id
      date
      link
    }
  }
}
    `;

/**
 * __usePlayersQuery__
 *
 * To run a query within a React component, call `usePlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayersQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlayersQuery(baseOptions?: Apollo.QueryHookOptions<PlayersQuery, PlayersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlayersQuery, PlayersQueryVariables>(PlayersDocument, options);
      }
export function usePlayersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlayersQuery, PlayersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlayersQuery, PlayersQueryVariables>(PlayersDocument, options);
        }
export function usePlayersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PlayersQuery, PlayersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PlayersQuery, PlayersQueryVariables>(PlayersDocument, options);
        }
export type PlayersQueryHookResult = ReturnType<typeof usePlayersQuery>;
export type PlayersLazyQueryHookResult = ReturnType<typeof usePlayersLazyQuery>;
export type PlayersSuspenseQueryHookResult = ReturnType<typeof usePlayersSuspenseQuery>;
export type PlayersQueryResult = Apollo.QueryResult<PlayersQuery, PlayersQueryVariables>;