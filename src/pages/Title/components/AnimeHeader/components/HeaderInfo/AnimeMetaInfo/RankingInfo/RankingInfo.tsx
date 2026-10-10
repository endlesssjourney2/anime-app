import s from "./RankingInfo.module.css";
import type { FC } from "react";
import type { AniListRankings } from "../../../../../../../../types/Rankings";
import { IconFlame, IconTrophy } from "@tabler/icons-react";
import { capitalizeFirst } from "../../../../../../../../helpers/capitalizeFirst";

type Props = {
  rankings: AniListRankings;
};

const RankingInfo: FC<Props> = ({ rankings }) => {
  const ratedAllTime = rankings.find(
    (rank) => rank.allTime === true && rank.type === "RATED",
  );

  const popularAllTime = rankings.find(
    (rank) => rank.allTime === true && rank.type === "POPULAR",
  );

  const othersRatings = rankings.filter((rank) => rank.allTime === false);

  if (!ratedAllTime && !popularAllTime && !othersRatings.length) return null;

  return (
    <div className={s.rankings}>
      <div className={s.metaItems}>
        {ratedAllTime && (
          <div className={`${s.metaItem} ${s.rated}`}>
            <IconTrophy size={16} />
            <span>
              #{ratedAllTime.rank} {ratedAllTime.context}
            </span>
          </div>
        )}
        <div className={s.divider} />
        {popularAllTime && (
          <div className={`${s.metaItem} ${s.popularity}`}>
            <IconFlame size={16} />
            <span>
              #{popularAllTime.rank} {popularAllTime.context}
            </span>
          </div>
        )}
      </div>
      {othersRatings.length > 0 && (
        <div className={s.ratingList}>
          {othersRatings.map((rank) => (
            <div
              className={s.additionalMeta}
              key={`${rank.type}-${rank.year}-${rank.season}-${rank.format}`}
            >
              #{rank.rank} {rank.context} {rank.year} {capitalizeFirst(rank.season)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RankingInfo;
