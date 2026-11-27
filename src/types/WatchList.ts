import type { AniListFormat, AniListImage, AniListTitle } from "./AniList";

export type WatchListMedia = {
  id: number;
  title: AniListTitle;
  coverImage: AniListImage | null;
  format: AniListFormat | null;
  episodes: number | null;
  seasonYear: number | null;
}[];

export type WatchListResponse = {
  data: {
    Page: {
      media: WatchListMedia;
    };
  };
};
