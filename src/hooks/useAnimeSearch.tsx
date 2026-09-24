import { useEffect, useMemo, useState } from "react";
import { searchAnime } from "../api/aniListApi";
import useDebounce from "./useDebounce";
import type {
  AniListFormat,
  AniListMedia,
  AniListPageInfo,
  AniListStatus,
} from "../types/AniList";
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

  const formats = useMemo(
    () => searchParams.getAll("format") as AniListFormat[],
    [searchParams],
  );
  const setFormats = (value: AniListFormat) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      const current = next.getAll("format");

      if (current.includes(value)) {
        next.delete("format");
        current
          .filter((v) => v !== value)
          .forEach((v) => next.append("format", v));
      } else {
        next.append("format", value);
      }

      return next;
    });
  };

  const statuses = useMemo(
    () => searchParams.getAll("status") as AniListStatus[],
    [searchParams],
  );
  const setStatuses = (value: AniListStatus) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      const current = next.getAll("status");

      if (current.includes(value)) {
        next.delete("status");
        current
          .filter((v) => v !== value)
          .forEach((v) => next.append("status", v));
      } else {
        next.append("status", value);
      }
      return next;
    });
  };

  const debouncedSearchItem = useDebounce(searchItem, 500);

  useEffect(() => {
    setLoading(true);
    searchAnime(debouncedSearchItem, page, perPage, [sort], formats, statuses)
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
  }, [debouncedSearchItem, page, sort, statuses, formats]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchItem, sort, statuses, formats]);

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
  };
};

export default useAnimeSearch;
