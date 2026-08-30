import type { FC } from "react";
import type { AniListStatus } from "../../../types/AniList";
import s from "./StatusBadge.module.css";

type Props = {
  status: AniListStatus;
};

const STATUS_LABELS: Record<AniListStatus, string> = {
  FINISHED: "Finished",
  RELEASING: "Releasing",
  NOT_YET_RELEASED: "Upcoming",
  CANCELLED: "Cancelled",
  HIATUS: "Hiatus",
};

const StatusBadge: FC<Props> = ({ status }) => {
  return (
    <span className={`${s.badge} ${s[status]}`}>{STATUS_LABELS[status]}</span>
  );
};

export default StatusBadge;
