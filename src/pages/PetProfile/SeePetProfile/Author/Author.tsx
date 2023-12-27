import { useState } from "react";
import "./Author.scss";
import FavoriteButton from "../../../../components/FavoriteButton/FavoriteButton";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import phoneFormat from "../../../../services/phoneFormat";

const Author = ({ post }: any) => {
  const { id, contactPhone } = post;
  const { firstName } = post.author;
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  const breakpoint = useMediaQuery("(min-width: 776px)");
  const Phone = () => {
    if (breakpoint) {
      return (
        <div className="author-phone-number">{phoneFormat(contactPhone)}</div>
      );
    }
    return (
      <a className="author-phone-number" href="tel:{contactPhone}">
        {phoneFormat(contactPhone)}
      </a>
    );
  };

  const handleClick = () => {
    setShowPhoneNumber(!showPhoneNumber);
  };

  const ShowPhone = () => {
    if (showPhoneNumber) {
      return <Phone />;
    }
    return (
      <button className="btn-primary author-phone-btn" onClick={handleClick}>
        Показати номер телефону
      </button>
    );
  };

  return (
    <div className="">
      <p className="author-text">Зв’язатися з користувачем</p>
      <h2 className="author-title">{firstName}</h2>
      <div className="author-phone-wrapper">
        <ShowPhone />
        <FavoriteButton id={id} />
      </div>
    </div>
  );
};

export default Author;
