type CharacterNode = {
  id: number;
  name: { full: string | null; native: string | null };
  image: { large: string };
  dateOfBirth: DateOfBirth;
  age: string;
  gender: string;
};

export type DateOfBirth = {
  month: number;
  day: number;
};

export type CharacterRole = "MAIN" | "SUPPORTING" | "BACKGROUND";

type CharacterEdge = {
  role: CharacterRole;
  node: CharacterNode;
};

export type AniListCharacters = {
  edges: CharacterEdge[];
};
