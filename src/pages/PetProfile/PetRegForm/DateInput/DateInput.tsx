/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState } from "react";
import Form from "react-bootstrap/Form";
import "./DateInput.scss";

import DatePicker, { registerLocale } from "react-datepicker";
import uk from "date-fns/locale/uk";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "../../../.././assets/icons/calendar.svg";
import convertDateToDdMmYyyy from "../../../../services/convertDateToDdMmYyyy";
import convertDate from "../../../../services/convertDate";

const DateInput = ({
  validatedInputs,
  formData,
  setFormData,
  setActiveInput,
  foundLost,
  editDate
}: any) => {
  const label =
    foundLost === "FOUND" ? "Коли знайшли (опціонально)" : "Коли загубили";
  const [dateToday, setDateToday] = useState<any>("");

  const formDataDateConverted = formData.date
    ? convertDate(formData.date)
    : undefined;

  registerLocale("uk", uk);

  function setDate(dateUTC: Date): void {
    setActiveInput(true); // for enable submit button

    // convert to date format - "DD-MM-YYYY"
    const date = convertDateToDdMmYyyy(dateUTC);
    setFormData({ ...formData, date });

    // insert the selected date into "input"
    setDateToday(dateUTC);
  }

  return (
    <>
      <Form.Group controlId="date" className="date-input">
        <Form.Label>{label}</Form.Label>
        <div className="custom-date-wrapper">
          <DatePicker
            // placeholderText={editDateConverted ?? "ДД/ММ/РРРР"}
            placeholderText="ДД/ММ/РРРР"
            selected={dateToday}
            onChange={(date: any) => {
              setDate(date);
            }}
            dateFormat="dd.MM.yyyy"
            locale="uk"
            maxDate={new Date()}
            className={`pet-form-date ${
              validatedInputs.date.isInvalid === true && "has-error"
            }`}
            // value={formDataDateConverted ?? editDateConverted}
            value={formDataDateConverted}
          />
          <img className="calendar-icon" src={Calendar} alt="icon" />
        </div>
        <span className="text-danger">{validatedInputs.date.message}</span>
      </Form.Group>
    </>
  );
};

export default DateInput;
