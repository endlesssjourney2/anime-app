import type { FC } from "react";
import type { AniListCharacters } from "../../../../types/Character";
import s from "./CharactersSection.module.css";
import CharacterCard from "./components/CharacterCard/CharacterCard";

type Props = {
  characters: AniListCharacters;
};

const CharactersSection: FC<Props> = ({ characters }) => {
  return (
    <div className={s.section}>
      <p className={s.sectionTitle}>Characters</p>
      <div className={s.charactersList}>
        {characters.edges.map((c) => (
          <CharacterCard role={c.role} character={c.node} key={c.node.id} />
        ))}
      </div>
    </div>
  );
};

export default CharactersSection;
