import React, { FC } from "react";
import { useProperty } from "../utils/react.utils";
import { useSink } from "../utils/use-sink";
import { createTimeViewModel } from "../view-models/time-view-model";
import { TimeComponent } from "../components/time.component";
import { context } from "../context/context2";
import { createColorViewModel } from "../view-models/color-view-model";
import { NewsProvider } from "..";

const TimeContainer = context.combine(
  createTimeViewModel,
  context.key<NewsProvider>()("newsProvider"),
  context.defer(createColorViewModel, "timeViewModel"),
  (
      createTimeViewModel,
      newsProvider,
      createColorViewModel
    ): FC<{}> =>
    () => {
      const initialTime = Date.now();

      const newsPost = newsProvider.facebook;

      // creating time view-model
      const timeViewModel = useSink(
        () => createTimeViewModel(initialTime),
        [createTimeViewModel]
      );

      // create sink with dependencies
      const colorViewModelSink = useSink(
        () => createColorViewModel({ timeViewModel }),
        [createColorViewModel]
      );

      // creating color view-model
      const colorViewModel = useSink(
        () => colorViewModelSink("blue"),
        [createColorViewModel]
      );

      const color = useProperty(colorViewModel.color);
      const time = useProperty(timeViewModel.time);

      // passing view-model data into React component
      return (
        <TimeComponent
          time={time}
          newsPost={newsPost}
          color={color}
        />
      );
    }
);

export default TimeContainer;
