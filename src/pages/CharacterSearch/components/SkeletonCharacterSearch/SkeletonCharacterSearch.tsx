import s from "./SkeletonCharacterSearch.module.css";

const SkeletonCharacterSearch = () => {
  return (
    <div className={s.list}>
      {Array.from({ length: 12 }, (_, index) => (
        <div className={s.skeletonItem} key={index}>
          <div className={s.img} />
          <div className={s.name}>
            <div className={s.full} style={{ width: "80%", height: "20px" }} />
            <div className={s.native} style={{ width: "50%", height: "20px" }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCharacterSearch;
