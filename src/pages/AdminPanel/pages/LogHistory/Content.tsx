import React from "react";
import { Divider } from "primereact/divider";
import { MdPets } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";

// eslint-disable-next-line react/display-name
const Content = React.forwardRef(({ item }: any, ref: any) => {
  return (
    <div ref={ref}>
      <div className="card content">
        <div className="header">
          <span className="action type">Тип дії: {item.actionType}</span>

          <span className="action id">ID дії: {item.id}</span>

          <span className="action item_id">
            {item.objectType === "USER" ? (
              <AiOutlineUser className="icon" />
            ) : (
              <MdPets className="icon" />
            )}
            ID: {item.objectId}
          </span>

          <span className="action date">
            Дата: {item.actionDate?.split("T")[0]}
          </span>
        </div>
      </div>
      <Divider />
    </div>
  );
});

export default Content;
