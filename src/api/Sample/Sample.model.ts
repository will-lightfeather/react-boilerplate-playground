import { BaseEntity } from '@/types';

export interface Sample extends BaseEntity {
  message: string;
}

export type UpdateSampleDto = {
  data: {
    message: string;
  };
  sampleId: string;
};
