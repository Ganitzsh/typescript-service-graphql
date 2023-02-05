import { ResourceID } from '../../common/id';
import { Modifier } from '../modifier/type';

export interface Invoice {
  id: string;

  phases: ResourceID[];
  modifier?: Modifier;

  // Sum of phases + modifier
  subtotal: number;
  // Sum of phases
  total: number;
  currency: string;
}
