"use client";
import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import Button from "../button/Button";
import { getTollsBetweenOriginAndDestination } from "@/apicalls/tollGuru";
import DropDown from "../dropDown/DropDown";
import { GroupedOption, OptionInterface } from "../dropDown/data";
import { SingleValue } from "react-select";
import RouteMap from "../routeMap/RouteMap";
import { LatLngExpression } from "leaflet";

type Props = {};

export default function TollCalculateForm({}: Props) {
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [locations, setLocations] = useState({
    startLocation: "Kalimpong, West bengal",
    endLocation: "Bangalore",
  });

  const [markers, setMarkers] = useState<Markers>({
    start: {
      marker: {
        lat: "",
        lng: "",
      },
      address: "",
    },
    via: [],
    end: {
      marker: {
        lat: "",
        lng: "",
      },
      address: "",
    },
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

    setLoading(true);
    await getTollsBetweenOriginAndDestination(finalData)
      .then((res) => {
        setRoutes(res?.data?.routes ? res?.data?.routes : []);
        if (
          res?.data?.summary?.route &&
          res?.data?.summary?.route?.length > 0
        ) {
          const route = res?.data?.summary?.route;
          setMarkers((prev) => {
            let duplicate = { ...prev };
            duplicate.start.address = route[0].address;
            duplicate.start.marker = {
              lat: route[0].location.lat,
              lng: route[0].location.lng,
            };
            duplicate.end.address = route[route.length - 1].address;
            duplicate.end.marker = {
              lat: route[route.length - 1].location.lat,
              lng: route[route.length - 1].location.lng,
            };

            let viaRoutes = [];
            console.log("route", route);
            if (route.length > 2) {
              console.log("route.length", route.length);

              for (let i = 1; i < route.length - 1; i++) {
                console.log("via index", i);
                console.log("via ", route[i]);

                let obj = {
                  address: route[i].address,
                  marker: {
                    lat: route[i].location.lat,
                    lng: route[i].location.lng,
                  },
                };
                viaRoutes.push(obj);
              }
            }

            duplicate["via"] = viaRoutes;
            return duplicate;
          });
        }
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
      <div className="flex flex-col md:flex-row">
        <div className="flex-3 mx-4 my-6">
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
        <div className="flex-1 w-full">
          <RouteMap markers={markers} routes={routes} />
        </div>
      </div>
    </div>
  );
}
