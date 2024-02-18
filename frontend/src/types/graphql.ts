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
  against: Scalars['String']['output'];
  date: Scalars['String']['output'];
  id: Scalars['String']['output'];
  link: Scalars['String']['output'];
  ordre: Scalars['Float']['output'];
  player?: Maybe<Player>;
  where: Scalars['String']['output'];
};

export type InputCreateGoal = {
  against: Scalars['String']['input'];
  date: Scalars['String']['input'];
  link: Scalars['String']['input'];
  ordre: Scalars['Float']['input'];
  playerId: Scalars['String']['input'];
  where: Scalars['String']['input'];
};

export type InputCreatePlayer = {
  country: Scalars['String']['input'];
  name: Scalars['String']['input'];
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
  country: Scalars['String']['output'];
  goals?: Maybe<Array<Goal>>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getGoalByOrdre: Goal;
  getPlayerById: Player;
  goals: Array<Goal>;
  players: Array<Player>;
};


export type QueryGetGoalByOrdreArgs = {
  goalOrdre: Scalars['Float']['input'];
};


export type QueryGetPlayerByIdArgs = {
  playerId: Scalars['String']['input'];
};

export type GetGoalByOrdreQueryVariables = Exact<{
  goalOrdre: Scalars['Float']['input'];
}>;


export type GetGoalByOrdreQuery = { __typename?: 'Query', getGoalByOrdre: { __typename?: 'Goal', id: string, date: string, against: string, link: string, ordre: number, where: string, player?: { __typename?: 'Player', id: string, country: string, name: string } | null } };

export type GoalsQueryVariables = Exact<{ [key: string]: never; }>;


export type GoalsQuery = { __typename?: 'Query', goals: Array<{ __typename?: 'Goal', id: string, link: string, where: string, date: string, against: string, ordre: number, player?: { __typename?: 'Player', id: string, name: string, country: string } | null }> };

export type PlayersQueryVariables = Exact<{ [key: string]: never; }>;


export type PlayersQuery = { __typename?: 'Query', players: Array<{ __typename?: 'Player', country: string, id: string, name: string, goals?: Array<{ __typename?: 'Goal', id: string, link: string, where: string, date: string, against: string, ordre: number }> | null }> };


export const GetGoalByOrdreDocument = gql`
    query GetGoalByOrdre($goalOrdre: Float!) {
  getGoalByOrdre(goalOrdre: $goalOrdre) {
    id
    date
    against
    link
    ordre
    where
    player {
      id
      country
      name
    }
  }
}
    `;

/**
 * __useGetGoalByOrdreQuery__
 *
 * To run a query within a React component, call `useGetGoalByOrdreQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGoalByOrdreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGoalByOrdreQuery({
 *   variables: {
 *      goalOrdre: // value for 'goalOrdre'
 *   },
 * });
 */
export function useGetGoalByOrdreQuery(baseOptions: Apollo.QueryHookOptions<GetGoalByOrdreQuery, GetGoalByOrdreQueryVariables> & ({ variables: GetGoalByOrdreQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGoalByOrdreQuery, GetGoalByOrdreQueryVariables>(GetGoalByOrdreDocument, options);
      }
export function useGetGoalByOrdreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGoalByOrdreQuery, GetGoalByOrdreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGoalByOrdreQuery, GetGoalByOrdreQueryVariables>(GetGoalByOrdreDocument, options);
        }
export function useGetGoalByOrdreSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetGoalByOrdreQuery, GetGoalByOrdreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGoalByOrdreQuery, GetGoalByOrdreQueryVariables>(GetGoalByOrdreDocument, options);
        }
export type GetGoalByOrdreQueryHookResult = ReturnType<typeof useGetGoalByOrdreQuery>;
export type GetGoalByOrdreLazyQueryHookResult = ReturnType<typeof useGetGoalByOrdreLazyQuery>;
export type GetGoalByOrdreSuspenseQueryHookResult = ReturnType<typeof useGetGoalByOrdreSuspenseQuery>;
export type GetGoalByOrdreQueryResult = Apollo.QueryResult<GetGoalByOrdreQuery, GetGoalByOrdreQueryVariables>;
export const GoalsDocument = gql`
    query Goals {
  goals {
    id
    player {
      id
      name
      country
    }
    link
    where
    date
    against
    ordre
  }
}
    `;

/**
 * __useGoalsQuery__
 *
 * To run a query within a React component, call `useGoalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGoalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGoalsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGoalsQuery(baseOptions?: Apollo.QueryHookOptions<GoalsQuery, GoalsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GoalsQuery, GoalsQueryVariables>(GoalsDocument, options);
      }
export function useGoalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GoalsQuery, GoalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GoalsQuery, GoalsQueryVariables>(GoalsDocument, options);
        }
export function useGoalsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GoalsQuery, GoalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GoalsQuery, GoalsQueryVariables>(GoalsDocument, options);
        }
export type GoalsQueryHookResult = ReturnType<typeof useGoalsQuery>;
export type GoalsLazyQueryHookResult = ReturnType<typeof useGoalsLazyQuery>;
export type GoalsSuspenseQueryHookResult = ReturnType<typeof useGoalsSuspenseQuery>;
export type GoalsQueryResult = Apollo.QueryResult<GoalsQuery, GoalsQueryVariables>;
export const PlayersDocument = gql`
    query Players {
  players {
    country
    id
    name
    goals {
      id
      link
      where
      date
      against
      ordre
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