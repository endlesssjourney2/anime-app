import { useNavigate } from "react-router-dom";
import useAnimeSearch from "../../hooks/useAnimeSearch";
import s from "./Main.module.css";
import LoadingComponent from "../../features/components/Loading/LoadingComponent";

const Main = () => {
  const {
    searchItem,
    setSearchItem,
    results,
    pageInfo,
    page,
    setPage,
    loading,
  } = useAnimeSearch(15);

  const navigate = useNavigate();

  return (
    <div className={s.mainPage}>
      <div className={s.header}>
        <h2 className={s.headerTitle}>Search anime here</h2>
      </div>
      <div className={s.searchContainer}>
        <input
          className={s.searchInput}
          type="text"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder="Search anime..."
        />
      </div>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className={s.content}>
            <ul className={s.list}>
              {results.map((a) => (
                <li key={a.id} className={s.item} onClick={() => navigate("/")}>
                  <div className={s.top}>
                    <img src={a.coverImage.large} alt={a.title.english} />
                  </div>
                  <div className={s.bottom}>
                    <span className={s.title}>
                      {a.title.english ?? a.title.romaji ?? a.title.native}
                    </span>
                    <span className={s.genres}>{a.genres.join(", ")}</span>
                    <span className={s.avgScore}>{a.averageScore}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.actionButtons}>
            <button
              className={s.btn}
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Prev
            </button>
            {pageInfo && (
              <span className={s.info}>{`${page} - ${pageInfo.lastPage}`}</span>
            )}
            <button
              className={s.btn}
              onClick={() => setPage(page + 1)}
              disabled={!pageInfo?.hasNextPage}
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
