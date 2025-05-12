import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
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

/** Input type for adding a new list to a board. */
export type AddListInput = {
  /** A description of the list (optional). */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The title of the list. */
  title: Scalars['String']['input'];
};

/** Input type for adding a new task to a list. */
export type AddTaskInput = {
  /** The ID of the user to be assigned to the task. */
  assignee: Scalars['ID']['input'];
  /** A description of the task to be added. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The title of the task to be added. */
  title: Scalars['String']['input'];
};

/** Represents a board with lists, tasks, and users. */
export type Board = {
  __typename?: 'Board';
  /** A detailed description of the board. */
  description: Scalars['String']['output'];
  /** The unique identifier for the board. */
  id: Scalars['ID']['output'];
  /** The lists contained within the board. */
  lists: Array<List>;
  /** The title of the board. */
  title: Scalars['String']['output'];
  /** The users assigned to the board and their respective roles. */
  users: Array<BoardUser>;
};

/** Represents a user assigned to a board with a specific role. */
export type BoardUser = {
  __typename?: 'BoardUser';
  /** The role of the user on this board. */
  role: UserRole;
  /** The user associated with this board. */
  user: User;
};

/** Input type for creating a new board. */
export type CreateBoardInput = {
  /** A description of the board (optional). */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The title of the board. */
  title: Scalars['String']['input'];
};

/** Input type for creating a new user. */
export type CreateUserInput = {
  /** The email address of the user. */
  email: Scalars['String']['input'];
  /** The first name of the user. */
  fName: Scalars['String']['input'];
  /** The last name of the user (optional). */
  lName?: InputMaybe<Scalars['String']['input']>;
  /** The password of the user (should be hashed). */
  password: Scalars['String']['input'];
};

/** Represents a list in a board with associated tasks. */
export type List = {
  __typename?: 'List';
  /** The board that this list belongs to. */
  board: Board;
  /** A detailed description of the list. */
  description: Scalars['String']['output'];
  /** The unique identifier for the list. */
  id: Scalars['ID']['output'];
  /** The tasks associated with this list. */
  tasks: Array<Task>;
  /** The title of the list. */
  title: Scalars['String']['output'];
};

/** Represents a mutation operation. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Adds a new list to the specified board. */
  addList?: Maybe<List>;
  /** Adds a new task to a list. */
  addTask: Task;
  /** Creates a new board with the provided data. */
  createBoard?: Maybe<Board>;
  /** Mutation to create a new user with the provided input data. */
  createUser?: Maybe<User>;
  /** Deletes a board by its unique ID. */
  deleteBoard?: Maybe<Board>;
  /** Deletes a list by its unique ID. */
  deleteList?: Maybe<List>;
  /** Deletes a task by its unique ID. */
  deleteTask?: Maybe<Task>;
  /** Mutation to delete a user by their unique ID. */
  deleteUser?: Maybe<User>;
  /** A dummy mutation that returns a string. */
  dummy?: Maybe<Scalars['String']['output']>;
  /** Updates an existing board with the provided data. */
  updateBoard?: Maybe<Board>;
  /** Updates the access roles of users on the board. */
  updateBoardAccess?: Maybe<Board>;
  /** Updates an existing list with the provided input data. */
  updateList?: Maybe<List>;
  /** Updates an existing task with the provided input data. */
  updateTask?: Maybe<Task>;
  /** Mutation to update an existing user. */
  updateUser?: Maybe<User>;
};


/** Represents a mutation operation. */
export type MutationAddListArgs = {
  id: Scalars['ID']['input'];
  listData: AddListInput;
};


/** Represents a mutation operation. */
export type MutationAddTaskArgs = {
  id: Scalars['ID']['input'];
  taskData: AddTaskInput;
};


/** Represents a mutation operation. */
export type MutationCreateBoardArgs = {
  boardData: CreateBoardInput;
};


/** Represents a mutation operation. */
export type MutationCreateUserArgs = {
  userData: CreateUserInput;
};


/** Represents a mutation operation. */
export type MutationDeleteBoardArgs = {
  id: Scalars['ID']['input'];
};


/** Represents a mutation operation. */
export type MutationDeleteListArgs = {
  id: Scalars['ID']['input'];
};


/** Represents a mutation operation. */
export type MutationDeleteTaskArgs = {
  id: Scalars['ID']['input'];
};


/** Represents a mutation operation. */
export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


/** Represents a mutation operation. */
export type MutationUpdateBoardArgs = {
  boardData: UpdateBoardInput;
};


