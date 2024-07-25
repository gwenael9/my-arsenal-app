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

export type AgainstTeam = {
  __typename?: 'AgainstTeam';
  goals: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type Goal = {
  __typename?: 'Goal';
  against: Scalars['String']['output'];
  buteur: Player;
  competition: Scalars['String']['output'];
  date: Scalars['String']['output'];
  id: Scalars['String']['output'];
  link: Scalars['String']['output'];
  ordre: Scalars['Float']['output'];
  passeur?: Maybe<Player>;
  saison: Scalars['String']['output'];
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
  saison: Scalars['String']['input'];
  where: Scalars['String']['input'];
};

export type InputCreatePlayer = {
  country: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
};

export type InputCreateSaison = {
  match: Scalars['Float']['input'];
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
  createSaison: Saison;
  deleteGoal: Message;
  deletePlayer: Message;
  register: User;
  updateSaisonMatch: Saison;
};


export type MutationCreateGoalArgs = {
  infos: InputCreateGoal;
};


export type MutationCreatePlayerArgs = {
  infos: InputCreatePlayer;
};


export type MutationCreateSaisonArgs = {
  infos: InputCreateSaison;
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


export type MutationUpdateSaisonMatchArgs = {
  newMatch: Scalars['Float']['input'];
  saisonId: Scalars['String']['input'];
};

export type Player = {
  __typename?: 'Player';
  country: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  goals?: Maybe<Array<Goal>>;
  id: Scalars['String']['output'];
  lastname: Scalars['String']['output'];
  passes?: Maybe<Array<Goal>>;
};

export type Query = {
  __typename?: 'Query';
  getGoalByOrdre: Goal;
  getGoalsByPlayerId: Array<Goal>;
  getGoalsBySaison: Array<Goal>;
  getGoalsBySaisonAndPlayerId: Array<Goal>;
  getPlayerById: Player;
  getPlayerByName: Player;
  getTeamWithMostGoals: AgainstTeam;
  getUserProfile: UserProfile;
  goals: Array<Goal>;
  login: Message;
  logout: Message;
  players: Array<Player>;
  saisonByName: Saison;
  saisons: Array<Saison>;
  users: Array<User>;
};


export type QueryGetGoalByOrdreArgs = {
  goalOrdre: Scalars['Float']['input'];
};


export type QueryGetGoalsByPlayerIdArgs = {
  playerId: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type QueryGetGoalsBySaisonArgs = {
  saison: Scalars['String']['input'];
};


export type QueryGetGoalsBySaisonAndPlayerIdArgs = {
  playerId: Scalars['String']['input'];
  saison: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type QueryGetPlayerByIdArgs = {
  playerId: Scalars['String']['input'];
};


export type QueryGetPlayerByNameArgs = {
  playerName: Scalars['String']['input'];
};


export type QueryGetTeamWithMostGoalsArgs = {
  buteurId?: InputMaybe<Scalars['String']['input']>;
  saison: Scalars['String']['input'];
};


export type QueryLoginArgs = {
  infos: InputLogin;
};


export type QuerySaisonByNameArgs = {
  name: Scalars['String']['input'];
};

export type Saison = {
  __typename?: 'Saison';
  goals: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  match: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  email: Scalars['String']['output'];
};

export type CreateGoalMutationVariables = Exact<{
  infos: InputCreateGoal;
}>;


export type CreateGoalMutation = { __typename?: 'Mutation', createGoal: { __typename?: 'Goal', id: string, date: string, against: string, ordre: number, where: string, link: string, buteur: { __typename?: 'Player', id: string, firstname: string, lastname: string, country: string }, passeur?: { __typename?: 'Player', id: string, firstname: string, lastname: string, country: string } | null } };

export type CreatePlayerMutationVariables = Exact<{
  infos: InputCreatePlayer;
}>;


export type CreatePlayerMutation = { __typename?: 'Mutation', createPlayer: { __typename?: 'Player', id: string, firstname: string, lastname: string, country: string, goals?: Array<{ __typename?: 'Goal', id: string, date: string, against: string, ordre: number, where: string, link: string }> | null } };

export type DeleteGoalMutationVariables = Exact<{
  deleteGoalId: Scalars['String']['input'];
}>;


export type DeleteGoalMutation = { __typename?: 'Mutation', deleteGoal: { __typename?: 'Message', message: string, success: boolean } };

export type DeletePlayerMutationVariables = Exact<{
  deletePlayerId: Scalars['String']['input'];
}>;


export type DeletePlayerMutation = { __typename?: 'Mutation', deletePlayer: { __typename?: 'Message', message: string, success: boolean } };

export type RegisterMutationVariables = Exact<{
  infos: InputRegister;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: string, email: string, password: string, role: string } };

export type UpdateSaisonMatchMutationVariables = Exact<{
  newMatch: Scalars['Float']['input'];
  saisonId: Scalars['String']['input'];
}>;


export type UpdateSaisonMatchMutation = { __typename?: 'Mutation', updateSaisonMatch: { __typename?: 'Saison', id: string, name: string, match: number, goals: number } };

export type LoginQueryVariables = Exact<{
  infos: InputLogin;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'Message', success: boolean, message: string } };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout: { __typename?: 'Message', success: boolean, message: string } };

export type GetGoalByOrdreQueryVariables = Exact<{
  goalOrdre: Scalars['Float']['input'];
}>;


export type GetGoalByOrdreQuery = { __typename?: 'Query', getGoalByOrdre: { __typename?: 'Goal', id: string, date: string, against: string, link: string, ordre: number, where: string, competition: string, saison: string, buteur: { __typename?: 'Player', id: string, country: string, firstname: string, lastname: string }, passeur?: { __typename?: 'Player', id: string, country: string, firstname: string, lastname: string } | null } };

export type GoalsQueryVariables = Exact<{ [key: string]: never; }>;


export type GoalsQuery = { __typename?: 'Query', goals: Array<{ __typename?: 'Goal', id: string, link: string, where: string, date: string, against: string, ordre: number, competition: string, saison: string, buteur: { __typename?: 'Player', id: string, firstname: string, lastname: string, country: string }, passeur?: { __typename?: 'Player', id: string, firstname: string, lastname: string, country: string } | null }> };

export type GetGoalsByPlayerIdQueryVariables = Exact<{
  type: Scalars['String']['input'];
  playerId: Scalars['String']['input'];
}>;


export type GetGoalsByPlayerIdQuery = { __typename?: 'Query', getGoalsByPlayerId: Array<{ __typename?: 'Goal', id: string, date: string, link: string, against: string, where: string, ordre: number, competition: string, saison: string, buteur: { __typename?: 'Player', id: string, firstname: string, lastname: string, country: string } }> };

export type GetGoalsBySaisonQueryVariables = Exact<{
  saison: Scalars['String']['input'];
}>;


export type GetGoalsBySaisonQuery = { __typename?: 'Query', getGoalsBySaison: Array<{ __typename?: 'Goal', id: string, date: string, link: string, against: string, where: string, ordre: number, competition: string, saison: string, buteur: { __typename?: 'Player', id: string, firstname: string, lastname: string, country: string }, passeur?: { __typename?: 'Player', id: string, firstname: string, lastname: string, country: string } | null }> };

export type GetGoalsBySaisonAndPlayerIdQueryVariables = Exact<{
  type: Scalars['String']['input'];
  playerId: Scalars['String']['input'];
  saison: Scalars['String']['input'];
}>;


export type GetGoalsBySaisonAndPlayerIdQuery = { __typename?: 'Query', getGoalsBySaisonAndPlayerId: Array<{ __typename?: 'Goal', id: string, date: string, link: string, against: string, where: string, ordre: number, competition: string, saison: string, buteur: { __typename?: 'Player', id: string, firstname: string, lastname: string, country: string }, passeur?: { __typename?: 'Player', id: string, firstname: string, lastname: string, country: string } | null }> };

export type PlayersQueryVariables = Exact<{ [key: string]: never; }>;


export type PlayersQuery = { __typename?: 'Query', players: Array<{ __typename?: 'Player', country: string, id: string, firstname: string, lastname: string, goals?: Array<{ __typename?: 'Goal', id: string, link: string, where: string, date: string, against: string, ordre: number, competition: string, saison: string }> | null, passes?: Array<{ __typename?: 'Goal', id: string, link: string, where: string, date: string, against: string, ordre: number, competition: string, saison: string }> | null }> };

export type GetPlayerByIdQueryVariables = Exact<{
  playerId: Scalars['String']['input'];
}>;


export type GetPlayerByIdQuery = { __typename?: 'Query', getPlayerById: { __typename?: 'Player', id: string, firstname: string, lastname: string, country: string, goals?: Array<{ __typename?: 'Goal', id: string, date: string, link: string, against: string, where: string, ordre: number, competition: string, saison: string }> | null, passes?: Array<{ __typename?: 'Goal', id: string, date: string, link: string, against: string, where: string, ordre: number, competition: string, saison: string }> | null } };

export type GetPlayerByNameQueryVariables = Exact<{
  playerName: Scalars['String']['input'];
}>;


export type GetPlayerByNameQuery = { __typename?: 'Query', getPlayerByName: { __typename?: 'Player', id: string, firstname: string, lastname: string, country: string, goals?: Array<{ __typename?: 'Goal', id: string, date: string, link: string, against: string, where: string, ordre: number, competition: string, saison: string, buteur: { __typename?: 'Player', id: string, firstname: string, lastname: string, country: string }, passeur?: { __typename?: 'Player', id: string, firstname: string, lastname: string, country: string } | null }> | null, passes?: Array<{ __typename?: 'Goal', id: string, date: string, link: string, against: string, where: string, ordre: number, competition: string, saison: string }> | null } };

export type SaisonsQueryVariables = Exact<{ [key: string]: never; }>;


export type SaisonsQuery = { __typename?: 'Query', saisons: Array<{ __typename?: 'Saison', id: string, name: string, match: number, goals: number }> };

export type SaisonByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type SaisonByNameQuery = { __typename?: 'Query', saisonByName: { __typename?: 'Saison', id: string, name: string, match: number, goals: number } };

export type GetTeamWithMostGoalsQueryVariables = Exact<{
  saison: Scalars['String']['input'];
  buteurId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTeamWithMostGoalsQuery = { __typename?: 'Query', getTeamWithMostGoals: { __typename?: 'AgainstTeam', name: string, goals: number } };

export type GetUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserProfileQuery = { __typename?: 'Query', getUserProfile: { __typename?: 'UserProfile', email: string } };


export const CreateGoalDocument = gql`
    mutation CreateGoal($infos: InputCreateGoal!) {
  createGoal(infos: $infos) {
    id
    buteur {
      id
      firstname
      lastname
      country
    }
    passeur {
      id
      firstname
      lastname
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
    firstname
    lastname
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
export const RegisterDocument = gql`
    mutation Register($infos: InputRegister!) {
  register(infos: $infos) {
    id
    email
    password
    role
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateSaisonMatchDocument = gql`
    mutation UpdateSaisonMatch($newMatch: Float!, $saisonId: String!) {
  updateSaisonMatch(newMatch: $newMatch, saisonId: $saisonId) {
    id
    name
    match
    goals
  }
}
    `;
export type UpdateSaisonMatchMutationFn = Apollo.MutationFunction<UpdateSaisonMatchMutation, UpdateSaisonMatchMutationVariables>;

/**
 * __useUpdateSaisonMatchMutation__
 *
 * To run a mutation, you first call `useUpdateSaisonMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSaisonMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSaisonMatchMutation, { data, loading, error }] = useUpdateSaisonMatchMutation({
 *   variables: {
 *      newMatch: // value for 'newMatch'
 *      saisonId: // value for 'saisonId'
 *   },
 * });
 */
export function useUpdateSaisonMatchMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSaisonMatchMutation, UpdateSaisonMatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSaisonMatchMutation, UpdateSaisonMatchMutationVariables>(UpdateSaisonMatchDocument, options);
      }
export type UpdateSaisonMatchMutationHookResult = ReturnType<typeof useUpdateSaisonMatchMutation>;
export type UpdateSaisonMatchMutationResult = Apollo.MutationResult<UpdateSaisonMatchMutation>;
export type UpdateSaisonMatchMutationOptions = Apollo.BaseMutationOptions<UpdateSaisonMatchMutation, UpdateSaisonMatchMutationVariables>;
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
    saison
    buteur {
      id
      country
      firstname
      lastname
    }
    passeur {
      id
      country
      firstname
      lastname
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
      firstname
      lastname
      country
    }
    passeur {
      id
      firstname
      lastname
      country
    }
    link
    where
    date
    against
    ordre
    competition
    saison
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
export const GetGoalsByPlayerIdDocument = gql`
    query GetGoalsByPlayerId($type: String!, $playerId: String!) {
  getGoalsByPlayerId(type: $type, playerId: $playerId) {
    id
    date
    link
    against
    where
    ordre
    competition
    saison
    buteur {
      id
      firstname
      lastname
      country
    }
  }
}
    `;

/**
 * __useGetGoalsByPlayerIdQuery__
 *
 * To run a query within a React component, call `useGetGoalsByPlayerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGoalsByPlayerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGoalsByPlayerIdQuery({
 *   variables: {
 *      type: // value for 'type'
 *      playerId: // value for 'playerId'
 *   },
 * });
 */
export function useGetGoalsByPlayerIdQuery(baseOptions: Apollo.QueryHookOptions<GetGoalsByPlayerIdQuery, GetGoalsByPlayerIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGoalsByPlayerIdQuery, GetGoalsByPlayerIdQueryVariables>(GetGoalsByPlayerIdDocument, options);
      }
export function useGetGoalsByPlayerIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGoalsByPlayerIdQuery, GetGoalsByPlayerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGoalsByPlayerIdQuery, GetGoalsByPlayerIdQueryVariables>(GetGoalsByPlayerIdDocument, options);
        }
export function useGetGoalsByPlayerIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetGoalsByPlayerIdQuery, GetGoalsByPlayerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGoalsByPlayerIdQuery, GetGoalsByPlayerIdQueryVariables>(GetGoalsByPlayerIdDocument, options);
        }
export type GetGoalsByPlayerIdQueryHookResult = ReturnType<typeof useGetGoalsByPlayerIdQuery>;
export type GetGoalsByPlayerIdLazyQueryHookResult = ReturnType<typeof useGetGoalsByPlayerIdLazyQuery>;
export type GetGoalsByPlayerIdSuspenseQueryHookResult = ReturnType<typeof useGetGoalsByPlayerIdSuspenseQuery>;
export type GetGoalsByPlayerIdQueryResult = Apollo.QueryResult<GetGoalsByPlayerIdQuery, GetGoalsByPlayerIdQueryVariables>;
export const GetGoalsBySaisonDocument = gql`
    query GetGoalsBySaison($saison: String!) {
  getGoalsBySaison(saison: $saison) {
    id
    date
    link
    against
    where
    ordre
    competition
    saison
    buteur {
      id
      firstname
      lastname
      country
    }
    passeur {
      id
      firstname
      lastname
      country
    }
  }
}
    `;

/**
 * __useGetGoalsBySaisonQuery__
 *
 * To run a query within a React component, call `useGetGoalsBySaisonQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGoalsBySaisonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGoalsBySaisonQuery({
 *   variables: {
 *      saison: // value for 'saison'
 *   },
 * });
 */
export function useGetGoalsBySaisonQuery(baseOptions: Apollo.QueryHookOptions<GetGoalsBySaisonQuery, GetGoalsBySaisonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGoalsBySaisonQuery, GetGoalsBySaisonQueryVariables>(GetGoalsBySaisonDocument, options);
      }
export function useGetGoalsBySaisonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGoalsBySaisonQuery, GetGoalsBySaisonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGoalsBySaisonQuery, GetGoalsBySaisonQueryVariables>(GetGoalsBySaisonDocument, options);
        }
export function useGetGoalsBySaisonSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetGoalsBySaisonQuery, GetGoalsBySaisonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGoalsBySaisonQuery, GetGoalsBySaisonQueryVariables>(GetGoalsBySaisonDocument, options);
        }
export type GetGoalsBySaisonQueryHookResult = ReturnType<typeof useGetGoalsBySaisonQuery>;
export type GetGoalsBySaisonLazyQueryHookResult = ReturnType<typeof useGetGoalsBySaisonLazyQuery>;
export type GetGoalsBySaisonSuspenseQueryHookResult = ReturnType<typeof useGetGoalsBySaisonSuspenseQuery>;
export type GetGoalsBySaisonQueryResult = Apollo.QueryResult<GetGoalsBySaisonQuery, GetGoalsBySaisonQueryVariables>;
export const GetGoalsBySaisonAndPlayerIdDocument = gql`
    query GetGoalsBySaisonAndPlayerId($type: String!, $playerId: String!, $saison: String!) {
  getGoalsBySaisonAndPlayerId(type: $type, playerId: $playerId, saison: $saison) {
    id
    date
    link
    against
    where
    ordre
    competition
    buteur {
      id
      firstname
      lastname
      country
    }
    passeur {
      id
      firstname
      lastname
      country
    }
    saison
  }
}
    `;

