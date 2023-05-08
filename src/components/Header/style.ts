import { styled } from 'lib/stitches.config';

import { Flex } from '@/common/style';

export const HeaderContainer = styled('div', {
  border: '1px solid #D9D9D9',
  height: '70px',
  background: '$white',
});

export const HeaderSizing = styled(Flex, {
  width: '100%',
  height: '70px',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const MenuWrap = styled('div', {
  cursor: 'pointer',
  display: 'flex',
});

export const Menu = styled('p', {
  color: '$primary',
  fontSize: '$f16',
  marginRight: '50px',
  fontWeight: '500',
});
