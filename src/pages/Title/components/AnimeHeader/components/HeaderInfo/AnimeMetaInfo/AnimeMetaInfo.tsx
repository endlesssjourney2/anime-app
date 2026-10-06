import s from "./AnimeMetaInfo.module.css";
import {
  IconBuilding,
  IconCalendar,
  IconClock,
  IconStack2,
} from "@tabler/icons-react";
import FormatBadge from "../../../../../../../features/components/FormatBadge/FormatBadge";
import StatusBadge from "../../../../../../../features/components/StatusBadge/StatusBadge";
import ScoreBadge from "../../../../../../../features/components/ScoreBadge/ScoreBadge";
import { getEpisodeInfo } from "../../../../../../../helpers/getEpisodeInfo";
import type { AniListMediaDetails } from "../../../../../../../types/AniList";
import type { FC } from "react";

type Props = {
  anime: AniListMediaDetails;
};

const AnimeMetaInfo: FC<Props> = ({ anime }) => {
  const { episodesText, durationText } = getEpisodeInfo(
    anime.episodes ?? null,
    anime.duration ?? null,
  );

  const startYear = anime.startDate.year ?? "Unknown Year";

  const studio = anime.studios.nodes[0].name ?? "Unknown Studio";

  return (
    <div className={s.meta}>
      <div className={s.metaGenres}>
        <span className={s.genres}>{anime.genres.join(" · ")}</span>
        <StatusBadge status={anime.status} />
      </div>
      <div className={s.metaItems}>
        <FormatBadge format={anime.format} />
        <div className={s.divider} />
        <div className={s.metaItem}>
          <IconStack2 size={16} />
          {episodesText}
        </div>
        <div className={s.divider} />
        <div className={s.metaItem}>
          <IconClock size={16} />
          {durationText}
        </div>
        <div className={s.divider} />
        <div className={s.metaItem}>
          <IconCalendar size={16} />
          {startYear}
        </div>
        <div className={s.divider} />
        <div className={s.metaItem}>
          <IconBuilding size={16} />
          {studio}
        </div>
        <div className={s.divider} />
        <ScoreBadge score={anime.averageScore} />
      </div>
    </div>
  );
};

export default AnimeMetaInfo;
