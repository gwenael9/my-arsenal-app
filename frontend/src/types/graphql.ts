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
  buteur?: Maybe<Player>;
  competition: Scalars['String']['output'];
  date: Scalars['String']['output'];
  id: Scalars['String']['output'];
  link: Scalars['String']['output'];
  ordre: Scalars['Float']['output'];
  passeur?: Maybe<Player>;
  where: Scalars['String']['output'];
};

export type InputCreateGoal = {
  against: Scalars['String']['input'];
  buteurId: Scalars['String']['input'];
  competition: Scalars['String']['input'];
  date: Scalars['String']['input'];
  link: Scalars['String']['input'];
  ordre: Scalars['Float']['input'];
  passeurId?: InputMaybe<Scalars['String']['input']>;
  where: Scalars['String']['input'];
};

export type InputCreatePlayer = {
  country: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type InputLogin = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type InputRegister = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type Message = {
  __typename?: 'Message';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createGoal: Goal;
  createPlayer: Player;
  deleteGoal: Message;
  deletePlayer: Message;
  register: User;
};


export type MutationCreateGoalArgs = {
  infos: InputCreateGoal;
};


export type MutationCreatePlayerArgs = {
  infos: InputCreatePlayer;
};


export type MutationDeleteGoalArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePlayerArgs = {
  id: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  infos: InputRegister;
};

export type Player = {
  __typename?: 'Player';
  country: Scalars['String']['output'];
  goals?: Maybe<Array<Goal>>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  passes?: Maybe<Array<Goal>>;
};

export type Query = {
  __typename?: 'Query';
  getGoalByOrdre: Goal;
  getPlayerById: Player;
  goals: Array<Goal>;
  login: Message;
  logout: Message;
  players: Array<Player>;
  users: Array<User>;
};


export type QueryGetGoalByOrdreArgs = {
  goalOrdre: Scalars['Float']['input'];
};


export type QueryGetPlayerByIdArgs = {
  playerId: Scalars['String']['input'];
};


export type QueryLoginArgs = {
  infos: InputLogin;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type CreateGoalMutationVariables = Exact<{
  infos: InputCreateGoal;
}>;


export type CreateGoalMutation = { __typename?: 'Mutation', createGoal: { __typename?: 'Goal', id: string, date: string, against: string, ordre: number, where: string, link: string, buteur?: { __typename?: 'Player', id: string, name: string, country: string } | null, passeur?: { __typename?: 'Player', id: string, name: string, country: string } | null } };

export type CreatePlayerMutationVariables = Exact<{
  infos: InputCreatePlayer;
}>;


export type CreatePlayerMutation = { __typename?: 'Mutation', createPlayer: { __typename?: 'Player', id: string, name: string, country: string, goals?: Array<{ __typename?: 'Goal', id: string, date: string, against: string, ordre: number, where: string, link: string }> | null } };

export type DeleteGoalMutationVariables = Exact<{
  deleteGoalId: Scalars['String']['input'];
}>;


export type DeleteGoalMutation = { __typename?: 'Mutation', deleteGoal: { __typename?: 'Message', message: string, success: boolean } };

export type DeletePlayerMutationVariables = Exact<{
  deletePlayerId: Scalars['String']['input'];
}>;


export type DeletePlayerMutation = { __typename?: 'Mutation', deletePlayer: { __typename?: 'Message', message: string, success: boolean } };

export type LoginQueryVariables = Exact<{
  infos: InputLogin;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'Message', success: boolean, message: string } };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout: { __typename?: 'Message', success: boolean, message: string } };

export type GetGoalByOrdreQueryVariables = Exact<{
  goalOrdre: Scalars['Float']['input'];
}>;


export type GetGoalByOrdreQuery = { __typename?: 'Query', getGoalByOrdre: { __typename?: 'Goal', id: string, date: string, against: string, link: string, ordre: number, where: string, competition: string, buteur?: { __typename?: 'Player', id: string, country: string, name: string } | null, passeur?: { __typename?: 'Player', id: string, country: string, name: string } | null } };

export type GoalsQueryVariables = Exact<{ [key: string]: never; }>;


export type GoalsQuery = { __typename?: 'Query', goals: Array<{ __typename?: 'Goal', id: string, link: string, where: string, date: string, against: string, ordre: number, competition: string, buteur?: { __typename?: 'Player', id: string, name: string, country: string } | null, passeur?: { __typename?: 'Player', id: string, name: string, country: string } | null }> };

