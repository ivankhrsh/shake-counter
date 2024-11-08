"use client";

import { useCallback } from "react";

export default function useVibration() {
  // Check for vibration support once, store result
  const canVibrate = typeof window !== "undefined" && "vibrate" in navigator;

  const vibrate = useCallback(
    (duration = 200) => {
      if (canVibrate) {
        window.navigator.vibrate(duration);
      }
    },
    [canVibrate]
  );

  return vibrate;
}
