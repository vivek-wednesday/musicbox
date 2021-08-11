/**
 *
 * Tests for MusicContainer
 *
 *
 */

import React from 'react';
import { render } from '@testing-library/react'
import { MusicContainerTest as MusicContainer } from '../index';
import { IntlProvider } from 'react-intl';

describe('<MusicContainer /> tests', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild }
    } = render(
      <IntlProvider locale="en">
        <MusicContainer />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
  it('should render container', () => {
    const { getByTestId } = render(<IntlProvider locale="en"><MusicContainer /></IntlProvider>)
    expect(getByTestId('music-container')).toBeTruthy;
  })
  it('should render search bar', () => {
    const { getByTestId } = render(<IntlProvider locale="en"><MusicContainer /></IntlProvider>)
    expect(getByTestId('search-bar')).toBeTruthy;
  })
})


