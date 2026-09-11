import type { AniListCharacters } from "./Character";
import type { AniListRelations } from "./Relation";

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

type AniListNextAiringEpisode = {
  episode: number;
  timeUntilAiring: number;
} | null;

export type AniListExternalLink = {
  url: string | null;
  color: string | null;
  site: string;
  type: "INFO" | "STREAMING" | "SOCIAL";
};

// fields for details of one title
export type AniListMediaDetails = AniListMedia & {
  bannerImage: string | null;
  startDate: { year: number | null };
  characters: AniListCharacters;
  relations: AniListRelations;
  nextAiringEpisode: AniListNextAiringEpisode;
  duration: number | null;
  externalLinks: AniListExternalLink[];
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
