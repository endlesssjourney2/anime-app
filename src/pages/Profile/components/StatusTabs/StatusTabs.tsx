import type { FC } from "react";
import { WATCH_STATUS_OPTIONS } from "../../../../constants/filtersOptions";
import type { WatchStatus } from "../../../../types/UserAnime";
import s from "./StatusTabs.module.css";

type Props = {
  status: WatchStatus;
  onChange: (status: WatchStatus | null) => void;
};

const StatusTabs: FC<Props> = ({ status, onChange }) => {
  return (
    <div className={s.tabs}>
      <button
        type="button"
        className={`${s.tab} ${status === null ? s.active : ""}`}
        onClick={() => onChange(null)}
      >
        All
      </button>
      {WATCH_STATUS_OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          className={`${s.tab} ${status === o.value ? s.active : ""}`}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
};

export default StatusTabs;
