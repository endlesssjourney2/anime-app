import type { AniListRelation, RelationEdge } from "../types/Relation";

//with OTHER and CHARACTER filtered out(cause its not what i want! kew::), sorted by priority(preauel > sequel > everything else)
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
      return (
        RELATION_PRIORITY[a.relationType] - RELATION_PRIORITY[b.relationType]
      );
    });
};
