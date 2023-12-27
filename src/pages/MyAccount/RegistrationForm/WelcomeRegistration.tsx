import React from "react";
import PageWelcome from "../../../components/PageWelcome/PageWelcome";

const WelcomeRegistration = () => {
  const welcomeText =
    "Ми дуже раді, що ви долучилися до нас. Будь ласка, для завершення реєстрації підтвердіть свою пошту. Для цього просто натисніть на посилання нижче:";
  const welcomeButton = "Підтвердити пошту";
  const welcomeFooter = (
    <div>
      <p className="message-footer-text">
        Якщо кнопка “Підтвердити пошту” не працює, то спробуйте скопіювати і
        вставити URL у свій браузер. Якщо ви все ще маєте проблеми зі зміною
        паролю, то{" "}
        <span className="label-text-us">
          <a href="mailto:mspfordata@gmail.com">напишіть нам.</a>
        </span>
      </p>
    </div>
  );
  return (
    <PageWelcome
      welcomeText={welcomeText}
      button={welcomeButton}
      footer={welcomeFooter}
    />
  );
};

export default WelcomeRegistration;
