import s from "./CharacterSearch.module.css";
import useCharacterSearch from "../../hooks/useCharacterSearch";
import CharacterItem from "./components/CharacterItem/CharacterItem";
import LoadMoreBtn from "../../features/components/LoadMoreBtn/LoadMoreBtn";
import SearchControls from "./components/SearchControls/SearchControls";
import SkeletonCharacterSearch from "./components/SkeletonCharacterSearch/SkeletonCharacterSearch";
import useCharacterFavorites from "../../hooks/useCharacterFavorites";

const CharacterSearch = () => {
  const {
    setSearchItem,
    searchItem,
    perPage,
    setPerPage,
    results,
    pageInfo,
    setPage,
    initialLoading,
    loadMoreLoading,
  } = useCharacterSearch();

  const { isFavorite, addFavorite, removeFavorite, isLoading, isPending } =
    useCharacterFavorites();

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
      {initialLoading ? (
        <SkeletonCharacterSearch />
      ) : (
        <div className={s.content}>
          <ul className={s.list}>
            {results.map((c) => (
              <CharacterItem
                character={c}
                key={c.id}
                addFavorite={addFavorite.mutate}
                removeFavorite={removeFavorite.mutate}
                isFavorite={isFavorite(c.id)}
                disabled={isLoading || isPending}
              />
            ))}
          </ul>
          <LoadMoreBtn
            loading={loadMoreLoading}
            onClick={handleLoadMore}
            disabled={loadMoreLoading || !pageInfo?.hasNextPage}
          />
        </div>
      )}
    </div>
  );
};

export default CharacterSearch;
