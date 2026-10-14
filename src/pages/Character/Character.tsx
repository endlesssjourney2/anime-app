import s from "./Character.module.css";
import { useParams } from "react-router-dom";
import useCharacterDetails from "../../hooks/useCharacterDetails";
import LoadingComponent from "../../features/components/LoadingComponent/LoadingComponent";
import CharacterHeader from "./components/CharacterHeader/CharacterHeader";
import CharacterMediaItem from "./components/CharacterMediaItem/CharacterMediaItem";

const Character = () => {
  const { id } = useParams();

  const { character, loading } = useCharacterDetails(Number(id));

  return (
    <div className={s.characterPage}>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <CharacterHeader character={character} />
          <div className={s.section}>
            <div className={s.appearanceInfo}>
              <span>Appearance {character?.media.edges.length ?? 0}</span>
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
