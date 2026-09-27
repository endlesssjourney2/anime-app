import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import s from "./MultiSelect.module.css";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";

type MultiSelectOptions<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  label: string;
  options: MultiSelectOptions<T>[];
  selected: T[];
  setSelected: (value: T) => void;
};

const MultiSelect = <T extends string>({
  label,
  options,
  selected,
  setSelected,
}: Props<T>) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={s.trigger}>
          {label}
          {selected.length > 0 ? <span>{selected.length}</span> : null}
          <IconChevronDown size={14} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.content} align="center">
          <DropdownMenu.Label className={s.label}>{label}</DropdownMenu.Label>
          <div className={s.column}>
            {options.map((option) => (
              <DropdownMenu.CheckboxItem
                key={option.value}
                className={s.item}
                checked={selected.includes(option.value)}
                onSelect={(e) => e.preventDefault()}
                onCheckedChange={() => setSelected(option.value)}
              >
                <div className={s.indicator}>
                  <DropdownMenu.ItemIndicator>
                    <IconCheck size={14} />
                  </DropdownMenu.ItemIndicator>
                </div>
                {option.label}
              </DropdownMenu.CheckboxItem>
            ))}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default MultiSelect;
