type CharacterNode = {
  id: number;
  name: { full: string | null; native: string | null };
  image: { large: string };
  dateOfBirth: DateOfBirth;
  age: string | null;
  gender: string | null;
};

export type DateOfBirth = {
  month: number | null;
  day: number | null;
};

export type CharacterRole = "MAIN" | "SUPPORTING" | "BACKGROUND";

type CharacterEdge = {
  role: CharacterRole;
  node: CharacterNode;
};

export type AniListCharacters = {
  edges: CharacterEdge[];
};
