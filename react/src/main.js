import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

$(function() {
  ReactDOM.render(
    <div>React is working.</div>,
    document.getElementById('app')
  );
});
