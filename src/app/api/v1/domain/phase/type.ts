import { ResourceID } from '../../common/id';
import { Invoice } from '../invoice/type';
import { Modifier } from '../modifier/type';

// Find the names for these
export enum TaxRate {
  None,
  Low,
  Standard,
}

export enum ItemType {
  PerHour,
  Quantity,
}

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

  // Sum of items phases + modifier
  subtotal: number;
  // Sum of items
  total: number;

  invoice?: ResourceID | Invoice;
}
