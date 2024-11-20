"use client";
import useScreenOrientation from "@/hooks/use-screen-orientation";
import React from "react";

export default function Orientation() {
  const orientation = useScreenOrientation();

  const handleLockOrientation = () => {
    if (window.Telegram?.WebApp?.lockOrientation) {
      window.Telegram.WebApp.lockOrientation();
    } else {
      console.error("Telegram WebApp API is not available.");
    }
  };

  const handleUnlockOrientation = () => {
    if (window.Telegram?.WebApp?.unlockOrientation) {
      window.Telegram.WebApp.unlockOrientation();
    } else {
      console.error("Telegram WebApp API is not available.");
    }
  };

  const isTelegramWebAppAvailable =
    typeof window !== "undefined" && window.Telegram?.WebApp;

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
