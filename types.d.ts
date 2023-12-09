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
