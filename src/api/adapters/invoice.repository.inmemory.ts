import { Context } from '../common/context';
import { ResourceID } from '../common/id';
import { Invoice } from '../domain/invoice';
import {
  GetInvoicesFilter,
  InvoiceRepository,
  InvoicesPage,
} from '../domain/invoice/repository';
import { ModifierCategory, ModifierType } from '../domain/modifier/type';

/**
 * The In-Memory Invoice Repository is a simple implementation of the InvoiceRepository
 */

const database: Invoice[] = [
  {
    id: '1',
    phases: ['1', '2'],
    modifier: {
      type: ModifierType.Amount,
      category: ModifierCategory.Fee,
      value: 34.23,
      label: 'Service fee',
    },
    subtotal: 1841.47,
    total: 2057.78,
    currency: 'EUR',
    issuer: '1',
    recipient: '2',
    finalized: true,
  },
  {
    id: '2',
    phases: ['3'],
    subtotal: 0.0,
    total: 0.0,
    currency: 'EUR',
    issuer: '2',
    recipient: '1',
    finalized: false,
  },
];

const index: { [key: ResourceID]: number } = { '1': 0, '2': 1 };

const InvoiceNotFound = new Error('invoice not found');

const find = async (
  _: Context,
  filters: GetInvoicesFilter,
): Promise<InvoicesPage> => {
  let cursorIndex: number;
  if (filters.page?.cursor !== undefined) {
    cursorIndex = database.findIndex(
      (invoice: Invoice) => invoice.id === filters.page.cursor,
    );
  }

  const total = database.length;
  let data = [...database];

  if (cursorIndex !== undefined) {
    data = data.slice(cursorIndex, database.length - 1);
  }

  if (filters.page?.limit !== undefined) {
    data = data.splice(0, filters.page.limit);
  }

  let cursor: ResourceID;
  if (
    data.length > 0 &&
    data[data.length - 1]?.id !== database[database.length - 1].id
  ) {
    const lastIndex = database.findIndex(
      (invoice: Invoice) => invoice.id === data[data.length - 1].id,
    );
    cursor = database[lastIndex + 1].id;
  }

  return {
    cursor,
    data,
    total,
  };
};

const findById = async (_: Context, id: ResourceID): Promise<Invoice> => {
  const invoice = database[index[id]];
  if (invoice === undefined) {
    throw InvoiceNotFound;
  }

  return invoice;
};

const repository: InvoiceRepository = {
  find,
  findById,
};

export default repository;
