import { useMutation, useQuery } from '@tanstack/react-query';

import api from '@/api';
import { queryClient } from '@/lib/react-query';

import { Sample, UpdateSampleDto } from './Sample.model';

const getSamples = (): Promise<Sample[]> => {
  return api.get('/sample');
};

export const useGetSamples = () => {
  return useQuery({
    queryKey: ['sample'],
    queryFn: getSamples,
  });
};

const getSample = ({ sampleId }: { sampleId: string }): Promise<Sample> => {
  return api.get(`/sample/${sampleId}`);
};

export const useGetSample = ({ sampleId }: { sampleId: string }) => {
  return useQuery({
    queryKey: ['sample', sampleId],
    queryFn: () => getSample({ sampleId }),
  });
};

const updateSample = ({ data, sampleId }: UpdateSampleDto): Promise<Sample> => {
  return api.put(`/sample/${sampleId}`, data);
};

// cache invalidation examples
export const useUpdateSample = () => {
  return useMutation({
    onMutate: async (updatingSample: UpdateSampleDto) => {
      await queryClient.cancelQueries(['sample', updatingSample?.sampleId]);

      const previousSample = queryClient.getQueryData<Sample>(['sample', updatingSample?.sampleId]);

      queryClient.setQueryData(['sample', updatingSample?.sampleId], {
        ...previousSample,
        ...updatingSample.data,
        id: updatingSample.sampleId,
      });

      return { previousSample };
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (_, __, context: any) => {
      if (context?.previousSample) {
        queryClient.setQueryData(['sample', context.previousSample.id], context.previousSample);
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(['sample', data.id]);
    },
    mutationFn: updateSample,
  });
};
