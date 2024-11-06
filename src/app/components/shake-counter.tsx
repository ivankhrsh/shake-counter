"use client";

import React, { useEffect, useState } from "react";
import useDeviceMotion from "../hooks/use-device-motion";
import { cn } from "@/lib/utils";
import OrientationDisplay from "./orientation-display";

const intervals = [0.5, 1, 2, 5];

export default function ShakeCounter() {
  const [shakesCount, setShakesCount] = useState(0);
  const [shakesInterval, setShakesInterval] = useState<number>(1);
  const [isShaking, setIsShaking] = useState(false);
  const [lastShakeTime, setLastShakeTime] = useState(0);
  const [isToolsVisible, setIsToolsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const { error, motion, isPermissionGranted, requestPermission, isSupported } =
    useDeviceMotion();

  function handleCounterIncrease() {
    setShakesCount((prevState) => prevState + 1);
    triggerShake();
  }

  function handleCounterReset() {
    setIsResetting(true);
    setTimeout(() => {
      setShakesCount(0);
      setIsResetting(false);
    }, 400);
  }

  function handleToolsToggle() {
    setIsToolsVisible((prevState) => !prevState);
  }

  function handleShakeInterval(value: number) {
    setShakesInterval(value);
  }

  function triggerShake() {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 400);
  }

  useEffect(() => {
    if (motion.x === null || motion.y === null || motion.z === null) return;

    const currentTime = Date.now();
    const shakeThreshold = 15; // 15 m/s² from requirements
    const interval = shakesInterval * 1000; //convert value to seconds

    if (
      Math.abs(motion.x) > shakeThreshold ||
      Math.abs(motion.y) > shakeThreshold ||
      Math.abs(motion.z) > shakeThreshold
    ) {
      if (currentTime - lastShakeTime > interval) {
        setShakesCount((prevCount) => prevCount + 1);
        setLastShakeTime(currentTime);
        triggerShake();
      }
    }
  }, [motion, shakesInterval, lastShakeTime]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRequestPermission = () => {
    requestPermission();
  };

  if (!isMounted) {
    return (
      <div className="mx-auto flex h-[300px] w-full items-center justify-center rounded-sm border text-white lg:max-w-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="m-auto w-full space-y-4 text-white lg:max-w-xl">
      <p className="text-center">
        {"Permission Status: "}
        {isPermissionGranted ? (
          <span className="font-bold text-green-500">Granted</span>
        ) : (
          <span className="font-bold text-red-500">Not Granted</span>
        )}
      </p>

      {error && (
        <div className="space-y-4 text-center text-red-500">
          <p>{error.message}</p>

          <button
            onClick={handleRequestPermission}
            className="w-full rounded-sm bg-green-600 p-2 text-center text-white hover:bg-green-500 hover:text-green-900"
          >
            Grant Permission
          </button>
        </div>
      )}

      {!isSupported && (
        <div className="text-center text-red-500">
          Your device is not supported. This app requires motion and orientation
          sensors. Please try another device.
        </div>
      )}

      {!error && isSupported && !isPermissionGranted && (
        <div className="space-y-4">
          <p className="rouned-sm border border-white p-2">
            This app needs access to the device&apos;s motion and orientation
            data in order to function properly.
          </p>

          <button
            onClick={handleRequestPermission}
            className="w-full rounded-sm bg-green-600 p-2 text-center hover:bg-green-500 hover:text-green-900"
          >
            Grant Permission
          </button>
        </div>
      )}

      {!error && isSupported && isPermissionGranted && (
        <>
          <div
            className={cn(
              "flex h-full items-center justify-center gap-4 rounded-lg border border-white p-4",
              isShaking ? "animate-shakeGlow bg-green-400" : "",
              isResetting ? "animate-reset" : ""
            )}
          >
            <div className="text-center">
              <div className="text-lg">Shake counter</div>
              <div className="text-[96px]">{shakesCount}</div>
            </div>
          </div>

          <button
            className="w-full bg-blue-600 p-2 hover:bg-blue-500 hover:text-blue-900"
            onClick={handleToolsToggle}
          >
            {isToolsVisible ? "Hide Tools" : " Show Tools"}
          </button>

          {isToolsVisible && (
            <>
              {motion.x !== null && motion.y !== null && motion.z !== null && (
                <OrientationDisplay x={motion.x} y={motion.y} z={motion.z} />
              )}

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

                <p className="w-full rounded-sm border p-2">
                  Shake counter interval in seconds: {shakesInterval}
                </p>
                <div className="flex flex-row gap-2">
                  {intervals.map((interval) => (
                    <button
                      key={interval}
                      className={cn(
                        "w-full rounded-sm bg-blue-600 p-2",
                        shakesInterval === interval
                          ? "bg-blue-300 text-blue-900"
                          : "hover:bg-blue-500 hover:text-blue-900"
                      )}
                      onClick={() => handleShakeInterval(interval)}
                    >
                      {interval}s
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
