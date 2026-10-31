import { useState, type FC } from "react";
import type { AniListCharacters } from "../../../../types/Character";
import s from "./CharactersSection.module.css";
import CharacterCard from "./components/CharacterCard/CharacterCard";
import useLoadMore from "../../../../hooks/useLoadMore";
import { loadMoreCharacters } from "../../../../api/aniListApi";
import LoadMoreBtn from "../../../../features/components/LoadMoreBtn/LoadMoreBtn";
import PerPageSelect from "../../../../features/components/PerPageSelect/PerPageSelect";

type Props = {
  characters: AniListCharacters;
  id: number;
};

const CharactersSection: FC<Props> = ({ characters, id }) => {
  const [perPage, setPerPage] = useState("9");
  const [changingPerPage, setChangingPerPage] = useState(false);

  const { items, loading, loadMore, hasNextPage, reset } = useLoadMore({
    initialData: characters.edges,
    initialHasNextPage: characters.pageInfo?.hasNextPage ?? false,
    fetchPage: async (page) => {
      const result = await loadMoreCharacters(id, page, Number(perPage));

      return {
        items: result.edges,
        hasNextPage: result.pageInfo.hasNextPage,
      };
    },
  });

  const busy = changingPerPage || loading;

  const handlePerPageChange = async (value: string) => {
    if (busy || value === perPage) return;

    setChangingPerPage(true);

    try {
      const result = await loadMoreCharacters(id, 1, Number(value));
      reset(result.edges, result.pageInfo.hasNextPage);
      setPerPage(value);
    } catch (err) {
      console.log(err);
    } finally {
      setChangingPerPage(false);
    }
  };

  return (
    <div className={s.section}>
      <div className={s.top}>
        <p className={s.sectionTitle}>Characters</p>
        <PerPageSelect
          perPage={perPage}
          setPerPage={handlePerPageChange}
          options={[
            { value: "6", label: "6 characters" },
            { value: "9", label: "9 characters" },
            { value: "15", label: "15 characters" },
            { value: "24", label: "24 characters" },
          ]}
          disabled={busy}
        />
      </div>

      <div className={s.charactersList}>
        {items.map((c) => (
          <CharacterCard role={c.role} character={c.node} key={c.node.id} />
        ))}
      </div>
      <LoadMoreBtn onClick={loadMore} loading={loading} disabled={busy || !hasNextPage} />
    </div>
  );
};

export default CharactersSection;
