import type { AniListImage, AniListTitle } from "./AniList";

type RelationNode = {
  id: number;
  title: AniListTitle;
  coverImage: AniListImage;
  type: "ANIME" | "MANGA";
};

export type RelationEdge = {
  relationType: string;
  node: RelationNode;
};

export type AnilistRelations = {
  edges: RelationEdge[];
};
