import type { FC } from "react";
import { getDisplayableRelations } from "../../../../helpers/displayableRelations";
import type { AniListRelations } from "../../../../types/Relation";
import s from "./RelationsSection.module.css";
import RelationCard from "./components/RelationCard/RelationCard";

type Props = {
  relations: AniListRelations;
};

const RelationsSection: FC<Props> = ({ relations }) => {
  return (
    <div className={s.section}>
      <p className={s.sectionTitle}>Relations</p>
      <div className={s.relationsList}>
        {getDisplayableRelations(relations?.edges ?? []).map((r) => (
          <RelationCard anime={r.node} relationType={r.relationType} key={r.node.id} />
        ))}
      </div>
    </div>
  );
};

export default RelationsSection;
