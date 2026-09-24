import type { AniListFormat, AniListStatus } from "../types/AniList";
import type { AniListSort } from "../types/AniListSort";

export const FORMAT_OPTIONS: { value: AniListFormat; label: string }[] = [
  { value: "TV", label: "TV" },
  { value: "MOVIE", label: "Movie" },
  { value: "OVA", label: "OVA" },
  { value: "ONA", label: "ONA" },
  { value: "SPECIAL", label: "Special" },
  { value: "TV_SHORT", label: "TV short" },
  { value: "MUSIC", label: "Music" },
];

export const STATUS_OPTIONS: { value: AniListStatus; label: string }[] = [
  { value: "FINISHED", label: "Finished" },
  { value: "RELEASING", label: "Releasing" },
  { value: "NOT_YET_RELEASED", label: "Not yer released" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "HIATUS", label: "Hiatus" },
];

export const SORT_OPTIONS: { value: AniListSort; label: string }[] = [
  { value: "SCORE_DESC", label: "Score" },
  { value: "POPULARITY_DESC", label: "Popularity" },
  { value: "TRENDING_DESC", label: "Trending" },
];
