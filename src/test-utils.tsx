import '@testing-library/jest-dom/extend-expect';

import { FeatureToggles } from '@paralleldrive/react-feature-toggles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureAxe, toHaveNoViolations } from 'jest-axe';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { features } from '@/utils/featureToggles';

import {
  expectRendersWithoutViolations,
  expectToHaveLightFeatherCssClasses,
} from './utils/testMatchers';
expect.extend(toHaveNoViolations);

export const configErrorSpy = (errorsToCheck: RegExp[]) => {
  const errorSpy = jest.spyOn(console, 'error');
  errorSpy.mockImplementation((message) => {
    let matchFound = false;
    errorsToCheck.forEach((errorToCheck) => {
      if (errorToCheck.test(message)) {
        matchFound = true;
      }
    });
    if (!matchFound) {
      throw message;
    }
  });
  return errorSpy;
};

export const axe = configureAxe({
  runOnly: ['wcag2a', 'wcag2aa'],
  rules: {},
});

const queryClient = new QueryClient({
  logger: {
    log: console.log,
    warn: console.warn,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
  },
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: Infinity,
    },
  },
});

const providerWrappers: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <FeatureToggles features={features}>
    <QueryClientProvider client={queryClient}>
      <Router>{children}</Router>
    </QueryClientProvider>
  </FeatureToggles>
);

export const renderWithProviderWrappers = (
  ui: React.ReactElement,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { route = '/', ...opts }: Record<string, any> = {}
) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: providerWrappers as React.FunctionComponent<unknown>, ...opts });
};

export * from '@testing-library/react';
export {
  expectRendersWithoutViolations,
  expectToHaveLightFeatherCssClasses,
  renderWithProviderWrappers as render,
  userEvent,
};
