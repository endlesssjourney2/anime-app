import type { FC } from "react";
import s from "./RelationCard.module.css";
import type { AniListRelation } from "../../../../../../types/Relation";
import type { AniListStatus } from "../../../../../../types/AniList";
import { checkEpisodes } from "../../../../../../helpers/checkEpisodes";
import ScoreBadge from "../../../../../../features/components/ScoreBadge/ScoreBadge";
import StatusBadge from "../../../../../../features/components/StatusBadge/StatusBadge";

type Props = {
  onClick: () => void;
  relationType: AniListRelation;
  title: string;
  image: string;
  format: string;
  status: AniListStatus;
  episodes: number | null;
  averageScore: number | null;
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
  title,
  image,
  onClick,
  format,
  status,
  episodes,
  averageScore,
}) => {
  return (
    <div className={s.item} onClick={onClick}>
      <img className={s.image} src={image} alt={title} />
      <div className={s.info}>
        <div className={s.header}>
          <span className={s.title}>{title}</span>
          <ScoreBadge score={averageScore} />
        </div>
        <div className={s.meta}>
          <span className={s.metaItem}>{format}</span>
          <span className={s.metaItem}>{checkEpisodes(episodes, null)}</span>
          <StatusBadge status={status} />
        </div>
        <span className={`${s.relationType} ${s[relationType]}`}>
          {RELATION_LABELS[relationType]}
        </span>
      </div>
    </div>
  );
};

export default RelationCard;
