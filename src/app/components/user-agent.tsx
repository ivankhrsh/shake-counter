"use client";
import React, { useEffect, useState } from "react";

export default function UserAgent() {
  const [userAgent, setUserAgent] = useState("");
  const [telegramVersion, setTelegramVersion] = useState("");

  useEffect(() => {
    // Get the user agent from the browser
    setUserAgent(navigator.userAgent);

    // Check if window.Telegram and Telegram.WebApp are available
    if (
      typeof window !== "undefined" &&
      window.Telegram &&
      window.Telegram.WebApp
    ) {
      setTelegramVersion(window.Telegram.WebApp.version);
    } else {
      setTelegramVersion("Telegram WebApp object is not available.");
    }
  }, []);

  return (
    <div className="space-y-1">
      <h1>User Agent</h1>
      <p className="border border-white p-2">{userAgent}</p>
      <h2 className="text-red-500">
        New Telegram info is available on Android only
      </h2>
      <div>
        <h3>Telegram Client Version</h3>
        <p className="border border-blue-500 p-2">
          {telegramVersion || "Unknown"}
        </p>
      </div>
    </div>
  );
}
