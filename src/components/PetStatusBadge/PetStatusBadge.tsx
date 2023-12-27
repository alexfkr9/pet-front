import "./PetStatusBadge.scss";

export default function PetStatusBadge({ type }: any) {
  let petStatus, badgeColor;

  if (type === "LOST") {
    petStatus = "Загубили";
    badgeColor = "pet-status-badge--color-lost";
  }
  if (type === "FOUND") {
    petStatus = "Шукаємо власників";
    badgeColor = "pet-status-badge--color-found";
  }
  // if (type !== "LOST" && type !== "FOUND") {
  //   petStatus = "Щасливі истории";
  //   badgeColor = "pet-status-badge--color-success";
  // }

  return <div className={`pet-status-badge ${badgeColor}`}>{petStatus}</div>;
}
