import "./PetDescription.scss";

const PetDescription = (props: any) => {
  const todayDay = new Date().getDate();
  const postCreated = new Date(props?.date);
  const postCreatedDay = postCreated.getDate();

  const timeOptions: any = { hour: "2-digit", minute: "2-digit" };
  const timeInt = new Intl.DateTimeFormat("ua", timeOptions);
  const time = timeInt.format(postCreated);

  const dateOptions: any = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  };
  const dateInt = new Intl.DateTimeFormat("ua", dateOptions);
  const dateCreated = dateInt.format(postCreated);

  let date;
  if (postCreatedDay === todayDay) {
    date = `Сьогодні о ${time}`;
  } else {
    date = dateCreated;
  }

  return (
    <div className="">
      <h2 className="pet-title">Опис</h2>
      <p className="pet-description-text">{props.story}</p>
      <footer className="pet-description-footer">
        <p>
          {props.location}
          <span className="pet-description-date">{date}</span>
        </p>
      </footer>
    </div>
  );
};

export default PetDescription;
