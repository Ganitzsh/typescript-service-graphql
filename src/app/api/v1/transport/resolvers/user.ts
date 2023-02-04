import { Resolver } from '.';

import { UserService } from '../../domain/user';

export interface User {
  id: string;

  firstName: string;
  lastName: string;
}

type Query = {
  users: Resolver<
    undefined,
    { limit?: number },
    {
      data: User[];
      cursor?: string;
    }
  >;
};

export const query: Query = {
  users: async (_, args) => {
    const { users, cursor } = await UserService.listUsers({
      limit: args.limit,
    });

    return {
      data: users,
      cursor,
    };
  },
};

export const mutation: {
  addUser: Resolver<
    null,
    {
      firstName: string;
      lastName: string;
    }
  >;
} = {
  addUser: (_, args) => UserService.addUser(args.firstName, args.lastName),
};
