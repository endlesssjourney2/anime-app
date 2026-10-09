import type { FC } from "react";
import s from "./RelationCard.module.css";
import type { AniListRelation, RelationNode } from "../../../../../../types/Relation";
import { getEpisodeInfo } from "../../../../../../helpers/getEpisodeInfo";
import ScoreBadge from "../../../../../../features/components/ScoreBadge/ScoreBadge";
import StatusBadge from "../../../../../../features/components/StatusBadge/StatusBadge";
import { Link } from "react-router-dom";
import { FORMAT_LABELS } from "../../../../../../constants/filtersOptions";

type Props = {
  relationType: AniListRelation;
  anime: RelationNode;
};

export const RELATION_LABELS: Record<
  Exclude<AniListRelation, "OTHER" | "CHARACTER">,
  string
> = {
  ADAPTATION: "Adaptation",
  PREQUEL: "Prequel",
  SEQUEL: "Sequel",
  PARENT: "Parent",
  SIDE_STORY: "Side Story",
  SUMMARY: "Summary",
  ALTERNATIVE: "Alternative",
  SPIN_OFF: "Spin-off",
  SOURCE: "Source",
  COMPILATION: "Compilation",
  CONTAINS: "Contains",
  SAME_UNIVERSE: "Same universe",
};

const RelationCard: FC<Props> = ({
  relationType,

  anime,
}) => {
  const { episodesText } = getEpisodeInfo(anime.episodes, null);
  const image = anime.coverImage.large ?? anime.coverImage.medium;
  const title = anime.title.english ?? anime.title.romaji ?? anime.title.native;

  return (
    <Link className={s.item} to={`/anime/${anime.id}`}>
      <img className={s.image} src={image} alt={title} />
      <div className={s.info}>
        <div className={s.header}>
          <span className={s.title}>{title}</span>
          <ScoreBadge score={anime.averageScore} />
        </div>
        <div className={s.meta}>
          <span className={s.metaItem}>{FORMAT_LABELS[anime.format]}</span>
          <span className={s.metaItem}>{episodesText}</span>
          <StatusBadge status={anime.status} />
        </div>
        <span className={`${s.relationType} ${s[relationType]}`}>
          {RELATION_LABELS[relationType]}
        </span>
      </div>
    </Link>
  );
};

export default RelationCard;
