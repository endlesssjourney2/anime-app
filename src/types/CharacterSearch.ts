import type { AniListImage } from "./AniList";

export type CharacterSearch = {
  id: number;
  name: { full: string | null; native: string | null };
  image: AniListImage | null;
};

export type CharacterSearchResponse = {
  data: {
    Page: {
      characters: CharacterSearch[];
    };
  };
};
