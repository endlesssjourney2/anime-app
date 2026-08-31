import type { AnilistCharacters } from "./Character";
import type { AnilistRelations } from "./Relation";

export type AniListTitle = {
  romaji: string;
  english: string | null;
  native: string;
};

export type AniListImage = {
  large: string;
  medium: string;
};

export type AniListStatus =
  | "FINISHED"
  | "RELEASING"
  | "NOT_YET_RELEASED"
  | "CANCELLED"
  | "HIATUS";

// fields for card
export type AniListMedia = {
  id: number;
  title: AniListTitle;
  description: string | null;
  coverImage: AniListImage;
  averageScore: number | null;
  episodes: number | null;
  genres: string[];
  status: AniListStatus;
};

// fields for details of one title
export type AniListMediaDetails = AniListMedia & {
  bannerImage: string | null;
  characters: AnilistCharacters;
  relations: AnilistRelations;
};

//page
export type AniListPageInfo = {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
};

//api
export type SearchResponse = {
  data: {
    Page: {
      pageInfo: AniListPageInfo;
      media: AniListMedia[];
    };
  };
};

export type DetailsResponse = {
  data: {
    Media: AniListMediaDetails;
  };
};
