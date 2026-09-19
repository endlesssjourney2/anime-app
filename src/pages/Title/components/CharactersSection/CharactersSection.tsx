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
          <CharacterCard
            image={c.node.image.large}
            name={c.node.name}
            role={c.role}
            dateOfBirth={c.node.dateOfBirth}
            age={c.node.age}
            gender={c.node.gender}
          />
        ))}
      </div>
    </div>
  );
};

export default CharactersSection;
