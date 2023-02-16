import { Context as BaseContext } from '../common/context';

export interface Context extends BaseContext {
  token?: string;
  userId?: string;
}
