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

  const isSupported = typeof window.DeviceOrientationEvent !== "undefined";

  const [isPermissionGranted, setIsPermissionGranted] = useState(
    typeof (DeviceOrientationEvent as unknown as DeviceOrientationEventExtended)
      .requestPermission !== "function"
  );

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    setOrientation({
      x: event.alpha,
      y: event.beta,
      z: event.gamma,
      absolute: event.absolute,
    });
  }, []);

  useEffect(() => {
    if (isPermissionGranted) {
      window.addEventListener("deviceorientation", handleOrientation);
      return () => {
        window.removeEventListener("deviceorientation", handleOrientation);
      };
    }
  }, [isPermissionGranted, handleOrientation]);

  const requestPermission = useCallback(async () => {
    const deviceOrientationEvent =
      DeviceOrientationEvent as unknown as DeviceOrientationEventExtended;

    if (typeof deviceOrientationEvent.requestPermission === "function") {
      try {
        const permissionState =
          await deviceOrientationEvent.requestPermission();
        setIsPermissionGranted(permissionState === "granted");
      } catch (error) {
        setError(error as Error);
      }
    }
  }, []);

  return {
    error,
    orientation,
    requestPermission,
    isPermissionGranted,
    isSupported,
  };
}

export default useDeviceOrientation;
