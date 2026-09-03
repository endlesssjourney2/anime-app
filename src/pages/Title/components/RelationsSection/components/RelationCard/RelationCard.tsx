import type { FC } from "react";
import s from "./RelationCard.module.css";
import type { AniListRelation } from "../../../../../../types/Relation";

type Props = {
  onClick: () => void;
  relationType: AniListRelation;
  title: string;
  image: string;
};

const RELATION_LABELS: Record<
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

const RelationCard: FC<Props> = ({ relationType, title, image, onClick }) => {
  return (
    <div className={s.item}>
      <img className={s.image} src={image} alt={title} onClick={onClick} />
      <p className={s.title}>{title}</p>
      <p className={s.relationType}>{RELATION_LABELS[relationType]}</p>
    </div>
  );
};

export default RelationCard;
