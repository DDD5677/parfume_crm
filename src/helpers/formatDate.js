export const dateFormat = (payload) => {
   const date = new Date(payload);
   // Extract day, month, and year from the date object
   const day = date.getDate();
   const month = date.getMonth() + 1; // Month is zero-based, so we add 1
   const year = date.getFullYear();

   // Ensure day and month are formatted with leading zeros if necessary
   const formattedDay = day < 10 ? `0${day}` : day;
   const formattedMonth = month < 10 ? `0${month}` : month;

   // Format date as DD.MM.YYYY
   const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;

   return formattedDate;
};
