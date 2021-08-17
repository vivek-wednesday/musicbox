/**
 *
 * Tests for MusicDetails
 *
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import {data} from "@components/StyledCard/tests/testData"
import { MusicDetailsTest as MusicDetails, mapDispatchToProps } from '../index';

describe('<MusicDetails /> container tests', () => {
  const sampleData = data[0]
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<MusicDetails musicResult={sampleData} dispatchGetMusicDetail={function(){}} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should render music details', () => {
    const { findByTestId } = renderWithIntl(<MusicDetails musicResult={sampleData} dispatchGetMusicDetail={function(){}} />);
    expect(findByTestId('music-details')).toBeTruthy;
  });

  it('should render music details', () => {
    const { findByTestId } = renderWithIntl(<MusicDetails musicResult={sampleData} dispatchGetMusicDetail={function(){}} />);
    expect(findByTestId('price')).toBeTruthy;
  });

  it('should render music details', () => {
    const { findByTestId } = renderWithIntl(<MusicDetails musicResult={sampleData} dispatchGetMusicDetail={function(){}} />);
    expect(findByTestId('name')).toBeTruthy;
  });
  
  it('should render music details', () => {
    const { findByTestId } = renderWithIntl(<MusicDetails musicResult={sampleData} dispatchGetMusicDetail={function(){}} />);
    expect(findByTestId('genre')).toBeTruthy;
  });

  it('should render music details', () => {
    const { findByTestId } = renderWithIntl(<MusicDetails musicResult={sampleData} dispatchGetMusicDetail={function(){}} />)
    expect(findByTestId('rating')).toBeTruthy;
  });

  it("should dispatch get music detail", () => {
    const dispatch = jest.fn();
    const spy = jest.spyOn(mapDispatchToProps(dispatch), 'dispatchGetMusicDetail')
    mapDispatchToProps(dispatch).dispatchGetMusicDetail()
    expect(spy).toHaveBeenCalled
  })
  
});
