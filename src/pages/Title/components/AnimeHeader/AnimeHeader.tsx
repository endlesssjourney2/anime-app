import type { FC } from "react";
import s from "./AnimeHeader.module.css";
import type { AniListMediaDetails } from "../../../../types/AniList";
import { airingTimeFormatter } from "../../../../helpers/airingTimeFormatter";
import HeaderInfo from "./components/HeaderInfo/HeaderInfo";
import ExternalLinks from "./components/ExternalLinks/ExternalLinks";

type Props = {
  anime: AniListMediaDetails;
  animeTitle: string;
};

const AnimeHeader: FC<Props> = ({ anime, animeTitle }) => {
  const timeUntilAiring = airingTimeFormatter(
    anime?.nextAiringEpisode?.timeUntilAiring,
  );

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
              <span className={s.airingDate}>{timeUntilAiring}</span>
            </div>
          )}
        </div>

        <HeaderInfo anime={anime} animeTitle={animeTitle} />
        <ExternalLinks externalLinks={anime.externalLinks} />
      </div>
    </>
  );
};

export default AnimeHeader;
