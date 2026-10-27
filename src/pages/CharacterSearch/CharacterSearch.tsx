import s from "./CharacterSearch.module.css";
import useCharacterSearch from "../../hooks/useCharacterSearch";
import CharacterItem from "./components/CharacterItem/CharacterItem";
import LoadMoreBtn from "../../features/components/LoadMoreBtn/LoadMoreBtn";
import SearchControls from "./components/SearchControls/SearchControls";

const CharacterSearch = () => {
  const {
    setSearchItem,
    searchItem,
    perPage,
    setPerPage,
    results,
    pageInfo,
    setPage,
    loadMoreLoading,
  } = useCharacterSearch();

  const handleLoadMore = () => {
    if (loadMoreLoading || !pageInfo?.hasNextPage) return;
    setPage((prev) => prev + 1);
  };

  return (
    <div className={s.charactersPage}>
      <div className={s.header}>
        <h2 className={s.headerTitle}>Search characters here</h2>
      </div>
      <SearchControls
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        perPage={perPage}
        setPerPage={setPerPage}
      />
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
