import type {
  AniListFormat,
  AniListImage,
  AniListStatus,
  AniListTitle,
  AniListType,
} from "./AniList";
import type { CharacterRole, DateOfBirth } from "./Character";

export type MediaNode = {
  id: number;
  title: AniListTitle;
  type: AniListType | null;
  format: AniListFormat | null;
  status: AniListStatus | null;
  coverImage: AniListImage | null;
  episodes: number | null;
  seasonYear: number | null;
};

type MediaEdges = {
  characterRole: CharacterRole;
  node: MediaNode;
};

export type CharacterMedia = {
  edges: MediaEdges[];
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
