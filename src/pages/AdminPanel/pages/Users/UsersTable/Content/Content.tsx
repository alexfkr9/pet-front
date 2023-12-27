import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Cookies from "js-cookie";

const Content = ({
  usersList,
  selectedID,
  setSelectedID,
  setFilterData,
  globalInputValue,
  setGlobalInputValue,
  lastUserRef,
  setLastID,
  setIsAllDataFetched,
  confirmAction
}: any) => {
  const [deleteAdmin, setDeleteAdmin] = useState(false);

  const onGlobalInputChange = (e: any, key: string) => {
    const value = e.target.value;

    setGlobalInputValue((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: any, key: string) => {
    e.preventDefault();

    if (key !== "" && globalInputValue[key] !== "") {
      setFilterData({ searchTerm: globalInputValue[key] });

      if (key === "id") {
        setGlobalInputValue((prev: any) => ({ ...prev, email: "" }));
      } else {
        setGlobalInputValue((prev: any) => ({ ...prev, id: "" }));
      }
    } else {
      setLastID(BigInt(100000));
      setIsAllDataFetched(false);
      setFilterData({ searchTerm: undefined });
    }
  };

  const idRowFilterTemplate = () => {
    return (
      <form
        onSubmit={(e) => {
          handleSubmit(e, "id");
        }}
      >
        <InputText
          keyfilter="num"
          value={globalInputValue.id}
          onChange={(e) => {
            onGlobalInputChange(e, "id");
          }}
          placeholder={"ID"}
          style={{ maxWidth: "5rem", marginRight: "10px" }}
        />
      </form>
    );
  };

  const emailRowFilterTemplate = () => {
    return (
      <form
        onSubmit={(e) => {
          handleSubmit(e, "email");
        }}
      >
        <InputText
          keyfilter="email"
          value={globalInputValue.email}
          onChange={(e) => {
            onGlobalInputChange(e, "email");
          }}
          placeholder={"Email"}
          style={{ maxWidth: "auto", marginRight: "10px" }}
        />
      </form>
    );
  };

  const actionBodyTemplate = (rowData: any) => {
    const userId = Cookies.get("user_id");

    // eslint-disable-next-line no-useless-return
    if (rowData.id.toString() === userId) return;

    const changeRole = rowData.role === "USER" ? "ADMIN" : "USER";

    return (
      <div className="action-body-template">
        <Button
          // icon={<RiUserSettingsLine className="icon-update" />}
          icon={
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="icon-update"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 14V16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM14.5946 18.8115C14.5327 18.5511 14.5 18.2794 14.5 18C14.5 17.7207 14.5327 17.449 14.5945 17.1886L13.6029 16.6161L14.6029 14.884L15.5952 15.4569C15.9883 15.0851 16.4676 14.8034 17 14.6449V13.5H19V14.6449C19.5324 14.8034 20.0116 15.0851 20.4047 15.4569L21.3971 14.8839L22.3972 16.616L21.4055 17.1885C21.4673 17.449 21.5 17.7207 21.5 18C21.5 18.2793 21.4673 18.551 21.4055 18.8114L22.3972 19.3839L21.3972 21.116L20.4048 20.543C20.0117 20.9149 19.5325 21.1966 19.0001 21.355V22.5H17.0001V21.3551C16.4677 21.1967 15.9884 20.915 15.5953 20.5431L14.603 21.1161L13.6029 19.384L14.5946 18.8115ZM18 19.5C18.8284 19.5 19.5 18.8284 19.5 18C19.5 17.1716 18.8284 16.5 18 16.5C17.1716 16.5 16.5 17.1716 16.5 18C16.5 18.8284 17.1716 19.5 18 19.5Z"></path>
            </svg>
          }
          rounded
          outlined
          className="btn-update"
          onClick={() => {
            setSelectedID([]);
            setSelectedID([rowData]);
            confirmAction(
              `Права даного користувача будуть змінені з ${rowData.role} -> ${changeRole}`,
              "UPDATE"
            );
          }}
        />
      </div>
    );
  };

  return (
    <>
      {deleteAdmin && (
        <Alert
          key={"danger"}
          variant={"danger"}
          onClose={() => {
            setDeleteAdmin(false);
          }}
          dismissible
        >
          <h5>Ви не можете видалити Адміністратора</h5>
        </Alert>
      )}

      <DataTable
        value={usersList}
        header={"Користувачі"}
        selectionMode="checkbox"
        dataKey="id"
        selection={selectedID}
        onSelectionChange={(e) => {
          const isAllUser = e.value.every((item: any) => item.role === "USER");

          if (isAllUser === true) {
            setSelectedID(e.value);
          } else {
            setDeleteAdmin(true);
          }
        }}
        emptyMessage="Не знайдено жодного користувача :("
      >
        <Column
          exportable={false}
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        />
        <Column
          field="id"
          header={idRowFilterTemplate}
          style={{ minWidth: "5rem" }}
        />
        <Column
          field="email"
          header={emailRowFilterTemplate}
          style={{ minWidth: "10rem" }}
        />
        <Column field="role" header="Права" style={{ minWidth: "10rem" }} />
        <Column field="firstName" header="Імя" style={{ minWidth: "10rem" }} />
        <Column
          field="lastName"
          header="Прізвище"
          style={{ minWidth: "10rem" }}
        />
        <Column
          exportable={false}
          headerStyle={{ width: "5rem", textAlign: "center" }}
          body={actionBodyTemplate}
        />
      </DataTable>

      <div ref={lastUserRef}></div>
    </>
  );
};

export default React.memo(Content);
