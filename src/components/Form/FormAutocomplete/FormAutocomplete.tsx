import React from "react";
import "./FormAutocomplete.scss";
import Select, { SingleValue } from "react-select";

interface propTypes {
  className: string;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
  handleSelectChange?: (
    location: SingleValue<{
      label: string;
      value: string;
    }>,
    nameObj?: any
  ) => void;
  name?: string;
  value?: {
    label: string;
    value: string;
  } | null;
  isDisabled?: boolean;
  menuMaxHeight?: string;
}

const FormAutocomplete = ({
  className,
  options,
  placeholder,
  handleSelectChange,
  name,
  value,
  isDisabled,
  menuMaxHeight = "152px"
}: propTypes) => {
  return (
    <Select
      className={className}
      classNamePrefix="form-autocomplete"
      placeholder={placeholder}
      onChange={handleSelectChange}
      options={options}
      name={name}
      value={value}
      isDisabled={isDisabled}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          border: "none",
          boxShadow: "none",
          padding: "0",
          height: "44px"
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          color: "black",
          opacity: "40%"
        }),
        valueContainer: (baseStyles) => ({
          ...baseStyles,
          padding: "0 16px"
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          outline: "2px solid #000000",
          borderRadius: "6px",
          overflow: "hidden",
          maxHeight: menuMaxHeight
        }),
        menuList: (baseStyles) => ({
          ...baseStyles,
          borderRadius: "6px",
          padding: "0",
          margin: "0"
        }),
        option: (baseStyles) => ({
          ...baseStyles,
          padding: "12px 16px",
          ":first-of-type": {
            marginTop: "4px"
          }
        })
      }}
    />
  );
};

export default FormAutocomplete;
