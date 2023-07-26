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

export const FormContainer = styled('form', {
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
