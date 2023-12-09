"use client";
import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import Button from "../button/Button";
import { getTollsBetweenOriginAndDestination } from "@/apicalls/tollGuru";
import DropDown from "../dropDown/DropDown";
import { GroupedOption, OptionInterface } from "../dropDown/data";
import { SingleValue } from "react-select";

type Props = {};

export default function TollCalculateForm({}: Props) {
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState({
    startLocation: "Kalimpong, West bengal",
    endLocation: "Bangalore",
  });
  const [wayPoints, setWayPoints] = useState<{ address: string }[]>([
    {
      address: "Kolkata",
    },
  ]);

  const [vehicle, setVehicle] = useState<SingleValue<GroupedOption>>();

  const handleChangeLocaiion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocations((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeWaypointValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setWayPoints((prev) => {
      let duplicate = [...prev];
      duplicate[index]["address"] = e.target.value;
      return duplicate;
    });
  };

  const hadnleAddWayPoint = () => {
    setWayPoints((prev) => [...prev, { address: "" }]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let finalData = {
      from: {
        address: locations.startLocation,
      },
      to: {
        address: locations.endLocation,
      },
      waypoints: wayPoints,
      vehicle: {
        type: vehicle?.value,
      },
    };

    console.log("submitting", finalData);

    setLoading(true);
    await getTollsBetweenOriginAndDestination(finalData)
      .then((res) => {
        console.log("result", res);
      })
      .catch((error) => {
        console.error("error", error);
      })
      .finally(() => {
        console.log("settled");
        setLoading(false);
      });
  };


  return (
    <div>
      <div className="flex flex-row">
        <div className="flex-2 mx-4 my-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input
              required={true}
              name="startLocation"
              value={locations.startLocation}
              className="w-full"
              placeholder="Start Location"
              onChange={handleChangeLocaiion}
            />
            {wayPoints.map((item, index: number) => (
              <div key={index} className="flex flex-row gap-2">
                <Input
                  value={wayPoints[index]["address"]}
                  onChange={(e) => handleChangeWaypointValue(e, index)}
                  className="w-full"
                  placeholder="Way Point(Optional)"
                  name={`waypoint-${index}`}
                />
                {index === 0 && (
                  <Button label="Add" onClick={hadnleAddWayPoint} />
                )}
              </div>
            ))}
            <Input
              required={true}
              name="endLocation"
              value={locations.endLocation}
              onChange={handleChangeLocaiion}
              className="w-full"
              placeholder="Destination"
            />
            <DropDown
              value={vehicle}
              onChange={(option) => setVehicle(option)}
            />
            <Button
              label={loading ? "Loading..." : "Submit"}
              type="submit"
              className="w-full border border-gray-700 px-2 py-1 rounded-sm"
            />
          </form>
        </div>
        <div className="flex-3"></div>
      </div>
    </div>
  );
}
