import React from "react";
import "./Dropdown.scss";

export type DropdownOption = {
  label: string;
  value: string | number;
};

export type DropdownProps = {
  name: string;
  value: string | number;
  options: DropdownOption[];
  label?: string;
  onChange(name: string, value: string | number): void;
};

export function Dropdown(props: DropdownProps): React.ReactElement {
  const handleDropdownChanged = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    props.onChange(props.name, event.target.value);
  };

  return (
    <div className="dropdown-container">
      {props.label && <label className="dropdown-label">{props.label}</label>}

      <select className="dropdown-root" onChange={handleDropdownChanged}>
        {props.options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            selected={option.value === props.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