/**
 * __useGetGoalsBySaisonAndPlayerIdQuery__
 *
 * To run a query within a React component, call `useGetGoalsBySaisonAndPlayerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGoalsBySaisonAndPlayerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGoalsBySaisonAndPlayerIdQuery({
 *   variables: {
 *      type: // value for 'type'
 *      playerId: // value for 'playerId'
 *      saison: // value for 'saison'
 *   },
 * });
 */
export function useGetGoalsBySaisonAndPlayerIdQuery(baseOptions: Apollo.QueryHookOptions<GetGoalsBySaisonAndPlayerIdQuery, GetGoalsBySaisonAndPlayerIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGoalsBySaisonAndPlayerIdQuery, GetGoalsBySaisonAndPlayerIdQueryVariables>(GetGoalsBySaisonAndPlayerIdDocument, options);
      }
export function useGetGoalsBySaisonAndPlayerIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGoalsBySaisonAndPlayerIdQuery, GetGoalsBySaisonAndPlayerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGoalsBySaisonAndPlayerIdQuery, GetGoalsBySaisonAndPlayerIdQueryVariables>(GetGoalsBySaisonAndPlayerIdDocument, options);
        }
export function useGetGoalsBySaisonAndPlayerIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetGoalsBySaisonAndPlayerIdQuery, GetGoalsBySaisonAndPlayerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGoalsBySaisonAndPlayerIdQuery, GetGoalsBySaisonAndPlayerIdQueryVariables>(GetGoalsBySaisonAndPlayerIdDocument, options);
        }