/** Represents a mutation operation. */
export type MutationUpdateBoardAccessArgs = {
  access: Array<UpdateBoardAccessInput>;
  boardId: Scalars['ID']['input'];
};


/** Represents a mutation operation. */
export type MutationUpdateListArgs = {
  id: Scalars['ID']['input'];
  listData: UpdateListInput;
};


/** Represents a mutation operation. */
export type MutationUpdateTaskArgs = {
  id: Scalars['ID']['input'];
  taskData: UpdateTaskInput;
};


/** Represents a mutation operation. */
export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  userData: UpdateUserInput;
};

/** Represents a query operation. */
export type Query = {
  __typename?: 'Query';
  /** A dummy query that returns a string. */
  dummy?: Maybe<Scalars['String']['output']>;
  /** Retrieves a board by its unique ID. */
  getBoardById?: Maybe<Board>;
  /** Retrieves a list by its unique ID. */
  getListById?: Maybe<List>;
  /** Retrieves a task by its unique ID. */
  getTaskById?: Maybe<Task>;
  /** Query to get a user by their email address. */
  getUserByEmail?: Maybe<User>;
  /** Query to get a user by its unique id. */
  getUserById?: Maybe<User>;
};


/** Represents a query operation. */
export type QueryGetBoardByIdArgs = {
  id: Scalars['ID']['input'];
};


/** Represents a query operation. */
export type QueryGetListByIdArgs = {
  id: Scalars['ID']['input'];
};


/** Represents a query operation. */
export type QueryGetTaskByIdArgs = {
  id: Scalars['ID']['input'];
};


/** Represents a query operation. */
export type QueryGetUserByEmailArgs = {
  email: Scalars['String']['input'];
};


/** Represents a query operation. */
export type QueryGetUserByIdArgs = {
  id: Scalars['ID']['input'];
};

/** Represents a task with a title and description. */
export type Task = {
  __typename?: 'Task';
  /** A detailed description of the task. */
  description: Scalars['String']['output'];
  /** The unique identifier for the task. */
  id: Scalars['ID']['output'];
  /** The title of the task. */
  title: Scalars['String']['output'];
};

/** Input type for updating board access for a user. */
export type UpdateBoardAccessInput = {
  /** The role to assign to the user on the board. */
  role: UserRole;
  /** The ID of the user whose access needs to be updated. */
  user: Scalars['ID']['input'];
};

