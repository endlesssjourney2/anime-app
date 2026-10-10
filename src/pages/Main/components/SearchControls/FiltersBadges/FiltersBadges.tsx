import { useSearchParams } from "react-router-dom";
import s from "./FiltersBadges.module.css";
import {
  FORMAT_OPTIONS,
  GENRE_OPTIONS,
  STATUS_OPTIONS,
} from "../../../../../constants/filtersOptions";
import type { FC } from "react";
import { IconX } from "@tabler/icons-react";

const FILTER_OPTIONS = {
  status: STATUS_OPTIONS,
  format: FORMAT_OPTIONS,
  genre: GENRE_OPTIONS,
};

type ActiveFilters = {
  type: keyof typeof FILTER_OPTIONS;
  value: string;
  label: string;
};

type Props = {
  onRemove: (type: keyof typeof FILTER_OPTIONS, value: string) => void;
};

const FiltersBadges: FC<Props> = ({ onRemove }) => {
  const [searchParams] = useSearchParams();

  const filters: ActiveFilters[] = Array.from(searchParams.entries())
    .filter(([type]) => ["status", "format", "genre"].includes(type))
    .map(([type, value]) => {
      const filterType = type as keyof typeof FILTER_OPTIONS;

      const options = FILTER_OPTIONS[filterType];

      const label =
        options.find((option) => option.value === value)?.label ?? value;

      return {
        type: filterType,
        value,
        label,
      };
    });

  return (
    <div className={s.formats}>
      {filters.map((f) => (
        <div
          className={s.badge}
          key={f.label}
          onClick={() => onRemove(f.type, f.value)}
        >
          <span>{f.label}</span>
          <IconX size={12} />
        </div>
      ))}
    </div>
  );
};

export default FiltersBadges;
