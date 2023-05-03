import { Flex, Wrap1440 } from '@/common/style';
import React from 'react';
import { MENU_LIST, MY_MENU_LIST } from 'util/staticData';
import { HeaderContainer, HeaderSizing, Menu, MenuWrap } from './style';

const Header = () => {
  return (
    <HeaderContainer>
      <Wrap1440>
        <HeaderSizing>
          <Flex>
            {MENU_LIST.map((m, idx) => {
              return (
                <MenuWrap key={idx}>
                  <Menu>{m.menu}</Menu>
                </MenuWrap>
              );
            })}
          </Flex>
          <Flex>
            {MY_MENU_LIST.map((m, idx) => {
              return (
                <MenuWrap key={idx}>
                  <Menu>{m.menu}</Menu>
                </MenuWrap>
              );
            })}
          </Flex>
        </HeaderSizing>
      </Wrap1440>
    </HeaderContainer>
  );
};

export default Header;
