"use client";

import { useState, useEffect } from "react";

const getOrientation = () => {
  if (typeof window !== "undefined") {
    return window.screen.orientation.type;
  }
  return null;
};

const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState<null | string>(
    getOrientation()
  );

  const updateOrientation = () => {
    setOrientation(getOrientation());
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("orientationchange", updateOrientation);
      return () => {
        window.removeEventListener("orientationchange", updateOrientation);
      };
    }
  }, []);

  return orientation;
};

export default useScreenOrientation;
