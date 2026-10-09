import type { FC } from "react";
import s from "./RecommendationCard.module.css";
import ScoreBadge from "../../../../../features/components/ScoreBadge/ScoreBadge";
import type { MediaRecommendation } from "../../../../../types/Recommendations";
import { getEpisodeInfo } from "../../../../../helpers/getEpisodeInfo";
import { Link } from "react-router-dom";
import { FORMAT_LABELS } from "../../../../../constants/filtersOptions";

type Props = {
  anime: MediaRecommendation;
};

const RecommendationCard: FC<Props> = ({ anime }) => {
  const title =
    anime.title.english ?? anime.title.romaji ?? anime.title.native ?? "Unknown title";

  const image = anime.coverImage.large ?? anime.coverImage.medium;

  const { episodesText } = getEpisodeInfo(anime.episodes, null);

  const genres = anime.genres.slice(0, 3).join(" · ");

  return (
    <Link to={`/anime/${anime.id}`} className={s.item}>
      <img className={s.image} src={image} alt={title} />
      <div className={s.info}>
        <div className={s.mainInfo}>
          <span className={s.title}>{title}</span>
          <ScoreBadge score={anime.averageScore} />
          <div className={s.meta}>
            {anime.format && (
              <span className={s.metaItem}>{FORMAT_LABELS[anime.format]}</span>
            )}
            <span className={s.metaItem}>{episodesText}</span>
          </div>
        </div>
        {genres && <span className={s.genres}>{genres}</span>}
      </div>
    </Link>
  );
};

export default RecommendationCard;
