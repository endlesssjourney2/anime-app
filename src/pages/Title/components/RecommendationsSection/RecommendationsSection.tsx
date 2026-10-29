import s from "./RecommendationsSection.module.css";
import { useState, type FC } from "react";
import type { AniListRecommendation } from "../../../../types/Recommendations";
import RecommendationCard from "./components/RecommendationCard";
import useLoadMore from "../../../../hooks/useLoadMore";
import { loadMoreRecommendations } from "../../../../api/aniListApi";
import LoadMoreBtn from "../../../../features/components/LoadMoreBtn/LoadMoreBtn";
import PerPageSelect from "../../../../features/components/PerPageSelect/PerPageSelect";

type Props = {
  recommendations: AniListRecommendation;
  id: number;
};
const RecommendationsSection: FC<Props> = ({ recommendations, id }) => {
  const [perPage, setPerPage] = useState("6");
  const [changingPerPage, setChangingPerPage] = useState(false);

  const { items, loadMore, hasNextPage, loading, reset } = useLoadMore({
    initialData: recommendations.nodes,
    initialHasNextPage: recommendations.pageInfo.hasNextPage,
    fetchPage: async (page) => {
      const result = await loadMoreRecommendations(id, page, Number(perPage));

      return {
        items: result.nodes,
        hasNextPage: result.pageInfo.hasNextPage,
      };
    },
  });

  const busy = changingPerPage || loading;

  const handlePerPageChange = async (value: string) => {
    if (busy || value === perPage) return;

    setChangingPerPage(true);

    try {
      const result = await loadMoreRecommendations(id, 1, Number(value));
      reset(result.nodes, result.pageInfo.hasNextPage);
      setPerPage(value);
    } catch (err) {
      console.log(err);
    } finally {
      setChangingPerPage(false);
    }
  };

  return (
    <div className={s.section}>
      <div className={s.top}>
        <p className={s.sectionTitle}>Recommendations</p>
        <PerPageSelect
          perPage={perPage}
          setPerPage={handlePerPageChange}
          options={[
            { value: "6", label: "6 recommendations" },
            { value: "9", label: "9 recommendations" },
            { value: "12", label: "12 recommendations" },
            { value: "15", label: "15 recommendations" },
          ]}
          disabled={busy}
        />
      </div>

      <div className={s.recommendationsList}>
        {items.map((r) => (
          <RecommendationCard
            anime={r.mediaRecommendation}
            key={r.mediaRecommendation.id}
          />
        ))}
      </div>
      <LoadMoreBtn onClick={loadMore} loading={loading} disabled={busy || !hasNextPage} />
    </div>
  );
};

export default RecommendationsSection;
