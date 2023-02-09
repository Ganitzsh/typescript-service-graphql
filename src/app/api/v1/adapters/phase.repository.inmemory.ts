import { Context } from '../common/context';
import { ResourceID } from '../common/id';
import { Phase } from '../domain/phase';
import { PhaseRepository } from '../domain/phase/repository';
import { ItemType, TaxRate } from '../domain/phase/type';

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
          taxRate: TaxRate.Standard,
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
          taxRate: TaxRate.None,
          rate: 68.21,
        },
        quantity: 12.5,
        subtotal: 852.63,
        total: 852.63,
      },
    ],
    total: 1004.09,
    subtotal: 978.63,
    invoice: '1',
  },
];

const indexInvoiceId: { [key: InvoiceID]: number[] } = { '1': [0] };

const findByInvoiceId = async (_: Context, id: InvoiceID): Promise<Phase[]> => {
  return indexInvoiceId[id]
    ? indexInvoiceId[id].map((index) => database[index])
    : [];
};

const repository: PhaseRepository = {
  findByInvoiceId,
};

export default repository;
