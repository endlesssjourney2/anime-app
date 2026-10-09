import type { AniListFormat, AniListImage, AniListTitle } from "./AniList";

export type MediaRecommendation = {
  id: number;
  title: AniListTitle;
  type: "ANIME" | "MANGA" | null;
  format: AniListFormat | null;
  coverImage: AniListImage;
  averageScore: number | null;
  episodes: number;
  genres: string[];
};

type RecommendationNode = {
  mediaRecommendation: MediaRecommendation;
};

export type AniListRecommendation = {
  nodes: RecommendationNode[];
};
