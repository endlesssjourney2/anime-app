import s from "./SkeletonProfile.module.css";

const SkeletonProfile = () => {
  return (
    <>
      <div className={s.banner} />

      <div className={s.info}>
        <div className={s.avatar} />
        <div className={s.about}>
          <div className={s.name} style={{ width: "30%", height: "20px" }} />
          <div className={s.description} style={{ width: "70%", height: "15px" }} />
        </div>
      </div>
    </>
  );
};

export default SkeletonProfile;
