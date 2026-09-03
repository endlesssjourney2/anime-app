import type { AniListRelation, RelationEdge } from "../types/Relation";

const RELATION_PRIORITY: Record<AniListRelation, number> = {
  PREQUEL: 0,
  SEQUEL: 1,
  ADAPTATION: 2,
  PARENT: 2,
  SIDE_STORY: 2,
  CHARACTER: 3,
  SUMMARY: 2,
  ALTERNATIVE: 2,
  SPIN_OFF: 2,
  OTHER: 3,
  SOURCE: 2,
  COMPILATION: 2,
  CONTAINS: 2,
  SAME_UNIVERSE: 2,
};

export const getDisplayableRelations = (edges: RelationEdge[]) => {
  return edges
    .filter(
      (r) =>
        r.node.type === "ANIME" &&
        r.relationType !== "CHARACTER" &&
        r.relationType !== "OTHER",
    )
    .sort((a, b) => {
      const priorityA = RELATION_PRIORITY[a.relationType] ?? Infinity;
      const priorityB = RELATION_PRIORITY[b.relationType] ?? Infinity;
      return priorityA - priorityB;
    });
};
