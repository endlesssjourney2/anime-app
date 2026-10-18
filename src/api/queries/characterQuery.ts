export const CHARACTER_QUERY = `
  query ($characterId: Int, $type: MediaType, $sort: [MediaSort]) {
    Character(id: $characterId) {
      name { full native }
      image { large }
      description
      gender
      dateOfBirth { month day }
      age
      media(type: $type, sort: $sort) {
      edges {
        characterRole
        node {
          title { english romaji native }
          id
          type
          format
          status
          coverImage { large medium }
          episodes
          seasonYear
          }
        }
      }
    }
  }
`;
