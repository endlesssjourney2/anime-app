import LoadingComponent from "../../features/components/LoadingComponent/LoadingComponent";
import useAnimeDetails from "../../hooks/useAnimeDetails";
import s from "./AnimeDetails.module.css";
import { useParams } from "react-router-dom";
import AnimeHeader from "./components/AnimeHeader/AnimeHeader";
import CharactersSection from "./components/CharactersSection/CharactersSection";
import RelationsSection from "./components/RelationsSection/RelationsSection";
import TrailerSection from "./components/TrailerSection/TrailerSection";

const AnimeDetails = () => {
  const { id } = useParams();

  const { anime, animeTitle, clearDescription, loading } = useAnimeDetails(
    Number(id),
  );

  return (
    <div className={s.titlePage}>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <AnimeHeader anime={anime} animeTitle={animeTitle} />
          {clearDescription && (
            <div className={s.section}>
              <p className={s.sectionTitle}>Description</p>
              <p className={s.description}>{clearDescription}</p>
            </div>
          )}
          {anime.trailer && <TrailerSection trailer={anime.trailer} />}

          {anime.relations.edges.length > 0 && (
            <RelationsSection relations={anime.relations} />
          )}
          {anime.characters.edges.length > 0 && (
            <CharactersSection characters={anime.characters} />
          )}
        </>
      )}
    </div>
  );
};

export default AnimeDetails;
