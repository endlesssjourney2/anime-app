import { useState } from "react";
import { type AniListCharacters } from "../types/Character";
import { loadMoreCharacters } from "../api/aniListApi";

const useLoadMoreCharacters = (id: number, initCharacters: AniListCharacters) => {
  const [characters, setCharacters] = useState<AniListCharacters>(initCharacters);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const result = await loadMoreCharacters(id, page + 1);

      setCharacters((prev) => ({
        edges: [...prev.edges, ...result.edges],
      }));
      setPage((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { characters, loading, loadMore };
};

export default useLoadMoreCharacters;
