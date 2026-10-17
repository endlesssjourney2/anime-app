import * as Select from "@radix-ui/react-select";
import s from "./SortSelect.module.css";
import { IconCheck, IconMenu2 } from "@tabler/icons-react";

type SelectOptions<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  sort: T;
  setSort: (value: T) => void;
  options: SelectOptions<T>[];
  label?: string;
  trigger?: string;
};

const SortSelect = <T extends string>({
  sort,
  setSort,
  options,
  label = "Sort by",
  trigger = "",
}: Props<T>) => {
  return (
    <Select.Root value={sort} onValueChange={(value) => setSort(value as T)}>
      <Select.Trigger asChild>
        <button className={s.trigger}>
          {trigger ? (
            <span>{trigger}</span>
          ) : (
            <Select.Icon className={s.icon}>{<IconMenu2 size={13} />}</Select.Icon>
          )}
        </button>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={s.content} position="popper" align="center">
          <Select.Viewport>
            <Select.Group className={s.group}>
              <Select.Label className={s.label}>{label}</Select.Label>
              {options.map((so) => (
                <Select.Item key={so.value} className={s.item} value={so.value}>
                  <Select.ItemText>{so.label}</Select.ItemText>
                  <Select.ItemIndicator className={s.indicator}>
                    <IconCheck size={15} />
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
