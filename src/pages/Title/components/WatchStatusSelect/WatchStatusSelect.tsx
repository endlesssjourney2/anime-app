import * as Select from "@radix-ui/react-select";
import type { WatchStatus } from "../../../../types/UserAnime";
import type { FC } from "react";
import { IconBookmark, IconCheck, IconChevronDown } from "@tabler/icons-react";
import s from "./WatchStatusSelect.module.css";

const options: { value: WatchStatus; label: string }[] = [
  { value: "completed", label: "Completed" },
  { value: "watching", label: "Watching" },
  { value: "planned", label: "Planned" },
  { value: "on_hold", label: "On hold" },
  { value: "dropped", label: "Dropped" },
];

type Props = {
  onStatusChange: (status: WatchStatus | null) => void;
  disabled: boolean;
  status: WatchStatus | null;
};

const WatchStatusSelect: FC<Props> = ({ onStatusChange, disabled, status }) => {
  const handleChange = (value: string) => {
    onStatusChange(value === "none" ? null : (value as WatchStatus));
  };

  return (
    <Select.Root
      value={status ?? "none"}
      onValueChange={handleChange}
      disabled={disabled}
    >
      <Select.Trigger className={s.trigger}>
        <div className={s.triggerValue}>
          <IconBookmark size={19} />
          <Select.Value />
        </div>
        <Select.Icon className={s.icon}>
          <IconChevronDown size={17} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className={s.content}
          position="popper"
          align="center"
          sideOffset={8}
        >
          <Select.Viewport>
            <Select.Group className={s.group}>
              <Select.Label className={s.label}>Watch Status</Select.Label>

              <Select.Item className={s.item} value="none">
                <Select.ItemText>Not in List</Select.ItemText>
                <Select.ItemIndicator className={s.indicator}>
                  <IconCheck size={15} />
                </Select.ItemIndicator>
              </Select.Item>

              {options.map((o) => (
                <Select.Item key={o.value} className={s.item} value={o.value}>
                  <Select.ItemText>{o.label ?? o.value}</Select.ItemText>
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

export default WatchStatusSelect;