export type GetGoalsBySaisonAndPlayerIdQueryHookResult = ReturnType<typeof useGetGoalsBySaisonAndPlayerIdQuery>;
export type GetGoalsBySaisonAndPlayerIdLazyQueryHookResult = ReturnType<typeof useGetGoalsBySaisonAndPlayerIdLazyQuery>;
export type GetGoalsBySaisonAndPlayerIdSuspenseQueryHookResult = ReturnType<typeof useGetGoalsBySaisonAndPlayerIdSuspenseQuery>;
export type GetGoalsBySaisonAndPlayerIdQueryResult = Apollo.QueryResult<GetGoalsBySaisonAndPlayerIdQuery, GetGoalsBySaisonAndPlayerIdQueryVariables>;
export const PlayersDocument = gql`
    query Players {
  players {
    country
    id
    firstname
    lastname
    goals {
      id
      link
      where
      date
      against
      ordre
      competition
      saison
    }
    passes {
      id
      link
      where
      date
      against
      ordre
      competition
      saison
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
    id
    firstname
    lastname
    country
    goals {
      id
      date
      link
      against
      where
      ordre
      competition
      saison
    }
    passes {
      id
      date
      link
      against
      where
      ordre
      competition
      saison
    }
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
export const GetPlayerByNameDocument = gql`
    query GetPlayerByName($playerName: String!) {
  getPlayerByName(playerName: $playerName) {
    id
    firstname
    lastname
    country
    goals {
      id
      date
      link
      against
      where
      ordre
      competition
      saison
      buteur {
        id
        firstname
        lastname
        country
      }
      passeur {
        id
        firstname
        lastname
        country
      }
    }
    passes {
      id
      date
      link
      against
      where
      ordre
      competition
      saison
    }
  }
}
    `;

/**
 * __useGetPlayerByNameQuery__
 *
 * To run a query within a React component, call `useGetPlayerByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlayerByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlayerByNameQuery({
 *   variables: {
 *      playerName: // value for 'playerName'
 *   },
 * });
 */
