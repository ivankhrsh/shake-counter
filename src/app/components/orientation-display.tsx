import React from "react";

interface Props {
  x: number;
  y: number;
  z: number;
}

export default function OrientationDisplay({ x, y, z }: Props) {
  return (
    <div className="rounded-lg border border-white p-4 text-center">
      <h3 className="font-bold">Orientation</h3>
      <p>x: {x}</p>
      <p>y: {y}</p>
      <p>z: {z}</p>
    </div>
  );
}
