import { Feature } from '@paralleldrive/react-feature-toggles';
import { Alert, Card } from '@team-lightfeather/ui-react-assets';

import { useGetSamples } from '@/api/Sample';
import { featureNames } from '@/utils/featureToggles';

export const SampleComponent = () => {
  const sampleQuery = useGetSamples();

  if (sampleQuery.isError) {
    return (
      <Alert type='error'>
        <Alert.Text>Error retrieving samples!</Alert.Text>
      </Alert>
    );
  }

  if (sampleQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (!sampleQuery.data) return null;

  return (
    <>
      <Card.Group>
        {sampleQuery.data.map((sample) => (
          <Card key={sample.id} className='tablet:grid-col-6'>
            <Card.Header>Sample</Card.Header>
            <Card.Body>
              <p>{sample.message}</p>
            </Card.Body>
          </Card>
        ))}
      </Card.Group>

      <Feature
        name={featureNames.SHOW_HELLO_WORLD}
        activeComponent={() => <div className='margin-top-2'>Hello World!</div>}
      />
    </>
  );
};