/** Input type for updating an existing board. */
export type UpdateBoardInput = {
  /** The updated description of the board (optional). */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The unique identifier for the board. */
  id: Scalars['ID']['input'];
  /** The updated title of the board (optional). */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Input type for updating a list. */
export type UpdateListInput = {
  /** The updated description of the list (optional). */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The updated title of the list (optional). */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Input type for updating a task. */
export type UpdateTaskInput = {
  /** The ID of the user assigned to the task (optional). */
  assignee?: InputMaybe<Scalars['ID']['input']>;
  /** The updated description of the task (optional). */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The updated title of the task (optional). */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Input type for updating an existing user's information. */
export type UpdateUserInput = {
  /** The updated first name of the user (optional). */
  fName?: InputMaybe<Scalars['String']['input']>;
  /** The updated last name of the user (optional). */
  lName?: InputMaybe<Scalars['String']['input']>;
  /** The updated password of the user (optional). */
  password?: InputMaybe<Scalars['String']['input']>;
};

/** Represents a user in the system (like a Trello user). */
export type User = {
  __typename?: 'User';
  /** A list of boards that the user is associated with, along with their roles. */
  boards: Array<UserBoard>;
  /** The email address of the user. */
  email: Scalars['String']['output'];
  /** The first name of the user. */
  fName: Scalars['String']['output'];
  /** The unique ID of the user. */
  id: Scalars['ID']['output'];
  /** Whether the user is active in the system or not. */
  isActive: Scalars['Boolean']['output'];
  /** Whether the user has verified their email address. */
  isVerified: Scalars['Boolean']['output'];
  /** The last name of the user. */
  lName: Scalars['String']['output'];
  /** The password of the user (should be hashed). */
  password: Scalars['String']['output'];
};

/** Represents a user board with the associated role of the user on the board. */
export type UserBoard = {
  __typename?: 'UserBoard';
  /** The board that the user is associated with. */
  board: Board;
  /** The role of the user on the board (e.g., Admin, Member). */
  role: UserRole;
};

/** Represents a user's role in a board. */
export enum UserRole {
  /** An admin has full control over the board, including managing users. */
  Admin = 'admin',
  /** An editor can edit the board. */
  Editor = 'editor',
  /** A viewer has read-only access to the board. */
  Viewer = 'viewer'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

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
export type ResolversTypes = ResolversObject<{
  AddListInput: AddListInput;
  AddTaskInput: AddTaskInput;
  Board: ResolverTypeWrapper<Board>;
  BoardUser: ResolverTypeWrapper<BoardUser>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateBoardInput: CreateBoardInput;
  CreateUserInput: CreateUserInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  List: ResolverTypeWrapper<List>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Task: ResolverTypeWrapper<Task>;
  UpdateBoardAccessInput: UpdateBoardAccessInput;
  UpdateBoardInput: UpdateBoardInput;
  UpdateListInput: UpdateListInput;
  UpdateTaskInput: UpdateTaskInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  UserBoard: ResolverTypeWrapper<UserBoard>;
  UserRole: UserRole;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddListInput: AddListInput;
  AddTaskInput: AddTaskInput;
  Board: Board;
  BoardUser: BoardUser;
  Boolean: Scalars['Boolean']['output'];
  CreateBoardInput: CreateBoardInput;
  CreateUserInput: CreateUserInput;
  ID: Scalars['ID']['output'];
  List: List;
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  Task: Task;
  UpdateBoardAccessInput: UpdateBoardAccessInput;
  UpdateBoardInput: UpdateBoardInput;
  UpdateListInput: UpdateListInput;
  UpdateTaskInput: UpdateTaskInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
  UserBoard: UserBoard;
}>;

export type BoardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Board'] = ResolversParentTypes['Board']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lists?: Resolver<Array<ResolversTypes['List']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['BoardUser']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BoardUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['BoardUser'] = ResolversParentTypes['BoardUser']> = ResolversObject<{
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ListResolvers<ContextType = any, ParentType extends ResolversParentTypes['List'] = ResolversParentTypes['List']> = ResolversObject<{
  board?: Resolver<ResolversTypes['Board'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addList?: Resolver<Maybe<ResolversTypes['List']>, ParentType, ContextType, RequireFields<MutationAddListArgs, 'id' | 'listData'>>;
  addTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationAddTaskArgs, 'id' | 'taskData'>>;
  createBoard?: Resolver<Maybe<ResolversTypes['Board']>, ParentType, ContextType, RequireFields<MutationCreateBoardArgs, 'boardData'>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'userData'>>;
  deleteBoard?: Resolver<Maybe<ResolversTypes['Board']>, ParentType, ContextType, RequireFields<MutationDeleteBoardArgs, 'id'>>;
  deleteList?: Resolver<Maybe<ResolversTypes['List']>, ParentType, ContextType, RequireFields<MutationDeleteListArgs, 'id'>>;
  deleteTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationDeleteTaskArgs, 'id'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  dummy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updateBoard?: Resolver<Maybe<ResolversTypes['Board']>, ParentType, ContextType, RequireFields<MutationUpdateBoardArgs, 'boardData'>>;
  updateBoardAccess?: Resolver<Maybe<ResolversTypes['Board']>, ParentType, ContextType, RequireFields<MutationUpdateBoardAccessArgs, 'access' | 'boardId'>>;
  updateList?: Resolver<Maybe<ResolversTypes['List']>, ParentType, ContextType, RequireFields<MutationUpdateListArgs, 'id' | 'listData'>>;
  updateTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationUpdateTaskArgs, 'id' | 'taskData'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'userData'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  dummy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  getBoardById?: Resolver<Maybe<ResolversTypes['Board']>, ParentType, ContextType, RequireFields<QueryGetBoardByIdArgs, 'id'>>;
  getListById?: Resolver<Maybe<ResolversTypes['List']>, ParentType, ContextType, RequireFields<QueryGetListByIdArgs, 'id'>>;
  getTaskById?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<QueryGetTaskByIdArgs, 'id'>>;
  getUserByEmail?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByEmailArgs, 'email'>>;
  getUserById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
}>;

export type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  boards?: Resolver<Array<ResolversTypes['UserBoard']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserBoardResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserBoard'] = ResolversParentTypes['UserBoard']> = ResolversObject<{
  board?: Resolver<ResolversTypes['Board'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Board?: BoardResolvers<ContextType>;
  BoardUser?: BoardUserResolvers<ContextType>;
  List?: ListResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserBoard?: UserBoardResolvers<ContextType>;
}>;

