import React from "react";

const RateErrorComponent = ({ errorJson }: any) => {
  // Function to calculate remaining time until the reset
  const calculateRemainingTime = () => {
    const resetTime = new Date(errorJson.resetTime);
    const currentTime = new Date();

    // Calculate the difference in milliseconds
    const timeDifference = resetTime.getTime() - currentTime.getTime();

    // Convert milliseconds to minutes
    const minutesRemaining = Math.floor(timeDifference / (1000 * 60));

    return minutesRemaining;
  };

  const minutesRemaining = calculateRemainingTime();

  return (
    <div className="mb-4 text-center font-bold bg-red-600 p-2 w-fit h-fit rounded-2xl">
      Error: {errorJson.error}
      <br />
      Come Back: {errorJson.resetTime} (GMT)
      <br />
      Reset in: {minutesRemaining} minutes
    </div>
  );
};

export default RateErrorComponent;
