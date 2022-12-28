import '@/App.scss';

import { FeatureToggles } from '@paralleldrive/react-feature-toggles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { BrowserRouter as Router } from 'react-router-dom';

import { AppRoutes } from '@/routes';
import { features } from '@/utils/featureToggles';

const ErrorFallBack = ({ error }: FallbackProps) => {
  return <div>There has been an error: {error.message}</div>;
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <div className='App'>
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <FeatureToggles features={features}>
          <QueryClientProvider client={queryClient}>
            <Router>
              <AppRoutes />
            </Router>
          </QueryClientProvider>
        </FeatureToggles>
      </ErrorBoundary>
    </div>
  );
};

export default App;
