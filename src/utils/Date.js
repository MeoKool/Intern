export const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero indexed
  const year = date.getFullYear();

  // Ensure two digits for day and month
  const formattedDay = day < 10 ? "0" + day : day;
  const formattedMonth = month < 10 ? "0" + month : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
};
