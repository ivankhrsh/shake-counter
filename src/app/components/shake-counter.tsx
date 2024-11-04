"use client";
import React, { useState } from "react";

export default function ShakeCounter() {
  const [shakesCount, setShakes] = useState(0);

  function handleCounterIncrease() {
    setShakes((prevState) => prevState + 1);
  }

  function handleCounterReset() {
    setShakes(0);
  }

  return (
    <div className="group mx-auto h-96 w-2/4">
      <div className="flex h-full flex-col items-center gap-4 rounded-lg border p-4 group-active:animate-shake">
        <div className="text-center">
          <div className="text-lg">Shake counter</div>
          <div className="text-[96px]">{shakesCount}</div>
        </div>

        <div className="space-x-4">
          <button
            onClick={handleCounterIncrease}
            className="rounded-sm bg-green-600 p-2 hover:text-green-900"
          >
            Increase counter
          </button>
          <button
            onClick={handleCounterReset}
            className="rounded-sm bg-red-600 p-2 hover:text-red-900"
          >
            Reset counter
          </button>
        </div>
      </div>
    </div>
  );
}
