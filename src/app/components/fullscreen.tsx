"use client";
import React, { useState, useEffect } from "react";

const FullscreenToggle = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const { WebApp } = window.Telegram;

      // Update fullscreen state when it changes
      const handleFullscreenChange = () => {
        setIsFullscreen(WebApp.isFullscreen);
      };

      // Handle fullscreen request failures
      const handleFullscreenFailed = (error: { error: string }) => {
        setError(`Fullscreen request failed: ${error.error}`);
      };

      WebApp.onEvent("fullscreenChanged", handleFullscreenChange);
      WebApp.onEvent("fullscreenFailed", handleFullscreenFailed);

      // Cleanup event listeners on component unmount
      return () => {
        WebApp.offEvent("fullscreenChanged", handleFullscreenChange);
        WebApp.offEvent("fullscreenFailed", handleFullscreenFailed);
      };
    } else {
      setError("Telegram WebApp API is not available.");
    }
  }, []);

  const toggleFullscreen = () => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const { WebApp } = window.Telegram;
      if (WebApp.isFullscreen) {
        WebApp.exitFullscreen();
      } else {
        WebApp.requestFullscreen();
      }
    } else {
      setError("Telegram WebApp API is not available.");
    }
  };

  return (
    <div className="space-y-2">
      <h2>Fullscreen Info</h2>
      {error && <div className="text-red-500">{error}</div>}

      {!error && (
        <button
          className="w-full rounded-sm bg-yellow-600 p-2 text-center text-white hover:bg-yellow-500 hover:text-yellow-900"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        </button>
      )}
    </div>
  );
};

export default FullscreenToggle;
