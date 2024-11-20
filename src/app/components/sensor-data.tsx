"use client";
import React, { useState, useEffect } from "react";
type StartFunction = (
  params: { refresh_rate?: number },
  callback?: (success: boolean) => void
) => void;

type StopFunction = (callback?: (success: boolean) => void) => void;

export default function SensorData() {
  const [accelerometerData, setAccelerometerData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [gyroscopeData, setGyroscopeData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [orientationData, setOrientationData] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const isTelegramWebAppAvailable =
    typeof window !== "undefined" && window.Telegram?.WebApp;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!isTelegramWebAppAvailable) {
      setError("Telegram WebApp API is not available.");
      return;
    }

    const { Accelerometer, Gyroscope, DeviceOrientation } =
      window.Telegram!.WebApp;

    const startTracking = (
      sensor: { start: StartFunction; stop: StopFunction },
      sensorName: string
    ) => {
      sensor.start({ refresh_rate: 100 }, (success) => {
        if (!success) {
          setError(`Failed to start ${sensorName} tracking.`);
        }
      });
    };

    startTracking(Accelerometer, "accelerometer");
    startTracking(Gyroscope, "gyroscope");
    startTracking(DeviceOrientation, "device orientation");

    const updateSensorData = () => {
      setAccelerometerData({
        x: Accelerometer.x,
        y: Accelerometer.y,
        z: Accelerometer.z,
      });
      setGyroscopeData({
        x: Gyroscope.x,
        y: Gyroscope.y,
        z: Gyroscope.z,
      });
      setOrientationData({
        alpha: DeviceOrientation.alpha,
        beta: DeviceOrientation.beta,
        gamma: DeviceOrientation.gamma,
      });
    };

    const intervalId = setInterval(updateSensorData, 100);

    return () => {
      clearInterval(intervalId);
      Accelerometer.stop();
      Gyroscope.stop();
      DeviceOrientation.stop();
    };
  }, [isTelegramWebAppAvailable]);

  return (
    <div className="space-y-2">
      <h2>Sensor Data</h2>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <div className="border border-white p-2">
            <h3>Accelerometer</h3>
            {accelerometerData && (
              <>
                <p>X: {accelerometerData.x.toFixed(2)}</p>
                <p>Y: {accelerometerData.y.toFixed(2)}</p>
                <p>Z: {accelerometerData.z.toFixed(2)}</p>
              </>
            )}
          </div>
          <div className="border border-white p-2">
            <h3>Gyroscope</h3>
            {gyroscopeData && (
              <>
                <p>X: {gyroscopeData.x.toFixed(2)}</p>
                <p>Y: {gyroscopeData.y.toFixed(2)}</p>
                <p>Z: {gyroscopeData.z.toFixed(2)}</p>
              </>
            )}
          </div>
          <div className="border border-white p-2">
            <h3>Device Orientation</h3>
            {orientationData && (
              <>
                <p>Alpha: {orientationData.alpha.toFixed(2)}</p>
                <p>Beta: {orientationData.beta.toFixed(2)}</p>
                <p>Gamma: {orientationData.gamma.toFixed(2)}</p>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
