import React from "react";
import Select, { components, GroupProps, SingleValue } from "react-select";
import { OptionInterface, GroupedOption, groupedOptions } from "./data";
type Props = {
  onChange: (option: SingleValue<GroupedOption>) => void;
  value: SingleValue<GroupedOption> | undefined;
};

const groupStyles = {
  background: "#f2fcff",
  marginBottom: "4px",
};

const Option = (props: any) => {
  return (
    <div>
      <components.Option {...props}>
        <div style={{ marginLeft: 15, display: "flex", alignItems: "center" }}>
          <label>{props.label}</label>
        </div>
      </components.Option>
    </div>
  );
};

const createGroup = (groupName: string, options: OptionInterface[]) => {
  return {
    label: (() => {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <label>{groupName}</label>
        </div>
      );
    })(),
    options: options,
  };
};

const Group = (props: GroupProps<GroupedOption, false>) => (
  <div style={groupStyles}>
    <components.Group {...props} />
  </div>
);

export default function DropDown({ onChange, value }: Props) {
  let options = groupedOptions.map((group: GroupedOption) =>
    createGroup(group.label, group.options)
  );
  return (
    <div>
      <Select
        value={value}
        options={groupedOptions}
        components={{
          Option,
        }}
        onChange={(option, actionmeta) => onChange(option)}
      />
    </div>
  );
}
