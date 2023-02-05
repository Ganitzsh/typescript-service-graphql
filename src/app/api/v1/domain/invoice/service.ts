import { ResourceID } from '../../common/id';
import { Page } from '../../common/page';
import { ModifierCategory, ModifierType } from '../modifier/type';

import { Invoice } from './type';

type InvoicePage = Page<Invoice>;

export const listInvoices = async (_: {
  limit?: number;
  cursor?: ResourceID;
}): Promise<InvoicePage> => {
  return {
    data: [],
    total: 0,
    cursor: undefined,
  };
};

export const retrieveInvoice = async (id: ResourceID): Promise<Invoice> => {
  return {
    id,
    phases: ['123'],
    modifier: {
      type: ModifierType.Amount,
      category: ModifierCategory.Fee,
      value: 34.23,
    },
    subtotal: 123.0,
    total: 144.0,
    currency: 'EUR',
  };
};
