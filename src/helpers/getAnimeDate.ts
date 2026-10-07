import dayjs from "dayjs";

export const getAnimeDate = (
  day: number | null,
  month: number | null,
  year: number | null,
) => {
  if (day === null || month === null || year === null) return null;

  return dayjs()
    .year(year)
    .month(month - 1)
    .date(day)
    .format("D MMM YYYY");
};
