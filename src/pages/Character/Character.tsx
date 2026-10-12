import s from "./Character.module.css";
import { useParams } from "react-router-dom";
import useCharacterDetails from "../../hooks/useCharacterDetails";
import LoadingComponent from "../../features/components/LoadingComponent/LoadingComponent";
import CharacterHeader from "./components/CharacterHeader/CharacterHeader";

const Character = () => {
  const { id } = useParams();

  const { character, loading } = useCharacterDetails(Number(id));

  return (
    <div className={s.characterPage}>
      {loading ? <LoadingComponent /> : <CharacterHeader character={character} />}
    </div>
  );
};

export default Character;
