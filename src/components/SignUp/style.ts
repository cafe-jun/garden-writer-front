import { styled } from 'lib/stitches.config';

export const InputsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

export const InputWrap = styled('div', {
  display: 'flex',
  gap: '16px',
});

export const Input = styled('input', {
  padding: '16px',
  flex: '1',
  fontSize: '$f14',
  color: '#2D2D2D',
  borderRadius: '10px',
  border: '1px solid #D9D9D9',
});

export const InputButton = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '102px',
  height: '48px',
  fontSize: '$f14',
  color: '#059EAF',
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  border: '1px solid #059EAF',
  cursor: 'pointer',
});

export const SubmitButton = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '200px',
  height: '46px',
  fontSize: '$f14',
  color: '#ffffff',
  backgroundColor: '#059EAF',
  borderRadius: '62px',
  border: 'unset',
});
