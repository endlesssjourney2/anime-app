import type { FC } from "react";
import s from "./ScoreBadge.module.css";
import { IconStar } from "@tabler/icons-react";

type Props = {
  score: number;
};

const ScoreBadge: FC<Props> = ({ score }) => {
  return (
    <div className={s.score}>
      <IconStar stroke={2} size={16} color="var(--color-rating-star)" />
      {score ? (
        <span className={s.scoreValue}>{score}</span>
      ) : (
        <span className={s.scoreValue}>N/A</span>
      )}
    </div>
  );
};

export default ScoreBadge;
