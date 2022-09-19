import React, { FC } from "react";
import { useProperty } from "../utils/react.utils";
import { useSink } from "../utils/use-sink";
import { createTimeViewModel } from "../view-models/time-view-model";
import { TimeComponent } from "../components/time.component";
import { context } from "../context/context2";
import { NewsProvider } from "..";

const TimeContainer = context.combine(
  createTimeViewModel,
  context.key<NewsProvider>()('newsProvider'),
  (createTimeViewModel, newsProvider): FC<{}> => () => {
      const initialTime = Date.now();
      
      const newsPost = newsProvider.facebook;

      // creating view-model
      const timeViewModel = useSink(
        () => createTimeViewModel(initialTime),
        [createTimeViewModel]
      );

      const time = useProperty(timeViewModel.time);

      // passing view-model data into React component
      return <TimeComponent time={time} newsPost={newsPost}/>;
    }
);

export default TimeContainer;
