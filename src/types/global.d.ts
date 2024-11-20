export {};

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        lockOrientation: () => void;
        unlockOrientation: () => void;
        Accelerometer: {
          isStarted: boolean;
          x: number;
          y: number;
          z: number;
          start: (
            params: { refresh_rate?: number },
            callback?: (success: boolean) => void
          ) => void;
          stop: (callback?: (success: boolean) => void) => void;
        };
        Gyroscope: {
          isStarted: boolean;
          x: number;
          y: number;
          z: number;
          start: (
            params: { refresh_rate?: number },
            callback?: (success: boolean) => void
          ) => void;
          stop: (callback?: (success: boolean) => void) => void;
        };
        DeviceOrientation: {
          isStarted: boolean;
          absolute: boolean;
          alpha: number;
          beta: number;
          gamma: number;
          start: (
            params: { refresh_rate?: number; need_absolute?: boolean },
            callback?: (success: boolean) => void
          ) => void;
          stop: (callback?: (success: boolean) => void) => void;
        };
        isFullscreen: boolean;
        offEvent: (eventName: string, func: unknown) => void;
        onEvent: (eventName: string, func: unknown) => void;
        exitFullscreen: () => void;
        requestFullscreen: () => void;
        version: string;
      };
    };
  }
}
