import type { FC } from "react";
import s from "./SearchControls.module.css";
import PerPageSelect from "../../../../features/components/PerPageSelect/PerPageSelect";

type Props = {
  searchItem: string;
  setSearchItem: (v: string) => void;
  perPage: string;
  setPerPage: (v: string) => void;
};

const SearchControls: FC<Props> = ({
  searchItem,
  setSearchItem,
  perPage,
  setPerPage,
}) => {
  return (
    <div className={s.searchContainer}>
      <input
        placeholder="Search character..."
        className={s.searchInput}
        type="text"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />
      <PerPageSelect
        perPage={perPage}
        setPerPage={setPerPage}
        options={[
          { value: "12", label: "12 characters" },
          { value: "18", label: "18 characters" },
          { value: "32", label: "36 characters" },
          { value: "48", label: "48 characters" },
        ]}
      />
    </div>
  );
};

export default SearchControls;
