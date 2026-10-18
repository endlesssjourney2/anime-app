import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import { searchCharacter } from "../api/aniListApi";
import type { CharacterSearch } from "../types/CharacterSearch";

const useCharacterSearch = () => {
  const [searchItem, setSearchItem] = useState("");
  const [result, setResult] = useState<CharacterSearch[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearchItem = useDebounce(searchItem, 500);

  useEffect(() => {
    setLoading(true);
    searchCharacter(debouncedSearchItem)
      .then((result) => setResult(result))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [debouncedSearchItem]);

  return { searchItem, setSearchItem, result, loading };
};

export default useCharacterSearch;
