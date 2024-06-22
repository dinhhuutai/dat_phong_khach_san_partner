export default function distanceTwoDay(d1, m1, y1, d2, m2, y2) {
  const date1 = new Date(y1, m1, d1);

  const date2 = new Date(y2, m2, d2);

  const milliseconds1 = date1.getTime();
  const milliseconds2 = date2.getTime();

  const differenceMilliseconds = Math.abs(milliseconds2 - milliseconds1);

  return differenceMilliseconds / (1000 * 3600 * 24);
}
