import axios from "axios";
import type {
  AniListMedia,
  AniListMediaDetails,
  AniListPageInfo,
  DetailsResponse,
  SearchResponse,
} from "../types/AniList";

const ANILIST_URL = "https://graphql.anilist.co";

//GraphQL

const SEARCH_QUERY = `
  query ($search: String, $page: Int, $perPage: Int, $sort: [MediaSort]) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
      }
      media(search: $search, type: ANIME, sort: $sort) {
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

//future
const DETAILS_QUERY = `
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title { romaji english native }
      description
      coverImage { large medium }
      bannerImage
      averageScore
      episodes
      status
      genres
      characters(sort: FAVOURITES_DESC, perPage: 8) {
        edges {
          role
          node {
            id
            name{full}
            image{large}
          }
        }
      }
    }
  }
`;

export const searchAnime = async (
  search = "",
  page = 1,
  perPage = 10,
  sort: string[] = ["SCORE_DESC"],
): Promise<{ media: AniListMedia[]; pageInfo: AniListPageInfo }> => {
  const response = await axios.post<SearchResponse>(
    ANILIST_URL,
    {
      query: SEARCH_QUERY,
      variables: { search: search || undefined, page, perPage, sort },
    },
    { headers: { "Content-Type": "application/json" } },
  );

  return response.data.data.Page;
};

export const getAnimeById = async (
  id: number,
): Promise<AniListMediaDetails> => {
  const response = await axios.post<DetailsResponse>(
    ANILIST_URL,
    { query: DETAILS_QUERY, variables: { id } },
    { headers: { "Content-Type": "application/json" } },
  );

  return response.data.data.Media;
};
