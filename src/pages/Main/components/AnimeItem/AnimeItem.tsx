import type { FC } from "react";
import type { AniListMedia } from "../../../../types/AniList";
import s from "./AnimeItem.module.css";
import StatusBadge from "../../../../features/components/StatusBadge/StatusBadge";
import { Link } from "react-router-dom";
import FavoriteActionBtn from "../../../../features/components/FavoriteActionBtn/FavoriteActionBtn";

type Props = {
  anime: AniListMedia;
  isFavorite: boolean;
  disabled: boolean;
  removeFavorite: (animeId: number) => void;
  addFavorite: (animeId: number) => void;
};

const AnimeItem: FC<Props> = ({
  anime,
  isFavorite,
  removeFavorite,
  addFavorite,
  disabled,
}) => {
  return (
    <div key={anime.id} className={s.item}>
      <Link to={`/anime/${anime.id}`} className={s.content}>
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
            <StatusBadge status={anime.status} variant="compact" />
          </div>
        </div>
      </Link>
      <FavoriteActionBtn
        isFavorite={isFavorite}
        removeFavorite={removeFavorite}
        addFavorite={addFavorite}
        disabled={disabled}
        id={anime.id}
      />
    </div>
  );
};

export default AnimeItem;
