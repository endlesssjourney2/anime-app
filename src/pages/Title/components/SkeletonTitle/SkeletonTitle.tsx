import s from "./SkeletonTitle.module.css";

const SkeletonTitle = () => {
  return (
    <>
      <div className={s.banner} />

      <div className={s.posterBlock}>
        <div className={s.poster} />

        <div className={s.info}>
          <div className={s.title} style={{ width: "80%", height: "30px" }} />
          <div className={s.meta}>
            <div
              className={s.metaItem}
              style={{ width: "40%", height: "20px" }}
            />
            <div
              className={s.metaItem}
              style={{ width: "10%", height: "20px" }}
            />
            <div
              className={s.metaItem}
              style={{ width: "10%", height: "20px" }}
            />
          </div>
          <div className={s.episodes}>
            <div className={s.episodeItem} />
            <div className={s.episodeItem} />
          </div>
          <div className={s.badge} />
        </div>
        <div className={s.links}>
          <div className={s.link} />
          <div className={s.link} />
          <div className={s.link} />
        </div>
      </div>
      <div className={s.section}>
        <div className={s.sectionTitle} />
        <div className={s.sectionContent}>
          <div
            className={s.description}
            style={{ width: "100%", height: "20px" }}
          />
          <div
            className={s.description}
            style={{ width: "100%", height: "20px" }}
          />
          <div
            className={s.description}
            style={{ width: "100%", height: "20px" }}
          />
          <div
            className={s.description}
            style={{ width: "60%", height: "20px" }}
          />
        </div>
      </div>
      <div className={s.section}>
        <div className={s.sectionTitle} />
        <div className={s.trailer} />
      </div>
    </>
  );
};

export default SkeletonTitle;
