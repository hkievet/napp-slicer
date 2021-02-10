import * as React from "react";

export interface ITimeDisplayProps {
  seconds: number;
}

export const TimeDisplay: React.FC<ITimeDisplayProps> = (props) => {
  const { seconds } = props;
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return (
    <>
      {minutes.toString(10).padStart(2, "0")}:
      {remainder.toString(10).padStart(2, "0")}
    </>
  );
};

export default TimeDisplay;
