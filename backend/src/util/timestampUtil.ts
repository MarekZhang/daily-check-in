export function getTodayTimestampRange() {
  const now = new Date();

  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  const startTimeStamp = Math.floor(startOfDay.getTime() / 1000);
  const endTimeStamp = Math.floor(endOfDay.getTime() / 1000);

  return [startTimeStamp, endTimeStamp];
}

export function getWeekTimestampRange() {
  const now = new Date();

  const startOfWeek = new Date(now);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(now);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const startTimeStamp = Math.floor(startOfWeek.getTime() / 1000);
  const endTimeStamp = Math.floor(endOfWeek.getTime() / 1000);

  return [startTimeStamp, endTimeStamp];
}

export function getAllTimeTimestampRange() {
  const now = new Date();
  const start = new Date("2023-08-27");

  const endTimeStamp = Math.floor(now.getTime() / 1000);
  const startTimeStamp = Math.floor(start.getTime() / 1000);

  return [startTimeStamp, endTimeStamp];
}
