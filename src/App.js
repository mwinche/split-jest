import React from 'react';
import logo from './logo.svg';
import './App.css';

import { SplitFactory } from '@splitsoftware/splitio';

const factory = SplitFactory({
  core: {
    authorizationKey: 'localhost',
    key: '123'
  },
});

const userClient = factory.client('user123', 'user');
const tenantClient = factory.client('tenant123', 'tenant');

const userTestTreatment = userClient.getTreatment('user-test');
const tenantTestTreatment = tenantClient.getTreatment('tenant-test');

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <pre>{JSON.stringify({ userTestTreatment, tenantTestTreatment }, null, '  ')}</pre>
      </header>
    </div>
  );
}

export default App;
