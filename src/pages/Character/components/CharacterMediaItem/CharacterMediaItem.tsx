import s from "./CharacterMediaItem.module.css";
import type { FC } from "react";
import type { MediaNode } from "../../../../types/CharacterDetails";
import FormatBadge from "../../../../features/components/FormatBadge/FormatBadge";
import { Link } from "react-router-dom";
import StatusBadge from "../../../../features/components/StatusBadge/StatusBadge";
import { getEpisodeInfo } from "../../../../helpers/getEpisodeInfo";
import type { CharacterRole } from "../../../../types/Character";
import RoleBadge from "../../../../features/components/RoleBadge/RoleBadge";

type Props = {
  media: MediaNode;
  role: CharacterRole;
};

const CharacterMediaItem: FC<Props> = ({ media, role }) => {
  const title = media.title.english ?? media.title.romaji ?? media.title.native;

  const { episodesText } = getEpisodeInfo(media.episodes, null);

  return (
    <Link to={`/anime/${media.id}`} className={s.item}>
      <img className={s.image} src={media.coverImage.large} alt="" />
      <div className={s.info}>
        <span className={s.title}>{title}</span>
        <div className={s.details}>
          {media.format && <FormatBadge format={media.format} variant="compact" />}
          {media.status && <StatusBadge status={media.status} />}
          {role && <RoleBadge role={role} />}
        </div>
        <span className={s.seasonInfo}>
          {media.seasonYear ?? "Unknown"} · {episodesText}
        </span>
      </div>
    </Link>
  );
};

export default CharacterMediaItem;
