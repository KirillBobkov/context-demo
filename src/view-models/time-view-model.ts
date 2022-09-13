import { createPropertyAdapter, Property } from "../utils/property.utils";
import { context } from "../context/context2";
import { Sink } from "../utils/sink";
import { pipe } from "fp-ts/lib/function";
import { merge, timer } from "rxjs";
import { tap } from "rxjs/operators";
import { newSink } from "../context/sink2";

export type Milliseconds = number;
export interface TimeViewModel {
  readonly setTime: (time: Milliseconds) => void;
  readonly time: Property<Milliseconds>;
}

export const createTimeViewModel = context.of(
  (initialTime: Milliseconds): Sink<TimeViewModel> => {
    const [setTime, time] = createPropertyAdapter<Milliseconds>(initialTime);

    const tickEffect = pipe(
      timer(0, 1000),
      tap(() => {
        setTime(time.getValue() + 1000);
      })
    );

    const logEffect = pipe(
      time,
      tap(() => {
        console.log('current time effect value:', time.getValue());
      })
    );

    // RxJs effects
    const effects = merge(tickEffect, logEffect);

    return newSink(
      {
        time,
        setTime,
      },
      effects
    );
  }
);
