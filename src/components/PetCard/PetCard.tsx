import React from "react";
import Card from "react-bootstrap/Card";
import "./PetCard.scss";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import noImage from "../../assets/images/no-image.jpg";
import { apiUrl } from "../../api/constants";
import convertDate from "../../services/convertDate";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/display-name
const PetCard = React.forwardRef((props: any, ref: any) => {
  const {
    post: {
      id,
      pet,
      type,
      foundLocation,
      lostLocation,
      postCreatedDate,
      photoIds,
      foundDate,
      lostDate
    },
    gridPosition,
    imgSize,
    isMyPets
  } = props;
  // TODO: add real photo from backend api
  const srcImg =
    photoIds.length > 0
      ? `${apiUrl}/posts/${id}/photos/${photoIds[0]}`
      : noImage;

  const isVaccinated = pet.vaccine === "YES";
  const isSterilized = pet.castration === "YES";
  const petGender = () => {
    if (pet.gender === "MALE") {
      return "Хлопчик";
    }
    if (pet.gender === "FEMALE") {
      return "Дівчинка";
    }
    return "Не вказано";
  };
  const isTypeFound = type === "FOUND";
  const location = isTypeFound ? foundLocation : lostLocation;
  const postCreatedDateFormat = convertDate(postCreatedDate);

  return (
    <Card className="sniff-card" style={{ ...gridPosition }} ref={ref}>
      <Card.Header style={{ height: imgSize }}>
        <Card.Link as={Link} to={`/pets/${id}`} state={isMyPets}>
          <Card.Img
            className="sniff-card-img"
            variant="top"
            src={srcImg}
            alt="Pet"
            loading="lazy"
          />

          <div
            className={
              isTypeFound ? "sniff-card-status found" : "sniff-card-status lost"
            }
          >
            {isTypeFound ? "Шукаємо власників" : "Загубили"}
          </div>
        </Card.Link>
        <FavoriteButton id={id} />
      </Card.Header>

      <Card.Link as={Link} to={`/pets/${id}`}>
        <div className="sniff-card-content">
          <Card.Body>
            <div className="sniff-card-main">
              <Card.Title>{pet.name}</Card.Title>
            </div>

            <ul className="sniff-card-info">
              {Boolean(petGender()) && (
                <li>
                  <span
                    className="sniff-card-info__title"
                    style={{ marginRight: "43px" }}
                  >
                    Стать
                  </span>
                  <span className="sniff-card-info__value">{petGender()}</span>
                </li>
              )}

              <li>
                <span
                  className="sniff-card-info__title"
                  style={{ marginRight: "19px" }}
                >
                  {isTypeFound ? "Знайшли" : "Загубили"}
                </span>
                <span className="sniff-card-info__value">
                  {isTypeFound ? foundDate : lostDate}
                </span>
              </li>

              {Boolean(pet.age) && (
                <li>
                  <span
                    className="sniff-card-info__title"
                    style={{ marginRight: "43px" }}
                  >
                    Вік
                  </span>
                  <span className="sniff-card-info__value">
                    {pet.age === "ABOVE_10"
                      ? "Більше 10 років"
                      : pet.age === "UNKNOWN"
                      ? "Невідомий"
                      : `${pet.age.replace(/_(\d)_(\d)/, "$1-$2")} років`}
                  </span>
                </li>
              )}

              {(isVaccinated || isSterilized) && (
                <li>
                  <span className="sniff-card-info__title">Додатково</span>
                  <span className="sniff-card-info__value">
                    <span className="sniff-card-icons">
                      {isVaccinated && <i className="icon-vaccination"></i>}
                      {isSterilized && <i className="icon-steralization"></i>}
                    </span>
                  </span>
                </li>
              )}
            </ul>
          </Card.Body>

          <div className="sniff-card-footer">
            <span>{location?.city}</span>
            <span className="sniff-card-date">{postCreatedDateFormat}</span>
          </div>
        </div>
      </Card.Link>
    </Card>
  );
});

export default PetCard;
