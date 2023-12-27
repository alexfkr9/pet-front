import React from "react";
import "./ActionsBar.scss";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

interface IActionsBar {
  selectedID: any;
  btnText: string;
  btnLink: string;
  confirmAction: any;
  tableType: string;
  tableHeader: [string];
}

const ActionsBar = ({
  selectedID,
  btnText,
  btnLink,
  confirmAction,
  tableType,
  tableHeader
}: IActionsBar) => {
  const navigate = useNavigate();

  const exportCSV = () => {
    const tbody = document.querySelector(".p-datatable-tbody");

    if (tbody !== null) {
      const rows = tbody.querySelectorAll("tr");

      if (rows.length > 0) {
        const csvData = tableHeader;

        rows.forEach((row) => {
          const rowData: any = [];
          const cells = row.querySelectorAll("td");

          cells.forEach((cell) => {
            rowData.push(cell.textContent);
          });

          csvData.push(rowData.join(","));
        });

        const csvContent = csvData.join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "exported_data.csv";
        a.click();

        URL.revokeObjectURL(url);
      }
    }
  };

  const LeftToolbarTemplate = () => {
    return (
      <div className="left-btn-list">
        <Button
          label={btnText}
          // icon={<AiOutlinePlus className="p-toolbar-icon" />}
          icon={
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              className="p-toolbar-icon"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z"></path>
              <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8Z"></path>
            </svg>
          }
          severity="success"
          onClick={() => {
            navigate(btnLink);
          }}
        />
        <Button
          label="Видалити вибрані"
          // icon={<BsTrash className="p-toolbar-icon" />}
          icon={
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              className="p-toolbar-icon"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
            </svg>
          }
          severity="danger"
          onClick={() =>
            confirmAction(
              tableType === "users"
                ? "Профіль даного користувача та вся повʼязана з ним інформація буде видалена."
                : "Профіль даної тваринки та всі дані, які з нею повʼязані, будуть видалені.",
              "DELETE"
            )
          }
          disabled={selectedID.length === 0}
        />
      </div>
    );
  };

  const RightToolbarTemplate = () => {
    return (
      <Button
        label="Експорт"
        // icon={<CiExport className="p-toolbar-icon" />}
        icon={
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="p-toolbar-icon"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Export">
              <g>
                <path d="M5.552,20.968a2.577,2.577,0,0,1-2.5-2.73c-.012-2.153,0-4.306,0-6.459a.5.5,0,0,1,1,0c0,2.2-.032,4.4,0,6.6.016,1.107.848,1.589,1.838,1.589H18.353A1.546,1.546,0,0,0,19.825,19a3.023,3.023,0,0,0,.1-1.061V11.779h0a.5.5,0,0,1,1,0c0,2.224.085,4.465,0,6.687a2.567,2.567,0,0,1-2.67,2.5Z"></path>
                <path d="M12.337,3.176a.455.455,0,0,0-.311-.138c-.015,0-.028,0-.043-.006s-.027,0-.041.006a.457.457,0,0,0-.312.138L7.961,6.845a.5.5,0,0,0,.707.707l2.816-2.815V15.479a.5.5,0,0,0,1,0V4.737L15.3,7.552a.5.5,0,0,0,.707-.707Z"></path>
              </g>
            </g>
          </svg>
        }
        className="p-button-help"
        onClick={exportCSV}
      />
    );
  };

  return (
    <>
      <Toolbar
        className="mb-4"
        left={LeftToolbarTemplate}
        right={RightToolbarTemplate}
      ></Toolbar>
    </>
  );
};

export default React.memo(ActionsBar);
