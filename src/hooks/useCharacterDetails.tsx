import { useEffect, useState } from "react";
import type { AniListCharacterDetails } from "../types/CharacterDetails";
import { getCharacterById } from "../api/aniListApi";
import type { AniListSortCharacter } from "../types/AniListSort";

const useCharacterDetails = (id: number) => {
  const [character, setCharacter] = useState<AniListCharacterDetails>();
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState<AniListSortCharacter>("START_DATE_DESC");

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getCharacterById(id, "ANIME", [sort])
      .then((data) => setCharacter(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id, sort]);

  return { character, loading, setSort, sort };
};

export default useCharacterDetails;
