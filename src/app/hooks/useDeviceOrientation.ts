"use client";
import { useCallback, useEffect, useState } from "react";

interface DeviceOrientationState {
  x: number | null;
  y: number | null;
  z: number | null;
  absolute: boolean;
}

interface DeviceOrientationEventExtended extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

function useDeviceOrientation() {
  const [orientation, setOrientation] = useState<DeviceOrientationState>({
    x: null,
    y: null,
    z: null,
    absolute: false,
  });
  const [error, setError] = useState<Error | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    setOrientation({
      x: event.alpha,
      y: event.beta,
      z: event.gamma,
      absolute: event.absolute,
    });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const supportCheck = typeof window.DeviceOrientationEvent !== "undefined";
      setIsSupported(supportCheck);

      if (supportCheck) {
        const deviceOrientationEvent =
          DeviceOrientationEvent as unknown as DeviceOrientationEventExtended;

        setIsPermissionGranted(
          typeof deviceOrientationEvent.requestPermission !== "function"
        );

        if (isPermissionGranted) {
          window.addEventListener("deviceorientation", handleOrientation);
          return () => {
            window.removeEventListener("deviceorientation", handleOrientation);
          };
        }
      }
    }
  }, [isPermissionGranted, handleOrientation]);

  const requestPermission = useCallback(async () => {
    if (typeof window !== "undefined") {
      const deviceOrientationEvent =
        DeviceOrientationEvent as unknown as DeviceOrientationEventExtended;

      if (typeof deviceOrientationEvent.requestPermission === "function") {
        try {
          const permissionState =
            await deviceOrientationEvent.requestPermission();
          if (permissionState === "granted") {
            setIsPermissionGranted(true);
            window.addEventListener("deviceorientation", handleOrientation);
          } else {
            setError(new Error("Permission denied"));
          }
        } catch (error) {
          setError(error as Error);
        }
      }
    }
  }, [handleOrientation]);

  return {
    error,
    orientation,
    requestPermission,
    isPermissionGranted,
    isSupported,
  };
}

export default useDeviceOrientation;
