"use client";
import React, { useEffect, useState } from "react";

export default function UserAgent() {
  const [userAgent, setUserAgent] = useState("");

  useEffect(() => {
    // Get the user agent from the browser
    setUserAgent(navigator.userAgent);
  }, []);

  return (
    <div className="space-y-1">
      <h1>User Agent</h1>

      <p className="border border-white p-2">{userAgent}</p>
      <h2 className="text-red-500">
        New Telegram info is available on Android only
      </h2>
    </div>
  );
}
