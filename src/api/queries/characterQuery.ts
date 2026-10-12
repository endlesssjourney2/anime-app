export const CHARACTER_QUERY = `
  query ($characterId: Int) {
    Character(id: $characterId) {
      name { full native }
      image { large }
      description
      gender
      dateOfBirth { month day }
      age
    }
  }
`;
