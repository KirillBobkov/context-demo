import React, { FC } from "react";
import { useProperty } from "../utils/react.utils";
import { useSink } from "../utils/use-sink";
import { createTimeViewModel } from "../view-models/time-view-model";
import { TimeComponent } from "../components/time.component";
import { context } from "../context/context2";
import { createColorViewModel } from "../view-models/color-view-model";

const TimeContainer = context.combine(
  createTimeViewModel,
  context.defer(createColorViewModel, "timeViewModel"),
  (createTimeViewModel): FC<{}> =>
    () => {
      const initialTime = Date.now();

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
        () => colorViewModelSink('blue'),
        [createColorViewModel]
      );

      const color = useProperty(colorViewModel.color);
      const time = useProperty(timeViewModel.time);

      // passing view-model data into React component
      return <TimeComponent time={time} color={color} />;
    }
);

export default TimeContainer;
