import React from "react";

export interface TimeComponentProps {
  time: number;
  newsPost: string;
}

export const TimeComponent = ({ time, newsPost }: TimeComponentProps) => (
  <>
    <p>{new Date(time).toUTCString()}</p>
    <p>{newsPost}</p>
  </>
);
