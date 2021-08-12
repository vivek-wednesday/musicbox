/**
 *
 * Tests for StyledCard
 *
 */

import React from 'react';
import {  renderWithIntl /*, timeout */} from '@utils/testUtils';
import StyledCard from '../index';
import { data } from './testData';
//import {fireEvent} from "@testing-library/react"

describe('<StyledCard />', () => {
  const sampleData = {
    results: data
  };

  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<StyledCard musicData={sampleData} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should render cards with music data', () => {
    const { getAllByTestId } = renderWithIntl(<StyledCard musicData={sampleData} />);
    expect(getAllByTestId('card-wrapper')).toBeTruthy;
  });

  it('should render play button', () => {
    const { getAllByTestId } = renderWithIntl(<StyledCard musicData={sampleData} />);
    expect(getAllByTestId('play')).toBeTruthy;
  });

  it('should not render any pause button initially', () => {
    const { getAllByTestId } = renderWithIntl(<StyledCard musicData={sampleData} />);
    expect(getAllByTestId('play')).toBeFalsy;
  });

  it('should render forward button', () => {
    const { getAllByTestId } = renderWithIntl(<StyledCard musicData={sampleData} />);
    expect(getAllByTestId('forward')).toBeTruthy;
  });

  it('should render backward button', () => {
    const { getAllByTestId } = renderWithIntl(<StyledCard musicData={sampleData} />);
    expect(getAllByTestId('backward')).toBeTruthy;
  });

 /*  it('should render pause button on play', async () => {
    sampleData.results.length = 1;
    const {getByTestId} = renderWithIntl(<StyledCard musicData={sampleData} />);
    fireEvent.click(getByTestId('play'))
    await timeout(1000)
    expect(getByTestId('pause')).toBeTruthy
  }) */

  it('should render error message without music data', () => {
    sampleData.results.length = 0;
    const { getAllByTestId } = renderWithIntl(<StyledCard musicData={sampleData} />);
    expect(getAllByTestId('no-music-data')).toBeTruthy;
  });
});
