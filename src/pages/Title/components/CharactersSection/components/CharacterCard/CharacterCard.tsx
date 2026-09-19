import {
  IconGenderFemale,
  IconGenderMale,
  IconGift,
  IconHourglass,
} from "@tabler/icons-react";
import { checkBirthday } from "../../../../../../helpers/checkBirthday";
import type {
  CharacterRole,
  DateOfBirth,
} from "../../../../../../types/Character";
import s from "./CharacterCard.module.css";
import type { FC } from "react";

type Props = {
  image: string;
  name: { full: string; native: string };
  role: CharacterRole;
  dateOfBirth: DateOfBirth;
  age: string;
  gender: string;
};

const CharacterCard: FC<Props> = ({
  role,
  name,
  image,
  dateOfBirth,
  age,
  gender,
}) => {
  const GenderIcon =
    gender === "Male"
      ? IconGenderMale
      : gender === "Female"
        ? IconGenderFemale
        : null;

  return (
    <div className={s.item}>
      <img className={s.image} src={image} alt={name.native} />
      <div className={s.info}>
        <div className={s.header}>
          <span className={s.nameFull}>{name.full}</span>
          <span className={s.nameNative}>{name.native}</span>
        </div>
        <div className={s.mid}>
          <span className={`${s.role} ${s[role]}`}>{role}</span>
        </div>
        <div className={s.meta}>
          <span className={`${s.metaItem} ${s.age}`}>
            <IconHourglass size={13} />
            {age ?? "Unknown"}
          </span>
          <span className={`${s.metaItem} ${s.birthday}`}>
            <IconGift size={13} />
            {checkBirthday(dateOfBirth.day, dateOfBirth.month)}
          </span>
          <span className={`${s.metaItem} ${s.gender}`}>
            <GenderIcon size={13} />
            {gender}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
