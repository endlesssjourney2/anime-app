import type { WatchStatus } from "../types/UserAnime";
import { useQuery } from "@tanstack/react-query";
import useAnimeList from "./useAnimeList";
import { getWatchListByIds } from "../api/aniListApi";
import { useAuth } from "../context/AuthContext";

const useWatchList = (status: WatchStatus | null) => {
  const { user } = useAuth();

  const page = 1;
  const perPage = 50;
  const sort = ["SCORE_DESC"];

  const { filteredAnimeList, isLoading: fullListLoading } = useAnimeList(status);

  const animeIds = filteredAnimeList?.map((anime) => anime.anime_id) ?? [];

  const { data: watchList = [], isLoading: filteredListLoading } = useQuery({
    queryKey: ["watch-list", animeIds, page, perPage, sort, user?.id],
    queryFn: () => {
      return getWatchListByIds(page, perPage, animeIds, sort);
    },
    enabled: animeIds.length > 0 && !!user,
    staleTime: 1000 * 5 * 60,
  });

  return {
    isLoading: fullListLoading || filteredListLoading,
    watchList,
  };
};

export default useWatchList;
