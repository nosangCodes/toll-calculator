import { Icon } from "leaflet";
//Define custom icons for different categories
const viaIcon = () => {
  if (typeof window !== "undefined") {
    return new Icon({
      iconUrl: "https://img.icons8.com/ios-filled/50/030CC9/flag--v1.png",
      iconSize: [35, 35], // size of the icon
      iconAnchor: [17, 46], // point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });
  }
};
const endIcon = () => {
  if (typeof window !== "undefined") {
    return new Icon({
      iconUrl: "https://img.icons8.com/cotton/64/finish-flag.png",
      iconSize: [35, 35], // size of the icon
      iconAnchor: [17, 46], // point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });
  }
};
const startIcon = () => {
  if (typeof window !== "undefined") {
    return new Icon({
      iconUrl: "https://img.icons8.com/ios-filled/50/03C937/flag--v1.png",
      iconSize: [35, 35], // size of the icon
      iconAnchor: [17, 46], // point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });
  }
};
const tollIcon = () => {
  if (typeof window !== "undefined") {
    return new Icon({
      iconUrl: "https://img.icons8.com/ios-filled/50/F60000/rupee.png",
      iconSize: [12, 12], // size of the icon
      iconAnchor: [10, 17], // point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });
  }
};

export { viaIcon, startIcon, endIcon, tollIcon };
