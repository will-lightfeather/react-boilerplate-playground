import { expectRendersWithoutViolations } from '@/test-utils';

import { AppRoutes } from './routes';

test('renders without accessibility violations', async () => {
  expectRendersWithoutViolations(<AppRoutes />);
});
