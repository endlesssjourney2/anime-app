import type { FC } from "react";
import s from "./SearchControls.module.css";
import type { AniListSort } from "../../../../types/AniListSort";
import type { AniListFormat, AniListStatus } from "../../../../types/AniList";
import SortSelect from "./SortSelect/SortSelect";
import MultiSelect from "../MultiSelect/MultiSelect";
import {
  FORMAT_OPTIONS,
  STATUS_OPTIONS,
} from "../../../../constants/filtersOptions";

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

      <div className={s.multiSelectsContainer}>
        <MultiSelect
          label="Statuses"
          options={STATUS_OPTIONS}
          selected={statuses}
          setSelected={setStatuses}
        />
        <MultiSelect
          label="Formats"
          options={FORMAT_OPTIONS}
          selected={formats}
          setSelected={setFormats}
        />
      </div>
      <SortSelect sort={sort} setSort={setSort} />
    </div>
  );
};

export default SearchControls;
