import { Link } from "react-router-dom";
import "./Back.scss";

export default function Back() {
  const back: any = -1;
  return (
    <>
      <Link to={back} className="back-link">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.4795 2.8495C11.4795 3.0903 11.3977 3.30435 11.2339 3.46488L6.62183 7.98662L11.2339 12.5351C11.5887 12.8562 11.5887 13.4181 11.2339 13.7391C10.9064 14.087 10.3333 14.087 10.0058 13.7391L4.76608 8.60201C4.41131 8.28094 4.41131 7.71906 4.76608 7.39799L10.0058 2.26087C10.3333 1.91304 10.9064 1.91304 11.2339 2.26087C11.3977 2.4214 11.4795 2.63545 11.4795 2.8495Z"
            fill="currentColor"
          />
        </svg>
        <span>Назад</span>
      </Link>
    </>
  );
}
