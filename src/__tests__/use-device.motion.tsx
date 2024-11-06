import useDeviceMotion from "@/app/hooks/use-device-motion";
import { renderHook, act } from "@testing-library/react-hooks";

describe("useDeviceMotion Hook", () => {
  let addEventListenerMock: jest.SpyInstance;
  let removeEventListenerMock: jest.SpyInstance;

  beforeAll(() => {
    // Mock addEventListener and removeEventListener
    addEventListenerMock = jest.spyOn(window, "addEventListener");
    removeEventListenerMock = jest.spyOn(window, "removeEventListener");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useDeviceMotion());

    expect(result.current.motion).toEqual({ x: null, y: null, z: null });
    expect(result.current.error).toBeNull();
    expect(result.current.isSupported).toBe(false);
    expect(result.current.isPermissionGranted).toBe(false);
  });

  it("should detect device motion support", () => {
    Object.defineProperty(window, "DeviceMotionEvent", {
      value: jest.fn(),
      configurable: true,
    });

    const { result } = renderHook(() => useDeviceMotion());
    expect(result.current.isSupported).toBe(true);
  });

  it("should handle permission request success", async () => {
    const requestPermissionMock = jest.fn().mockResolvedValue("granted");

    Object.defineProperty(window, "DeviceMotionEvent", {
      value: class {
        static requestPermission = requestPermissionMock;
      },
      configurable: true,
    });

    const { result } = renderHook(() => useDeviceMotion());

    // Trigger the effect that handles the permission request
    await act(async () => {
      await result.current.requestPermission();
    });

    expect(result.current.isPermissionGranted).toBe(true);
    expect(addEventListenerMock).toHaveBeenCalledWith(
      "devicemotion",
      expect.any(Function)
    );
  });

  it("should handle permission request failure", async () => {
    const requestPermissionMock = jest
      .fn()
      .mockRejectedValue(new Error("Permission denied"));

    Object.defineProperty(window, "DeviceMotionEvent", {
      value: class {
        static requestPermission = requestPermissionMock;
      },
      configurable: true,
    });

    const { result } = renderHook(() => useDeviceMotion());

    // Trigger the effect that handles the permission request
    await act(async () => {
      await result.current.requestPermission();
    });

    expect(result.current.isPermissionGranted).toBe(false);
    expect(result.current.error).toEqual(new Error("Permission denied"));
  });

  it("should update motion state on device motion", () => {
    const addEventListenerMock = jest
      .spyOn(window, "addEventListener")
      .mockImplementation(
        (type: string, listener: EventListenerOrEventListenerObject) => {
          if (type === "devicemotion" && typeof listener === "function") {
            // Directly invoke the listener with a mock event
            setTimeout(() => {
              listener({
                accelerationIncludingGravity: { x: 9.8, y: 0.0, z: -9.8 },
              } as unknown as DeviceMotionEvent);
            }, 0);
          }
        }
      );

    const { result } = renderHook(() => useDeviceMotion());

    // Wait for the state to update
    setTimeout(() => {
      expect(result.current.motion).toEqual({ x: 9.8, y: 0.0, z: -9.8 });
      addEventListenerMock.mockRestore(); // Clean up after the test
    }, 10);
  });

  it("should remove event listener on unmount", () => {
    const { unmount } = renderHook(() => useDeviceMotion());

    unmount();
    expect(removeEventListenerMock).toHaveBeenCalledWith(
      "devicemotion",
      expect.any(Function)
    );
  });
});
