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
      const next = new URLSearchParams(prev);
      const current = next.getAll(label);

      if (current.includes(value)) {
        next.delete(label);
        current
          .filter((v) => v !== value)
          .forEach((v) => next.append(label, v));
      } else {
        next.append(label, value);
      }
      return next;
    });
  };

  return { selected, toggle };
};

export default useSortOptions;
