import type { FC } from "react";
import type { AniListMediaDetails } from "../../../../../../types/AniList";
import s from "./HeaderInfo.module.css";
import AnimeMetaInfo from "./AnimeMetaInfo/AnimeMetaInfo";
import ExternalLinks from "../ExternalLinks/ExternalLinks";
import WatchStatusSelect from "../../../WatchStatusSelect/WatchStatusSelect";
import type { WatchStatus } from "../../../../../../types/UserAnime";

type Props = {
  anime: AniListMediaDetails;
  animeTitle: string;
  status: WatchStatus | null;
  onStatusChange: (status: WatchStatus | null) => void;
  disabledSelect: boolean;
};

const HeaderInfo: FC<Props> = ({
  anime,
  animeTitle,
  status,
  onStatusChange,
  disabledSelect,
}) => {
  return (
    <>
      <div className={s.info}>
        <h1 className={s.title}>{animeTitle}</h1>
        <AnimeMetaInfo anime={anime} />
      </div>
      <div className={s.rightInfo}>
        <ExternalLinks externalLinks={anime.externalLinks} />
        <WatchStatusSelect
          status={status}
          onStatusChange={onStatusChange}
          disabled={disabledSelect}
        />
      </div>
    </>
  );
};

export default HeaderInfo;
