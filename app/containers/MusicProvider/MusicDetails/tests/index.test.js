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

describe('<MusicDetails /> container tests', () => {
  const sampleData = {
    results: data
  }
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<MusicDetails musicData={sampleData} pathName={"/track/1469577808"} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should render music details', () => {
    const { findByTestId } = renderProvider(<MusicDetails musicData={sampleData} pathName={"/track/1469577808"} />);
    expect(findByTestId('music-details')).toBeTruthy;
  });

  it('should render music details', () => {
    const { findByTestId } = renderProvider(<MusicDetails musicData={sampleData} pathName={"/track/1469577808"} />);
    expect(findByTestId('price')).toBeTruthy;
  });

  it('should render music details', () => {
    const { findByTestId } = renderProvider(<MusicDetails musicData={sampleData} pathName={"/track/1469577808"} />);
    expect(findByTestId('name')).toBeTruthy;
  });
  
  it('should render music details', () => {
    const { findByTestId } = renderProvider(<MusicDetails musicData={sampleData} pathName={"/track/1469577808"} />);
    expect(findByTestId('genre')).toBeTruthy;
  });

  it('should render music details', () => {
    const { findByTestId } = renderProvider(<MusicDetails musicData={sampleData} pathName={"/track/1469577808"} />);
    expect(findByTestId('rating')).toBeTruthy;
  });
});
