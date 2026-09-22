import dayjs from "dayjs";

export const checkBirthday = (day: number | null, month: number | null) => {
  if (!day || !month) return "Unknown";

  return dayjs(day)
    .month(month - 1)
    .format("MMM D");
};
