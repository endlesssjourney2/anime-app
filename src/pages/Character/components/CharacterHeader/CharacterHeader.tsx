import type { FC } from "react";
import type { AniListCharacterDetails } from "../../../../types/CharacterDetails";
import s from "./CharacterHeader.module.css";
import CharacterDescription from "./CharacterDescription/CharacterDescription";
import { checkBirthday } from "../../../../helpers/checkBirthday";
import {
  IconGenderFemale,
  IconGenderMale,
  IconGift,
  IconHourglass,
  IconQuestionMark,
} from "@tabler/icons-react";

type Props = {
  character: AniListCharacterDetails;
};

const CharacterHeader: FC<Props> = ({ character }) => {
  const birthDay = character?.dateOfBirth?.day;
  const birthMonth = character?.dateOfBirth?.month;

  const ages =
    character?.age === "1" ? `${character?.age} year` : `${character?.age} years`;

  const GenderIcon =
    character?.gender === "Male"
      ? IconGenderMale
      : character?.gender === "Female"
        ? IconGenderFemale
        : IconQuestionMark;

  return (
    <div className={s.header}>
      <img
        className={s.characterImage}
        src={character?.image.large}
        alt={character?.name.full}
      />
      <div className={s.details}>
        <div className={s.name}>
          <span className={s.full}>{character?.name.full}</span>
          <span className={s.native}>{character?.name.native}</span>
        </div>
        <div className={s.other}>
          {character?.age && (
            <span className={s.badge}>
              <IconHourglass size={15} />
              {ages}
            </span>
          )}
          {birthDay && birthMonth && (
            <span className={s.badge}>
              <IconGift size={15} />
              {checkBirthday(birthDay, birthMonth)}
            </span>
          )}
          {character?.gender && (
            <span className={s.badge}>
              <GenderIcon size={15} />
              {character?.gender}
            </span>
          )}
        </div>
        <CharacterDescription description={character?.description} />
      </div>
    </div>
  );
};

export default CharacterHeader;
