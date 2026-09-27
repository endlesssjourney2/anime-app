import type { FC } from "react";
import type { AniListStatus } from "../../../types/AniList";
import s from "./StatusBadge.module.css";
import { STATUS_LABELS } from "../../../constants/filtersOptions";

type Props = {
  status: AniListStatus;
};

const StatusBadge: FC<Props> = ({ status }) => {
  return (
    <span className={`${s.badge} ${s[status]}`}>{STATUS_LABELS[status]}</span>
  );
};

export default StatusBadge;
