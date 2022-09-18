import { context } from "../context/context2";
import { Sink } from "../utils/sink";
import { merge, fromEvent, Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
import { newSink } from "../context/sink2";
import { pipe } from "fp-ts/lib/function";

export interface ResizeViewModel {
  readonly windowWidth: Observable<number>;
}

export const createResizeViewModel = context.of(
  (): Sink<ResizeViewModel> => {
    const windowWidth = pipe(
        fromEvent(window, "resize"),
        map(() => window.innerWidth)
    );
    
    // RxJs effects
    const effects = merge();

    return newSink(
      {
        windowWidth,
      },
      effects
    );
  }
);
