import React from 'react';

export interface TimeComponentProps {
	time: number;
}

export const TimeComponent = ({ time }: TimeComponentProps) => (
	<span>{new Date(time).toUTCString()}</span>
);