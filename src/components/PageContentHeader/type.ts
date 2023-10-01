import { StaticImageData } from 'next/image';

export interface PageContentHeaderProps {
  title: string;
  description: string;
  buttonTitle?: string;
  handleButton?: () => void;
  backgroundImage: StaticImageData;
}
