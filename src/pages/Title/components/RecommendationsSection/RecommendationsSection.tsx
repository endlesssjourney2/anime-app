import s from "./RecommendationsSection.module.css";
import type { FC } from "react";
import type { AniListRecommendation } from "../../../../types/Recommendations";
import RecommendationCard from "./components/RecommendationCard";

type Props = {
  recommendations: AniListRecommendation;
};
const RecommendationsSection: FC<Props> = ({ recommendations }) => {
  return (
    <div className={s.section}>
      <p className={s.sectionTitle}>Recommendations</p>
      <div className={s.recommendationsList}>
        {recommendations.nodes.map((r) => {
          return (
            <RecommendationCard
              anime={r.mediaRecommendation}
              key={r.mediaRecommendation.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecommendationsSection;
