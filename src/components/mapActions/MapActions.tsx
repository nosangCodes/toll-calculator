import React from "react";

type Props = {};

export default function MapActions({}: Props) {
  return (
    <div className="flex-col gap-2">
      <button className="w-full">Get Directions</button>
      <button className="w-full">Tolls</button>
    </div>
  );
}
