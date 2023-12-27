import "./ActionBodyTemplate.scss";
import { Button } from "primereact/button";
import { BsTrash, BsPencil } from "react-icons/bs";

const ActionBodyTemplate = ({ rowData, handleDelete, selectedID }: any) => {
  const activeBtn = selectedID.find((item: any) => {
    if (item.id === rowData.id) {
      return false;
    }
    return true;
  });

  return (
    <div className="action-body-template">
      <Button
        icon={<BsPencil className="icon-update" />}
        rounded
        outlined
        className="btn-update"
        // onClick={() => editProduct(rowData)}
      />
      <Button
        icon={<BsTrash className="icon-delete" />}
        rounded
        outlined
        severity="danger"
        className="btn-delete"
        onClick={() => handleDelete()}
        disabled={selectedID.length === 0 || activeBtn}
      />
    </div>
  );
};

export default ActionBodyTemplate;
