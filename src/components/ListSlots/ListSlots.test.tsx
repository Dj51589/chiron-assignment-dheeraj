import React from 'react';
import ReactDOM from 'react-dom';
import ListSlots from './ListSlots';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ListSlots />, div);
  ReactDOM.unmountComponentAtNode(div);
});