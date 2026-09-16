import type { FC } from "react";
import s from "./SearchControls.module.css";
import type { AniListSort } from "../../../../types/AniListSort";

type Props = {
  searchItem: string;
  setSearchItem: (v: string) => void;
  sort: AniListSort;
  setSort: (v: AniListSort) => void;
  loading: boolean;
};

const SearchControls: FC<Props> = ({
  searchItem,
  setSearchItem,
  sort,
  setSort,
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
    </div>
  );
};

export default SearchControls;
