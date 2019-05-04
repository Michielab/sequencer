import React, { Component } from 'react';

import Drummachine from '~/components/drummachine/drummachine/DrummachineLayout';
import Sequencer from '~/components/drummachine/drummachine/Drummachine';
import ResponsiveDialog from '~/components/Dialog';

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
        <ResponsiveDialog />
      </div>
    );
  }
}

export default App;
