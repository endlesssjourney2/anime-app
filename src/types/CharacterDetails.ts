//character fields

import type { AniListImage } from "./AniList";
import type { DateOfBirth } from "./Character";

export type AniListCharacterDetails = {
  name: { full: string | null; native: string | null };
  image: AniListImage;
  description: string | null;
  gender: string;
  dateOfBirth: DateOfBirth;
  age: string | null;
};
