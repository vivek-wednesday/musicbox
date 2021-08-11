/**
 *
 * Tests for MusicContainer
 *
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import { MusicContainerTest as MusicContainer } from '../index';

describe('<MusicContainer /> tests', () => {
  it('should render and match the snapshot', () => {
    const {baseElement} =renderWithIntl(<MusicContainer />)
    expect(baseElement).toMatchSnapshot();
  });

  it('should render container', () => {
    const { getByTestId } = renderWithIntl(<MusicContainer />)
    expect(getByTestId('music-container')).toBeTruthy;
  })
  it('should render search bar', () => {
    const { getByTestId } = renderWithIntl(<MusicContainer />)
    expect(getByTestId('search-bar')).toBeTruthy;
  })
  it('should render grid if musicData is present', () => {
    const sampleData = {
      resultCount: 10,
      results: []
    }
    const { getByTestId } = renderWithIntl(<MusicContainer musicData={sampleData} />)
    expect(getByTestId('grid')).toBeTruthy;
  })
  it('should render error message if musicData is empty', () => {
    const { getByTestId } = renderWithIntl(<MusicContainer />)
    expect(getByTestId('no-music-data')).toBeTruthy;
  })
})


