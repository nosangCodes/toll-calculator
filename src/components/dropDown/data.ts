export type OptionInterface = {
  value: string;
  label: string;
  parent_id: string;
};

export interface GroupedOption {
  label: string;
  options: OptionInterface[];
  value?: string;
}

export const groupedOptions: GroupedOption[] = [
  {
    label: "Car, Jeep, Van, SUV",
    options: [
      {
        value: "2AxlesAuto",
        label: "Car, Jeep, Van, SUV",
        parent_id: "Car, Jeep, Van, SUV",
      },
      {
        value: "3AxlesAuto",
        label: "Car, SUV towing 1-axle trailer",
        parent_id: "Car, Jeep, Van, SUV",
      },
      {
        value: "4AxlesAuto",
        label: "Car, SUV towing 2-axle trailer",
        parent_id: "Car, Jeep, Van, SUV",
      },
    ],
  },
  {
    label: "Taxi",
    options: [{ value: "2AxlesTaxi", label: "Taxi", parent_id: "Taxi" }],
  },
];
