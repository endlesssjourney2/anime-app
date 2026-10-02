import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const useSortOptions = <T extends string>(label: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selected = useMemo(
    () => searchParams.getAll(label) as T[],
    [searchParams, label],
  );
  const toggle = (value: T) => {
    setSearchParams((prev) => {
      const entries = Array.from(prev.entries());
      const alreadyExists = entries.some(
        ([key, entryValue]) => key === label && entryValue === value,
      );

      if (alreadyExists) {
        const next = new URLSearchParams();

        entries.forEach(([key, entryValue]) => {
          if (key === label && entryValue === value) {
            return;
          }
          next.append(key, entryValue);
        });
        return next;
      }
      const next = new URLSearchParams(prev);
      next.append(label, value);
      return next;
    });
  };

  return { selected, toggle };
};

export default useSortOptions;
