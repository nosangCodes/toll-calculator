import { formatToCurrency } from "@/utils/formatter";
import React from "react";

type Props = {
  petrolPrice: number;
  tollCost: number;
  distance: string;
  duration: string;
};

export default function TollDetails({
  petrolPrice,
  tollCost,
  distance,
  duration,
}: Props) {
  return (
    <div className="mt-5">
      <p className="text-sm">
        <span className="font-semibold text-lg">Petrol Price</span>{" "}
        {formatToCurrency(petrolPrice)}
      </p>
      <p className="text-sm">
        <span className="font-semibold text-lg">Tolls</span>{" "}
        {formatToCurrency(tollCost)}
      </p>
      <p className="text-sm">
        <span className="font-semibold text-lg">Distance</span> {distance}
      </p>
      <p className="text-sm">
        <span className="font-semibold text-lg">Duration</span> {duration}
      </p>
    </div>
  );
}
