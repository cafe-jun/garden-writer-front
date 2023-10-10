export interface CompletedProps {
  title: string;
  description: string;
  leftButtonLabel: string;
  rightButtonLabel: string;
  leftButtonDescription?: string;
  rightButtonDescription?: string;
  handleLeftButton: () => void;
  handleRightButton: () => void;
}
