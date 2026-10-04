import type { FC } from "react";
import s from "./LoadMoreBtn.module.css";
import { IconChevronDown } from "@tabler/icons-react";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

type Props = {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
};

const LoadMoreBtn: FC<Props> = ({ onClick, disabled, loading }) => {
  return (
    <div className={s.actionBtn}>
      <button className={s.loadMoreBtn} onClick={onClick} disabled={disabled}>
        <span>Load more</span>
        {loading ? (
          <Ring size="10" stroke="1.5" speed="1.5" color="currentColor" />
        ) : (
          <IconChevronDown className={s.loadMoreBtnIcon} size={14} />
        )}
      </button>
    </div>
  );
};

export default LoadMoreBtn;
