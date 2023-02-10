import { Context } from '../../common/context';
import { ResourceID } from '../../common/id';
import { PhaseRepository } from './repository';

import { Phase } from './type';

export const retrievePhasesForInvoice = async (
  context: Context,
  repository: PhaseRepository,
  invoiceId: ResourceID,
): Promise<Phase[]> => {
  return repository.findByInvoiceId(context, invoiceId);
};
