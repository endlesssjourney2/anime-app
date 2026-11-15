import s from "./CharacterItem.module.css";
import type { FC } from "react";
import type { CharacterSearch } from "../../../../types/CharacterSearch";
import { Link } from "react-router-dom";
import FavoriteActionBtn from "../../../../features/components/FavoriteActionBtn/FavoriteActionBtn";

type Props = {
  character: CharacterSearch;
  addFavorite: () => void;
  removeFavorite: () => void;
  isFavorite: boolean;
  disabled: boolean;
};

const CharacterItem: FC<Props> = ({
  character,
  addFavorite,
  removeFavorite,
  isFavorite,
  disabled,
}) => {
  const fullName = character.name.full;
  const nativeName = character.name.native;

  return (
    <div className={s.item}>
      <Link className={s.content} to={`/character/${character.id}`}>
        <img className={s.img} src={character.image.large} alt="" />
        <div className={s.info}>
          <span className={s.full}>{fullName}</span>
          <span className={s.native}>{nativeName}</span>
        </div>
      </Link>
      <FavoriteActionBtn
        id={character.id}
        addFavorite={addFavorite}
        removeFavorite={removeFavorite}
        isFavorite={isFavorite}
        disabled={disabled}
      />
    </div>
  );
};

export default CharacterItem;
