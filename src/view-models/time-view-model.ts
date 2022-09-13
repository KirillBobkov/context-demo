import { createPropertyAdapter, Property } from "../utils/property.utils";
import { context } from "../context/context2";
import { sink, Sink } from "../utils/sink";
import { pipe } from "fp-ts/lib/function";
import { merge, timer } from "rxjs";
import { tap } from "rxjs/operators";
import { newSink } from "../context/sink2";

export interface TimeViewModel {
  readonly setTime: (time: number) => void;
  readonly time: Property<number>;
}

export const createTimeViewModel = context.of(
  (initialTime: number): Sink<TimeViewModel> => {
    const [setTime, time] = createPropertyAdapter<number>(initialTime);

    const tickEffect = pipe(
      timer(0, 1000),
      tap(() => {
        setTime(time.getValue() + 1000);
      })
    );

    const logEffect = pipe(
      time,
      tap(() => {
        console.log(time.getValue());
      })
    );

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
