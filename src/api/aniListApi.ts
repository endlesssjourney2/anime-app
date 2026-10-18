import axios from "axios";
import type {
  AniListFormat,
  AniListGenre,
  AniListMedia,
  AniListMediaDetails,
  AniListPageInfo,
  AniListStatus,
  AniListType,
  CharacterResponse,
  DetailsResponse,
  SearchResponse,
} from "../types/AniList";
import { SEARCH_QUERY } from "./queries/searchQuery";
import { DETAILS_QUERY } from "./queries/detailsQuery";
import type { AniListCharacterDetails } from "../types/CharacterDetails";
import { CHARACTER_QUERY } from "./queries/characterQuery";
import { CHARACTER_SEARCH_QUERY } from "./queries/characterSearchQuery";
import type { CharacterSearch, CharacterSearchResponse } from "../types/CharacterSearch";

const ANILIST_URL = "https://graphql.anilist.co";

export const searchAnime = async (
  search = "",
  page = 1,
  perPage = 10,
  sort: string[] = [],
  formatIn: AniListFormat[],
  statusIn: AniListStatus[],
  genreIn: AniListGenre[],
): Promise<{ media: AniListMedia[]; pageInfo: AniListPageInfo }> => {
  const response = await axios.post<SearchResponse>(
    ANILIST_URL,
    {
      query: SEARCH_QUERY,
      variables: {
        search: search.trim() || undefined,
        page,
        perPage,
        sort,
        formatIn: formatIn.length ? formatIn : undefined,
        statusIn: statusIn.length ? statusIn : undefined,
        genreIn: genreIn.length ? genreIn : undefined,
      },
    },
    { headers: { "Content-Type": "application/json" } },
  );

  return response.data.data.Page;
};

export const getAnimeById = async (
  id: number,
  isMain = true,
): Promise<AniListMediaDetails> => {
  const response = await axios.post<DetailsResponse>(
    ANILIST_URL,
    { query: DETAILS_QUERY, variables: { id, isMain } },
    { headers: { "Content-Type": "application/json" } },
  );

  return response.data.data.Media;
};

export const searchCharacter = async (
  search: string,
  perPage = 18,
  sort = search.trim() ? ["SEARCH_MATCH"] : ["FAVOURITES_DESC"],
): Promise<CharacterSearch[]> => {
  const response = await axios.post<CharacterSearchResponse>(
    ANILIST_URL,
    {
      query: CHARACTER_SEARCH_QUERY,
      variables: { search: search.trim() || undefined, perPage, sort },
    },
    { headers: { "Content-Type": "application/json" } },
  );

  return response.data.data.Page.characters;
};

export const getCharacterById = async (
  characterId: number,
  type: AniListType,
  sort: string[] = [],
): Promise<AniListCharacterDetails> => {
  const response = await axios.post<CharacterResponse>(
    ANILIST_URL,
    { query: CHARACTER_QUERY, variables: { characterId, type, sort } },
    { headers: { "Content-Type": "application/json" } },
  );

  return response.data.data.Character;
};
