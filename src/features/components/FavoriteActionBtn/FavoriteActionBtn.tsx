import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import s from "./FavoriteActionBtn.module.css";
import type { FC } from "react";

type Props = {
  id: number;
  isFavorite: boolean;
  removeFavorite: (animeId: number) => void;
  addFavorite: (animeId: number) => void;
  disabled: boolean;
};

const FavoriteActionBtn: FC<Props> = ({
  isFavorite,
  removeFavorite,
  addFavorite,
  disabled,
  id,
}) => {
  const handleClickToFavorite = () => {
    isFavorite ? removeFavorite(id) : addFavorite(id);
  };

  return (
    <button
      type="button"
      className={s.favoriteBtn}
      onClick={handleClickToFavorite}
      disabled={disabled}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={isFavorite}
    >
      {isFavorite ? (
        <IconHeartFilled className={s.favoriteIcon} size={20} />
      ) : (
        <IconHeart className={s.favoriteIcon} size={20} />
      )}
    </button>
  );
};

export default FavoriteActionBtn;
