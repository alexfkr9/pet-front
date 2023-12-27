import FormValidator from "./FormValidator";
import { inputTypes } from "./ValidationTypes";

const validationRules = {
  nameNotEmpty: {
    field: "first_name",
    method: "isEmpty",
    validWhen: false,
    message: "Введіть ваше ім'я"
  },
  nameCyrillic: {
    field: "first_name",
    method: "matches",
    args: [/^(?![\s])((?![a-zA-Z0-9])[а-яієїґ'А-ЯІЄЇҐ' ]+)*$/],
    validWhen: true,
    message: "Введіть ваше ім'я кирилицею"
  },
  lastNameNotEmpty: {
    field: "last_name",
    method: "isEmpty",
    validWhen: false,
    message: "Введіть ваше прізвище"
  },
  lastNameCyrillic: {
    field: "last_name",
    method: "matches",
    args: [/^(?![\s])((?![a-zA-Z0-9])[а-яієїґ'А-ЯІЄЇҐ' ]+)*$/],
    validWhen: true,
    message: "Введіть ваше прізвище кирилицею"
  },
  phoneNotEmpty: {
    field: "phone",
    method: "isEmpty",
    validWhen: false,
    message: "Введіть ваш номер телефону"
  },
  phone: {
    field: "phone",
    method: "matches",
    args: [
      /^\+38([-( ]+)?0([-( ]+)?[0-9]{1}[- ]?[0-9]{1}([-) ]+)?[0-9]{1}[- ]?[0-9]{1}[- ]?[0-9]{1}[- ]?[0-9]{1}[- ]?[0-9]{1}[- ]?[0-9]{1}[- ]?[0-9]{1}$/
    ],
    validWhen: true,
    message: "Введіть коректний номер телефону: +380(xx)xxxxxxx"
  },
  emailNotEmpty: {
    field: "email",
    method: "isEmpty",
    validWhen: false,
    message: "Введіть ваш email"
  },
  email: {
    field: "email",
    method: "isEmail",
    validWhen: true,
    message: "Введіть коректний email"
  },
  passwordNotEmpty: {
    field: "password",
    method: "isEmpty",
    validWhen: false,
    message: "Введіть ваш пароль"
  },
  password: {
    field: "password",
    method: "matches",
    args: [/(?=.*[A-Za-z])(?=.*\d)[^\n+]{6,}$/],
    validWhen: true,
    message:
      "Пароль має містити латинські літери, цифри і складати не менше 6 символів"
  },
  passwordMustInclude: {
    field: "password",
    method: passwordNotToInclude,
    validWhen: true,
    message: "Пароль не має включати ім'я, прізвище, email або номер телефону"
  },
  passwordConfirmationNotEmpty: {
    field: "password_confirmation",
    method: "isEmpty",
    validWhen: false,
    message: "Введіть ваш пароль ще раз"
  },
  passwordConfirmationMatches: {
    field: "password_confirmation",
    method: passwordMatch,
    validWhen: true,
    message: "Пароль не співпадає із першим"
  },
  locationNotEmpty: {
    field: "location",
    method: "isEmpty",
    validWhen: false,
    message: "Введіть ваш населений пункт"
  },
  orgName: {
    field: "org_name",
    method: orgNameValid,
    validWhen: true,
    message: "Введіть назву організації"
  },
  privacyChecked: {
    field: "privacy",
    method: isChecked,
    validWhen: true,
    message: "Ознайомтесь і погодьтесь із політикою конфіденційності"
  },
  // pet validation rules
  petNameNotEmpty: {
    field: "name",
    method: "isEmpty",
    validWhen: false,
    message: "Введіть ім'я тваринки"
  },
  petNameCyrillic: {
    field: "name",
    method: "matches",
    args: [/^(?![\s])([а-яієїґ'А-ЯІЄЇҐ'0-9!@#$%^&*(),.`?":;{}|<>\- ]+)*$/],
    validWhen: true,
    message: "Введіть ім'я кирилицею"
  },
  petNameSpecialCharacters: {
    field: "name",
    method: "matches",
    args: [/^(?![\s])([а-яієїґ'А-ЯІЄЇҐ' ]+)*$/],
    validWhen: true,
    message: "Ви не можете використовувати спеціальні символи та цифри"
  },
  petTypeNotEmpty: {
    field: "type",
    method: "isEmpty",
    validWhen: false,
    message: "Введіть тип тварини"
  },
  petLocationCityNotEmpty: {
    field: "locationCity",
    method: "isEmpty",
    validWhen: false,
    message: "Введіть місто"
  },
  petCurrentLocationCityNotEmpty: {
    field: "currentLocationCity",
    method: "isEmpty",
    validWhen: false,
    message: "Введіть місто"
  },
  date: {
    field: "date",
    method: "isEmpty",
    validWhen: false,
    message: "Введіть дату"
  }
};

function passwordNotToInclude(password: string, inputsCheck: inputTypes) {
  if (
    inputsCheck.first_name.trim() !== "" &&
    password.includes(inputsCheck.first_name)
  ) {
    return false;
  } else if (
    inputsCheck.last_name.trim() !== "" &&
    password.includes(inputsCheck.last_name)
  ) {
    return false;
  } else if (
    inputsCheck.phone.trim() !== "" &&
    password.includes(inputsCheck.phone)
  ) {
    return false;
  } else if (
    inputsCheck.email.trim() !== "" &&
    password.includes(inputsCheck.email)
  ) {
    return false;
  } else {
    return true;
  }
}

function passwordMatch(
  confirmation: string,
  inputsCheck: { password: string }
) {
  return inputsCheck.password === confirmation;
}

function orgNameValid(
  _: string,
  inputsCheck: { org_name: string; org_rep: boolean }
) {
  if (inputsCheck.org_rep && inputsCheck.org_name === "") {
    return false;
  } else {
    return true;
  }
}

function isChecked(_: string, inputsCheck: inputTypes) {
  return inputsCheck.privacy;
}
/**
 * Validation rules for
 * authForm: email, password
 */
export const authValidationRules: any = new FormValidator([
  validationRules.emailNotEmpty,
  validationRules.email,
  validationRules.passwordNotEmpty
  // validationRules.password
]);

/**
 * Validation rules for
 * registrationForm:
 */
export const regValidationRules: any = new FormValidator([
  validationRules.nameNotEmpty,
  validationRules.nameCyrillic,
  validationRules.lastNameNotEmpty,
  validationRules.lastNameCyrillic,
  validationRules.phoneNotEmpty,
  validationRules.phone,
  validationRules.emailNotEmpty,
  validationRules.email,
  validationRules.passwordNotEmpty,
  validationRules.password,
  validationRules.passwordMustInclude,
  validationRules.passwordConfirmationNotEmpty,
  validationRules.passwordConfirmationMatches,
  validationRules.locationNotEmpty,
  validationRules.orgName,
  validationRules.privacyChecked
]);

/**
 * Validation rules for
 * petForm:
 */
export const petValidationRules: any = new FormValidator([
  validationRules.petNameNotEmpty,
  validationRules.petNameCyrillic,
  validationRules.petTypeNotEmpty,
  validationRules.petLocationCityNotEmpty,
  validationRules.petNameSpecialCharacters,
  // validationRules.petCurrentLocationCityNotEmpty,
  validationRules.date,
  validationRules.phoneNotEmpty,
  validationRules.phone
]);
