import React from 'react';
import ReactDOM from 'react-dom';
import TimeContainer from './containers/time-container';
import { useSink } from './utils/use-sink';

const App = () => {
  // container initialization
  const TimeContainerFC = useSink(() => TimeContainer({}), []);

  return <TimeContainerFC />;
};

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
