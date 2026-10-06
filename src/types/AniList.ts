import type { AniListCharacters } from "./Character";
import type { AniListRelations } from "./Relation";
import {
  AniListFormatCollection,
  AniListGenreCollection,
  AniListStatusCollection,
} from "../constants/collections";

//title
export type AniListTitle = {
  romaji: string;
  english: string | null;
  native: string;
};
//

//image
export type AniListImage = {
  large: string;
  medium: string;
};
//

//studios
export type AniListStudiosNode = {
  name: string;
};

export type AniListStudios = {
  nodes: AniListStudiosNode[];
};
//

export type AniListGenre = (typeof AniListGenreCollection)[number];

export type AniListStatus = (typeof AniListStatusCollection)[number];

export type AniListFormat = (typeof AniListFormatCollection)[number];

// fields for card
export type AniListMedia = {
  id: number;
  title: AniListTitle;
  description: string | null;
  coverImage: AniListImage;
  averageScore: number | null;
  episodes: number | null;
  genres: AniListGenre[];
  status: AniListStatus;
};
//

//nextAiringEpisode
type AniListNextAiringEpisode = {
  episode: number;
  timeUntilAiring: number;
} | null;
//

//externalLinks
export type AniListExternalLink = {
  url: string | null;
  color: string | null;
  site: string;
  type: "INFO" | "STREAMING" | "SOCIAL";
};
//

//trailer
export type AniListTrailer = {
  site: string | null;
  id: string | null;
  thumbnail: string | null;
};
//

// fields for details of one title
export type AniListMediaDetails = AniListMedia & {
  bannerImage: string | null;
  startDate: { year: number | null };
  characters: AniListCharacters;
  relations: AniListRelations;
  nextAiringEpisode: AniListNextAiringEpisode;
  duration: number | null;
  externalLinks: AniListExternalLink[];
  trailer: AniListTrailer;
  format: AniListFormat;
  studios: AniListStudios;
};
//

//page
export type AniListPageInfo = {
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
//

//details
export type DetailsResponse = {
  data: {
    Media: AniListMediaDetails;
  };
};
//
