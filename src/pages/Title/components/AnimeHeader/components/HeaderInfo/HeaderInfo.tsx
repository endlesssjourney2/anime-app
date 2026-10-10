import type { FC } from "react";
import type { AniListMediaDetails } from "../../../../../../types/AniList";
import s from "./HeaderInfo.module.css";
import AnimeMetaInfo from "./AnimeMetaInfo/AnimeMetaInfo";
import ExternalLinks from "../ExternalLinks/ExternalLinks";

type Props = {
  anime: AniListMediaDetails;
  animeTitle: string;
};

const HeaderInfo: FC<Props> = ({ anime, animeTitle }) => {
  return (
    <>
      <div className={s.info}>
        <h1 className={s.title}>{animeTitle}</h1>
        <AnimeMetaInfo anime={anime} />
      </div>
      <ExternalLinks externalLinks={anime.externalLinks} />
    </>
  );
};

export default HeaderInfo;
