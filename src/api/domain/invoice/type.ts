import { ResourceID } from '../../common/id';
import { Modifier } from '../modifier/type';

export interface Invoice {
  id: string;

  phases: ResourceID[];
  modifier?: Modifier;

  // This value is computed when phases are modified
  // and not at runtime.
  subtotal: number;
  // This value is computed when phases are modified
  // and not at runtime.
  total: number;
  currency: string;

  issuer: ResourceID;
  recipient: ResourceID;

  dueDate?: Date;
  finalized: boolean;
}
