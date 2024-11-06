"use client";
import { useEffect, useState } from "react";

interface DeviceMotionState {
  x: number | null;
  y: number | null;
  z: number | null;
}

interface DeviceMotionEventExtended extends DeviceMotionEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

function useDeviceMotion() {
  const [motion, setMotion] = useState<DeviceMotionState>({
    x: null,
    y: null,
    z: null,
  });

  const [error, setError] = useState<Error | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  const handleMotion = (event: DeviceMotionEvent) => {
    setMotion({
      x: event.accelerationIncludingGravity?.x ?? null,
      y: event.accelerationIncludingGravity?.y ?? null,
      z: event.accelerationIncludingGravity?.z ?? null,
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const supportCheck = typeof window.DeviceMotionEvent !== "undefined";
      setIsSupported(supportCheck);

      if (supportCheck && isPermissionGranted) {
        window.addEventListener("devicemotion", handleMotion);
      }
    }

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, [isPermissionGranted]);

  const requestPermission = async () => {
    setError(null);

    const deviceMotionEvent =
      DeviceMotionEvent as unknown as DeviceMotionEventExtended;

    if (typeof deviceMotionEvent.requestPermission === "function") {
      try {
        const permissionState = await deviceMotionEvent.requestPermission();
        if (permissionState === "granted") {
          setIsPermissionGranted(true);
          window.addEventListener("devicemotion", handleMotion);
        } else {
          setError(new Error("Permission denied for device motion"));
        }
      } catch (err) {
        setError(err as Error);
      }
    } else {
      setIsPermissionGranted(true);
      window.addEventListener("devicemotion", handleMotion);
    }
  };

  return {
    setError,
    error,
    motion,
    requestPermission,
    isPermissionGranted,
    isSupported,
  };
}

export default useDeviceMotion;
