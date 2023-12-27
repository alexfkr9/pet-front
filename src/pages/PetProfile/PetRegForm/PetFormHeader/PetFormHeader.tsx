/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import "./PetFormHeader.scss";

export default function PetFormHeader({ isEdit }: any) {
  const headerTitle: string = isEdit
    ? "Редагувати профіль тваринки"
    : "Створити профіль тваринки";

  const headerColor: string = isEdit ? "pink" : "green";

  return <h1 className={`pet-header-title ${headerColor}`}>{headerTitle}</h1>;
}
