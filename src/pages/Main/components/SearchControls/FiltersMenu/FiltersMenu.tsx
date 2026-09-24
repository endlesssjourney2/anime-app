import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import s from "./FiltersMenu.module.css";
import type {
  AniListFormat,
  AniListStatus,
} from "../../../../../types/AniList";
import { IconCheck, IconFilter } from "@tabler/icons-react";
import type { FC } from "react";
import {
  FORMAT_OPTIONS,
  STATUS_OPTIONS,
} from "../../../../../constants/filtersOptions";

type Props = {
  statuses: AniListStatus[];
  setStatuses: (v: AniListStatus) => void;
  formats: AniListFormat[];
  setFormats: (v: AniListFormat) => void;
};

const FiltersMenu: FC<Props> = ({
  statuses,
  setStatuses,
  formats,
  setFormats,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={s.trigger}>
          <IconFilter size={16} />
          Filters
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.content} align="start">
          <div className={s.columns}>
            <DropdownMenu.Group className={s.column}>
              <DropdownMenu.Label className={s.label}>
                Format
              </DropdownMenu.Label>
              {FORMAT_OPTIONS.map((f) => (
                <DropdownMenu.CheckboxItem
                  key={f.value}
                  className={s.item}
                  checked={formats.includes(f.value)}
                  onSelect={(e) => e.preventDefault()}
                  onCheckedChange={() => setFormats(f.value)}
                >
                  <div className={s.indicator}>
                    <DropdownMenu.ItemIndicator>
                      <IconCheck size={14} />
                    </DropdownMenu.ItemIndicator>
                  </div>
                  {f.label}
                </DropdownMenu.CheckboxItem>
              ))}
            </DropdownMenu.Group>
            <div className={s.divider} />
            <DropdownMenu.Group className={s.column}>
              <DropdownMenu.Label className={s.label}>
                Status
              </DropdownMenu.Label>
              {STATUS_OPTIONS.map((st) => (
                <DropdownMenu.CheckboxItem
                  key={st.value}
                  className={s.item}
                  checked={statuses.includes(st.value)}
                  onSelect={(e) => e.preventDefault()}
                  onCheckedChange={() => setStatuses(st.value)}
                >
                  <div className={s.indicator}>
                    <DropdownMenu.ItemIndicator>
                      <IconCheck size={14} />
                    </DropdownMenu.ItemIndicator>
                  </div>
                  {st.label}
                </DropdownMenu.CheckboxItem>
              ))}
            </DropdownMenu.Group>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default FiltersMenu;
