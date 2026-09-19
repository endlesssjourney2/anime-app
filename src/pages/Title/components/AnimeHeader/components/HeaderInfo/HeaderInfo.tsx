import type { FC } from "react";
import StatusBadge from "../../../../../../features/components/StatusBadge/StatusBadge";
import type { AniListMediaDetails } from "../../../../../../types/AniList";
import s from "./HeaderInfo.module.css";
import { checkEpisodes } from "../../../../../../helpers/checkEpisodes";
import ScoreBadge from "../../../../../../features/components/ScoreBadge/ScoreBadge";

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
          {checkEpisodes(anime.episodes, anime.duration)}
        </span>
        <span className={s.format}>{anime.format}</span>
      </div>
      <ScoreBadge score={anime.averageScore} />
    </div>
  );
};

export default HeaderInfo;
