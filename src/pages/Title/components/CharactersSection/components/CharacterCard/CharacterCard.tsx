import {
  IconGenderFemale,
  IconGenderMale,
  IconGift,
  IconHourglass,
  IconQuestionMark,
} from "@tabler/icons-react";
import { checkBirthday } from "../../../../../../helpers/checkBirthday";
import type { CharacterNode, CharacterRole } from "../../../../../../types/Character";
import s from "./CharacterCard.module.css";
import type { FC } from "react";

type Props = {
  role: CharacterRole;
  character: CharacterNode;
};

const CharacterCard: FC<Props> = ({ role, character }) => {
  const GenderIcon =
    character.gender === "Male"
      ? IconGenderMale
      : character.gender === "Female"
        ? IconGenderFemale
        : null;

  return (
    <div className={s.item}>
      <img className={s.image} src={character.image.large} alt={character.name.native} />
      <div className={s.info}>
        <div className={s.header}>
          <span className={s.nameFull}>{character.name.full}</span>
          <span className={s.nameNative}>{character.name.native}</span>
        </div>
        <div className={s.mid}>
          <span className={`${s.role} ${s[role]}`}>{role}</span>
        </div>
        <div className={s.meta}>
          <span className={`${s.metaItem} ${s.age}`}>
            <IconHourglass size={13} />
            {character.age ?? "Unknown"}
          </span>
          <span className={`${s.metaItem} ${s.birthday}`}>
            <IconGift size={13} />
            {checkBirthday(character.dateOfBirth.day, character.dateOfBirth.month)}
          </span>
          <span className={`${s.metaItem} ${s.gender}`}>
            {GenderIcon ? <GenderIcon size={13} /> : <IconQuestionMark size={13} />}
            {character.gender ?? "Unknown"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
