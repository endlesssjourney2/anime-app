import axios from "axios";
import type {
  AniListFormat,
  AniListMedia,
  AniListMediaDetails,
  AniListPageInfo,
  AniListStatus,
  DetailsResponse,
  SearchResponse,
} from "../types/AniList";

const ANILIST_URL = "https://graphql.anilist.co";

//GraphQL

const SEARCH_QUERY = `
  query ($search: String, $page: Int, $perPage: Int, $sort: [MediaSort], $format: MediaFormat
  $status: MediaStatus) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
      }
      media(search: $search, type: ANIME, sort: $sort, format: $format, status: $status) {
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

// One anime details query
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
      format
      startDate {year}
      characters(sort: FAVOURITES_DESC, perPage: 8) {
        edges {
          role
          node {
            id
            name{full, native}
            image{large}
            gender
            dateOfBirth {
              month
              day
            }
            age
          }
        }
      }
      relations {
      edges {
        relationType
        node {
          id
          title { romaji english }
          coverImage { large }
          type
          format
          status
          episodes
          averageScore
          }
        }
      }
      nextAiringEpisode {
        episode
        timeUntilAiring
      }
      duration
      externalLinks {
        url
        color
        site
        type
      }
      trailer {
        site
        id
        thumbnail
      }
    }
  }
`;

export const searchAnime = async (
  search = "",
  page = 1,
  perPage = 10,
  sort: string[] = [],
  format: AniListFormat | null,
  status: AniListStatus | null,
): Promise<{ media: AniListMedia[]; pageInfo: AniListPageInfo }> => {
  const response = await axios.post<SearchResponse>(
    ANILIST_URL,
    {
      query: SEARCH_QUERY,
      variables: {
        search: search || undefined,
        page,
        perPage,
        sort,
        format: format || undefined,
        status: status || undefined,
      },
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
