import React from "react";
import Select, { SingleValue } from "react-select";

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
//   ];

type Props = {
  name: string;
  options?: SelectOption[];
  isLoading?: boolean;
  placeholder?: string;
  value: SelectOption | undefined;
  inputValue?: string;
  handleChangeInput: (name: string, value: string) => void;
  onChange: (name: string, value: SelectOption) => void;
  required?: boolean;
  handleClear?: () => void;
};

export default function SelectDropdown({
  name,
  options,
  isLoading = false,
  placeholder,
  value,
  inputValue,
  handleChangeInput,
  onChange,
  required = false,
  handleClear,
}: Props) {
  return (
    <div className="w-full">
      <Select
        required={required}
        inputValue={inputValue}
        onInputChange={(newvalue) => handleChangeInput(name, newvalue)}
        value={value}
        className="basic-single"
        classNamePrefix="select"
        isLoading={isLoading}
        isClearable={true}
        isSearchable={true}
        name={name}
        options={options}
        placeholder={placeholder}
        onChange={(newvalue, action) => {
          console.log("action", action);
          if (newvalue) {
            onChange(name, newvalue as SelectOption);
          }
          if (action.action === "clear" && handleClear) {
            handleClear();
          }
        }}
      />
    </div>
  );
}
