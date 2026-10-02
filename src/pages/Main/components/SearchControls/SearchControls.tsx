import type { FC } from "react";
import s from "./SearchControls.module.css";
import type { AniListSort } from "../../../../types/AniListSort";
import type {
  AniListFormat,
  AniListGenre,
  AniListStatus,
} from "../../../../types/AniList";
import SortSelect from "./SortSelect/SortSelect";
import MultiSelect from "../MultiSelect/MultiSelect";
import {
  FORMAT_OPTIONS,
  GENRE_OPTIONS,
  STATUS_OPTIONS,
} from "../../../../constants/filtersOptions";
import FiltersBadges from "./FiltersBadges/FiltersBadges";

type Props = {
  searchItem: string;
  setSearchItem: (v: string) => void;
  sort: AniListSort;
  setSort: (v: AniListSort) => void;
  statuses: AniListStatus[];
  setStatuses: (v: AniListStatus) => void;
  formats: AniListFormat[];
  setFormats: (v: AniListFormat) => void;
  genres: AniListGenre[];
  setGenres: (v: AniListGenre) => void;
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
  genres,
  setGenres,
  loading,
}) => {
  const onRemove = (type: "format" | "status" | "genre", value: string) => {
    switch (type) {
      case "format":
        setFormats(value as AniListFormat);
        break;
      case "status":
        setStatuses(value as AniListStatus);
        break;
      case "genre":
        setGenres(value as AniListGenre);
        break;
    }
  };

  return (
    <div className={s.container}>
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
          <MultiSelect
            label="Genres"
            options={GENRE_OPTIONS}
            selected={genres}
            setSelected={setGenres}
          />
        </div>
        <SortSelect sort={sort} setSort={setSort} />
      </div>
      <div>
        <FiltersBadges onRemove={onRemove} />
      </div>
    </div>
  );
};

export default SearchControls;
