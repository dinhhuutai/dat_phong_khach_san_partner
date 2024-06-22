export default function milliSeconds(d, m, y) {
  const date = new Date(y, m, d);

  return date.getTime();
}
