import { Context } from '../../common/context';
import { ResourceID } from '../../common/id';
import { Phase } from './type';

export const CompanyNotFound = new Error('company not found');

export interface PhaseRepository {
  findByInvoiceId(context: Context, invoiceId: ResourceID): Promise<Phase[]>;
}
