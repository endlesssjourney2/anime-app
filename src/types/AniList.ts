export type AniListTitle = {
  romaji: string;
  english: string | null;
  native: string;
};

export type AniListImage = {
  large: string;
  medium: string;
};

// fields for card
export type AniListMedia = {
  id: number;
  title: AniListTitle;
  description: string | null;
  coverImage: AniListImage;
  averageScore: number | null;
  episodes: number | null;
  genres: string[];
};

// fields for details of one title
export type AniListMediaDetails = AniListMedia & {
  bannerImage: string | null;
  status: string | null;
};

export type AniListPageInfo = {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
};

export type SearchResponse = {
  data: {
    Page: {
      pageInfo: AniListPageInfo;
      media: AniListMedia[];
    };
  };
};

export type DetailsResponse = {
  data: {
    Media: AniListMediaDetails;
  };
};
