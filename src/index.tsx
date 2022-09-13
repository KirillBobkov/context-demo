import React from 'react';
import ReactDOM from 'react-dom/client';
import TimeContainer from './containers/time-container';
import { useSink } from './utils/use-sink';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const App = () => {
  const TimeContainerFC = useSink(() => TimeContainer({}), []);

  return <TimeContainerFC />;
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
