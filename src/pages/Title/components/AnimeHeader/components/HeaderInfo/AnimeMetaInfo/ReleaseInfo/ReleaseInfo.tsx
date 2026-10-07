import type { FC } from "react";
import type {
  AniListDate,
  AniListSeason,
} from "../../../../../../../../types/AniList";
import s from "./ReleaseInfo.module.css";
import {
  IconCalendar,
  IconFlower,
  IconLeafMaple,
  IconSnowflake,
  IconSunHigh,
} from "@tabler/icons-react";
import { getAnimeDate } from "../../../../../../../../helpers/getAnimeDate";
import { capitalizeFirst } from "../../../../../../../../helpers/capitalizeFirst";

type Props = {
  startDate: AniListDate;
  endDate: AniListDate;
  season: AniListSeason | null;
  seasonYear: number | null;
};

const SEASONS_ICON: Record<AniListSeason, React.ElementType> = {
  WINTER: IconSnowflake,
  SPRING: IconFlower,
  SUMMER: IconSunHigh,
  FALL: IconLeafMaple,
};

const ReleaseInfo: FC<Props> = ({ startDate, endDate, season, seasonYear }) => {
  const normalizeStartDate = getAnimeDate(
    startDate.day,
    startDate.month,
    startDate.year,
  );

  const normalizeEndDate = getAnimeDate(
    endDate.day,
    endDate.month,
    endDate.year,
  );

  const SeasonIcon = season ? SEASONS_ICON[season] : null;

  const seasonLabel = capitalizeFirst(season);

  const isDateSame =
    normalizeStartDate !== null &&
    normalizeEndDate !== null &&
    normalizeStartDate === normalizeEndDate;

  return (
    <div className={s.metaItems}>
      {season && seasonYear && (
        <>
          <div className={`${s.metaItem} ${s[season]}`}>
            <SeasonIcon size={16} />
            <span>{seasonLabel}</span>
            <span>{seasonYear}</span>
          </div>
          <div className={s.divider} />
        </>
      )}

      <div className={s.metaItem}>
        {(normalizeStartDate || normalizeEndDate) && (
          <>
            <IconCalendar size={16} />

            {normalizeStartDate && normalizeEndDate ? (
              isDateSame ? (
                <span>{normalizeStartDate}</span>
              ) : (
                <span>
                  {normalizeStartDate} - {normalizeEndDate}
                </span>
              )
            ) : (
              <span>{normalizeStartDate ?? normalizeEndDate}</span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReleaseInfo;
