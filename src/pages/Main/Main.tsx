import { useNavigate } from "react-router-dom";
import useAnimeSearch from "../../hooks/useAnimeSearch";
import s from "./Main.module.css";
import AnimeItem from "./components/AnimeItem/AnimeItem";
import SearchControls from "./components/SearchControls/SearchControls";
import SkeletonMain from "./components/SkeletonMain/SkeletonMain";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";

const Main = () => {
  const {
    searchItem,
    setSearchItem,
    results,
    pageInfo,
    setPage,
    sort,
    setSort,
    formats,
    setFormats,
    statuses,
    setStatuses,
    genres,
    setGenres,
    initialLoading,
    loadMoreLoading,
  } = useAnimeSearch(15);

  const navigate = useNavigate();

  const handleLoadMore = () => {
    if (loadMoreLoading || !pageInfo?.hasNextPage) return;
    setPage((prev) => prev + 1);
  };

  return (
    <div className={s.mainPage}>
      <div className={s.header}>
        <h2 className={s.headerTitle}>Search anime here</h2>
      </div>
      <SearchControls
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        sort={sort}
        setSort={setSort}
        formats={formats}
        setFormats={setFormats}
        statuses={statuses}
        setStatuses={setStatuses}
        genres={genres}
        setGenres={setGenres}
        loading={initialLoading || loadMoreLoading}
      />
      {initialLoading ? (
        <SkeletonMain />
      ) : (
        <>
          <div className={s.content}>
            <ul className={s.list}>
              {results.map((a) => (
                <AnimeItem
                  key={a.id}
                  anime={a}
                  onClick={() => navigate(`/anime/${a.id}`)}
                />
              ))}
            </ul>
          </div>
          <LoadMoreBtn
            loading={loadMoreLoading}
            onClick={handleLoadMore}
            disabled={loadMoreLoading || !pageInfo?.hasNextPage}
          />
        </>
      )}
    </div>
  );
};

export default Main;
