import type {
  AniListFormat,
  AniListImage,
  AniListStatus,
  AniListTitle,
  AniListType,
} from "./AniList";

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

export type RelationNode = {
  id: number;
  title: AniListTitle;
  coverImage: AniListImage | null;
  type: AniListType | null;
  format: AniListFormat | null;
  status: AniListStatus | null;
  episodes: number | null;
  averageScore: number | null;
};

export type RelationEdge = {
  relationType: AniListRelation;
  node: RelationNode;
};

export type AniListRelations = {
  edges: RelationEdge[];
};
