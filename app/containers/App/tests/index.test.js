import React from 'react'
import { renderWithIntl } from '@utils/testUtils';
import { BrowserRouter } from 'react-router-dom';
import App from '../index';

describe('<App /> container tests', () => {
  it('should render and match the snapshot', () => { 
    const { container } = renderWithIntl(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
