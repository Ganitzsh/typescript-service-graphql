import './infrastructure/env';
import './infrastructure/tracer';

import { listen } from './transport';

export const run = async () => {
  await listen();
};
