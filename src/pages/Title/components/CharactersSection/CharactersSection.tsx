import type { FC } from "react";
import type { AnilistCharacters } from "../../../../types/Character";
import s from "./CharactersSection.module.css";
import CharacterCard from "./components/CharacterCard/CharacterCard";

type Props = {
  characters: AnilistCharacters;
};

const CharactersSection: FC<Props> = ({ characters }) => {
  return (
    <div className={s.section}>
      <p className={s.sectionTitle}>Characters</p>
      <div className={s.charactersList}>
        {characters.edges.map((c) => (
          <CharacterCard
            image={c.node.image.large}
            name={c.node.name.full}
            role={c.role}
          />
        ))}
      </div>
    </div>
  );
};

export default CharactersSection;
