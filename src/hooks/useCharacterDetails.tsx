import { useEffect, useState } from "react";
import type { AniListCharacterDetails } from "../types/CharacterDetails";
import { getCharacterById } from "../api/aniListApi";

const useCharacterDetails = (id: number) => {
  const [character, setCharacter] = useState<AniListCharacterDetails>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getCharacterById(id)
      .then((data) => setCharacter(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  return { character, loading };
};

export default useCharacterDetails;
