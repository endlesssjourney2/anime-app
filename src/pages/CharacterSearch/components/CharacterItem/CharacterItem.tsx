import s from "./CharacterItem.module.css";
import type { FC } from "react";
import type { CharacterSearch } from "../../../../types/CharacterSearch";
import { Link } from "react-router-dom";

type Props = {
  character: CharacterSearch;
};

const CharacterItem: FC<Props> = ({ character }) => {
  const fullName = character.name.full;
  const nativeName = character.name.native;

  return (
    <Link className={s.item} to={`/character/${character.id}`}>
      <img className={s.img} src={character.image.large} alt="" />
      <div className={s.info}>
        <span className={s.full}>{fullName}</span>
        <span className={s.native}>{nativeName}</span>
      </div>
    </Link>
  );
};

export default CharacterItem;
