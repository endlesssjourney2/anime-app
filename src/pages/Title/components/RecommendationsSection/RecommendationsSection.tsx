import s from "./RecommendationsSection.module.css";
import type { FC } from "react";
import type { AniListRecommendation } from "../../../../types/Recommendations";
import RecommendationCard from "./components/RecommendationCard";
import useLoadMore from "../../../../hooks/useLoadMore";
import { loadMoreRecommendations } from "../../../../api/aniListApi";
import LoadMoreBtn from "../../../../features/components/LoadMoreBtn/LoadMoreBtn";

type Props = {
  recommendations: AniListRecommendation;
  id: number;
};
const RecommendationsSection: FC<Props> = ({ recommendations, id }) => {
  const { items, loadMore, hasNextPage, loading } = useLoadMore({
    initialData: recommendations.nodes,
    initialHasNextPage: recommendations.pageInfo.hasNextPage,
    fetchPage: async (page) => {
      const result = await loadMoreRecommendations(id, page);

      return {
        items: result.nodes,
        hasNextPage: result.pageInfo.hasNextPage,
      };
    },
  });

  return (
    <div className={s.section}>
      <p className={s.sectionTitle}>Recommendations</p>
      <div className={s.recommendationsList}>
        {items.map((r) => {
          return (
            <RecommendationCard
              anime={r.mediaRecommendation}
              key={r.mediaRecommendation.id}
            />
          );
        })}
      </div>
      <LoadMoreBtn
        onClick={loadMore}
        loading={loading}
        disabled={loading || !hasNextPage}
      />
    </div>
  );
};

export default RecommendationsSection;
