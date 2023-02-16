import { Context } from '../../common/context';
import { ResourceID } from '../../common/id';

import { Company } from './type';

export interface CompanyRepository {
  findById(context: Context, id: ResourceID): Promise<Company>;
}
