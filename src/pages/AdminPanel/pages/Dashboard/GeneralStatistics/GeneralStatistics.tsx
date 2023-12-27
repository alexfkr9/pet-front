import React from "react";
import "./GeneralStatistics.scss";
// import { FaUsers } from "react-icons/fa";
// import { MdPostAdd } from "react-icons/md";
// import { GoIssueClosed } from "react-icons/go";
// import { HiOutlineViewfinderCircle } from "react-icons/hi2";

const GeneralStatistics = ({ petStatistics, usersStatistics }: any) => {
  return (
    <div className="dashboard-general-statistics">
      <div>
        <div className="header ">
          <span>Загальна статистика</span>
        </div>
      </div>

      <div className="statistics">
        <div className="box client">
          {/* <FaUsers className="statistics-icon " /> */}
          <svg
            stroke="currentColor"
            fill="currentColor"
            viewBox="0 0 640 512"
            className="statistics-icon "
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path>
          </svg>
          <span className="value">{usersStatistics.usersCount}</span>
          <span className="label">Користувачі</span>
          <span className="increase">
            +{usersStatistics.newUsersToday} за сьогодні
          </span>
        </div>

        <div className="box pets">
          {/* <MdPostAdd className="statistics-icon " /> */}
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="statistics-icon "
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M17 19.22H5V7h7V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h-2v7.22z"></path>
            <path d="M19 2h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V7h3V5h-3V2zM7 9h8v2H7zM7 12v2h8v-2h-3zM7 15h8v2H7z"></path>
          </svg>
          <span className="value">{petStatistics.postCount}</span>
          <span className="label">Хвостики</span>
          <span className="increase">
            +{petStatistics.newPostsToday} за сьогодні
          </span>
        </div>

        <div className="box lost">
          {/* <HiOutlineViewfinderCircle className="statistics-icon " /> */}
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="statistics-icon "
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          <span className="value">{petStatistics.lostCount}</span>
          <span className="label">Загублені</span>
          <span className="increase">
            +{petStatistics.foundPostsToday} за сьогодні
          </span>
        </div>

        <div className="box found">
          {/* <GoIssueClosed className="statistics-icon " /> */}
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="statistics-icon "
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.28 9.28a.75.75 0 0 0-1.06-1.06l-5.97 5.97-2.47-2.47a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l6.5-6.5Z"></path>
            <path d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1ZM2.5 12a9.5 9.5 0 0 0 9.5 9.5 9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 2.5 9.5 9.5 0 0 0 2.5 12Z"></path>
          </svg>
          <span className="value">{petStatistics.foundCount}</span>
          <span className="label">Знайдені</span>
          <span className="increase">
            +{petStatistics.lostPostsToday} за сьогодні
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(GeneralStatistics);
