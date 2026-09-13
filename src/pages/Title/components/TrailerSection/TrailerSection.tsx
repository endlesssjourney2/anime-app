import type { FC } from "react";
import type { AniListTrailer } from "../../../../types/AniList";
import s from "./TrailerSection.module.css";

type Props = {
  trailer: AniListTrailer;
};

const TrailerSection: FC<Props> = ({ trailer }) => {
  return (
    <div className={s.section}>
      <p className={s.sectionTitle}>Trailer</p>
      <div className={s.trailerContainer}>
        <iframe
          className={s.iframe}
          src={`https://www.youtube.com/embed/${trailer.id}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          loading="lazy"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default TrailerSection;
