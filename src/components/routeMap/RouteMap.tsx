"use client";
import { decodePolyline } from "@/apicalls/polyline";
import { getTollsByPolyline } from "@/apicalls/tollGuru";
import { Icon, LatLngExpression, marker } from "leaflet";
import { useEffect, useState } from "react";
import { Marker, Polyline, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import "leaflet/dist/leaflet.css";
import "./styles.css"

const limeOptions = { color: "lime" };
type Props = {
  routes: Route[];
  markers: Markers;
  startLocation?: SelectOption;
  endLocation?: SelectOption;
  wayPoints?: SelectOption[];
};

export default function RouteMap({
  routes,
  markers,
  startLocation,
  endLocation,
  wayPoints,
}: Props) {
  const [tolls, setTolls] = useState<Toll[]>([]);
  const [loading, setLoading] = useState(false);
  const [decodedPolyline, setdecodedPolyline] = useState<
    LatLngExpression[] | LatLngExpression[][]
  >([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | undefined>();

  useEffect(() => {
    return () => {
      setTolls([]);
      setdecodedPolyline([]);
      setSelectedRoute(undefined);
      setLoading(false);
    };
  }, []);

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
      // decodePolyline(selectedRoute.polyline)
      //   .then((res) => {
      //     setdecodedPolyline(res.decoededPolyline);
      //   })
      //   .catch((err) => {
      //     console.error("Something went wrong", err);
      //   });

      // // get tolls
      // getTollsByPolyline({
      //   source: "here",
      //   polyline: selectedRoute.polyline,
      // })
      //   .then((res) => {
      //     if (res?.data?.route?.hasTolls) {
      //       let formattedTolls = [];

      //       formattedTolls = res.data.route.tolls.map((item: Toll) => {
      //         if (item.type === "barrier") {
      //           return item;
      //         } else return { ...item.start, ...item };
      //       });
      //       setTolls(formattedTolls);
      //     }
      //   })
      //   .catch((err) => {
      //     console.error("Something went wrong", err);
      //   });

      setLoading(true);
      Promise.all([
        decodePolyline(selectedRoute.polyline),
        getTollsByPolyline({
          source: "here",
          polyline: selectedRoute.polyline,
        }),
      ])
        .then((res) => {
          console.log("res", res);
          if (res?.length > 1) {
            // get decoded polyline
            setdecodedPolyline(res[0]?.decoededPolyline);

            // get tolls
            const tollsData = res[1];
            console.log({ tollsData });
            if (tollsData.data?.route?.hasTolls) {
              let formattedTolls = [];

              formattedTolls = tollsData.data.route.tolls.map((item: Toll) => {
                if (item.type === "barrier") {
                  return item;
                } else return { ...item.start, ...item };
              });
              setTolls(formattedTolls);
            }
          }
        })
        .catch((err) => {
          console.error("Something went wrong", err);
        })
        .finally(() => setLoading(false));
    }

    return () => {};
  }, [selectedRoute]);

  return (
    <div className="h-[80vh] border border-slate-500 rounded-sm overflow-auto">
      {loading ? (
        <div className="flex justify-center items-center h-full">
        <h2 className="text-2xl font-semibold">Loading...</h2>
        </div>
      ) : (
        <MapContainer
          center={
            startLocation?.value?.lat && startLocation?.value?.lng
              ? ([
                  parseFloat(startLocation?.value.lat),
                  parseFloat(startLocation.value.lng),
                ] as LatLngExpression)
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

          {startLocation?.value?.lat && startLocation?.value?.lng && (
            <Marker
              icon={
                new Icon({
                  iconUrl:
                    "https://img.icons8.com/ios-filled/50/03C937/flag--v1.png",
                  iconSize: [35, 35],
                  iconAnchor: [17, 46],
                  popupAnchor: [-3, -76],
                })
              }
              position={[
                parseFloat(startLocation?.value.lat),
                parseFloat(startLocation.value.lng),
              ]}
            >
              <Popup>{`Start ${startLocation?.label}`}</Popup>
            </Marker>
          )}

          {endLocation?.value?.lat && endLocation?.value?.lng && (
            <Marker
              icon={
                new Icon({
                  iconUrl: "https://img.icons8.com/cotton/64/finish-flag.png",
                  iconSize: [35, 35],
                  iconAnchor: [17, 46],
                  popupAnchor: [-3, -76],
                })
              }
              position={[
                parseFloat(endLocation?.value?.lat),
                parseFloat(endLocation?.value?.lng),
              ]}
            >
              <Popup>{`End ${endLocation?.label}`}</Popup>
            </Marker>
          )}

          {/* via markers */}
          {wayPoints &&
            wayPoints?.length > 0 &&
            wayPoints.map((item, index) => {
              if (item?.value?.lat && item?.value?.lng) {
                return (
                  <Marker
                    icon={
                      new Icon({
                        iconUrl:
                          "https://img.icons8.com/ios-filled/50/030CC9/flag--v1.png",
                        iconSize: [35, 35],
                        iconAnchor: [17, 46],
                        popupAnchor: [-3, -76],
                      })
                    }
                    key={index}
                    position={[
                      parseFloat(item?.value?.lat),
                      parseFloat(item?.value?.lng),
                    ]}
                  >
                    <Popup>{item?.label}</Popup>
                  </Marker>
                );
              }
            })}

          {/* tolls mark point */}
          {tolls?.length > 0 &&
            tolls.map((item, index) => (
              <Marker
                icon={
                  new Icon({
                    iconUrl:
                      "https://img.icons8.com/ios-filled/50/F60000/rupee.png",
                    iconSize: [35, 35],
                    iconAnchor: [17, 46],
                    popupAnchor: [-3, -76],
                  })
                }
                key={index}
                position={[item?.lat, item?.lng]}
              >
                <Popup>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p>Exit: {item.road}</p>
                  <p>Tag cost: {item.tagCost}</p>
                  <p>Tah cost return: {item.tagCostReturn}</p>
                  <p>Tah cost monthly: {item.tagCostMonthly}</p>
                  <p>Cash cost: {item.cashCost}</p>
                </Popup>
              </Marker>
            ))}
          {/* tools mark point */}
          {typeof window!}
        </MapContainer>
      )}
    </div>
  );
}