export type PlayersQueryVariables = Exact<{ [key: string]: never; }>;


export type PlayersQuery = { __typename?: 'Query', players: Array<{ __typename?: 'Player', country: string, id: string, name: string, goals?: Array<{ __typename?: 'Goal', id: string, link: string, where: string, date: string, against: string, ordre: number, competition: string }> | null, passes?: Array<{ __typename?: 'Goal', id: string, link: string, where: string, date: string, against: string, ordre: number, competition: string }> | null }> };

export type GetPlayerByIdQueryVariables = Exact<{
  playerId: Scalars['String']['input'];
}>;


export type GetPlayerByIdQuery = { __typename?: 'Query', getPlayerById: { __typename?: 'Player', name: string } };


export const CreateGoalDocument = gql`
    mutation CreateGoal($infos: InputCreateGoal!) {
  createGoal(infos: $infos) {
    id
    buteur {
      id
      name
      country
    }
    passeur {
      id
      name
      country
    }
    date
    against
    ordre
    where
    link
  }
}
    `;
export type CreateGoalMutationFn = Apollo.MutationFunction<CreateGoalMutation, CreateGoalMutationVariables>;

/**
 * __useCreateGoalMutation__
 *
 * To run a mutation, you first call `useCreateGoalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGoalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGoalMutation, { data, loading, error }] = useCreateGoalMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useCreateGoalMutation(baseOptions?: Apollo.MutationHookOptions<CreateGoalMutation, CreateGoalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGoalMutation, CreateGoalMutationVariables>(CreateGoalDocument, options);
      }
export type CreateGoalMutationHookResult = ReturnType<typeof useCreateGoalMutation>;
export type CreateGoalMutationResult = Apollo.MutationResult<CreateGoalMutation>;
export type CreateGoalMutationOptions = Apollo.BaseMutationOptions<CreateGoalMutation, CreateGoalMutationVariables>;
export const CreatePlayerDocument = gql`
    mutation createPlayer($infos: InputCreatePlayer!) {
  createPlayer(infos: $infos) {
    id
    name
    country
    goals {
      id
      date
      against
      ordre
      where
      link
    }
  }
}
    `;
export type CreatePlayerMutationFn = Apollo.MutationFunction<CreatePlayerMutation, CreatePlayerMutationVariables>;

/**
 * __useCreatePlayerMutation__
 *
 * To run a mutation, you first call `useCreatePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlayerMutation, { data, loading, error }] = useCreatePlayerMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useCreatePlayerMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlayerMutation, CreatePlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePlayerMutation, CreatePlayerMutationVariables>(CreatePlayerDocument, options);
      }
export type CreatePlayerMutationHookResult = ReturnType<typeof useCreatePlayerMutation>;
export type CreatePlayerMutationResult = Apollo.MutationResult<CreatePlayerMutation>;
export type CreatePlayerMutationOptions = Apollo.BaseMutationOptions<CreatePlayerMutation, CreatePlayerMutationVariables>;
export const DeleteGoalDocument = gql`
    mutation DeleteGoal($deleteGoalId: String!) {
  deleteGoal(id: $deleteGoalId) {
    message
    success
  }
}
    `;
export type DeleteGoalMutationFn = Apollo.MutationFunction<DeleteGoalMutation, DeleteGoalMutationVariables>;

/**
 * __useDeleteGoalMutation__
 *
 * To run a mutation, you first call `useDeleteGoalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGoalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGoalMutation, { data, loading, error }] = useDeleteGoalMutation({
 *   variables: {
 *      deleteGoalId: // value for 'deleteGoalId'
 *   },
 * });
 */
export function useDeleteGoalMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGoalMutation, DeleteGoalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGoalMutation, DeleteGoalMutationVariables>(DeleteGoalDocument, options);
      }
export type DeleteGoalMutationHookResult = ReturnType<typeof useDeleteGoalMutation>;
export type DeleteGoalMutationResult = Apollo.MutationResult<DeleteGoalMutation>;
export type DeleteGoalMutationOptions = Apollo.BaseMutationOptions<DeleteGoalMutation, DeleteGoalMutationVariables>;
export const DeletePlayerDocument = gql`
    mutation DeletePlayer($deletePlayerId: String!) {
  deletePlayer(id: $deletePlayerId) {
    message
    success
  }
}
    `;
