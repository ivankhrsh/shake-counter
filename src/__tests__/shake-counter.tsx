import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Mock the useDeviceOrientation hook
jest.mock("@/app/hooks/useDeviceOrientation", () => {
  return jest.fn();
});

import ShakeCounter from "@/app/components/shake-counter";
import useDeviceOrientation from "@/app/hooks/useDeviceOrientation";

describe("ShakeCounter Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it("displays an error message if device is not supported", () => {
    (useDeviceOrientation as jest.Mock).mockReturnValue({
      error: null,
      isSupported: false,
      isPermissionGranted: false,
      requestPermission: jest.fn(),
      orientation: { x: null, y: null, z: null },
    });

    render(<ShakeCounter />);
    expect(
      screen.getByText("Your device is not supported. Please try another one.")
    ).toBeInTheDocument();
  });

  it("displays permission request message if permission is not granted", () => {
    (useDeviceOrientation as jest.Mock).mockReturnValue({
      error: null,
      isSupported: true,
      isPermissionGranted: false,
      requestPermission: jest.fn(),
      orientation: { x: null, y: null, z: null },
    });

    render(<ShakeCounter />);
    expect(
      screen.getByText(
        "This app needs access to the device's motion and orientation data in order to function properly."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Grand Permission")).toBeInTheDocument();
  });

  it("calls requestPermission when the Grant Permission button is clicked", () => {
    const requestPermissionMock = jest.fn();
    (useDeviceOrientation as jest.Mock).mockReturnValue({
      error: null,
      isSupported: true,
      isPermissionGranted: false,
      requestPermission: requestPermissionMock,
      orientation: { x: null, y: null, z: null },
    });

    render(<ShakeCounter />);
    fireEvent.click(screen.getByText("Grand Permission"));
    expect(requestPermissionMock).toHaveBeenCalled();
  });

  it("displays shake counter and orientation values when permission is granted", () => {

    (useDeviceOrientation as jest.Mock).mockReturnValue({
      error: null,
      isSupported: true,
      isPermissionGranted: true,
      requestPermission: jest.fn(),
      orientation: { x: 10, y: 20, z: 30 },
    });

    render(<ShakeCounter />);

    const increaseButton = screen.getByText("Increase counter");
    fireEvent.click(increaseButton);

    expect(screen.getByText("Shake counter")).toBeInTheDocument();

    expect(screen.getByText("1")).toBeInTheDocument();

    expect(screen.getByText("x: 10")).toBeInTheDocument();
    expect(screen.getByText("y: 20")).toBeInTheDocument();
    expect(screen.getByText("z: 30")).toBeInTheDocument();
  });

  it("increments shake counter when Increase counter button is clicked", () => {
    (useDeviceOrientation as jest.Mock).mockReturnValue({
      error: null,
      isSupported: true,
      isPermissionGranted: true,
      requestPermission: jest.fn(),
      orientation: { x: null, y: null, z: null },
    });

    render(<ShakeCounter />);

    const increaseButton = screen.getByText("Increase counter");
    fireEvent.click(increaseButton);
    expect(screen.getByText("1")).toBeInTheDocument();
    fireEvent.click(increaseButton);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("resets shake counter when Reset counter button is clicked", () => {
    (useDeviceOrientation as jest.Mock).mockReturnValue({
      error: null,
      isSupported: true,
      isPermissionGranted: true,
      requestPermission: jest.fn(),
      orientation: { x: null, y: null, z: null },
    });

    render(<ShakeCounter />);
    const increaseButton = screen.getByText("Increase counter");
    const resetButton = screen.getByText("Reset counter");

    fireEvent.click(increaseButton);
    fireEvent.click(increaseButton);
    expect(screen.getByText("2")).toBeInTheDocument();

    fireEvent.click(resetButton);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("updates shake interval when changing interval input", () => {
    (useDeviceOrientation as jest.Mock).mockReturnValue({
      error: null,
      isSupported: true,
      isPermissionGranted: true,
      requestPermission: jest.fn(),
      orientation: { x: null, y: null, z: null },
    });

    render(<ShakeCounter />);
    const intervalInput = screen.getByLabelText("Shake counter interval");

    fireEvent.change(intervalInput, { target: { value: "2" } });
    expect(intervalInput).toHaveValue(2);
  });

  it("displays error message from hook when error exists", () => {
    const error = new Error("Permission denied");
    (useDeviceOrientation as jest.Mock).mockReturnValue({
      error,
      isSupported: true,
      isPermissionGranted: false,
      requestPermission: jest.fn(),
      orientation: { x: null, y: null, z: null },
    });

    render(<ShakeCounter />);
    expect(screen.getByText("Permission denied")).toBeInTheDocument();
  });
});
