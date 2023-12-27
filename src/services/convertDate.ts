// convertDate to DD-MM-YYYY
function convertDate(date: string) {
  if (date !== null && date !== undefined) {
    const p = date.split(/\D/g);
    return [p[2], p[1], p[0]].join("-");
  }
}

export default convertDate;
