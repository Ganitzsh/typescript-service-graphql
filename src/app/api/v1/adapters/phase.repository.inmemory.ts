import { Context } from '../common/context';
import { ResourceID } from '../common/id';
import { Phase } from '../domain/phase';
import { PhaseRepository } from '../domain/phase/repository';
import { ItemType } from '../domain/phase/type';

type InvoiceID = ResourceID;

const database: Phase[] = [
  {
    id: '1',
    items: [
      {
        item: {
          name: 'Product A',
          description: 'A very awesome product',
          type: ItemType.Quantity,
          taxRate: {
            label: 'VAT',
            value: 0.21,
          },
          rate: 42.0,
        },
        quantity: 3,
        subtotal: 126.0,
        total: 152.46,
      },
      {
        item: {
          name: 'Best in class consulting',
          description: 'Something that was done',
          type: ItemType.PerHour,
          taxRate: {
            label: 'VAT',
            value: 0.09,
          },
          rate: 68.21,
        },
        quantity: 12.5,
        subtotal: 852.63,
        total: 929.37,
      },
    ],
    total: 1081.83,
    subtotal: 978.63,
    invoice: '1',
  },
  {
    id: '2',
    items: [
      {
        item: {
          name: 'Product B',
          description: 'A very awesome product again',
          type: ItemType.Quantity,
          taxRate: {
            label: 'VAT',
            value: 0.21,
          },
          rate: 10.21,
        },
        quantity: 1,
        subtotal: 10.21,
        total: 12.35,
      },
      {
        item: {
          name: 'Best in class consulting',
          description: 'Something that was done',
          type: ItemType.PerHour,
          taxRate: {
            label: 'VAT',
            value: 0.09,
          },
          rate: 68.21,
        },
        quantity: 12.5,
        subtotal: 852.63,
        total: 929.37,
      },
    ],
    total: 941.72,
    subtotal: 862.84,
    invoice: '1',
  },
];

const indexInvoiceId: { [key: InvoiceID]: number[] } = { '1': [0, 1] };

const findByInvoiceId = async (_: Context, id: InvoiceID): Promise<Phase[]> => {
  return indexInvoiceId[id]
    ? indexInvoiceId[id].map((index) => database[index])
    : [];
};

const repository: PhaseRepository = {
  findByInvoiceId,
};

export default repository;
