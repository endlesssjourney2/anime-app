import type { AniListFormat, AniListImage, AniListTitle } from "./AniList";

export type WatchListMedia = {
  id: number;
  title: AniListTitle;
  coverImage: AniListImage;
  format: AniListFormat;
  episodes: number;
  seasonYear: number;
}[];

export type WatchListResponse = {
  data: {
    Page: {
      media: WatchListMedia;
    };
  };
};
