// convert to date format - "DD-MM-YYYY"

function convertDateToDdMmYyyy(dateUTC: Date) {
  return `${dateUTC.getFullYear()}-${(dateUTC.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${dateUTC.getDate().toString().padStart(2, "0")}`;
}

export default convertDateToDdMmYyyy;
