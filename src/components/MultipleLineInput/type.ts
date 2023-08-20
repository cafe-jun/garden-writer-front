import { writeRoomCategoryProps } from '../WriteRoomCategory/type';

export interface MultipleLineInputProps extends Omit<writeRoomCategoryProps, 'children'> {
  placeholder: string;
  errorText: string;
  isError: boolean;

  onChange(v: string): void;
}
