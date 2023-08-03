import { styled } from 'lib/stitches.config';

export const FormItemContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: '100%',
});

export const FormLabel = styled('p', {
  fontSize: '$f12',
});

export const FormSuccessLabel = styled('p', {
  fontSize: '$f12',
  color: '$primary',
});

export const FormErrorLabel = styled('p', {
  fontSize: '$f12',
  color: '$warning',
});

export const InputWithButtonContainer = styled('div', {
  display: 'flex',
  gap: '16px',
  width: '100%',
});

export const InputButton = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '102px',
  height: '48px',
  fontSize: '$f14',
  color: '$white',
  backgroundColor: '$primary',
  borderRadius: '10px',
  border: 'unset',
  cursor: 'pointer',
  '&:disabled': {
    opacity: '.5',
    cursor: 'not-allowed',
  },
});

export const Input = styled('input', {
  padding: '16px',
  width: '100%',
  fontSize: '$f14',
  color: '#2D2D2D',
  borderRadius: '10px',
  border: '1px solid #D9D9D9',
});
