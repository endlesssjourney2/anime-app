import s from "./CharacterSearch.module.css";
import useCharacterSearch from "../../hooks/useCharacterSearch";
import CharacterItem from "./components/CharacterItem/CharacterItem";
import LoadMoreBtn from "../../features/components/LoadMoreBtn/LoadMoreBtn";

const CharacterSearch = () => {
  const { setSearchItem, searchItem, results, pageInfo, setPage, loadMoreLoading } =
    useCharacterSearch();

  const handleLoadMore = () => {
    if (!pageInfo?.hasNextPage) return;
    setPage((prev) => prev + 1);
  };

  return (
    <div className={s.charactersPage}>
      <div className={s.header}>
        <h2 className={s.headerTitle}>Search characters here</h2>
      </div>
      <div className={s.search}>
        <input
          placeholder="Search character..."
          className={s.searchInput}
          type="text"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </div>
      <div className={s.content}>
        <ul className={s.list}>
          {results.map((c) => (
            <CharacterItem character={c} key={c.id} />
          ))}
        </ul>
        <LoadMoreBtn
          loading={loadMoreLoading}
          onClick={handleLoadMore}
          disabled={loadMoreLoading || !pageInfo?.hasNextPage}
        />
      </div>
    </div>
  );
};

export default CharacterSearch;
