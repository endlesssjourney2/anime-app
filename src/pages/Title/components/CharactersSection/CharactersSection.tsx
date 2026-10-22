import type { FC } from "react";
import type { AniListCharacters } from "../../../../types/Character";
import s from "./CharactersSection.module.css";
import CharacterCard from "./components/CharacterCard/CharacterCard";
import useLoadMore from "../../../../hooks/useLoadMore";
import { loadMoreCharacters } from "../../../../api/aniListApi";
import LoadMoreBtn from "../../../../features/components/LoadMoreBtn/LoadMoreBtn";

type Props = {
  characters: AniListCharacters;
  id: number;
};

const CharactersSection: FC<Props> = ({ characters, id }) => {
  const { items, loading, loadMore, hasNextPage } = useLoadMore({
    initialData: characters.edges,
    initialHasNextPage: characters.pageInfo?.hasNextPage ?? false,
    fetchPage: async (page) => {
      const result = await loadMoreCharacters(id, page);

      return {
        items: result.edges,
        hasNextPage: result.pageInfo.hasNextPage,
      };
    },
  });

  return (
    <div className={s.section}>
      <p className={s.sectionTitle}>Characters</p>
      <div className={s.charactersList}>
        {items.map((c) => (
          <CharacterCard role={c.role} character={c.node} key={c.node.id} />
        ))}
      </div>
      <LoadMoreBtn
        onClick={loadMore}
        loading={loading}
        disabled={loading || !hasNextPage}
      />
    </div>
  );
};

export default CharactersSection;