export function useGetPlayerByNameQuery(baseOptions: Apollo.QueryHookOptions<GetPlayerByNameQuery, GetPlayerByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlayerByNameQuery, GetPlayerByNameQueryVariables>(GetPlayerByNameDocument, options);
      }
export function useGetPlayerByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlayerByNameQuery, GetPlayerByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlayerByNameQuery, GetPlayerByNameQueryVariables>(GetPlayerByNameDocument, options);
        }
export function useGetPlayerByNameSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPlayerByNameQuery, GetPlayerByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPlayerByNameQuery, GetPlayerByNameQueryVariables>(GetPlayerByNameDocument, options);
        }
export type GetPlayerByNameQueryHookResult = ReturnType<typeof useGetPlayerByNameQuery>;
export type GetPlayerByNameLazyQueryHookResult = ReturnType<typeof useGetPlayerByNameLazyQuery>;
export type GetPlayerByNameSuspenseQueryHookResult = ReturnType<typeof useGetPlayerByNameSuspenseQuery>;
export type GetPlayerByNameQueryResult = Apollo.QueryResult<GetPlayerByNameQuery, GetPlayerByNameQueryVariables>;
export const SaisonsDocument = gql`
    query Saisons {
  saisons {
    id
    name
    match
    goals
  }
}
    `;

