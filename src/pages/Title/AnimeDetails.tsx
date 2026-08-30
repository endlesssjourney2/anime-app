import LoadingComponent from "../../features/components/LoadingComponent/LoadingComponent";
import useAnimeDetails from "../../hooks/useAnimeDetails";
import s from "./AnimeDetails.module.css";
import { useParams } from "react-router-dom";
import CharacterCard from "./components/CharacterCard/CharacterCard";
import { IconStarFilled } from "@tabler/icons-react";
import StatusBadge from "../../features/components/StatusBadge/StatusBadge";

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
          <img className={s.banner} src={anime?.bannerImage} alt={animeTitle} />

          <div className={s.headerBlock}>
            <img
              className={s.poster}
              src={anime?.coverImage.large}
              alt={animeTitle}
            />

            <div className={s.info}>
              <h1 className={s.title}>{animeTitle}</h1>
              <p className={s.meta}>
                {anime?.genres.join(", ")}
                {anime?.episodes && <> · {anime.episodes} episodes · </>}
                {anime?.status && <StatusBadge status={anime.status} />}
              </p>

              <div className={s.score}>
                <span className={s.scoreValue}>{anime?.averageScore}</span>
                <IconStarFilled stroke={1} size={16} />
              </div>
            </div>
          </div>

          <div className={s.section}>
            <p className={s.sectionTitle}>Description</p>
            <p className={s.description}>{clearDescription}</p>
          </div>
          <div className={s.section}>
            <p className={s.sectionTitle}>Characters</p>
            <div className={s.charactersList}>
              {anime.characters.edges.map((c) => (
                <CharacterCard
                  image={c.node.image.large}
                  name={c.node.name.full}
                  role={c.role}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnimeDetails;
