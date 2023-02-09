import { Context } from '../../common/context';
import { ResourceID } from '../../common/id';
import { Page } from '../../common/page';

import { Invoice } from './type';

export type InvoicesPage = Page<Invoice>;

export interface GetInvoicesFilter {
  page?: {
    limit?: number;
    cursor?: string;
  };
}

export interface InvoiceRepository {
  find(context: Context, filters: GetInvoicesFilter): Promise<InvoicesPage>;
  findById(context: Context, id: ResourceID): Promise<Invoice>;
}
