import type { FC } from "react";
import s from "./AnimeHeader.module.css";
import type { AniListMediaDetails } from "../../../../types/AniList";
import { airingTimeFormatter } from "../../../../helpers/airingTimeFormatter";
import HeaderInfo from "./components/HeaderInfo/HeaderInfo";

type Props = {
  anime: AniListMediaDetails;
  animeTitle: string;
};

const AnimeHeader: FC<Props> = ({ anime, animeTitle }) => {
  return (
    <>
      <img className={s.banner} src={anime?.bannerImage} alt={animeTitle} />

      <div className={s.headerBlock}>
        <div className={s.imgInfo}>
          <img
            className={s.poster}
            src={anime?.coverImage.large}
            alt={animeTitle}
          />
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

        <HeaderInfo anime={anime} animeTitle={animeTitle} />
      </div>
    </>
  );
};

export default AnimeHeader;
