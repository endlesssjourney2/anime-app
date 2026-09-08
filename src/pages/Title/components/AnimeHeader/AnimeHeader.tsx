import type { FC } from "react";
import s from "./AnimeHeader.module.css";
import { IconStarFilled } from "@tabler/icons-react";
import type { AniListMediaDetails } from "../../../../types/AniList";
import StatusBadge from "../../../../features/components/StatusBadge/StatusBadge";
import { airingTimeFormatter } from "../../../../helpers/airingTimeFormatter";
import { checkEpisodes } from "../../../../helpers/checkEpisodes";

type Props = {
  anime: AniListMediaDetails;
  animeTitle: string;
};

const AnimeHeader: FC<Props> = ({ anime, animeTitle }) => {
  return (
    <>
      <img className={s.banner} src={anime?.bannerImage} alt={animeTitle} />

      <div className={s.headerBlock}>
        <img
          className={s.poster}
          src={anime?.coverImage.large}
          alt={animeTitle}
        />

        <div className={s.info}>
          <h1 className={s.title}>{animeTitle}</h1>
          <p className={s.meta}>
            {anime?.genres.join(", ")}
            {` · ${checkEpisodes(anime?.episodes)} · `}
            {<StatusBadge status={anime.status} />}
            {` · ${anime?.startDate.year}`}
          </p>
          <div className={s.score}>
            {anime?.averageScore ? (
              <span className={s.scoreValue}>{anime.averageScore}</span>
            ) : (
              <span className={s.scoreValue}>N/A</span>
            )}
            <IconStarFilled stroke={1} size={16} />
          </div>
          {anime?.status === "RELEASING" && (
            <div className={s.nextAiring}>
              <span className={s.episodeNumber}>
                Episode {anime.nextAiringEpisode.episode}:
              </span>
              <span className={s.airingDate}>
                {airingTimeFormatter(anime.nextAiringEpisode.timeUntilAiring)}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AnimeHeader;
