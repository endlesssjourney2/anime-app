type CharacterNode = {
  id: number;
  name: { full: string };
  image: { large: string };
};

type CharacterEdge = {
  role: string;
  node: CharacterNode;
};

export type AnilistCharacters = {
  edges: CharacterEdge[];
};
