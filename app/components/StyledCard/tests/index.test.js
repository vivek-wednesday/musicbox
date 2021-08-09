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
    const { baseElement } = renderWithIntl(<StyledCard />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should show error if music data is not defined', () => {
    const { getAllByTestId } = renderWithIntl(<StyledCard />);
    expect(getAllByTestId('no-music-data')).toBeTruthy;
  });

  it('should render cards with music data',async () => {
    const { getAllByTestId } = renderWithIntl(<StyledCard musicData={sampleData} />);
    expect(getAllByTestId('card-wrapper')).toBeTruthy;
  });
});
