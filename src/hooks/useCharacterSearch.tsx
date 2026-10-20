import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import { searchCharacter } from "../api/aniListApi";
import type { CharacterSearch } from "../types/CharacterSearch";
import type { AniListPageInfo } from "../types/AniList";

const useCharacterSearch = () => {
  const [searchItem, setSearchItem] = useState("");
  const [results, setResults] = useState<CharacterSearch[]>([]);
  const [pageInfo, setPageInfo] = useState<AniListPageInfo | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const initialLoading = loading && page === 1;
  const loadMoreLoading = loading && page > 1;

  const debouncedSearchItem = useDebounce(searchItem, 500);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    searchCharacter(debouncedSearchItem, 18, page)
      .then((results) => {
        if (cancelled) return;
        if (page === 1) {
          setResults(results.characters);
        } else {
          setResults((prev) => [...prev, ...results.characters]);
        }
        setPageInfo(results.pageInfo);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [debouncedSearchItem, page]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchItem]);

  return {
    searchItem,
    setSearchItem,
    results,
    pageInfo,
    setPage,
    initialLoading,
    loadMoreLoading,
  };
};

export default useCharacterSearch;
