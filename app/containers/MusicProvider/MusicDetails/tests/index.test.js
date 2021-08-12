/**
 *
 * Tests for MusicDetails
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
import {data} from "@components/StyledCard/tests/testData"
import { MusicDetailsTest as MusicDetails } from '../index';
import { MemoryRouter } from 'react-router-dom';

describe('<MusicDetails /> container tests', () => {
  const sampleData = {
    results: data
  }
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<MemoryRouter><MusicDetails musicData={sampleData} /></MemoryRouter>);
    expect(baseElement).toMatchSnapshot();
  });

  it('should render music details', () => {
    const { findByTestId } = renderProvider(<MemoryRouter><MusicDetails musicData={sampleData} /></MemoryRouter>);
    expect(findByTestId('music-details')).toBeTruthy;
  });

  it('should render music details', () => {
    const { findByTestId } = renderProvider(<MemoryRouter><MusicDetails musicData={sampleData} /></MemoryRouter>);
    expect(findByTestId('price')).toBeTruthy;
  });

  it('should render music details', () => {
    const { findByTestId } = renderProvider(<MemoryRouter><MusicDetails musicData={sampleData} /></MemoryRouter>);
    expect(findByTestId('name')).toBeTruthy;
  });
  
  it('should render music details', () => {
    const { findByTestId } = renderProvider(<MemoryRouter><MusicDetails musicData={sampleData} /></MemoryRouter>);
    expect(findByTestId('genre')).toBeTruthy;
  });

  it('should render music details', () => {
    const { findByTestId } = renderProvider(<MemoryRouter><MusicDetails musicData={sampleData} /></MemoryRouter>);
    expect(findByTestId('rating')).toBeTruthy;
  });
});
