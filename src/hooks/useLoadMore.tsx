import { useState } from "react";

type Props<T> = {
  initialData: T[];
  initialHasNextPage: boolean;
  fetchPage: (page: number) => Promise<{
    items: T[];
    hasNextPage: boolean;
  }>;
};

const useLoadMore = <T,>({ initialData, fetchPage, initialHasNextPage }: Props<T>) => {
  const [items, setItems] = useState<T[]>(initialData);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    if (!hasNextPage || loading) return;
    setLoading(true);

    try {
      const nextPage = page + 1;
      const result = await fetchPage(nextPage);

      setItems((prev) => [...prev, ...result.items]);
      setHasNextPage(result.hasNextPage);
      setPage(nextPage);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { items, loading, loadMore, hasNextPage };
};

export default useLoadMore;
