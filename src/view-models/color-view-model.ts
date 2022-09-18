import { createPropertyAdapter, Property } from "../utils/property.utils";
import { context } from "../context/context2";
import { Sink } from "../utils/sink";
import { pipe } from "fp-ts/lib/function";
import { merge } from "rxjs";
import { tap } from "rxjs/operators";
import { newSink } from "../context/sink2";
import { TimeViewModel } from "./time-view-model";

export interface ColorViewModel {
  readonly setColor: (color: string) => void;
  readonly color: Property<string>;
}

export interface CreateColorViewModel {
	(initialColor: string): Sink<ColorViewModel>;
}

export const createColorViewModel = context.combine(
  context.key<TimeViewModel>()('timeViewModel'),
  (timeViewModel): CreateColorViewModel => (initialColor) => {
    const [setColor, color] = createPropertyAdapter<string>(initialColor);

    const colorEffect = pipe(
      timeViewModel.time,
      tap((time) => {
        if (time % 3 === 0) {
            setColor('red')
        } else {
            setColor('blue');
        }
      })
    );

    const logEffect = pipe(
        color,
        tap(() => {
          console.log('current color is:', color.getValue());
        })
      );

    // RxJs effects
    const effects = merge(colorEffect, logEffect);

    return newSink(
      {
        color,
        setColor,
      },
      effects
    );
  }
);
