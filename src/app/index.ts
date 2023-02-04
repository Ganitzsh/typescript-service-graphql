import './infrastructure/env';
import './infrastructure/tracer';

import { listen } from './api/v1/transport';

export const run = async () => {
  await listen();
};
