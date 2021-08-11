/**
 *
 * Header
 *
 */

import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { fonts } from '@themes';
import T from '@components/T';
import colors from '@app/themes/colors';

const StyledHeader = styled(Layout.Header)`
  && {
    &.ant-layout-header {
      padding: 0 1rem;
      height: 7rem;
    }
    display: flex;
    justify-content: center;
    background-color: ${colors.primary};
  }
`;
const Logo = styled.img`
  height: 5rem;
  width: auto;
  margin-top: 1rem;
  margin-right: 2em;
`;
const Title = styled(T)`
  && {
    margin-bottom: 0;
    ${fonts.dynamicFontSize(fonts.size.xRegular, 1, 0.5)};
    display: flex;
    align-self: center;
  }
`;
function Header(props) {
  return (
    <StyledHeader {...props} data-testid="header">
      <Logo alt="logo" src="https://img.icons8.com/ios-filled/50/000000/itunes--v2.png" />
      <Title type="heading" id="itunes_scraper" />
    </StyledHeader>
  );
}

export default injectIntl(Header);
