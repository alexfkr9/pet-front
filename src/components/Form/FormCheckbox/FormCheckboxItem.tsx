import React from "react";
import "./FormCheckboxItem.scss";

interface propTypes {
  className: string;
  inputName?: string;
  labelName?: any;
  validationMessage?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// checkbox alignment solution from https://codepen.io/adamwathan/pen/bGNxMpz?editors=1000
const FormCheckboxItem = ({
  inputName,
  labelName,
  className,
  handleChange
}: propTypes) => {
  return (
    <div className={`d-flex flex-column ${className}`}>
      <div className="d-flex align-items-baseline form-checkbox-item">
        <div className="d-flex align-items-center">
          <input
            type="checkbox"
            className="form-checkbox-input me-2"
            name={inputName}
            id={inputName}
            onChange={handleChange}
          />
        </div>
        <label className="form-checkbox-label" htmlFor={inputName}>
          {className.includes("form-privacy") ? (
            <>
              Я погоджуюся з{" "}
              <a href="https://career.sigma.software/privacy-policy/">
                політикою приватності
              </a>{" "}
              даного сайту та даю згоду на обробку моїх персональних даних
              відповідно до чинного законодавства України
            </>
          ) : (
            labelName
          )}
        </label>
      </div>
    </div>
  );
};

export default FormCheckboxItem;
