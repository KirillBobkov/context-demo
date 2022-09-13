import React from 'react';

export const resolveComponentWithPredicate = (predicate: boolean, Component: React.FunctionComponent) => {
	return predicate ? Component : () => React.createElement(React.Fragment);
};