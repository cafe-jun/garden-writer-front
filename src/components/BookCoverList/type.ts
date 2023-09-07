import { StaticImageData } from 'next/image';

export interface BookCoverListProps {
  style?: {
    marginTop?: string;
  };
  selectImage(value: StaticImageData): void;
}
