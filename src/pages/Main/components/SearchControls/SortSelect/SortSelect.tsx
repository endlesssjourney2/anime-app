import type { FC } from "react";
import type { AniListSort } from "../../../../../types/AniListSort";
import * as Select from "@radix-ui/react-select";
import s from "./SortSelect.module.css";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import { SORT_OPTIONS } from "../../../../../constants/filtersOptions";

type Props = {
  sort: AniListSort;
  setSort: (v: AniListSort) => void;
};

const SortSelect: FC<Props> = ({ sort, setSort }) => {
  return (
    <Select.Root
      value={sort}
      onValueChange={(value) => setSort(value as AniListSort)}
    >
      <Select.Trigger asChild>
        <button className={s.trigger}>
          <Select.Value placeholder="Sort by" />
          <Select.Icon>
            <IconChevronDown size={14} />
          </Select.Icon>
        </button>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={s.content} position="popper">
          <Select.Viewport>
            <Select.Group className={s.group}>
              <Select.Label className={s.label}>Sort by</Select.Label>
              {SORT_OPTIONS.map((so) => (
                <Select.Item key={so.value} className={s.item} value={so.value}>
                  <Select.ItemText>{so.label}</Select.ItemText>
                  <Select.ItemIndicator className={s.indicator}>
                    <IconCheck size={14} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SortSelect;
