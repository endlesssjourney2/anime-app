import dayjs from "dayjs";

export const checkBirthday = (day: number | null, month: number | null) => {
  if (!day || !month) return "Unknown";

  //date - day
  return dayjs()
    .month(month - 1)
    .date(day)
    .format("MMM D");
};
