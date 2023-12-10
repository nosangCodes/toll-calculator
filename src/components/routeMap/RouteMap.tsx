"use client";
import { decodePolyline } from "@/apicalls/polyline";
import { getTollsByPolyline } from "@/apicalls/tollGuru";
import { LatLngExpression, marker } from "leaflet";
import { useEffect, useState } from "react";
import { Marker, Polyline, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap, useMapEvents } from "react-leaflet/hooks";
import {
  endIcon,
  startIcon,
  tollIcon,
  viaIcon,
} from "@/utils/leaftletCustomIcons";

const limeOptions = { color: "lime" };
type Props = { routes: Route[]; markers: Markers };

export default function RouteMap({ routes, markers }: Props) {
  const [tolls, setTolls] = useState<Toll[]>([]);
  const [decodedPolyline, setdecodedPolyline] = useState<
    LatLngExpression[] | LatLngExpression[][]
  >([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | undefined>();

  useEffect(() => {
    console.log("markers", markers);
    return () => {
      setTolls([]);
      setdecodedPolyline([]);
      setSelectedRoute(undefined);
    };
  }, [markers]);

  useEffect(() => {
    if (routes && routes.length > 0) {
      setSelectedRoute(routes[0]);
    }
    return () => {
      setTolls([]);
      setdecodedPolyline([]);
    };
  }, [routes]);

  useEffect(() => {
    if (selectedRoute?.polyline) {
      // get decoded polyline
      decodePolyline(selectedRoute.polyline)
        .then((res) => {
          setdecodedPolyline(res.decoededPolyline);
        })
        .catch((err) => {
          console.error("Something went wrong", err);
        });

      // get tolls
      getTollsByPolyline({
        source: "here",
        polyline: selectedRoute.polyline,
      })
        .then((res) => {
          if (res?.data?.route?.hasTolls) {
            let formattedTolls = [];

            formattedTolls = res.data.route.tolls.map((item: Toll) => {
              if (item.type === "barrier") {
                return item;
              } else return { ...item.start, ...item };
            });
            setTolls(formattedTolls);
          }
        })
        .catch((err) => {
          console.error("Something went wrong", err);
        });
    }

    return () => {};
  }, [selectedRoute]);
  return (
    <div className="h-[80vh]">
      <MapContainer
        center={
          decodedPolyline.length > 0
            ? (decodedPolyline[0] as LatLngExpression)
            : [27.067, 88.47007]
        }
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline pathOptions={limeOptions} positions={decodedPolyline} />
        <Marker
          icon={startIcon}
          position={
            markers.start?.marker?.lat && markers?.start?.marker?.lng
              ? [
                  parseFloat(markers.start.marker.lat),
                  parseFloat(markers.start.marker.lng),
                ]
              : [27.067, 88.47007]
          }
        >
          <Popup>{`Start ${markers?.start?.address}`}</Popup>
        </Marker>
        <Marker
          icon={endIcon}
          position={
            markers?.end?.marker?.lat && markers?.end?.marker?.lng
              ? [
                  parseFloat(markers.end.marker.lat),
                  parseFloat(markers.end.marker.lng),
                ]
              : [17.067, 88.47007]
          }
        >
          <Popup>{`End ${markers?.end?.address}`}</Popup>
        </Marker>

        {/* via markers */}
        {markers?.via?.length > 0 &&
          markers.via.map((item, index) => {
            if (item.marker.lat && item.marker.lng) {
              return (
                <Marker
                  icon={viaIcon}
                  key={index}
                  position={[
                    parseFloat(item.marker.lat),
                    parseFloat(item.marker.lng),
                  ]}
                >
                  <Popup>{item?.address}</Popup>
                </Marker>
              );
            }
          })}

        {/* tools mark point */}
        {tolls?.length > 0 &&
          tolls.map((item, index) => (
            <Marker
              icon={tollIcon}
              key={index}
              position={[item?.lat, item?.lng]}
            >
              <Popup>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p>Exit: {item.road}</p>
              </Popup>
            </Marker>
          ))}
        {/* tools mark point */}
      </MapContainer>
    </div>
  );
}
