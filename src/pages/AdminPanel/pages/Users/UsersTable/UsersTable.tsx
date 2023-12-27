import React, { useCallback, useEffect, useRef, useState } from "react";
import "./UsersTable.scss";
import ActionsBar from "../../../components/ActionsBar/ActionsBar";
import CustomSpinner from "../../../../../components/Spinner/Spinner";
import Content from "./Content/Content";
import ToastBC from "../../../components/ToastBC/ToastBC";
import ConfirmAdmin from "../../../components/ConfirmAdmin/ConfirmAdmin";

import Alert from "react-bootstrap/Alert";
import { Toast } from "primereact/toast";
import { userApi } from "../../../../../Api";
import { AuditLog } from "../../../../../client";

export const Role = {
  User: "USER",
  Admin: "ADMIN"
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
type Role = (typeof Role)[keyof typeof Role];

const UsersTable = () => {
  const toast = useRef<Toast>(null);
  const toastBC = useRef<Toast>(null);
  const intObserver = useRef<IntersectionObserver | null>(null);

  const [selectedID, setSelectedID] = useState<
    Array<{
      location: any;
      role: string;
      organisation: any;
      email: string;
      phone: string;
      lastName: string;
      firstName: string;
      id: number;
    }>
  >([]);
  const [functionMethod, setFunctionMethod] = useState("");
  const [fetchError, setFetchError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isAllDataFetched, setIsAllDataFetched] = useState(false);
  const [lastID, setLastID] = useState<bigint>(BigInt(100000));

  const [globalInputValue, setGlobalInputValue] = useState({
    id: "",
    email: ""
  });
  const [filterData, setFilterData] = useState({
    searchTerm: undefined
  });

  const [usersList, setUsersList] = useState<AuditLog[]>([]);

  // fn for fetch User
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);

    try {
      if (filterData.searchTerm !== undefined) {
        // Fetch User use Filter
        const users = (await userApi.getUserBySearchTerm(filterData.searchTerm))
          .data;

        if (Array(users).length !== 0 && users !== undefined) {
          setUsersList(Array(users));
        }
      } else {
        // console.log("lastID", lastID);
        // console.log("isAllDataFetched", isAllDataFetched);

        // Fetch User without Filter
        const users = (await userApi.getUsers(10, Number(lastID))).data;

        if (users.length !== 0 && users !== undefined) {
          const lastUserId = users[users.length - 1].id;
          if (lastUserId !== undefined) {
            setLastID(BigInt(lastUserId));
          }

          if (lastID === BigInt(100000)) {
            setUsersList(users);
          } else {
            setUsersList((prev) => [...(prev ?? []), ...users]);
          }
        } else {
          setIsAllDataFetched(true);
        }
      }
      setFetchError(undefined);
    } catch (e: any) {
      setFetchError(e.message);
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [filterData, lastID]);

  useEffect(() => {
    if (!isLoading) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchUsers();
    }

    return () => {
      if (intObserver.current != null) {
        intObserver.current.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData]);

  // handle Delete User By ID
  const handleDelete = async (submit: boolean) => {
    if (submit) {
      setIsLoading(true);

      toast.current?.show({
        severity: "info",
        summary: "Видалення підтверджено",
        detail: "Зачекайте, поки дані будуть видалені."
      });

      try {
        for (const item of selectedID) {
          await userApi.deleteUser(item.id);
        }

        setLastID(BigInt(100000));
        setIsAllDataFetched(false);
        setFilterData({ searchTerm: undefined });
        setGlobalInputValue({ id: "", email: "" });
        setSelectedID([]);

        toast.current?.show({
          severity: "success",
          summary: "Видалення успішне"
        });
      } catch (e) {
        toast.current?.show({
          severity: "error",
          summary: `Видалення невдале
          ${e}`
        });
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // handle Change Role
  const handleChangeRole = async (submit: boolean) => {
    if (submit) {
      setIsLoading(true);
      toast.current?.show({
        severity: "info",
        summary: "Підтверджено",
        detail: "Зачекайте, поки дані будуть оновлені."
      });

      try {
        for (const item of selectedID) {
          const newRole: Role = item.role === "USER" ? "ADMIN" : "USER";
          await userApi.updateUserRoleById(item.id, newRole);
        }

        setLastID(BigInt(100000));
        setIsAllDataFetched(false);

        setFilterData({ searchTerm: undefined });
        setGlobalInputValue({ id: "", email: "" });
        setSelectedID([]);

        toast.current?.show({
          severity: "success",
          summary: "Оновлення успішне"
        });
      } catch (e) {
        toast.current?.show({
          severity: "error",
          summary: `Оновлення невдале
          ${e}`
        });

        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // confirm Delete or Update Role
  const confirmAction = (text: string, key: string) => {
    if (key === "DELETE") {
      setFunctionMethod("DELETE");
    } else {
      setFunctionMethod("UPDATE");
    }

    toastBC.current?.show({
      severity: "info",
      sticky: true,
      className: "border-none",
      content: (
        <ToastBC setVisible={setVisible} toastBC={toastBC} content={text} />
      )
    });
  };

  // infinite scroll
  const lastUserRef = (item: any) => {
    if (isLoading || isAllDataFetched) return;

    if (intObserver.current != null) intObserver.current.disconnect();

    intObserver.current = new IntersectionObserver((item) => {
      if (item[0].isIntersecting && filterData.searchTerm === undefined) {
        // console.log("We are near the last post!");
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        fetchUsers();
      }
    });

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (item) intObserver.current.observe(item);
  };

  return (
    <div className="users-table">
      <ActionsBar
        selectedID={selectedID}
        tableType="users"
        confirmAction={confirmAction}
        btnText={"Додати користувача"}
        btnLink={"/reg-form"}
        tableHeader={[", ID, Email, Права, Імя, Прізвище"]}
      />

      {fetchError === "Request failed with status code 404" && (
        <Alert key={"warning"} variant={"warning"}>
          Введений вами ID або Email відсутній в системі. Будь ласка введіть
          коректний ID або Email
        </Alert>
      )}

      {isLoading && <CustomSpinner />}

      <Content
        usersList={Array.isArray(usersList) ? usersList : [usersList]}
        selectedID={selectedID}
        setSelectedID={setSelectedID}
        setFilterData={setFilterData}
        globalInputValue={globalInputValue}
        setGlobalInputValue={setGlobalInputValue}
        lastUserRef={lastUserRef}
        setLastID={setLastID}
        setIsAllDataFetched={setIsAllDataFetched}
        confirmAction={confirmAction}
      />

      <Toast ref={toast} position="top-center" />
      <Toast ref={toastBC} position="bottom-center" />
      <ConfirmAdmin
        visible={visible}
        setVisible={setVisible}
        functionMethod={functionMethod}
        handleDelete={handleDelete}
        handleChangeRole={handleChangeRole}
      />

      {isLoading && <CustomSpinner />}
    </div>
  );
};

export default React.memo(UsersTable);
