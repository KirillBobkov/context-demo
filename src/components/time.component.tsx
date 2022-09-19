import React from "react";
import { Milliseconds } from "../view-models/time-view-model";

export interface TimeComponentProps {
  time: Milliseconds;
  color: string;
  width: number;
  newsPost: string;
}

export const TimeComponent = ({ time, newsPost, color, width }: TimeComponentProps) => (
  <section>
    <p style={{ color, fontSize: "3rem", textAlign: "center" }}>
      {new Date(time).toUTCString()}
    </p>
	<p style={{ fontSize: "3rem", textAlign: "center" }}>{newsPost}</p>
    <p
      style={{ fontSize: "3rem", textAlign: "center" }}
    >{`Current window with is: ${width}`}</p>
  </section>
);