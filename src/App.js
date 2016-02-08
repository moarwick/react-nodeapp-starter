import React from 'react';

import imgSmall from './img/img-small.png';   // will be inlined (under 8k)
import imgLarge from './img/img-large.jpg';   // will be served


export default class App extends React.Component {

  constructor(props) {
    super( props );
    this.state = {test: 'REACT'};
  }

  render() {
    return (
      <div>
        <img src={ imgSmall } />
        <h2>{ this.state.test } ON NODE EXPRESS SERVER</h2>
        <img src={ imgLarge } />
      </div>
    );
  }
}
