import { ResourceID } from '../../common/id';

import { Item, ItemType, Phase, TaxRate } from './type';

const mockItemA: Item = {
  name: 'Product A',
  description: 'A very awesome product',
  type: ItemType.Quantity,
  taxRate: TaxRate.Standard,
  rate: 42.0,
};

const mockItemB: Item = {
  name: 'Best in class consulting',
  description: 'Something that was done',
  type: ItemType.PerHour,
  taxRate: TaxRate.None,
  rate: 68.21,
};

export const retrievePhases = async (invoiceId: ResourceID): Promise<Phase[]> => {
  const items = [
    {
      item: mockItemA,
      quantity: 3,
      subtotal: 126.0,
      total: 152.46,
    },
    {
      item: mockItemB,
      quantity: 12.5,
      subtotal: 852.63,
      total: 852.63,
    },
  ];

  return [
    {
      id: '123',
      items,
      subtotal: items.reduce((acc, item) => acc + item.subtotal, 0),
      total: items.reduce((acc, item) => acc + item.total, 0),
      invoice: invoiceId,
    },
  ];
};
