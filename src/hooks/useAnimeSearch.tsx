import { useEffect, useState } from "react";
import { searchAnime } from "../api/aniListApi";
import useDebounce from "./useDebounce";
import type { AniListMedia, AniListPageInfo } from "../types/AniList";
import type { AniListSort } from "../types/AniListSort";
import { useSearchParams } from "react-router-dom";

const useAnimeSearch = (perPage: number) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchItem, setSearchItem] = useState("");
  const [results, setResults] = useState<AniListMedia[]>([]);
  const [pageInfo, setPageInfo] = useState<AniListPageInfo | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const sort = (searchParams.get("sort") as AniListSort) ?? "SCORE_DESC";
  const setSort = (value: AniListSort) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("sort", value);
      return next;
    });
  };

  const debouncedSearchItem = useDebounce(searchItem, 500);

  useEffect(() => {
    setLoading(true);
    searchAnime(debouncedSearchItem, page, perPage, [sort])
      .then((result) => {
        setResults(result.media);
        setPageInfo(result.pageInfo);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debouncedSearchItem, page, sort]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchItem, sort]);

  return {
    searchItem,
    setSearchItem,
    results,
    pageInfo,
    page,
    setPage,
    loading,
    sort,
    setSort,
  };
};

export default useAnimeSearch;
