// convert to phone format - "XXXX (XX) XXX XX XX"

function phoneFormat(phone: string) {
  if (phone === null) return "Не вказано";
  const symbolsToRemove = " )(-";
  const regexPattern = new RegExp(`[${symbolsToRemove}]`, "g");

  const cleanedPhone = phone.replace(regexPattern, "");

  const editedPhone = cleanedPhone.split("");
  editedPhone.splice(4, 0, "\u0020\u0028");
  editedPhone.splice(7, 0, "\u0029\u0020");
  editedPhone.splice(11, 0, "\u0020");
  editedPhone.splice(14, 0, "\u0020");

  return editedPhone.join("");
}

export default phoneFormat;
