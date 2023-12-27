import React from "react";
import StatusBodyTemplate from "../../../../components/StatusBodyTemplate/StatusBodyTemplate";
import PetTypeBodyTemplate from "../../../../components/PetTypeBodyTemplate/PetTypeBodyTemplate";
import ImageBodyTemplate from "../../../../components/ImageBodyTemplate/ImageBodyTemplate";
import IdBodyTemplate from "../../../../components/IdBodyTemplate/IdBodyTemplate";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

const Content = ({
  postsList,
  selectedID,
  setSelectedID,
  filterData,
  setFilterData,
  globalInputValue,
  setGlobalInputValue,
  lastPostRef,
  setLastID,
  setIsAllDataFetched
}: any) => {
  const statusRowFilterTemplate = () => {
    const placeholder = filterData.status ?? "Статус";
    const placeholderName =
      placeholder === "Статус"
        ? "Статус"
        : filterData.status === "FOUND"
        ? "Шукаємо власників"
        : "Загубили";

    return (
      <Dropdown
        options={["Шукаємо власників", "Загубили", "Всі"]}
        onChange={(e) => {
          const id = undefined;
          const status =
            e.value === "Шукаємо власників"
              ? "FOUND"
              : e.value === "Загубили"
              ? "LOST"
              : undefined;

          setLastID(BigInt(100000));
          setIsAllDataFetched(false);
          setFilterData({ ...filterData, status, id });
          setGlobalInputValue("");
        }}
        placeholder={placeholderName}
        className="p-column-filter"
        style={{ maxWidth: "12rem" }}
      />
    );
  };

  const typeRowFilterTemplate = () => {
    const placeholder = filterData.type ?? "Хвостики";
    const placeholderName =
      placeholder === "Хвостики"
        ? "Хвостики"
        : filterData.type === "DOG"
        ? "Собаки"
        : "Коти";

    return (
      <Dropdown
        options={["Собаки", "Коти", "Інші"]}
        onChange={(e) => {
          const id = undefined;
          const type =
            e.value === "Собаки" ? "DOG" : e.value === "Коти" ? "CAT" : "OTHER";

          setLastID(BigInt(100000));
          setIsAllDataFetched(false);
          setFilterData({ ...filterData, type, id });
          setGlobalInputValue("");
        }}
        placeholder={placeholderName}
        className="p-column-filter"
        style={{ maxWidth: "20rem" }}
      />
    );
  };

  const onGlobalInputChange = (e: any) => {
    const value = e.target.value;
    setGlobalInputValue(value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const id = globalInputValue !== "" ? globalInputValue : undefined;

    if (id === undefined) {
      setLastID(BigInt(100000));
      setIsAllDataFetched(false);
    } else {
      setIsAllDataFetched(true);
    }

    // setFilterData({ ...filterData, id });
    setFilterData({
      order: "DESC",
      id,
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
  };

  const idRowFilterTemplate = () => {
    return (
      <form onSubmit={handleSubmit}>
        <InputText
          value={globalInputValue}
          onChange={onGlobalInputChange}
          placeholder={"ID"}
          style={{ maxWidth: "5rem", marginRight: "10px" }}
        />
      </form>
    );
  };

  return (
    <>
      <DataTable
        value={postsList}
        header={"Хвостики"}
        selectionMode="checkbox"
        dataKey="id"
        selection={selectedID}
        onSelectionChange={(e) => setSelectedID(e.value)}
        // paginator
        // rows={10}
        emptyMessage="Не знайдено жодної тваринки :("
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
        <Column
          field="id"
          header={idRowFilterTemplate}
          body={IdBodyTemplate}
          style={{ minWidth: "5rem" }}
        />
        <Column
          field="photoIds"
          header="Фото"
          body={ImageBodyTemplate}
          style={{ minWidth: "8rem" }}
        />

        <Column
          field="pet.name"
          header="Імя тваринки"
          style={{ minWidth: "10rem" }}
        />

        <Column
          field="pet.type"
          header={typeRowFilterTemplate}
          body={PetTypeBodyTemplate}
          style={{ minWidth: "12rem" }}
        />

        <Column
          field="type"
          header={statusRowFilterTemplate}
          body={StatusBodyTemplate}
          style={{ minWidth: "12rem" }}
        />

        <Column
          field="author.firstName"
          header="Користувач"
          style={{ minWidth: "10rem" }}
        />

        <Column
          field="author.email"
          header="Пошта"
          style={{ minWidth: "auto" }}
        />
      </DataTable>
      <div ref={lastPostRef}></div>
    </>
  );
};

export default React.memo(Content);
