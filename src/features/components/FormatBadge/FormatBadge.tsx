import s from "./FormatBadge.module.css";
import type { FC } from "react";
import type { AniListFormat } from "../../../types/AniList";

type Props = {
  format: AniListFormat;
};

const FORMAT_LABELS: Record<AniListFormat, string> = {
  TV: "TV",
  MOVIE: "Movie",
  OVA: "OVA",
  ONA: "ONA",
  TV_SHORT: "TV short",
  SPECIAL: "Special",
  MUSIC: "Music",
};

const FormatBadge: FC<Props> = ({ format }) => {
  return <div className={s.format}>{FORMAT_LABELS[format]}</div>;
};

export default FormatBadge;
