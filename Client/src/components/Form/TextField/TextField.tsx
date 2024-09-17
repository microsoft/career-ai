import React from "react";
import "./TextField.scss";

export type TextFieldProps = {
  name: string;
  onChange(name: string, value: string | number): void;
  value: string | number;
  multiline?: boolean;
  label?: string;
};

export function TextField(props: TextFieldProps): React.ReactElement {
  if (props.multiline) {
    return (
      <div className="text-field-container">
        {props.label && (
          <label htmlFor={props.name} className="text-field-label">
            {props.label}
          </label>
        )}
        <textarea
          name={props.name}
          className="text-area"
          onChange={(e) => {
            props.onChange(props.name, e.currentTarget.value);
          }}
          value={props.value}
        />
      </div>
    );
  }

  return (
    <div className="text-field-container">
      {props.label && (
        <label htmlFor={props.name} className="text-field-label">
          {props.label}
        </label>
      )}
      <input
        name={props.name}
        type="text"
        className="text-field"
        onChange={(e) => {
          props.onChange(props.name, e.currentTarget.value);
        }}
        value={props.value}
      />
    </div>
  );
}
