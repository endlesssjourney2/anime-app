import s from "./FormatBadge.module.css";
import type { FC } from "react";
import type { AniListFormat } from "../../../types/AniList";
import { FORMAT_LABELS } from "../../../constants/filtersOptions";
import { IconDeviceTv } from "@tabler/icons-react";

type Props = {
  format: AniListFormat;
};

const FormatBadge: FC<Props> = ({ format }) => {
  return (
    <div className={s.format}>
      <IconDeviceTv size={16} />
      {FORMAT_LABELS[format]}
    </div>
  );
};

export default FormatBadge;
