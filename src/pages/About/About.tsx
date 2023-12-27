import "./About.scss";
import Pattern from "../../assets/images/Pattern.svg";
import Button from "react-bootstrap/Button";

const About = () => {
  // eslint-disable-next-line no-lone-blocks
  {
    /* useEffect(() => {
    userApi
      .getUserById(7, {
        headers: new AxiosHeaders({
          Authorization: "Basic c3N1Y2hrb3ZAZ21haWwuY29tOmJlc3RtZW50b3I="
        })
      })
      .then((response: any) => {
        // eslint-disable-next-line no-console
        console.log(response.data);
      })
      .catch((err: any) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, []);
*/
  }
  return (
    <section className="container">
      <div className="sniff-about-section">
        <div className="sniff-about-info">
          <h2 className="sniff-about-info-title">Хто ми такі?</h2>
          <div className="sniff-about-info-text">
            <p>
              Натхненна численними історiями про те, як українці допомагають
              чотирилапим, навіть ризикуючи власним життям та безпекою, команда
              Sniff допомагає обʼєднатись всім, хто розшукує свого улюбленця або
              готовий надати притулок тваринці, про яку зараз немає кому
              подбати.
            </p>
            <p>
              Наша платформа охоплює користувачів з усіх регіонів України: це і
              волонтерські організаціі, і притулки, а також звичайні люди з
              надзвичайно добрим серцем.
            </p>
          </div>
        </div>

        <div className="sniff-about-item">
          <img className="sniff-about-item-image" src={Pattern} alt="Pattern" />
        </div>
      </div>
      <div className="sniff-about-text">
        <h1 className="sniff-about-text-title">
          Маєте питання чи <br /> пропозиції?
        </h1>
        <Button className="sniff-about-text-btn" href="#">
          Написати нам
        </Button>
      </div>
    </section>
  );
};

export default About;
