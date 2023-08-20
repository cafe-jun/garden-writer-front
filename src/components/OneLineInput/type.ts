import { writeRoomCategoryProps } from '../WriteRoomCategory/type';

export interface OneLineInputProps extends Omit<writeRoomCategoryProps, 'children'> {
  placeholder: string;
  errorText: string;
  isError: boolean;

  onChange(v: string): void;
}
