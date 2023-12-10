type TollFormData = {
  from: {
    address: string;
  };
  to: {
    address: string;
  };
  waypoints?: { address: string }[];
  vehicle: {
    type?: string;
  };
};

type Route = {
  summary: {
    hasTolls: boolean;
    hasExpressTolls: boolean;
    diffs: {
      cheapest: number;
      fastest: number;
    };
    url: string;
  };
  polyline: string;
};

type Marker = {
  location: {
    lat: number;
    lng: number;
  };
  address: string;
};
type Markers = {
  via: {
    marker: {
      lat: string;
      lng: string;
    };
    address: string;
  }[];
  start: {
    marker: { lat: string; lng: string };
    address: string;
  };
  end: {
    marker: { lat: string; lng: string };
    address: string;
  };
};

// type Routes =

type Toll = {
  id: number;
  lat: number;
  lng: number;
  name: string;
  road: string;
  state: string;
  country: string;
  type: string;
  tagCost: number;
  tagCostReturn: number;
  tagCostMonthly: number;
  cashCost: number;
  currency: string;
  start: any;
};
// cashCostReturn: ;
// cashCostMonthly: null;
