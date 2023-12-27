import React from "react";
import "./ToastBC.scss";
import { Button } from "primereact/button";

const ToastBC = ({ setVisible, content, toastBC }: any) => {
  return (
    <div className="flex flex-column align-items-center" style={{ flex: "1" }}>
      <div className="text-center">
        <i className="pi pi-exclamation-triangle" style={{ fontSize: "3rem" }}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path>
            <path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"></path>
          </svg>
        </i>
        <div className="font-bold text-xl my-3 toast-content">
          <span>{content}</span>
          <br />
          <span>Для підтвердження натисніть Так.</span>
          <span>Для скасування натисніть Hi.</span>
        </div>
      </div>
      <div className="flex gap-2 btn-list">
        <Button
          onClick={(e) => {
            setVisible(true);
            toastBC.current?.clear();
          }}
          type="button"
          label="Так"
          className="p-button-success w-6rem"
        />
        <Button
          onClick={(e) => {
            toastBC.current?.clear();
          }}
          type="button"
          label="Ні"
          className="p-button-warning w-6rem"
        />
      </div>
    </div>
  );
};

export default React.memo(ToastBC);
