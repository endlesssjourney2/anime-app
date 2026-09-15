import { useNavigate } from "react-router-dom";
import useAnimeSearch from "../../hooks/useAnimeSearch";
import s from "./Main.module.css";
import LoadingComponent from "../../features/components/LoadingComponent/LoadingComponent";
import AnimeItem from "./components/AnimeItem/AnimeItem";
import SearchControls from "./components/SearchControls/SearchControls";

const Main = () => {
  const {
    searchItem,
    setSearchItem,
    results,
    pageInfo,
    page,
    setPage,
    loading,
    sort,
    setSort,
  } = useAnimeSearch(15);

  const navigate = useNavigate();

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
        loading={loading}
      />
      {loading ? (
        <LoadingComponent />
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
          <div className={s.actionButtons}>
            <button
              className={s.btn}
              onClick={() => setPage(page - 1)}
              disabled={page === 1 || loading}
            >
              Prev
            </button>
            {pageInfo && (
              <span className={s.info}>{`${page} - ${pageInfo.lastPage}`}</span>
            )}
            <button
              className={s.btn}
              onClick={() => setPage(page + 1)}
              disabled={!pageInfo?.hasNextPage || loading}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
