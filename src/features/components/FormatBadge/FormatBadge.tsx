import s from "./FormatBadge.module.css";
import type { FC } from "react";
import type { AniListFormat } from "../../../types/AniList";
import { FORMAT_LABELS } from "../../../constants/filtersOptions";

type Props = {
  format: AniListFormat;
};

const FormatBadge: FC<Props> = ({ format }) => {
  return <div className={s.format}>{FORMAT_LABELS[format]}</div>;
};

export default FormatBadge;
