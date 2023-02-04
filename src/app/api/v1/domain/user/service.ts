import { logger } from '../../../../infrastructure/logger';
import { User } from './type';

interface UserPage {
  users: User[];
  cursor?: string;
}

export const listUsers = async ({
  limit,
}: {
  limit?: number;
}): Promise<UserPage> => {
  logger.debug('listUses', { limit });

  return {
    users: [],
    cursor: undefined,
  };
};

export const addUser = async (
  firstName: string,
  lastName: string,
): Promise<User> => {
  return {
    id: '42',
    firstName,
    lastName,
  };
};
