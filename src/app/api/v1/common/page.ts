import { ResourceID } from './id';

export interface Page<TResource> {
  data: TResource[];
  total: number;
  cursor?: ResourceID;
}
