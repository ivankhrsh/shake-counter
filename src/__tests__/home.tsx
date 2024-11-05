import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";
import useDeviceOrientation from "@/app/hooks/useDeviceOrientation";

jest.mock("@/app/hooks/useDeviceOrientation");

(useDeviceOrientation as jest.Mock).mockReturnValue({
  error: null,
  orientation: { x: 0, y: 0, z: 0 },
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
