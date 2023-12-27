import "./PetData.scss";
import convertDate from "../../../../services/convertDate";

const PetData = (props: any) => {
  const {
    post: { author, pet, type, currentLocation, foundDate, lostDate },
    location
  } = props;

  let petType;
  switch (pet.type) {
    case "DOG":
      petType = "Собака";
      break;
    case "CAT":
      petType = "Кіт";
      break;
    default:
      petType = "Інше";
  }

  let petAge;
  switch (pet.age) {
    case "_0_1":
      petAge = "До 1 року";
      break;
    case "_1_3":
      petAge = "1-3 роки";
      break;
    case "_4_6":
      petAge = "4-6 років";
      break;
    case "_6_10":
      petAge = "6-10 років";
      break;
    case "ABOVE_10":
      petAge = "Понад 10 років";
      break;
    case "UNKNOWN":
      petAge = "Невідомий";
      break;
    default:
      petAge = "";
  }

  let petSize;
  switch (pet.size) {
    case "SMALL":
      petSize = "Маленький";
      break;
    case "MEDIUM":
      petSize = "Середній";
      break;
    case "LARGE":
      petSize = "Великий";
      break;
    default:
      petSize = "";
  }

  const petGender = () => {
    if (pet.gender === "MALE") {
      return "Хлопчик";
    }
    if (pet.gender === "FEMALE") {
      return "Дівчинка";
    }
    return "Не вказано";
  };

  const petDiseases = () => {
    if (pet.diseases === "YES") {
      return "Так";
    }
    if (pet.diseases === "NO") {
      return "Ні";
    }
    return "Не вказано";
  };

  const isVaccinated = pet.vaccine === "YES";
  const isSterilized = pet.castration === "YES";
  const additionally =
    isVaccinated || isSterilized ? (
      <>
        {isVaccinated && <i className="icon-vaccination"></i>}
        {isSterilized && <i className="icon-steralization"></i>}
      </>
    ) : null;

  const foundLostDateTitle = type === "FOUND" ? "Знайдена" : "Коли загубили";
  const foundLostDateValue = type === "FOUND" ? foundDate : lostDate;

  function fullCurrentLocation() {
    if (currentLocation === null) return null;
    if (currentLocation.district === "") {
      return <>{currentLocation.city}</>;
    }
    if (currentLocation.district !== "" && currentLocation.district !== null) {
      return (
        <>
          {currentLocation.city}
          {currentLocation.district === "" ? "" : ", "}
          {currentLocation.district.replace(" район", "")}
        </>
      );
    }
    return null;
  }

  const postDataMap = new Map([
    ["Вид тваринки", petType],
    ["Стать", petGender()],
    ["Порода", pet.breed],
    ["Розмір", petSize],
    ["Колір", pet.color],
    ["Вік", petAge],
    ["Додатково", additionally],
    ["Хвороби", petDiseases()],
    ["Місто", location],
    ["Поточне місто", fullCurrentLocation()],
    [foundLostDateTitle, convertDate(foundLostDateValue)]
  ]);

  if (author.hideContacts === "true") {
    postDataMap.delete("Номер телефону");
  }

  const petName = pet.name !== null ? pet.name : "Не вказано";

  const postDataRow: JSX.Element[] = [];

  postDataMap.forEach((value: string, title: string) => {
    // checking for an empty field to not show it
    if (value !== null && value !== "") {
      postDataRow.push(
        <li key={title}>
          <div className="pet-data-list__title">{title}</div>
          <div className="pet-data-list__value">{value}</div>
        </li>
      );
    }
  });

  return (
    <>
      {Boolean(petName) && <h2 className="pet-title">{petName}</h2>}
      <ul className="pet-data-list">{postDataRow}</ul>
    </>
  );
};

export default PetData;
