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
import SelectDropdown from "../selectDropdown/SelectDropdown";
import { getPlaces } from "@/apicalls/places";
import TollDetails from "../tolldetails/TollDetails";
import Image from "next/image";
import IconInfo from "../iconsInfo/IconInfo";

type Props = {};

export default function TollCalculateForm({}: Props) {
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [startLocation, setStartLocation] = useState<SelectOption>();
  const [endLocation, setEndLocation] = useState<SelectOption>();
  const [locationResults, setLocationResults] = useState<SelectOption[]>([]);
  const [loadingSearchResults, setLoadingSearchResults] = useState(false);
  const [locations, setLocations] = useState({
    startLocation: "",
    endLocation: "",
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
  const [wayPoints, setWayPoints] = useState<SelectOption[]>([
    {
      label: "",
      value: undefined,
    },
  ]);

  const [vehicle, setVehicle] = useState<SingleValue<GroupedOption>>();

  const handlechangeLocationValue = (
    name: string,
    value: SelectOption,
    index?: number
  ) => {
    if (name === "startLocation") {
      setStartLocation(value);
    } else if (name === "endLocation") {
      setEndLocation(value);
    } else {
      if (typeof index === "number") {
        setWayPoints((prev) => {
          let duplicate = [...prev];
          duplicate[index] = value;
          return duplicate;
        });
      }
    }
  };

  const handleChangeLocaiion = (name: string, value: string) => {
    // const { name, value } = e.target;
    setLocations((prev) => ({
      ...prev,
      startLocation: value,
    }));
  };

  const handleClear = (name: string, index?: number) => {
    if (name === "startLocation") {
      setStartLocation(undefined);
    } else if (name === "endLocation") {
      setEndLocation(undefined);
    } else {
      if (typeof index === "number") {
        setWayPoints((prev) => {
          let duplicate = [...prev];
          duplicate[index] = { label: "", value: undefined };
          return duplicate;
        });
      }
    }
  };

  const hadnleAddWayPoint = () => {
    setWayPoints((prev) => [
      ...prev,
      {
        label: "",
        value: undefined,
      },
    ]);
  };

  const handleRemoveWaypoint = (index: number) => {
    let duplicate = [...wayPoints];
    duplicate.splice(index, 1);
    setWayPoints(duplicate);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (startLocation?.value && endLocation?.value) {
      let finalData = {
        from: {
          ...startLocation?.value,
        },
        to: {
          ...endLocation?.value,
        },
        waypoints: wayPoints?.[0]?.value?.lat
          ? wayPoints?.map((item) => ({ ...item.value }))
          : [],
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
              if (route.length > 2) {
                for (let i = 1; i < route.length - 1; i++) {
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
          setLoading(false);
        });
    }
  };

  // search location

  useEffect(() => {
    if (locations.startLocation || locations.endLocation) {
      const timer = setTimeout(() => {
        setLoadingSearchResults(true);
        getPlaces(locations.startLocation)
          .then((res) => {
            let formatted: SelectOption[] = [];
            if (res.data.results?.length > 0) {
              res.data.results?.map((item: PlacesResult) => {
                let obj = {
                  label: item.address.freeformAddress,
                  value: {
                    lat: item.position.lat,
                    lng: item.position.lon,
                  },
                };
                formatted.push(obj);
              });
            }
            setLocationResults(formatted);
          })
          .catch((err) => console.log("something went wrong!"))
          .finally(() => setLoadingSearchResults(false));
      }, 1500);
      return () => {
        console.log("clearing...");
        clearInterval(timer);
      };
    }
  }, [locations]);

  useEffect(() => {
    console.log("start Location", startLocation);
    console.log("End Location", endLocation);
    console.log("wayoints", wayPoints);
  }, [startLocation, endLocation, wayPoints]);

  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className="mx-auto md:mx-4 my-6 w-full md:w-1/3">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <SelectDropdown
              required
              name="startLocation"
              value={startLocation}
              placeholder="Start Location"
              handleChangeInput={handleChangeLocaiion}
              options={locationResults}
              isLoading={loadingSearchResults}
              onChange={handlechangeLocationValue}
              handleClear={() => handleClear("startLocation")}
            />

            {wayPoints.map((item, index: number) => (
              <div key={index} className="flex flex-row gap-2 items-center">
                <SelectDropdown
                  name={`waypoint-${index}`}
                  value={item?.value ? item : undefined}
                  placeholder="Way Point(Optional)"
                  // inputValue={locations.startLocation}
                  handleChangeInput={handleChangeLocaiion}
                  options={locationResults}
                  isLoading={loadingSearchResults}
                  onChange={(name, value) =>
                    handlechangeLocationValue(name, value, index)
                  }
                  handleClear={() => handleClear("waypoint", index)}
                />
                {index === 0 && (
                  <Button label="Add" onClick={hadnleAddWayPoint} />
                )}
                {index !== 0 && (
                  <Button
                    label="Remove"
                    onClick={() => handleRemoveWaypoint(index)}
                  />
                )}
              </div>
            ))}
            <SelectDropdown
              required
              name="endLocation"
              value={endLocation}
              placeholder="Destination"
              // inputValue={locations.startLocation}
              handleChangeInput={handleChangeLocaiion}
              options={locationResults}
              isLoading={loadingSearchResults}
              onChange={handlechangeLocationValue}
              handleClear={() => handleClear("endLocation")}
            />
            <DropDown
              value={vehicle}
              onChange={(option) => setVehicle(option)}
              required
            />
            <Button
              label={loading ? "Loading..." : "Submit"}
              type="submit"
              className="w-full hover:text-white hover:bg-slate-700 border border-gray-700 px-2 py-1 rounded-sm"
            />
            {routes?.[0]?.summary?.url && (
              <a
                className="w-full hover:text-white hover:bg-slate-700 border border-gray-700 px-2 py-1 rounded-sm"
                href={routes?.[0]?.summary?.url}
                target="_black"
              >
                Get directions
              </a>
            )}
          </form>
          {routes && routes?.length > 0 && (
            <TollDetails
              petrolPrice={routes?.[0]?.costs?.fuel}
              tollCost={routes?.[0]?.costs?.minimumTollCost}
              distance={routes?.[0]?.summary?.distance?.metric}
              duration={routes?.[0]?.summary?.duration?.text}
            />
          )}
        </div>
        <div className="flex-1 w-full">
          <RouteMap
            startLocation={startLocation}
            endLocation={endLocation}
            markers={markers}
            routes={routes}
            wayPoints={wayPoints}
          />
          <IconInfo />
        </div>
      </div>
    </div>
  );
}
