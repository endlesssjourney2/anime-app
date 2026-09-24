import type { FC } from "react";
import s from "./SearchControls.module.css";
import type { AniListSort } from "../../../../types/AniListSort";
import type { AniListFormat, AniListStatus } from "../../../../types/AniList";
import FiltersMenu from "./FiltersMenu/FiltersMenu";
import SortSelect from "./SortSelect/SortSelect";

type Props = {
  searchItem: string;
  setSearchItem: (v: string) => void;
  sort: AniListSort;
  setSort: (v: AniListSort) => void;
  statuses: AniListStatus[];
  setStatuses: (v: AniListStatus) => void;
  formats: AniListFormat[];
  setFormats: (v: AniListFormat) => void;
  loading: boolean;
};

const SearchControls: FC<Props> = ({
  searchItem,
  setSearchItem,
  sort,
  setSort,
  statuses,
  setStatuses,
  formats,
  setFormats,
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
      <FiltersMenu
        statuses={statuses}
        setStatuses={setStatuses}
        formats={formats}
        setFormats={setFormats}
      />
      <SortSelect sort={sort} setSort={setSort} />
    </div>
  );
};

export default SearchControls;
