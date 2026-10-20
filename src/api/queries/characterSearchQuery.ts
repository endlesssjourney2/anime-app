export const CHARACTER_SEARCH_QUERY = `
query ($search: String, $perPage: Int, $page: Int, $sort: [CharacterSort]) {
  Page(perPage: $perPage, page: $page) {
    pageInfo { hasNextPage }
    characters(search: $search, sort: $sort) {
      id
      name { full native }
      image { large medium }
    }
  }
}
`;
