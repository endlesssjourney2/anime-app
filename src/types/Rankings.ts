import type { AniListFormat, AniListSeason } from "./AniList";

export type AniListRankings = {
  allTime: boolean;
  rank: number;
  type: "RATED" | "POPULAR";
  format: AniListFormat;
  context: string;
  year: number | null;
  season: AniListSeason | null;
}[];
