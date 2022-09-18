import React, { FC } from "react";
import { useObservable, useProperty } from "../utils/react.utils";
import { useSink } from "../utils/use-sink";
import { createTimeViewModel } from "../view-models/time-view-model";
import { TimeComponent } from "../components/time.component";
import { context } from "../context/context2";
import { createColorViewModel } from "../view-models/color-view-model";
import { createResizeViewModel } from "../view-models/resize.view-model";

const DEFAULT_WIDTH = window.innerWidth;

const TimeContainer = context.combine(
  createTimeViewModel,
  createResizeViewModel,
  context.defer(createColorViewModel, "timeViewModel"),
  (createTimeViewModel, createResizeViewModel, createColorViewModel): FC<{}> =>
    () => {
      const initialTime = Date.now();

      // creating time view-model
      const timeViewModel = useSink(
        () => createTimeViewModel(initialTime),
        [createTimeViewModel]
      );

      // creating resize view-model
      const resizeViewModel = useSink(
        () => createResizeViewModel(),
        [createResizeViewModel]
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

      const width = useObservable(resizeViewModel.windowWidth, DEFAULT_WIDTH);
      const color = useProperty(colorViewModel.color);
      const time = useProperty(timeViewModel.time);

      // passing view-model data into React component
      return <TimeComponent time={time} color={color} width={width} />;
    }
);

export default TimeContainer;
