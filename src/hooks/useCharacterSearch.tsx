import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import { searchCharacter } from "../api/aniListApi";
import type { CharacterSearch } from "../types/CharacterSearch";
import type { AniListPageInfo } from "../types/AniList";
import { useSearchParams } from "react-router-dom";

const useCharacterSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchItem, setSearchItem] = useState("");
  const [results, setResults] = useState<CharacterSearch[]>([]);
  const [pageInfo, setPageInfo] = useState<AniListPageInfo | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const perPage = searchParams.get("perPage") ?? "12";
  const setPerPage = (value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("perPage", value);
      return next;
    });
  };

  const initialLoading = loading && page === 1;
  const loadMoreLoading = loading && page > 1;

  const debouncedSearchItem = useDebounce(searchItem, 500);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    searchCharacter(debouncedSearchItem, Number(perPage), page)
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
  }, [debouncedSearchItem, page, perPage]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchItem, perPage]);

  return {
    searchItem,
    setSearchItem,
    results,
    pageInfo,
    setPage,
    perPage,
    setPerPage,
    initialLoading,
    loadMoreLoading,
  };
};

export default useCharacterSearch;
