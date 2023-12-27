import { Tag } from "primereact/tag";

const StatusBodyTemplate = ({ type }: any) => {
  const getSeverity = (status: any) => {
    switch (status) {
      case "LOST":
        return "danger";

      case "FOUND":
        return "success";

      case "renewal":
        return null;
    }
  };

  const typeName = type === "LOST" ? "Загубили" : "Шукаємо власників";

  return <Tag value={typeName} severity={getSeverity(type)} />;
};

export default StatusBodyTemplate;
