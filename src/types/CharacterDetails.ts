import type { AniListFormat, AniListImage, AniListTitle } from "./AniList";
import type { DateOfBirth } from "./Character";

export type MediaNode = {
  id: number;
  title: AniListTitle;
  type: "ANIME";
  format: AniListFormat | null;
  coverImage: AniListImage | null;
};

type CharacterMedia = {
  nodes: MediaNode[];
};

//character fields
export type AniListCharacterDetails = {
  name: { full: string | null; native: string | null };
  image: AniListImage;
  description: string | null;
  gender: string;
  dateOfBirth: DateOfBirth;
  age: string | null;
  media: CharacterMedia;
};
