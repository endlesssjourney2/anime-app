import type { FC } from "react";
import s from "./LoadMoreBtn.module.css";
import { IconChevronDown } from "@tabler/icons-react";

type Props = {
  onClick: () => void;
  disabled: boolean;
};

const LoadMoreBtn: FC<Props> = ({ onClick, disabled }) => {
  return (
    <div className={s.actionBtn}>
      <button className={s.loadMoreBtn} onClick={onClick} disabled={disabled}>
        <span>Load more</span>
        <IconChevronDown className={s.loadMoreBtnIcon} size={14} />
      </button>
    </div>
  );
};

export default LoadMoreBtn;
