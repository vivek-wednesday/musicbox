/**
 *
 * Tests for StyledCard
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import StyledCard from '../index';
import { data } from './testData';

describe('<StyledCard />', () => {
  
  const sampleData = {
    results: data
  }

  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<StyledCard musicData={sampleData} />);
    expect(baseElement).toMatchSnapshot();
  });
  
  it('should render cards with music data', () => {
    const { getAllByTestId } = renderWithIntl(<StyledCard musicData={sampleData} />);
    expect(getAllByTestId('card-wrapper')).toBeTruthy;
  });

  it('should render error message without music data', () => {
    sampleData.results.length=0;
    const { getAllByTestId } = renderWithIntl(<StyledCard musicData={sampleData} />);
    expect(getAllByTestId('no-music-data')).toBeTruthy;
  });
});
