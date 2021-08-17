/**
 *
 * Tests for MusicContainer
 *
 *
 */

import React from 'react';
import {fireEvent} from "@testing-library/react"
import { renderWithIntl, timeout } from '@utils/testUtils';
import { MusicContainerTest as MusicContainer, mapDispatchToProps } from '../index';
import { musicContainerCreators } from '../../reducer';


describe('<MusicContainer /> tests', () => {
  it('should render and match the snapshot', () => {
    const {baseElement} = renderWithIntl(<MusicContainer />)
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

  it('should dispatch get music', async () => {
    const getMusic = jest.fn();
    const {getByTestId} = renderWithIntl(<MusicContainer dispatchGetMusic={getMusic} />)
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a'}
    })
    await timeout(500)
    expect(getMusic).toBeCalled;
  })

  it('should dispatch clear work', async () => {
    const clearMusic = jest.fn();
    const {getByTestId} = renderWithIntl(<MusicContainer dispatchClearMusic={clearMusic} />)
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: ''}
    })
    await timeout(500)
    expect(clearMusic).toBeCalled;
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

  it('receives correct dispatch functions from store as props', () => {
    let mocks = {}
    mocks.dispatch = () => {};
    jest.spyOn(mocks, 'dispatch');
    const dispatchedFunctions = mapDispatchToProps(mocks.dispatch);
    dispatchedFunctions.dispatchGetMusic('new');
    expect(mocks.dispatch.mock.calls[0][0]).toStrictEqual(musicContainerCreators.requestGetMusic('new'));
    dispatchedFunctions.dispatchClearGetMusic(); 
    expect(mocks.dispatch.mock.calls[1][0]).toStrictEqual(musicContainerCreators.clearGetMusic());
  });
  
})


