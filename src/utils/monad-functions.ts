import { sequenceT } from 'fp-ts/Apply';
import { Option, option as optionInstance } from 'fp-ts/Option';
import { observable, observableOption } from 'fp-ts-rxjs';
import { Observable, of } from 'rxjs';
import { identity, pipe } from 'fp-ts/lib/function';

export const sequenceTOption = sequenceT(optionInstance);
export const filterOption = <A>() => observableOption.getOrElse<A>(() => of());
export const filterMapOption = <A>(source: Observable<Option<A>>) => pipe(source, observable.filterMap(identity));
