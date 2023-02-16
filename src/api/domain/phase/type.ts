import { ResourceID } from '../../common/id';
import { Invoice } from '../invoice/type';
import { Modifier } from '../modifier/type';

export interface TaxRate {
  label: string;
  value: number;
}

export enum ItemType {
  PerHour,
  Quantity,
}

// Depending on the the importance of
// items in the domain, this might need its
// own service and logic. For now, it's fine
// to make it a sub type of Phase.
export interface Item {
  type: ItemType;
  name: string;
  description: string;
  rate: number;
  taxRate: TaxRate;
}

export interface CostItem {
  item: Item;
  quantity: number;
  subtotal: number;
  total: number;
}

export interface Phase {
  id: ResourceID;

  items: CostItem[];
  modifier?: Modifier;

  // This value is computed when the cost items are modified
  // and not at runtime.
  subtotal: number;
  // This value is computed when the cost items are modified
  // and not at runtime.
  total: number;

  invoice?: ResourceID | Invoice;
}
