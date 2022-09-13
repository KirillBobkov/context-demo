import React, { FC } from "react";
import { useProperty } from "../utils/react.utils";
import { useSink } from "../utils/use-sink";
import { createTimeViewModel } from "../view-models/time-view-model";
import { TimeComponent } from "../components/time.component";
import { context } from "../context/context2";

const TimeContainer = context.combine(
  createTimeViewModel,
  (createTimeViewModel): FC<{}> => () => {
      const initialTime = Date.now();

      // creating view-model
      const timeViewModel = useSink(
        () => createTimeViewModel(initialTime),
        [createTimeViewModel]
      );

      const time = useProperty(timeViewModel.time);

      // passing view-model data into React component
      return <TimeComponent time={time} />;
    }
);

export default TimeContainer;
