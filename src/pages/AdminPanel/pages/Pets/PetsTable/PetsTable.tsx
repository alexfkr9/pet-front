import React, { useCallback, useEffect, useRef, useState } from "react";
import "./PetsTable.scss";
import ActionsBar from "../../../components/ActionsBar/ActionsBar";
import CustomSpinner from "../../../../../components/Spinner/Spinner";
import Content from "./Content/Content";
import ToastBC from "../../../components/ToastBC/ToastBC";
import ConfirmAdmin from "../../../components/ConfirmAdmin/ConfirmAdmin";

import { Toast } from "primereact/toast";
import Alert from "react-bootstrap/Alert";
import { postApi } from "../../../../../Api";

const PetsTable = () => {
  const toast = useRef<Toast>(null);
  const toastBC = useRef<Toast>(null);

  const [functionMethod, setFunctionMethod] = useState("");
  const [selectedID, setSelectedID] = useState<Array<{ id: number }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(undefined);
  const [visible, setVisible] = useState(false);
  const [globalInputValue, setGlobalInputValue] = useState("");
  const intObserver = useRef<IntersectionObserver | null>(null);
  const [isAllDataFetched, setIsAllDataFetched] = useState(false);
  const [lastID, setLastID] = useState<bigint>(BigInt(100000));

  const [postsList, setPostsList] = useState<any[]>([]);

  // Filter Data
  const [filterData, setFilterData] = useState({
    order: "DESC",
    id: undefined,
    type: undefined,
    breed: undefined,
    color: undefined,
    size: undefined,
    age: undefined,
    vaccine: undefined,
    sterilization: undefined,
    gender: undefined,
    diseases: undefined,
    status: undefined,
    lostDateAfter: undefined,
    foundDateAfter: undefined,
    postCreatedDate: undefined,
    region: undefined,
    city: undefined,
    district: undefined
  });

  // fn for fetch Posts
  const fetchPosts = useCallback(async () => {
    setIsLoading(true);

    try {
      if (filterData.id !== undefined) {
        const posts = (await postApi.getPostById(filterData.id)).data;

        if (Array(posts).length !== 0 && posts !== undefined) {
          setPostsList(Array(posts));
        }
      } else {
        const queryParams = Object.values(filterData);

        const posts =
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          (await postApi.getPosts(15, Number(lastID), ...queryParams)).data;

        if (posts.length !== 0 && posts !== undefined) {
          const lastPostId = posts[posts.length - 1].id;
          if (lastPostId !== undefined) {
            setLastID(BigInt(lastPostId));
          }
          if (lastID === BigInt(100000)) {
            setPostsList(posts);
          } else {
            setPostsList((prev) => [...(prev ?? []), ...posts]);
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
      fetchPosts();
    }

    return () => {
      if (intObserver.current != null) {
        intObserver.current.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData]);

  // infinite scroll
  const lastPostRef = (item: any) => {
    if (isLoading || isAllDataFetched) return;

    if (intObserver.current != null) intObserver.current.disconnect();

    intObserver.current = new IntersectionObserver((item) => {
      if (item[0].isIntersecting) {
        // console.log("We are near the last post!");
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        fetchPosts();
      }
    });

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (item) intObserver.current.observe(item);
  };

  // handle Delete Post By ID
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
          await postApi.deletePost(item.id);
        }

        setLastID(BigInt(100000));
        setIsAllDataFetched(false);
        setFilterData({
          order: "DESC",
          id: undefined,
          type: undefined,
          breed: undefined,
          color: undefined,
          size: undefined,
          age: undefined,
          vaccine: undefined,
          sterilization: undefined,
          gender: undefined,
          diseases: undefined,
          status: undefined,
          lostDateAfter: undefined,
          foundDateAfter: undefined,
          postCreatedDate: undefined,
          region: undefined,
          city: undefined,
          district: undefined
        });
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

  // confirm Delete
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

  return (
    <div className="pets-table">
      <ActionsBar
        selectedID={selectedID}
        confirmAction={confirmAction}
        btnText={"Додати тваринку"}
        btnLink={"/add-pet"}
        tableType={"pets"}
        tableHeader={[", ID, , Імя тваринки, Тип, Статус, Користувач, Email"]}
      />

      {fetchError === "Request failed with status code 404" && (
        <Alert key={"warning"} variant={"warning"}>
          Введений вами ID відсутній в системі. Будь ласка введіть коректний ID
        </Alert>
      )}

      {isLoading && <CustomSpinner />}

      <Content
        postsList={Array.isArray(postsList) ? postsList : [postsList]}
        selectedID={selectedID}
        setSelectedID={setSelectedID}
        filterData={filterData}
        setFilterData={setFilterData}
        globalInputValue={globalInputValue}
        setGlobalInputValue={setGlobalInputValue}
        lastPostRef={lastPostRef}
        setLastID={setLastID}
        setIsAllDataFetched={setIsAllDataFetched}
      />

      <Toast ref={toast} position="top-center" />
      <Toast ref={toastBC} position="bottom-center" />
      <ConfirmAdmin
        visible={visible}
        setVisible={setVisible}
        handleDelete={handleDelete}
        functionMethod={functionMethod}
      />
    </div>
  );
};

export default React.memo(PetsTable);
