import type { AniListImage, AniListStatus, AniListTitle } from "./AniList";

export type AniListRelation =
  | "ADAPTATION"
  | "PREQUEL"
  | "SEQUEL"
  | "PARENT"
  | "SIDE_STORY"
  | "CHARACTER"
  | "SUMMARY"
  | "ALTERNATIVE"
  | "SPIN_OFF"
  | "OTHER"
  | "SOURCE"
  | "COMPILATION"
  | "CONTAINS"
  | "SAME_UNIVERSE";

type RelationNode = {
  id: number;
  title: AniListTitle;
  coverImage: AniListImage;
  type: "ANIME" | "MANGA";
  format: string;
  status: AniListStatus;
  episodes: number | null;
};

export type RelationEdge = {
  relationType: AniListRelation;
  node: RelationNode;
};

export type AniListRelations = {
  edges: RelationEdge[];
};
