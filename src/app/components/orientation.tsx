"use client";
import useScreenOrientation from "@/hooks/use-screen-orientation";
import React, { useEffect, useState } from "react";

export default function Orientation() {
  const orientation = useScreenOrientation();
  const [isTelegramWebAppAvailable, setIsTelegramWebAppAvailable] =
    useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      setIsTelegramWebAppAvailable(true);
    }
  }, []);

  const handleLockOrientation = () => {
    if (isTelegramWebAppAvailable) {
      window.Telegram.WebApp.lockOrientation();
    } else {
      console.error("Telegram WebApp API is not available.");
    }
  };

  const handleUnlockOrientation = () => {
    if (isTelegramWebAppAvailable) {
      window.Telegram.WebApp.unlockOrientation();
    } else {
      console.error("Telegram WebApp API is not available.");
    }
  };

  return (
    <div className="space-y-2">
      <h2>Device Orientation</h2>
      <div className="border border-white p-2">
        <p>{orientation}</p>
      </div>
      {isTelegramWebAppAvailable ? (
        <div className="flex gap-2">
          <button
            className="w-full rounded-sm bg-red-600 p-2 text-center text-white hover:bg-red-500 hover:text-red-900"
            onClick={handleLockOrientation}
          >
            Lock
          </button>
          <button
            className="w-full rounded-sm bg-green-600 p-2 text-center text-white hover:bg-green-500 hover:text-green-900"
            onClick={handleUnlockOrientation}
          >
            Unlock
          </button>
        </div>
      ) : (
        <div className="text-red-500">Telegram WebApp API is not available</div>
      )}
    </div>
  );
}