export type DeletePlayerMutationFn = Apollo.MutationFunction<DeletePlayerMutation, DeletePlayerMutationVariables>;

/**
 * __useDeletePlayerMutation__
 *
 * To run a mutation, you first call `useDeletePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePlayerMutation, { data, loading, error }] = useDeletePlayerMutation({
 *   variables: {
 *      deletePlayerId: // value for 'deletePlayerId'
 *   },
 * });
 */
export function useDeletePlayerMutation(baseOptions?: Apollo.MutationHookOptions<DeletePlayerMutation, DeletePlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePlayerMutation, DeletePlayerMutationVariables>(DeletePlayerDocument, options);
      }
export type DeletePlayerMutationHookResult = ReturnType<typeof useDeletePlayerMutation>;
export type DeletePlayerMutationResult = Apollo.MutationResult<DeletePlayerMutation>;
export type DeletePlayerMutationOptions = Apollo.BaseMutationOptions<DeletePlayerMutation, DeletePlayerMutationVariables>;
export const LoginDocument = gql`
    query Login($infos: InputLogin!) {
  login(infos: $infos) {
    success
    message
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export function useLoginSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginSuspenseQueryHookResult = ReturnType<typeof useLoginSuspenseQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const LogoutDocument = gql`
    query Logout {
  logout {
    success
    message
  }
}
    `;

/**
 * __useLogoutQuery__
 *
 * To run a query within a React component, call `useLogoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useLogoutQuery(baseOptions?: Apollo.QueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
      }
export function useLogoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export function useLogoutSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export type LogoutQueryHookResult = ReturnType<typeof useLogoutQuery>;
export type LogoutLazyQueryHookResult = ReturnType<typeof useLogoutLazyQuery>;
export type LogoutSuspenseQueryHookResult = ReturnType<typeof useLogoutSuspenseQuery>;
export type LogoutQueryResult = Apollo.QueryResult<LogoutQuery, LogoutQueryVariables>;
export const GetGoalByOrdreDocument = gql`
    query GetGoalByOrdre($goalOrdre: Float!) {
  getGoalByOrdre(goalOrdre: $goalOrdre) {
    id
    date
    against
    link
    ordre
    where
    competition
    buteur {
      id
      country
      name
    }
    passeur {
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
export function useGetGoalByOrdreQuery(baseOptions: Apollo.QueryHookOptions<GetGoalByOrdreQuery, GetGoalByOrdreQueryVariables>) {
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
    buteur {
      id
      name
      country
    }
    passeur {
      id
      name
      country
    }
    link
    where
    date
    against
    ordre
    competition
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
      competition
    }
    passes {
      id
      link
      where
      date
      against
      ordre
      competition
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
export const GetPlayerByIdDocument = gql`
    query GetPlayerById($playerId: String!) {
  getPlayerById(playerId: $playerId) {
    name
  }
}
    `;

/**
 * __useGetPlayerByIdQuery__
 *
 * To run a query within a React component, call `useGetPlayerByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlayerByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlayerByIdQuery({
 *   variables: {
 *      playerId: // value for 'playerId'
 *   },
 * });
 */
export function useGetPlayerByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPlayerByIdQuery, GetPlayerByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlayerByIdQuery, GetPlayerByIdQueryVariables>(GetPlayerByIdDocument, options);
      }
export function useGetPlayerByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlayerByIdQuery, GetPlayerByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlayerByIdQuery, GetPlayerByIdQueryVariables>(GetPlayerByIdDocument, options);
        }
export function useGetPlayerByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPlayerByIdQuery, GetPlayerByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPlayerByIdQuery, GetPlayerByIdQueryVariables>(GetPlayerByIdDocument, options);
        }
export type GetPlayerByIdQueryHookResult = ReturnType<typeof useGetPlayerByIdQuery>;
export type GetPlayerByIdLazyQueryHookResult = ReturnType<typeof useGetPlayerByIdLazyQuery>;
export type GetPlayerByIdSuspenseQueryHookResult = ReturnType<typeof useGetPlayerByIdSuspenseQuery>;
export type GetPlayerByIdQueryResult = Apollo.QueryResult<GetPlayerByIdQuery, GetPlayerByIdQueryVariables>;