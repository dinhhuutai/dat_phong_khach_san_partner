export default function FormattedDate(date) {
  const currentDate = new Date(date);

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  return `${day}/${month}/${year}`;
}
