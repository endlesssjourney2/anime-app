import { useEffect, useState } from "react";
import { searchAnime } from "../api/aniListApi";
import useDebounce from "./useDebounce";
import type {
  AniListFormat,
  AniListGenre,
  AniListMedia,
  AniListPageInfo,
  AniListStatus,
} from "../types/AniList";
import type { AniListSort } from "../types/AniListSort";
import { useSearchParams } from "react-router-dom";
import useSortOptions from "./useSortOptions";

const useAnimeSearch = (perPage: number) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchItem, setSearchItem] = useState("");
  const [results, setResults] = useState<AniListMedia[]>([]);
  const [pageInfo, setPageInfo] = useState<AniListPageInfo | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { selected: formats, toggle: setFormats } =
    useSortOptions<AniListFormat>("format");
  const { selected: statuses, toggle: setStatuses } =
    useSortOptions<AniListStatus>("status");
  const { selected: genres, toggle: setGenres } =
    useSortOptions<AniListGenre>("genre");

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
    let cancelled = false;
    setLoading(true);
    searchAnime(
      debouncedSearchItem,
      page,
      perPage,
      [sort],
      formats,
      statuses,
      genres,
    )
      .then((result) => {
        if (cancelled) return;
        if (page === 1) {
          setResults(result.media);
        } else {
          setResults((prev) => [...prev, ...result.media]);
        }
        setPageInfo(result.pageInfo);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedSearchItem, page, sort, statuses, formats, genres]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchItem, sort, statuses, formats, genres]);

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
    formats,
    setFormats,
    statuses,
    setStatuses,
    genres,
    setGenres,
  };
};

export default useAnimeSearch;
