import React, { Component } from 'react';

import Drummachine from '~/components/drummachine/drummachine/DrummachineLayout';
import Sequencer from '~/components/drummachine/drummachine/Drummachine';

class App extends Component {
  render() {
    return (
      <div
        style={{
          height: '100vh',
          backgroundColor: '#333333',
          position: 'relative',
        }}
      >
        <Drummachine />
        <Sequencer />
      </div>
    );
  }
}

export default App;
