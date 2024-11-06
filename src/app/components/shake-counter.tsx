"use client";
import React, { useEffect, useState } from "react";
import useDeviceMotion from "../hooks/useDeviceMotion";

export default function ShakeCounter() {
  const [shakesCount, setShakesCount] = useState(0);
  const [shakesIntervalInMs, setShakesIntervalInMs] = useState(1);
  const [isShaking, setIsShaking] = useState(false);
  const [lastShakeTime, setLastShakeTime] = useState(0);

  const { error, motion, isPermissionGranted, requestPermission, isSupported } =
    useDeviceMotion();

  function handleCounterIncrease() {
    setShakesCount((prevState) => prevState + 1);
    triggerShake();
  }

  function handleCounterReset() {
    setShakesCount(0);
    triggerShake();
  }

  function handleShakeInterval(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setShakesIntervalInMs(Number(value));
  }

  function triggerShake() {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 300);
  }

  useEffect(() => {
    if (motion.x === null || motion.y === null || motion.z === null) return;

    const currentTime = Date.now();
    const shakeThreshold = 15; // 15 m/s from requirements

    if (
      Math.abs(motion.x) > shakeThreshold ||
      Math.abs(motion.y) > shakeThreshold ||
      Math.abs(motion.z) > shakeThreshold
    ) {
      if (currentTime - lastShakeTime > shakesIntervalInMs * 1000) {
        setShakesCount((prevCount) => prevCount + 1);
        setLastShakeTime(currentTime);
        triggerShake();
      }
    }
  }, [motion, shakesIntervalInMs, lastShakeTime]);

  return (
    <div className="m-auto w-full space-y-4 text-white lg:max-w-xl">
      <p className="text-center">
        {"Permission Status: "}
        {isPermissionGranted ? (
          <span className="text-green-500">Granted</span>
        ) : (
          <span className="text-red-500">Not Granted</span>
        )}
      </p>
      {error && <div className="text-center text-red-500">{error.message}</div>}

      {!isSupported && (
        <div className="text-center text-red-500">
          Your device is not supported. App requires motion and orientation
          sensors. Please try another one device.
        </div>
      )}

      {!isPermissionGranted && !error && (
        <div className="space-y-4">
          <p className="rouned-sm border border-white p-2">
            This app needs access to the device&apos;s motion and orientation
            data in order to function properly.
          </p>

          <button
            onClick={requestPermission}
            className="w-full rounded-sm bg-green-600 p-2 text-center hover:bg-green-500 hover:text-green-900"
          >
            Grant Permission
          </button>
        </div>
      )}

      {!error && isSupported && isPermissionGranted && (
        <>
          <div
            className={`flex h-full items-center justify-center gap-4 rounded-lg border border-white p-4 ${
              isShaking ? "animate-shake" : ""
            }`}
          >
            <div className="text-center">
              <div className="text-lg">Shake counter</div>
              <div className="text-[96px]">{shakesCount}</div>
            </div>
          </div>

          <div className="rounded-lg border border-white p-4 text-center">
            <h3 className="font-bold">Orientation</h3>
            <p>x: {motion.x}</p>
            <p>y: {motion.y}</p>
            <p>z: {motion.z}</p>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={handleCounterIncrease}
              className="w-full rounded-sm bg-green-600 p-2 hover:bg-green-500 hover:text-green-900"
            >
              Increase counter
            </button>
            <button
              onClick={handleCounterReset}
              className="w-full rounded-sm bg-red-600 p-2 hover:bg-red-500 hover:text-red-900"
            >
              Reset counter
            </button>

            <div>
              <label htmlFor="shakeInterval">Shake counter interval</label>
              <input
                type="number"
                id="shakeInterval"
                className="rounded-base mt-1 w-full rounded-sm border-2 bg-zinc-600 p-2 outline-none ring-offset-white/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-offset-2"
                value={shakesIntervalInMs}
                onChange={handleShakeInterval}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
