import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("@/app/hooks/use-device-motion", () => {
  return jest.fn();
});

import ShakeCounter from "@/app/components/shake-counter";
import useDeviceMotion from "@/app/hooks/use-device-motion";

describe("ShakeCounter Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays an error message if device is not supported", () => {
    (useDeviceMotion as jest.Mock).mockReturnValue({
      error: null,
      isSupported: false,
      isPermissionGranted: false,
      requestPermission: jest.fn(),
      motion: { x: null, y: null, z: null },
    });

    render(<ShakeCounter />);
    expect(
      screen.getByText(
        "Your device is not supported. This app requires motion and orientation sensors. Please try another device."
      )
    ).toBeInTheDocument();
  });

  it("displays permission request message if permission is not granted", () => {
    (useDeviceMotion as jest.Mock).mockReturnValue({
      error: null,
      isSupported: true,
      isPermissionGranted: false,
      requestPermission: jest.fn(),
      motion: { x: null, y: null, z: null },
    });

    render(<ShakeCounter />);
    expect(
      screen.getByText(
        "This app needs access to the device's motion and orientation data in order to function properly."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Grant Permission")).toBeInTheDocument();
  });

  it("calls requestPermission when the Grant Permission button is clicked", () => {
    const requestPermissionMock = jest.fn();
    (useDeviceMotion as jest.Mock).mockReturnValue({
      error: null,
      isSupported: true,
      isPermissionGranted: false,
      requestPermission: requestPermissionMock,
      motion: { x: null, y: null, z: null },
    });

    render(<ShakeCounter />);
    fireEvent.click(screen.getByText("Grant Permission"));
    expect(requestPermissionMock).toHaveBeenCalled();
  });

  it("displays shake counter and orientation values when permission is granted", () => {
    (useDeviceMotion as jest.Mock).mockReturnValue({
      error: null,
      isSupported: true,
      isPermissionGranted: true,
      requestPermission: jest.fn(),
      motion: { x: 10, y: 20, z: 30 },
    });

    render(<ShakeCounter />);
    const showButton = screen.getByText("Show Tools");
    fireEvent.click(showButton);
    const increaseButton = screen.getByText("Increase counter");
    fireEvent.click(increaseButton);

    expect(screen.getByText("Shake counter")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    expect(screen.getByText("x: 10")).toBeInTheDocument();
    expect(screen.getByText("y: 20")).toBeInTheDocument();
    expect(screen.getByText("z: 30")).toBeInTheDocument();
  });

  it("increments shake counter when Increase counter button is clicked", () => {
    (useDeviceMotion as jest.Mock).mockReturnValue({
      error: null,
      isSupported: true,
      isPermissionGranted: true,
      requestPermission: jest.fn(),
      motion: { x: null, y: null, z: null },
    });

    render(<ShakeCounter />);

    const toolsButton = screen.getByText("Show Tools");
    fireEvent.click(toolsButton);

    const increaseButton = screen.getByText("Increase counter");
    fireEvent.click(increaseButton);
    expect(screen.getByText("1")).toBeInTheDocument();
    fireEvent.click(increaseButton);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("resets shake counter when Reset counter button is clicked", () => {
    (useDeviceMotion as jest.Mock).mockReturnValue({
      error: null,
      isSupported: true,
      isPermissionGranted: true,
      requestPermission: jest.fn(),
      motion: { x: null, y: null, z: null },
    });

    render(<ShakeCounter />);

    const toolsButton = screen.getByText("Show Tools");
    fireEvent.click(toolsButton);

    const increaseButton = screen.getByText("Increase counter");
    const resetButton = screen.getByText("Reset counter");
    fireEvent.click(increaseButton);
    fireEvent.click(increaseButton);
    expect(screen.getByText("2")).toBeInTheDocument();

    fireEvent.click(resetButton);
    render(<ShakeCounter />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("updates shake interval when changing interval input", () => {
    (useDeviceMotion as jest.Mock).mockReturnValue({
      error: null,
      isSupported: true,
      isPermissionGranted: true,
      requestPermission: jest.fn(),
      motion: { x: null, y: null, z: null },
    });

    render(<ShakeCounter />);
    const toolsButton = screen.getByText("Show Tools");
    fireEvent.click(toolsButton);

    const intervalValue = screen.getByText(
      "Shake counter interval in seconds: 1"
    );

    const setValueButton = screen.getByText("2s");
    fireEvent.click(setValueButton);

    fireEvent.change(intervalValue, {
      target: "Shake counter interval in seconds: 2",
    });

    expect(intervalValue).toHaveTextContent(
      "Shake counter interval in seconds: 2"
    );
  });

  it("displays error message from hook when error exists", () => {
    const error = new Error("Permission denied");
    (useDeviceMotion as jest.Mock).mockReturnValue({
      error,
      isSupported: true,
      isPermissionGranted: false,
      requestPermission: jest.fn(),
      motion: { x: null, y: null, z: null },
    });

    render(<ShakeCounter />);
    expect(screen.getByText("Permission denied")).toBeInTheDocument();
  });

  it("toggles tools visibility when the Show/Hide Tools button is clicked", () => {
    (useDeviceMotion as jest.Mock).mockReturnValue({
      error: null,
      isSupported: true,
      isPermissionGranted: true,
      requestPermission: jest.fn(),
      motion: { x: 10, y: 20, z: 30 },
    });

    render(<ShakeCounter />);

    const toggleButton = screen.getByText("Show Tools");

    // Click to show tools
    fireEvent.click(toggleButton);
    expect(screen.getByText("x: 10")).toBeInTheDocument();
    expect(screen.getByText("y: 20")).toBeInTheDocument();
    expect(screen.getByText("z: 30")).toBeInTheDocument();
    expect(toggleButton).toHaveTextContent("Hide Tools");

    // Click to hide tools
    fireEvent.click(toggleButton);
    expect(screen.queryByText("x: 10")).not.toBeInTheDocument();
    expect(screen.queryByText("y: 20")).not.toBeInTheDocument();
    expect(screen.queryByText("z: 30")).not.toBeInTheDocument();
    expect(toggleButton).toHaveTextContent("Show Tools");
  });
});
