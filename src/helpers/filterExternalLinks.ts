import type { AniListExternalLink } from "../types/AniList";

export const filterExternalLinks = (links: AniListExternalLink[]) => {
  //there may be some changes
  const streaming =
    links.find((l) => l.site === "Crunchyroll") ??
    links.find((l) => l.type === "STREAMING");
  const social = links.filter((l) => l.type === "SOCIAL").slice(0, 3);

  const result = [streaming, ...social];
  return result.filter((l) => l !== undefined) as AniListExternalLink[];
};
