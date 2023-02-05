export enum ModifierCategory {
  Fee,
  Discount,
}

export enum ModifierType {
  Amount,
}

export interface Modifier {
  type: ModifierType;
  category: ModifierCategory;
  value: number;
}
