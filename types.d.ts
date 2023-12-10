type TollFormData = {
  from: {
    lat: string;
    lng: string;
  };
  to: {
    lat: string;
    lng: string;
  };
  waypoints?: { lat: string; lng: string }[];
  vehicle: {
    type?: string;
  };
};

type Route = {
  summary: {
    hasTolls: boolean;
    hasExpressTolls: boolean;
    url: string;
    diffs: {
      cheapest: number;
      fastest: number;
    };
    url: string;
    distance: {
      metric: string;
    };
    duration: {
      text: string;
    };
  };
  polyline: string;
  costs: {
    minimumTollCost: number;
    fuel: number;
  };
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

type SelectOption = {
  value: string | object | any | undefined;
  label: string;
};

type PlacesResult = {
  id: string;
  score: number;
  address: {
    freeformAddress: string;
  };
  position: {
    lat: number;
    lon: number;
  };
};
