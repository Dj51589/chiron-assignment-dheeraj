import React from 'react';
import ReactDOM from 'react-dom';
import PageView from './PageView';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PageView />, div);
  ReactDOM.unmountComponentAtNode(div);
});