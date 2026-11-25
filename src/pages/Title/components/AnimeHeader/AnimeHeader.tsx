import type { FC } from "react";
import s from "./AnimeHeader.module.css";
import type { AniListMediaDetails } from "../../../../types/AniList";
import { airingTimeFormatter } from "../../../../helpers/airingTimeFormatter";
import HeaderInfo from "./components/HeaderInfo/HeaderInfo";
import BackButton from "./components/BackButton/BackButton";
import FavoriteActionBtn from "../../../../features/components/FavoriteActionBtn/FavoriteActionBtn";
import type { WatchStatus } from "../../../../types/UserAnime";

type Props = {
  anime: AniListMediaDetails;
  animeTitle: string;
  isFavorite: boolean;
  removeFavorite: (animeId: number) => void;
  addFavorite: (animeId: number) => void;
  disabled: boolean;
  status: WatchStatus | null;
  onStatusChange: (status: WatchStatus | null) => void;
  disabledSelect: boolean;
};

const AnimeHeader: FC<Props> = ({
  anime,
  animeTitle,
  isFavorite,
  removeFavorite,
  addFavorite,
  disabled,
  status,
  onStatusChange,
  disabledSelect,
}) => {
  const timeUntilAiring = airingTimeFormatter(anime?.nextAiringEpisode?.timeUntilAiring);

  return (
    <>
      <div className={s.bannerWrapper}>
        <img className={s.banner} src={anime?.bannerImage} alt={animeTitle} />
        <BackButton />
        <FavoriteActionBtn
          isFavorite={isFavorite}
          removeFavorite={removeFavorite}
          addFavorite={addFavorite}
          id={anime.id}
          disabled={disabled}
        />
      </div>

      <div className={s.headerBlock}>
        <div className={s.imgInfo}>
          <img className={s.poster} src={anime?.coverImage.large} alt={animeTitle} />
          {anime?.status === "RELEASING" && (
            <div className={s.nextAiring}>
              <span className={s.episodeNumber}>
                Episode {anime.nextAiringEpisode?.episode}:
              </span>
              <span className={s.airingDate}>{timeUntilAiring}</span>
            </div>
          )}
        </div>
        <HeaderInfo
          anime={anime}
          animeTitle={animeTitle}
          status={status}
          onStatusChange={onStatusChange}
          disabledSelect={disabledSelect}
        />
      </div>
    </>
  );
};

export default AnimeHeader;
