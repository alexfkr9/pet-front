import React from "react";
import "./FormRadioInput.scss";

interface propTypes {
  value?: string;
  name?: string;
  defaultChecked?: boolean;
  id?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormRadioInput = ({
  value,
  name,
  id,
  defaultChecked,
  handleChange
}: propTypes) => {
  return (
    <div className="form-radio">
      <label className="form-radio-label" htmlFor={id}>
        <input
          type="radio"
          name={name}
          id={id}
          checked={defaultChecked}
          className="form-radio-input"
          onChange={handleChange}
        />
        <span className="form-radio-text">{value}</span>
      </label>
    </div>
  );
};

export default FormRadioInput;
