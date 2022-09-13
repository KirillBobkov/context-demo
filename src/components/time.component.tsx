import React from 'react';
import { Milliseconds } from '../view-models/time-view-model';

export interface TimeComponentProps {
	time: Milliseconds;
	color: string;
}

export const TimeComponent = ({ time, color }: TimeComponentProps) => (
	<span style={{ color }}>{new Date(time).toUTCString()}</span>
);