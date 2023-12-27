import Pet from "../../../assets/images/Pet.jpg";
import "./SiteMission.scss";

const SiteMission: any = () => {
  return (
    <section className="section section-mission">
      <div className="sniff-mission">
        <div className="sniff-mission-info">
          <h1 className="sniff-mission-title">
            З кожним днем кількість безхатніх тварин на вулицях України зростає
          </h1>
          <p className="sniff-mission-text">
            Ми вважаємо, що кожен чотирилапий заслуговує бути членом люблячої
            родини, тож допоможемо хвостикам знайти або повернути свою домівку!
          </p>
          <a className="btn-primary sniff-mission-btn" href="#pets-gallery">
            Знайти улюбленця
          </a>
        </div>
        <div className="sniff-mission-img">
          <img src={Pet} alt="Собачка" />
        </div>
      </div>
    </section>
  );
};

export default SiteMission;
