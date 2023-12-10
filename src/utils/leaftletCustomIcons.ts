import L, { Icon } from "leaflet";
//Define custom icons for different categories
const viaIcon = new Icon({
  iconUrl: "https://img.icons8.com/ios-filled/50/030CC9/flag--v1.png",
  iconSize: [35, 35], // size of the icon
  iconAnchor: [17, 46], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});
const endIcon = new Icon({
  iconUrl: "https://img.icons8.com/cotton/64/finish-flag.png",
  iconSize: [35, 35], // size of the icon
  iconAnchor: [17, 46], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});
const startIcon = new Icon({
  iconUrl: "https://img.icons8.com/ios-filled/50/03C937/flag--v1.png",
  iconSize: [35, 35], // size of the icon
  iconAnchor: [17, 46], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});
const tollIcon = new Icon({
  iconUrl: "https://img.icons8.com/ios-filled/50/F60000/rupee.png",
  iconSize: [28, 28], // size of the icon
  iconAnchor: [17, 46], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});


export { viaIcon, startIcon, endIcon, tollIcon };
