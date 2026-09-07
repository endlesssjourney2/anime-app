import { useEffect, useState } from "react";
import { searchAnime } from "../api/aniListApi";
import useDebounce from "./useDebounce";
import type { AniListMedia, AniListPageInfo } from "../types/AniList";

const useAnimeSearch = (perPage: number) => {
  const [searchItem, setSearchItem] = useState("");
  const [results, setResults] = useState<AniListMedia[]>([]);
  const [pageInfo, setPageInfo] = useState<AniListPageInfo | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const debouncedSearchItem = useDebounce(searchItem, 500);

  useEffect(() => {
    setLoading(true);
    searchAnime(debouncedSearchItem, page, perPage)
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
  }, [debouncedSearchItem, page]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchItem]);

  return {
    searchItem,
    setSearchItem,
    results,
    pageInfo,
    page,
    setPage,
    loading,
  };
};

export default useAnimeSearch;
