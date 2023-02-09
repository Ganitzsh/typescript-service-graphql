import { Context as BaseContext } from '../common/context';
import { CompanyRepository } from '../domain/company/repository';
import { InvoiceRepository } from '../domain/invoice/repository';
import { PhaseRepository } from '../domain/phase/repository';

export interface Context extends BaseContext {
  // In practice, the token is passed
  // in the context.
  token?: string;
  // If needed this kind of info can also
  // be added to the context for each requests
  userId?: string;

  // Embedding runtime related resources
  // in the context is a good way to avoid
  // passing them as parameters to each functions
  // down the call stack. Alternatively, we can create
  // or use a DI library to do it differently.
  repository: {
    invoice: InvoiceRepository;
    company: CompanyRepository;
    phase: PhaseRepository;
  };
}
