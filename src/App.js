import React from 'react';
import { increment, ping } from './store';
import { connect } from 'react-redux';

const App = ({ isPinging, ping, increment, count }) => (
  <div>
    <h1>is pinging: {isPinging.toString()}</h1>
    <button onClick={ping}>Ping</button>
    <button onClick={increment}>Increment {count}</button>
  </div>
);

const mapStateToProps = ({ ping, counter }) => ({ isPinging: ping.isPinging, count: counter.count });

export default connect(mapStateToProps, { ping, increment })(App);
