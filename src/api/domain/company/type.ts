import { ResourceID } from '../../common/id';

interface Address {
  addressLine1: string;
  addressLine2?: string;
  country: string;
  city: string;
  zipCode: string;
}

export interface Company {
  id: ResourceID;
  name: string;
  address: Address;
  taxNumber: string;
}
