import { sink, Sink as SinkImport } from '../utils/sink';

/**
 * @deprecated please use utils/sink.ts instead.
 */
export type Sink<A> = SinkImport<A>;
export const newSink = sink.newSink;