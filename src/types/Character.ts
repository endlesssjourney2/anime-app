type CharacterNode = {
  id: number;
  name: { full: string };
  image: { large: string };
};

export type CharacterRole = "MAIN" | "SUPPORTING" | "BACKGROUND";

type CharacterEdge = {
  role: CharacterRole;
  node: CharacterNode;
};

export type AnilistCharacters = {
  edges: CharacterEdge[];
};
