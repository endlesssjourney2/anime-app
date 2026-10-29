import type { FC } from "react";
import * as Select from "@radix-ui/react-select";
import s from "./PerPageSelect.module.css";
import { IconCheck } from "@tabler/icons-react";

type options = {
  value: string;
  label?: string;
};

type Props = {
  perPage: string;
  setPerPage: (v: string) => void;
  options: options[];
  disabled?: boolean;
};

const PerPageSelect: FC<Props> = ({ perPage, setPerPage, options, disabled }) => {
  return (
    <Select.Root value={perPage} onValueChange={setPerPage} disabled={disabled}>
      <Select.Trigger className={s.trigger}>
        <Select.Value />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={s.content} position="popper" align="center">
          <Select.Viewport>
            <Select.Group className={s.group}>
              <Select.Label className={s.label}>Per page</Select.Label>

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

export default PerPageSelect;
