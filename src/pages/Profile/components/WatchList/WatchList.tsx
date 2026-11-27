import s from "./WatchList.module.css";
import type { FC } from "react";
import type { WatchListMedia } from "../../../../types/WatchList";
import { Link } from "react-router-dom";
import { WATCH_STATUS_LABELS } from "../../../../constants/filtersOptions";

type Props = {
  watchList: WatchListMedia;
  getWatchStatus: (animeId: number) => string;
};

const WatchList: FC<Props> = ({ watchList, getWatchStatus }) => {
  return (
    <div className={s.list}>
      {watchList?.map((anime) => {
        const currentStatus = getWatchStatus(anime.id);
        const title = anime.title.english ?? anime.title.romaji ?? anime.title.native;
        return (
          <div className={s.item} key={anime.id}>
            <img
              className={s.img}
              src={anime.coverImage.large}
              alt={title}
              loading="lazy"
            />
            <div className={s.info}>
              <Link to={`/anime/${anime.id}`} className={s.title}>
                {title}
              </Link>
              <div className={s.meta}>
                <span>{anime.seasonYear || "Unknown"}</span>
                <span>{anime.format}</span>
                <span>
                  {anime.episodes ?? "?"} {anime.episodes === 1 ? "episode" : "episodes"}
                </span>
              </div>
            </div>
            <div className={`${s.status} ${s[currentStatus]}`}>
              {WATCH_STATUS_LABELS[currentStatus]}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WatchList;
