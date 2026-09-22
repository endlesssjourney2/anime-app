import type { FC } from "react";
import s from "./SearchControls.module.css";
import type { AniListSort } from "../../../../types/AniListSort";
import type { AniListFormat, AniListStatus } from "../../../../types/AniList";

type Props = {
  searchItem: string;
  setSearchItem: (v: string) => void;
  sort: AniListSort;
  setSort: (v: AniListSort) => void;
  status: AniListStatus;
  setStatus: (v: AniListStatus) => void;
  format: AniListFormat;
  setFormat: (v: AniListFormat) => void;
  loading: boolean;
};

const SearchControls: FC<Props> = ({
  searchItem,
  setSearchItem,
  sort,
  setSort,
  status,
  setStatus,
  format,
  setFormat,
  loading,
}) => {
  return (
    <div className={s.searchContainer}>
      <input
        disabled={loading}
        className={s.searchInput}
        type="text"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        placeholder="Search anime..."
      />

      <select
        disabled={loading}
        value={sort}
        onChange={(e) => setSort(e.target.value as AniListSort)}
        className={s.sortSelect}
      >
        <option value="SCORE_DESC">Score</option>
        <option value="POPULARITY_DESC">Popularity</option>
        <option value="TRENDING_DESC">Trending</option>
      </select>

      <select
        disabled={loading}
        value={status ?? ""}
        onChange={(e) =>
          setStatus(e.target.value ? (e.target.value as AniListStatus) : null)
        }
        className={s.sortSelect}
      >
        <option value="">All</option>
        <option value="FINISHED">Finished</option>
        <option value="RELEASING">Releasing</option>
        <option value="NOT_YET_RELEASED">Not released yet</option>
        <option value="CANCELLED">Cancelled</option>
        <option value="HIATUS">Hiatus</option>
      </select>

      <select
        disabled={loading}
        value={format ?? ""}
        onChange={(e) =>
          setFormat(e.target.value ? (e.target.value as AniListFormat) : null)
        }
        className={s.sortSelect}
      >
        <option value="">All</option>
        <option value="TV">TV</option>
        <option value="TV_SHORT">TV Short</option>
        <option value="MOVIE">Movie</option>
        <option value="SPECIAL">Special</option>
        <option value="OVA">OVA</option>
        <option value="ONA">ONA</option>
        <option value="MUSIC">Music</option>
      </select>
    </div>
  );
};

export default SearchControls;
