import { useEffect, useState } from "react";
import type { AniListMediaDetails } from "../types/AniList";
import { getAnimeById } from "../api/aniListApi";

const useAnimeDetails = (id: number) => {
  const [anime, setAnime] = useState<AniListMediaDetails>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getAnimeById(id)
      .then((data) => setAnime(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  const clearDescription = anime?.description
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .trim();

  const animeTitle =
    anime?.title.english ?? anime?.title.native ?? anime?.title.romaji;

  return { anime, clearDescription, animeTitle, loading };
};

export default useAnimeDetails;
