const petData: any = {
  typePet: [
    { label: "Собака", value: "DOG" },
    { label: "Кіт", value: "CAT" },
    { label: "Інше", value: "OTHER" }
  ],
  color: [
    { label: "Чорний", value: "black" },
    { label: "Білий", value: "white" },
    { label: "Сірий", value: "grey" },
    { label: "Коричневий", value: "brown" },
    { label: "Різнокольоровий", value: "colorful" },
    { label: "Інший", value: "other" }
  ],
  size: [
    { label: "Маленький (до 46 cм)", value: "SMALL" },
    { label: "Середній (47 - 64 cм)", value: "MEDIUM" },
    { label: "Великий (більше 64 см)", value: "LARGE" }
  ],
  sizeMessage:
    "Щоб виміряти довжину тіла, розмістіть рулетку прямо біля основи хвоста, де хвіст з’єднується з тулубом, а потім витягніть рулетку до основи шиї або до місця з’єднання шиї зі спиною собаки",
  age: [
    { label: "До 1 року", value: "_0_1" },
    { label: "1-3 роки", value: "_1_3" },
    { label: "4-6 років", value: "_4_6" },
    { label: "6-10 років", value: "_6_10" },
    { label: "Понад 10 років", value: "ABOVE_10" },
    { label: "Вік невідомий", value: "UNKNOWN" }
  ],
  getLabel(property: string, findValue: string) {
    if (findValue === null || findValue === undefined || findValue === "") {
      return "Не вказано";
    }
    const found = this[property].find(
      (obj: { value: string }) => obj.value === findValue
    );
    return found.label;
  },
  getPetTypeObj(property: string, findValue: string) {
    const found = this[property].find(
      (obj: { value: string }) => obj.value === findValue
    );
    return found;
  }
};

export default petData;
