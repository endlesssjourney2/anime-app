import type { AniListFormat, AniListImage, AniListTitle, AniListType } from "./AniList";

export type MediaRecommendation = {
  id: number;
  title: AniListTitle;
  type: AniListType | null;
  format: AniListFormat | null;
  coverImage: AniListImage | null;
  averageScore: number | null;
  episodes: number | null;
  genres: string[];
};

type RecommendationNode = {
  mediaRecommendation: MediaRecommendation;
};

export type AniListRecommendation = {
  nodes: RecommendationNode[];
  pageInfo: { hasNextPage: boolean };
};

export type LoadMoreRecommendationsResponse = {
  data: {
    Media: {
      recommendations: AniListRecommendation;
    };
  };
};
