import { mergeResolvers } from '@graphql-tools/merge';

import invoiceResolver from './invoice';

export default mergeResolvers([invoiceResolver]);
