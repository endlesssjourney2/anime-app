import type { FC } from "react";
import type { AniListMedia } from "../../../../types/AniList";
import s from "./AnimeItem.module.css";
import StatusBadge from "../../../../features/components/StatusBadge/StatusBadge";
import { Link } from "react-router-dom";

type Props = {
  anime: AniListMedia;
};

const AnimeItem: FC<Props> = ({ anime }) => {
  return (
    <Link to={`/anime/${anime.id}`} key={anime.id} className={s.item}>
      <div className={s.top}>
        <img src={anime.coverImage.large} alt={anime.title.english} />
      </div>
      <div className={s.bottom}>
        <span className={s.title}>
          {anime.title.english ?? anime.title.romaji ?? anime.title.native}
        </span>
        <span className={s.genres}>{anime.genres.join(", ")}</span>
        <div className={s.info}>
          <span className={s.avgScore}>{anime.averageScore}</span>
          <StatusBadge status={anime.status} />
        </div>
      </div>
    </Link>
  );
};

export default AnimeItem;
