import { ResourceID } from './id';

// Page is representing a cursor base paginated resource
export interface Page<TResource> {
  data: TResource[];
  total: number;
  cursor?: ResourceID;
}
