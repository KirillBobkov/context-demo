/**
 * Stack data structure.
 * @doc-tags utility
 */
export class Stack<T> {
	private _stack: Array<T> = [];

	push(item: T) {
		this._stack.push(item);
	}

	clear() {
		this._stack = [];
	}

	at(idx: number): T | undefined {
		return this._stack[idx];
	}

	pop(): T | undefined {
		return this._stack.pop();
	}

	getLast(): T | undefined {
		console.log();
		return this._stack[this._stack.length - 1];
	}

	get length() {
		return this._stack.length;
	}
}
