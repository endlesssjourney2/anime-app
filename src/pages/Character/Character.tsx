import s from "./Character.module.css";
import { useParams } from "react-router-dom";
import useCharacterDetails from "../../hooks/useCharacterDetails";
import CharacterHeader from "./components/CharacterHeader/CharacterHeader";
import CharacterMediaItem from "./components/CharacterMediaItem/CharacterMediaItem";
import SortSelect from "../../features/components/SortSelect/SortSelect";
import { SORT_OPTIONS_CHARACTERS } from "../../constants/filtersOptions";
import SkeletonCharacter from "./components/SkeletonCharacter/SkeletonCharacter";
import useCharacterFavorites from "../../hooks/useCharacterFavorites";

const Character = () => {
  const { id } = useParams();

  const { character, loading, sort, setSort } = useCharacterDetails(Number(id));

  const { isFavorite, addFavorite, removeFavorite, isLoading, isPending } =
    useCharacterFavorites();

  const appearanceLength = character?.media.edges.length;

  if (loading) {
    return (
      <div className={s.characterPage}>
        <SkeletonCharacter />
      </div>
    );
  }

  if (!character) return <div className={s.noFound}>No profile found</div>;

  return (
    <div className={s.characterPage}>
      <CharacterHeader
        character={character}
        addFavorite={addFavorite.mutate}
        removeFavorite={removeFavorite.mutate}
        isFavorite={isFavorite(character.id)}
        disabled={isLoading || isPending}
      />
      <div className={s.section}>
        <div className={s.appearanceInfo}>
          <span>Media Appearance ({appearanceLength})</span>
          <SortSelect
            sort={sort}
            setSort={(value) => setSort(value)}
            options={SORT_OPTIONS_CHARACTERS}
          />
        </div>
        <div className={s.appearanceList}>
          {character?.media.edges.map((m) => (
            <CharacterMediaItem key={m.node.id} media={m.node} role={m.characterRole} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Character;
