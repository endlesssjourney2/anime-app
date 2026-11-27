export const WATCH_LIST_QUERY = `
query($page: Int, $perPage: Int, $idIn: [Int], $sort: [MediaSort]) {
  Page(page: $page, perPage: $perPage) {
    media(id_in: $idIn, sort: $sort) {
      id
      title {english romaji native}
      coverImage {large medium}
      format
      episodes
      seasonYear
    }
  }
}
`;
