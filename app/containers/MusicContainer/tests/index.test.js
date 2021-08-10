/**
 *
 * Tests for MusicContainer
 *
 *
 */

import React from 'react';
import { render } from '@testing-library/react'
import { IntlProvider } from 'react-intl';
import { MusicContainerTest as MusicContainer } from '../index';

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
  it('should render grid if musicData is present', () => {
    const sampleData = {
      resultCount: 10,
      results: []
    }
    const { getByTestId } = render(<IntlProvider locale="en"><MusicContainer musicData={sampleData} /></IntlProvider>)
    expect(getByTestId('grid')).toBeTruthy;
  })
  it('should render error message if musicData is empty', () => {
    const { getByTestId } = render(<IntlProvider locale="en"><MusicContainer /></IntlProvider>)
    expect(getByTestId('no-music-data')).toBeTruthy;
  })
})


