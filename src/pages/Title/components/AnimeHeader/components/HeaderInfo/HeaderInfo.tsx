import type { FC } from "react";
import StatusBadge from "../../../../../../features/components/StatusBadge/StatusBadge";
import type { AniListMediaDetails } from "../../../../../../types/AniList";
import s from "./HeaderInfo.module.css";
import { checkEpisodes } from "../../../../../../helpers/checkEpisodes";
import { IconStarFilled } from "@tabler/icons-react";

type Props = {
  anime: AniListMediaDetails;
  animeTitle: string;
};

const HeaderInfo: FC<Props> = ({ anime, animeTitle }) => {
  return (
    <div className={s.info}>
      <h1 className={s.title}>{animeTitle}</h1>
      <div className={s.meta}>
        <span>{anime?.genres.join(", ")}</span>
        <StatusBadge status={anime.status} />
        <span>{anime?.startDate.year}</span>
      </div>
      <div className={s.episodes}>
        <span className={s.episodeValue}>
          {checkEpisodes(anime?.episodes)} / {anime?.duration} minutes
        </span>
      </div>
      <div className={s.score}>
        {anime?.averageScore ? (
          <span className={s.scoreValue}>{anime.averageScore}</span>
        ) : (
          <span className={s.scoreValue}>N/A</span>
        )}
        <IconStarFilled stroke={1} size={16} />
      </div>
    </div>
  );
};

export default HeaderInfo;
