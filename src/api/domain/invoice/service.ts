import { Context } from '../../common/context';
import { ResourceID } from '../../common/id';
import { Company } from '../company';
import { CompanyRepository } from '../company/repository';
import { InvoiceRepository, InvoicesPage } from './repository';

import { Invoice } from './type';

export const listInvoices = async (
  context: Context,
  repository: InvoiceRepository,
  page?: {
    limit?: number;
    cursor?: ResourceID;
  },
): Promise<InvoicesPage> => {
  return repository.find(context, {
    page,
  });
};

export const retrieveInvoice = async (
  context: Context,
  repository: InvoiceRepository,
  id: ResourceID,
): Promise<Invoice> => {
  return repository.findById(context, id);
};

export const retrieveInvoiceParties = async (
  context: Context,
  invoiceRepository: InvoiceRepository,
  companyRepository: CompanyRepository,
  invoiceId: ResourceID,
): Promise<{
  issuer: Company;
  recipient: Company;
}> => {
  const invoice = await invoiceRepository.findById(context, invoiceId);

  const [issuer, recipient] = await Promise.all([
    companyRepository.findById(context, invoice.issuer),
    companyRepository.findById(context, invoice.recipient),
  ]);

  return {
    issuer,
    recipient,
  };
};