/**
 * __useSaisonsQuery__
 *
 * To run a query within a React component, call `useSaisonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSaisonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSaisonsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSaisonsQuery(baseOptions?: Apollo.QueryHookOptions<SaisonsQuery, SaisonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SaisonsQuery, SaisonsQueryVariables>(SaisonsDocument, options);
      }
export function useSaisonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SaisonsQuery, SaisonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SaisonsQuery, SaisonsQueryVariables>(SaisonsDocument, options);
        }
export function useSaisonsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SaisonsQuery, SaisonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SaisonsQuery, SaisonsQueryVariables>(SaisonsDocument, options);
        }
export type SaisonsQueryHookResult = ReturnType<typeof useSaisonsQuery>;
export type SaisonsLazyQueryHookResult = ReturnType<typeof useSaisonsLazyQuery>;
export type SaisonsSuspenseQueryHookResult = ReturnType<typeof useSaisonsSuspenseQuery>;
export type SaisonsQueryResult = Apollo.QueryResult<SaisonsQuery, SaisonsQueryVariables>;
export const SaisonByNameDocument = gql`
    query SaisonByName($name: String!) {
  saisonByName(name: $name) {
    id
    name
    match
    goals
  }
}
    `;

/**
 * __useSaisonByNameQuery__
 *
 * To run a query within a React component, call `useSaisonByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useSaisonByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSaisonByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSaisonByNameQuery(baseOptions: Apollo.QueryHookOptions<SaisonByNameQuery, SaisonByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SaisonByNameQuery, SaisonByNameQueryVariables>(SaisonByNameDocument, options);
      }
export function useSaisonByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SaisonByNameQuery, SaisonByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SaisonByNameQuery, SaisonByNameQueryVariables>(SaisonByNameDocument, options);
        }
export function useSaisonByNameSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SaisonByNameQuery, SaisonByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SaisonByNameQuery, SaisonByNameQueryVariables>(SaisonByNameDocument, options);
        }
export type SaisonByNameQueryHookResult = ReturnType<typeof useSaisonByNameQuery>;
export type SaisonByNameLazyQueryHookResult = ReturnType<typeof useSaisonByNameLazyQuery>;
export type SaisonByNameSuspenseQueryHookResult = ReturnType<typeof useSaisonByNameSuspenseQuery>;
export type SaisonByNameQueryResult = Apollo.QueryResult<SaisonByNameQuery, SaisonByNameQueryVariables>;
export const GetTeamWithMostGoalsDocument = gql`
    query GetTeamWithMostGoals($saison: String!, $buteurId: String) {
  getTeamWithMostGoals(saison: $saison, buteurId: $buteurId) {
    name
    goals
  }
}
    `;

/**
 * __useGetTeamWithMostGoalsQuery__
 *
 * To run a query within a React component, call `useGetTeamWithMostGoalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamWithMostGoalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamWithMostGoalsQuery({
 *   variables: {
 *      saison: // value for 'saison'
 *      buteurId: // value for 'buteurId'
 *   },
 * });
 */
