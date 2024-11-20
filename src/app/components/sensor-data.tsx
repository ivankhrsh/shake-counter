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
  const [isTracking, setIsTracking] = useState(false); // Added state to track whether sensors are active

  const isTelegramWebAppAvailable =
    typeof window !== "undefined" && window.Telegram?.WebApp;

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

  const stopTracking = (
    sensor: { start: StartFunction; stop: StopFunction },
    sensorName: string
  ) => {
    sensor.stop((success) => {
      if (!success) {
        setError(`Failed to stop ${sensorName} tracking.`);
      }
    });
  };

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

    // Only start tracking if `isTracking` is true
    if (isTracking) {
      startTracking(Accelerometer, "accelerometer");
      startTracking(Gyroscope, "gyroscope");
      startTracking(DeviceOrientation, "device orientation");
    } else {
      stopTracking(Accelerometer, "accelerometer");
      stopTracking(Gyroscope, "gyroscope");
      stopTracking(DeviceOrientation, "device orientation");
    }

    const updateSensorData = () => {
      setAccelerometerData({
        x: Accelerometer.x || 0,
        y: Accelerometer.y || 0,
        z: Accelerometer.z || 0,
      });
      setGyroscopeData({
        x: Gyroscope.x || 0,
        y: Gyroscope.y || 0,
        z: Gyroscope.z || 0,
      });
      setOrientationData({
        alpha: DeviceOrientation.alpha || 0,
        beta: DeviceOrientation.beta || 0,
        gamma: DeviceOrientation.gamma || 0,
      });
    };

    const intervalId = isTracking ? setInterval(updateSensorData, 100) : null;

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (isTracking) {
        Accelerometer.stop();
        Gyroscope.stop();
        DeviceOrientation.stop();
      }
    };
  }, [isTelegramWebAppAvailable, isTracking]);

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
                <p>X: {(accelerometerData.x || 0).toFixed(2)}</p>
                <p>Y: {(accelerometerData.y || 0).toFixed(2)}</p>
                <p>Z: {(accelerometerData.z || 0).toFixed(2)}</p>
              </>
            )}
          </div>
          <div className="border border-white p-2">
            <h3>Gyroscope</h3>
            {gyroscopeData && (
              <>
                <p>X: {(gyroscopeData.x || 0).toFixed(2)}</p>
                <p>Y: {(gyroscopeData.y || 0).toFixed(2)}</p>
                <p>Z: {(gyroscopeData.z || 0).toFixed(2)}</p>
              </>
            )}
          </div>
          <div className="border border-white p-2">
            <h3>Device Orientation</h3>
            {orientationData && (
              <>
                <p>Alpha: {(orientationData.alpha || 0).toFixed(2)}</p>
                <p>Beta: {(orientationData.beta || 0).toFixed(2)}</p>
                <p>Gamma: {(orientationData.gamma || 0).toFixed(2)}</p>
              </>
            )}
          </div>
        </>
      )}

      {/* Controls to Start and Stop Tracking */}
      <div>
        <button
          onClick={() => setIsTracking((prevState) => !prevState)}
          className="w-full rounded-sm bg-fuchsia-600 p-2 text-center text-white hover:bg-fuchsia-500 hover:text-fuchsia-900"
        >
          {isTracking ? " Stop Tracking" : "Start Tracking"}
        </button>
      </div>
    </div>
  );
}
