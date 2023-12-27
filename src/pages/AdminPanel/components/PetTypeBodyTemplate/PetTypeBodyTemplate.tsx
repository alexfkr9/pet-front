const PetTypeBodyTemplate = ({ pet }: any) => {
  if (pet.type === "DOG") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around"
        }}
      >
        <p>Собака</p>
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "30px", height: "30px" }}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M11 5h2"></path>
          <path d="M19 12c-.667 5.333 -2.333 8 -5 8h-4c-2.667 0 -4.333 -2.667 -5 -8"></path>
          <path d="M11 16c0 .667 .333 1 1 1s1 -.333 1 -1h-2z"></path>
          <path d="M12 18v2"></path>
          <path d="M10 11v.01"></path>
          <path d="M14 11v.01"></path>
          <path d="M5 4l6 .97l-6.238 6.688a1.021 1.021 0 0 1 -1.41 .111a.953 .953 0 0 1 -.327 -.954l1.975 -6.815z"></path>
          <path d="M19 4l-6 .97l6.238 6.688c.358 .408 .989 .458 1.41 .111a.953 .953 0 0 0 .327 -.954l-1.975 -6.815z"></path>
        </svg>
      </div>
    );
  } else if (pet.type === "CAT") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around"
        }}
      >
        <p>Кіт</p>
        {/* <FaCat style={{ width: "30px", height: "30px" }} /> */}
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "30px", height: "30px" }}
        >
          <path d="M290.59 192c-20.18 0-106.82 1.98-162.59 85.95V192c0-52.94-43.06-96-96-96-17.67 0-32 14.33-32 32s14.33 32 32 32c17.64 0 32 14.36 32 32v256c0 35.3 28.7 64 64 64h176c8.84 0 16-7.16 16-16v-16c0-17.67-14.33-32-32-32h-32l128-96v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V289.86c-10.29 2.67-20.89 4.54-32 4.54-61.81 0-113.52-44.05-125.41-102.4zM448 96h-64l-64-64v134.4c0 53.02 42.98 96 96 96s96-42.98 96-96V32l-64 64zm-72 80c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16zm80 0c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16z"></path>
        </svg>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around"
        }}
      >
        <p>Інші</p>
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "30px", height: "30px" }}
        >
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <circle cx="4.5" cy="9.5" r="2.5"></circle>
          <circle cx="9" cy="5.5" r="2.5"></circle>
          <circle cx="15" cy="5.5" r="2.5"></circle>
          <circle cx="19.5" cy="9.5" r="2.5"></circle>
          <path d="M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z"></path>
        </svg>
      </div>
    );
  }
};

export default PetTypeBodyTemplate;