export function useGetTeamWithMostGoalsQuery(baseOptions: Apollo.QueryHookOptions<GetTeamWithMostGoalsQuery, GetTeamWithMostGoalsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamWithMostGoalsQuery, GetTeamWithMostGoalsQueryVariables>(GetTeamWithMostGoalsDocument, options);
      }
export function useGetTeamWithMostGoalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamWithMostGoalsQuery, GetTeamWithMostGoalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamWithMostGoalsQuery, GetTeamWithMostGoalsQueryVariables>(GetTeamWithMostGoalsDocument, options);
        }
export function useGetTeamWithMostGoalsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTeamWithMostGoalsQuery, GetTeamWithMostGoalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTeamWithMostGoalsQuery, GetTeamWithMostGoalsQueryVariables>(GetTeamWithMostGoalsDocument, options);
        }
export type GetTeamWithMostGoalsQueryHookResult = ReturnType<typeof useGetTeamWithMostGoalsQuery>;
export type GetTeamWithMostGoalsLazyQueryHookResult = ReturnType<typeof useGetTeamWithMostGoalsLazyQuery>;
export type GetTeamWithMostGoalsSuspenseQueryHookResult = ReturnType<typeof useGetTeamWithMostGoalsSuspenseQuery>;
export type GetTeamWithMostGoalsQueryResult = Apollo.QueryResult<GetTeamWithMostGoalsQuery, GetTeamWithMostGoalsQueryVariables>;
export const GetUserProfileDocument = gql`
    query GetUserProfile {
  getUserProfile {
    email
  }
}
    `;

/**
 * __useGetUserProfileQuery__
 *
 * To run a query within a React component, call `useGetUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, options);
      }
export function useGetUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, options);
        }
export function useGetUserProfileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, options);
        }
export type GetUserProfileQueryHookResult = ReturnType<typeof useGetUserProfileQuery>;
export type GetUserProfileLazyQueryHookResult = ReturnType<typeof useGetUserProfileLazyQuery>;
export type GetUserProfileSuspenseQueryHookResult = ReturnType<typeof useGetUserProfileSuspenseQuery>;
export type GetUserProfileQueryResult = Apollo.QueryResult<GetUserProfileQuery, GetUserProfileQueryVariables>;