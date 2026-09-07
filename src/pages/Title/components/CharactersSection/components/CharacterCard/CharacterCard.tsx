import type { CharacterRole } from "../../../../../../types/Character";
import s from "./CharacterCard.module.css";
import type { FC } from "react";

type Props = {
  image: string;
  name: string;
  role: CharacterRole;
};

const CharacterCard: FC<Props> = ({ role, name, image }) => {
  return (
    <div className={s.item}>
      <img className={s.image} src={image} alt={name} />
      <p className={s.name}>{name}</p>
      <p className={`${s.role} ${s[role]}`}>{role}</p>
    </div>
  );
};

export default CharacterCard;
