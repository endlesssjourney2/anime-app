//search query
export const SEARCH_QUERY = `
  query ($search: String, $page: Int, $perPage: Int, $sort: [MediaSort], $formatIn: [MediaFormat]
  $statusIn: [MediaStatus], $genreIn: [String]) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
      }
      media(search: $search, type: ANIME, sort: $sort, format_in: $formatIn, status_in: $statusIn,
      genre_in: $genreIn) {
        id
        title { romaji english native }
        coverImage { large medium }
        averageScore
        genres
        status
      }
    }
  }
`;
