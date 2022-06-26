import React from 'react';
import ReactDOM from 'react-dom';
import CreateSlots from './CreateSlots';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateSlots />, div);
  ReactDOM.unmountComponentAtNode(div);
});