import { styled } from 'lib/stitches.config';

export const Container = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '60px',
  color: '#2D2D2D',
});

export const Header = styled('header', {
  textAlign: 'center',
  marginBottom: '24px',
});

export const Title = styled('h2', {
  fontSize: '#f24',
  fontWeight: '500',
});

export const SubTitle = styled('h3', {
  fontSize: '$f14',
});

export const Description = styled('p', {
  fontSize: '14px',
  color: '#959595',
});

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const FormContents = styled('article', {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
});

export const FormContentsMore = styled('article', {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
  marginTop: '42px',
});

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

export const Input = styled('input', {
  padding: '16px',
  width: '100%',
  fontSize: '$f14',
  color: '#2D2D2D',
  borderRadius: '10px',
  border: '1px solid #D9D9D9',
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

export const SubmitButton = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '24px',
  width: '200px',
  height: '46px',
  fontSize: '$f14',
  color: '$white',
  backgroundColor: '$primary',
  borderRadius: '62px',
  border: 'unset',
  cursor: 'pointer',
  '&:disabled': {
    opacity: '.5',
    cursor: 'not-allowed',
  },
});
