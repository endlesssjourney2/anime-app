import s from "./Character.module.css";
import { useParams } from "react-router-dom";
import useCharacterDetails from "../../hooks/useCharacterDetails";
import CharacterHeader from "./components/CharacterHeader/CharacterHeader";
import CharacterMediaItem from "./components/CharacterMediaItem/CharacterMediaItem";
import SortSelect from "../../features/components/SortSelect/SortSelect";
import { SORT_OPTIONS_CHARACTERS } from "../../constants/filtersOptions";
import SkeletonCharacter from "./components/SkeletonCharacter/SkeletonCharacter";

const Character = () => {
  const { id } = useParams();

  const { character, loading, sort, setSort } = useCharacterDetails(Number(id));

  const appearanceLength = character?.media.edges.length;

  return (
    <div className={s.characterPage}>
      {loading ? (
        <SkeletonCharacter />
      ) : (
        <>
          <CharacterHeader character={character} />
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
                <CharacterMediaItem
                  key={m.node.id}
                  media={m.node}
                  role={m.characterRole}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Character;
