import { writeRoomCategoryProps } from '@/components/WriteRoomCategory/type';

export type makeTagArrReturn = string[] | null;
export interface HashTagInputProps extends Omit<writeRoomCategoryProps, 'children'> {
  errorText: string;
  isError: boolean;
  onChange(value: string[]): void;

  style?: {
    marginTop: string;
  };
}
