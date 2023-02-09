import { Context } from '../../common/context';
import { Company } from '../company';
import { CompanyRepository } from '../company/repository';

import { InvoiceRepository } from './repository';
import * as invoiceService from './service';
import { Invoice } from './type';

beforeEach((): void => {
  jest.clearAllMocks();
});

const makeMockInvoice = (overrides?: Partial<Invoice>): Invoice => ({
  id: '1',
  phases: ['1', '2'],
  issuer: '1',
  recipient: '2',
  subtotal: 21.0,
  total: 42.0,
  currency: 'EUR',
  finalized: true,
  ...overrides,
});

const makeMockCompany = (overrides?: Partial<Company>): Company => ({
  id: '1',
  name: 'test company',
  address: {
    addressLine1: 'test address line 1',
    addressLine2: 'test address line 2',
    country: 'test country',
    city: 'test city',
    zipCode: 'test zip code',
  },
  taxNumber: 'test tax id',
  ...overrides,
});

const makeMockContext = (): Context => ({
  traceId: '123',
});

const makeMockInvoiceRepository: () => InvoiceRepository =
  (): InvoiceRepository => ({
    find: jest.fn(),
    findById: jest.fn(),
  });

const makeMockCompanyRepository: () => CompanyRepository =
  (): CompanyRepository => ({
    findById: jest.fn(),
  });

describe('invoice service', (): void => {
  describe('listInvoices', (): void => {
    describe('error handling', (): void => {
      it('throws an error when the repository throws an error', async (): Promise<void> => {
        expect.assertions(1);

        const mockContext = makeMockContext();
        const invoiceRepository = makeMockInvoiceRepository();
        const errorToThrow = new Error('test error');

        (
          invoiceRepository.find as jest.MockedFunction<any>
        ).mockRejectedValueOnce(errorToThrow);

        try {
          await invoiceService.listInvoices(mockContext, invoiceRepository);
        } catch (error: unknown) {
          expect(error).toEqual(errorToThrow);
        }
      });
    });

    describe('data persistency', (): void => {
      it('does not apply any paging when page is undefined', async (): Promise<void> => {
        expect.assertions(1);

        const mockContext = makeMockContext();
        const invoiceRepository = makeMockInvoiceRepository();

        await invoiceService.listInvoices(mockContext, invoiceRepository);

        expect(
          invoiceRepository.find as jest.MockedFunction<any>,
        ).toHaveBeenCalledWith(mockContext, { page: undefined });
      });

      it('applies paging when page is set', async (): Promise<void> => {
        expect.assertions(1);

        const mockContext = makeMockContext();
        const invoiceRepository = makeMockInvoiceRepository();

        await invoiceService.listInvoices(mockContext, invoiceRepository, {
          limit: 1,
        });

        expect(
          invoiceRepository.find as jest.MockedFunction<any>,
        ).toHaveBeenCalledWith(mockContext, {
          page: { limit: 1 },
        });
      });

      it('returns a page of invoices', async (): Promise<void> => {
        expect.assertions(1);

        const mockContext = makeMockContext();
        const invoiceRepository = makeMockInvoiceRepository();

        const invoices = [
          makeMockInvoice(),
          makeMockInvoice({ id: '2' }),
          makeMockInvoice({ id: '3' }),
        ];

        (invoiceRepository.find as jest.MockedFunction<any>).mockResolvedValue({
          data: invoices,
          total: 3,
          cursor: undefined,
        });

        const page = await invoiceService.listInvoices(
          mockContext,
          invoiceRepository,
        );

        expect(page).toMatchSnapshot();
      });
    });
  });

  describe('retrieveInvoice', (): void => {
    describe('error handling', (): void => {
      it('throws an error when the repository throws an error', async (): Promise<void> => {
        expect.assertions(1);

        const invoiceRepository = makeMockInvoiceRepository();
        const errorToThrow = new Error('test error');

        (
          invoiceRepository.findById as jest.MockedFunction<any>
        ).mockRejectedValueOnce(errorToThrow);

        try {
          await invoiceService.retrieveInvoice(
            makeMockContext(),
            invoiceRepository,
            '123',
          );
        } catch (error: unknown) {
          expect(error).toEqual(errorToThrow);
        }
      });
    });

    describe('data persistency', (): void => {
      it('returns the invoice when found', async (): Promise<void> => {
        expect.assertions(1);

        const mockContext = makeMockContext();
        const invoiceRepository = makeMockInvoiceRepository();
        const mockInvoice = makeMockInvoice();

        (
          invoiceRepository.findById as jest.MockedFunction<any>
        ).mockResolvedValue(mockInvoice);

        const invoice = await invoiceService.retrieveInvoice(
          mockContext,
          invoiceRepository,
          mockInvoice.id,
        );

        expect(invoice).toStrictEqual(mockInvoice);
      });
    });
  });

  describe('retrieveInvoiceParties', (): void => {
    describe('error handling', (): void => {
      it('throws an error when the invoice repository throws an error', async (): Promise<void> => {
        expect.assertions(1);

        const mockContext = makeMockContext();
        const invoiceRepository = makeMockInvoiceRepository();
        const companyRepository = makeMockCompanyRepository();
        const errorToThrow = new Error('test error');

        (
          invoiceRepository.findById as jest.MockedFunction<any>
        ).mockRejectedValueOnce(errorToThrow);

        try {
          await invoiceService.retrieveInvoiceParties(
            mockContext,
            invoiceRepository,
            companyRepository,
            '123',
          );
        } catch (error: unknown) {
          expect(error).toEqual(errorToThrow);
        }
      });

      it('throws an error when the company repository throws an error', async (): Promise<void> => {
        expect.assertions(1);

        const mockContext = makeMockContext();
        const invoiceRepository = makeMockInvoiceRepository();
        const companyRepository = makeMockCompanyRepository();
        const errorToThrow = new Error('test error');

        (
          invoiceRepository.findById as jest.MockedFunction<any>
        ).mockResolvedValue(makeMockInvoice());
        (
          companyRepository.findById as jest.MockedFunction<any>
        ).mockRejectedValueOnce(errorToThrow);

        try {
          await invoiceService.retrieveInvoiceParties(
            mockContext,
            invoiceRepository,
            companyRepository,
            '123',
          );
        } catch (error: unknown) {
          expect(error).toEqual(errorToThrow);
        }
      });
    });

    describe('data persistency', (): void => {
      it('returns the issuer and recipient successfully', async (): Promise<void> => {
        expect.assertions(1);

        const mockContext = makeMockContext();
        const invoiceRepository = makeMockInvoiceRepository();
        const companyRepository = makeMockCompanyRepository();
        const mockInvoice = makeMockInvoice();
        const mockCompanyA = makeMockCompany({
          id: 'A',
        });
        const mockCompanyB = makeMockCompany({
          id: 'B',
        });

        (
          invoiceRepository.findById as jest.MockedFunction<any>
        ).mockResolvedValue(mockInvoice);
        (companyRepository.findById as jest.MockedFunction<any>)
          .mockResolvedValueOnce(mockCompanyA)
          .mockResolvedValueOnce(mockCompanyB);

        const parties = await invoiceService.retrieveInvoiceParties(
          mockContext,
          invoiceRepository,
          companyRepository,
          mockInvoice.id,
        );

        expect(parties).toMatchSnapshot();
      });
    });
  });
});
