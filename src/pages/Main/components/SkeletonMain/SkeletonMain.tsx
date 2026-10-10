import s from "./SkeletonMain.module.css";

const SkeletonMain = () => {
  return (
    <div className={s.list}>
      {Array.from({ length: 10 }, (_, index) => (
        <div className={s.skeleton} key={index}>
          <div className={s.top}></div>
          <div className={s.bottom}>
            <div className={s.title}></div>
            <div className={s.genres}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonMain;
