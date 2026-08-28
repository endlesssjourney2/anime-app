type CharacterNode = {
  id: number;
  name: { full: string };
  image: { large: string };
};

export type CharacterEdge = {
  role: string;
  node: CharacterNode;
};
