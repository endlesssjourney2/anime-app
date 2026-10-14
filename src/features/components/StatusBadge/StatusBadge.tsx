import type { FC } from "react";
import type { AniListStatus } from "../../../types/AniList";
import s from "./StatusBadge.module.css";
import { STATUS_LABELS } from "../../../constants/filtersOptions";

type Props = {
  status: AniListStatus;
  variant?: "default" | "compact";
};

const StatusBadge: FC<Props> = ({ status, variant = "default" }) => {
  if (variant === "compact") {
    return <span className={`${s.compact} ${s[status]}`}>{STATUS_LABELS[status]}</span>;
  }

  return <span className={s.badge}>{STATUS_LABELS[status]}</span>;
};

export default StatusBadge;
