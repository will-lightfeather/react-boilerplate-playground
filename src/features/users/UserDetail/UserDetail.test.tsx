import { expectRendersWithoutViolations } from '@/utils/testMatchers';

import { UserDetail } from './UserDetail';

describe('UserDetail', () => {
  test('renders without accessibility violations', async () => {
    expectRendersWithoutViolations(<UserDetail />);
  });
});
