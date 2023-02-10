import { Context } from '../common/context';
import { ResourceID } from '../common/id';
import { CompanyRepository } from '../domain/company/repository';
import { Company } from '../domain/company/type';
import { CompanyNotFound } from '../domain/phase/repository';

/**
 * The In-Memory Company Repository is a simple implementation of the CompanyRepository
 */

const database: Company[] = [
  {
    id: '1',
    name: 'Company Inc.',
    address: {
      addressLine1: '1, rue du test',
      country: 'France',
      city: 'Paris',
      zipCode: '75001',
    },
    taxNumber: 'FR1234567890',
  },
  {
    id: '2',
    name: 'España Inc.',
    address: {
      addressLine1: '1, calle de prueba',
      country: 'Spain',
      city: 'Madrid',
      zipCode: '28001',
    },
    taxNumber: 'ES1234567890',
  },
];

const index: { [key: ResourceID]: number } = { '1': 0, '2': 1 };

const findById = async (_: Context, id: ResourceID): Promise<Company> => {
  const company = database[index[id]];

  if (company === undefined) {
    throw CompanyNotFound;
  }

  return company;
};

const repository: CompanyRepository = {
  findById,
};

export default repository;
