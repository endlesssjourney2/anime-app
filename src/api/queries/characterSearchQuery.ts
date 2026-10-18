export const CHARACTER_SEARCH_QUERY = `
query ($search: String, $perPage: Int, $sort: [CharacterSort]) {
  Page(perPage: $perPage) {
    characters(search: $search, sort: $sort) {
      id
      name { full native }
      image { large medium }
    }
  }
}
`;
