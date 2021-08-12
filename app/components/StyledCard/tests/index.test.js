/**
 *
 * Tests for StyledCard
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import StyledCard from '../index';
import { data } from './testData';
import { fireEvent} from "@testing-library/react"
import {BrowserRouter} from "react-router-dom"

describe('<StyledCard />', () => {

  const sampleData = {
    results: data
  }

  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<BrowserRouter><StyledCard musicData={sampleData} /></BrowserRouter>);
    expect(baseElement).toMatchSnapshot();
  });
  
  it('should render cards with music data', () => {
    const { getAllByTestId } = renderWithIntl(<BrowserRouter><StyledCard musicData={sampleData} /></BrowserRouter>);
    expect(getAllByTestId('card-wrapper')).toBeTruthy;
  });

  it('should render play button', () => {
    const {getAllByTestId} = renderWithIntl(<BrowserRouter><StyledCard musicData={sampleData} /></BrowserRouter>);
    expect(getAllByTestId('play')).toBeTruthy;
  });

  it('should render play button and click it', async () => {
    const {getAllByTestId} = renderWithIntl(<BrowserRouter><StyledCard musicData={sampleData} /></BrowserRouter>);
    expect(fireEvent(
      getAllByTestId('play')[0],
      new MouseEvent('click'),
    )).toBeTruthy;
  });

  it('should not render any pause button', () => {
    const {getAllByTestId} = renderWithIntl(<BrowserRouter><StyledCard musicData={sampleData} /></BrowserRouter>);
    expect(getAllByTestId('play')).toBeFalsy;
  });

  it('should render forward button', () => {
    const {getAllByTestId} = renderWithIntl(<BrowserRouter><StyledCard musicData={sampleData} /></BrowserRouter>);
    expect(getAllByTestId('forward')).toBeTruthy;
  });

  it('should render backward button', () => {
    const {getAllByTestId} = renderWithIntl(<BrowserRouter><StyledCard musicData={sampleData} /></BrowserRouter>);
    expect(getAllByTestId('backward')).toBeTruthy;
  });

  it('should render error message without music data', () => {
    sampleData.results.length=0;
    const { getAllByTestId } = renderWithIntl(<StyledCard musicData={sampleData} />);
    expect(getAllByTestId('no-music-data')).toBeTruthy;
  });

});
