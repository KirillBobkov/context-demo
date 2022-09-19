import React from 'react';
import ReactDOM from 'react-dom';
import TimeContainer from './containers/time-container';
import { useSink } from './utils/use-sink';


export interface NewsProvider {
  facebook: string;
}

const App = () => {
  // container initialization

  const dependencies = {
    newsProvider: { facebook: 'Today Meta started....'},
    timeProvider: {},
  };

  const TimeContainerFC = useSink(() => TimeContainer(dependencies), []);

  return <TimeContainerFC />;
};

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
