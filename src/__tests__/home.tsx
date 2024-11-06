import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";
import useDeviceMotion from "@/app/hooks/use-device-motion";

jest.mock("@/app/hooks/use-device-motion");

(useDeviceMotion as jest.Mock).mockReturnValue({
  error: null,
  motion: { x: 0, y: 0, z: 0 },
  isPermissionGranted: true,
  requestPermission: jest.fn(),
  isSupported: true,
});

describe("Page", () => {
  it("renders title", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
