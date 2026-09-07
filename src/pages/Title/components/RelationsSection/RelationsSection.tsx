import type { FC } from "react";
import { getDisplayableRelations } from "../../../../helpers/displayableRelations";
import type { AnilistRelations } from "../../../../types/Relation";
import s from "./RelationsSection.module.css";
import RelationCard from "./components/RelationCard/RelationCard";
import { useNavigate } from "react-router-dom";

type Props = {
  relations: AnilistRelations;
};

const RelationsSection: FC<Props> = ({ relations }) => {
  const navigate = useNavigate();

  return (
    <div className={s.section}>
      <p className={s.sectionTitle}>Relations</p>
      <div className={s.relationsList}>
        {getDisplayableRelations(relations?.edges ?? []).map((r) => (
          <RelationCard
            onClick={() => navigate(`/anime/${r.node.id}`)}
            key={r.node.id}
            title={
              r.node.title.english ?? r.node.title.romaji ?? r.node.title.native
            }
            image={r.node.coverImage.large}
            relationType={r.relationType}
          />
        ))}
      </div>
    </div>
  );
};

export default RelationsSection;
