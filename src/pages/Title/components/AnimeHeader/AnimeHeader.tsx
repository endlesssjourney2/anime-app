import type { FC } from "react";
import s from "./AnimeHeader.module.css";
import { IconStarFilled } from "@tabler/icons-react";
import type { AniListMediaDetails } from "../../../../types/AniList";
import StatusBadge from "../../../../features/components/StatusBadge/StatusBadge";

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
            {anime?.episodes && <> · {anime.episodes} episodes · </>}
            {anime?.status && <StatusBadge status={anime.status} />}
          </p>

          <div className={s.score}>
            {anime?.averageScore ? (
              <span className={s.scoreValue}>{anime.averageScore}</span>
            ) : (
              <span className={s.scoreValue}>N/A</span>
            )}
            <IconStarFilled stroke={1} size={16} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimeHeader;
