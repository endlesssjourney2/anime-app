import s from "./SkeletonCharacter.module.css";
const SkeletonCharacter = () => {
  return (
    <>
      <div className={s.header}>
        <div className={s.img} />
        <div className={s.details}>
          <div className={s.name}>
            <div className={s.nameItem} style={{ width: "60%", height: "30px" }} />
            <div className={s.nameItem} style={{ width: "50%", height: "25px" }} />
          </div>
          <div className={s.other}>
            <div className={s.otherItem} style={{ width: "70px", height: "25px" }} />
            <div className={s.otherItem} style={{ width: "55px", height: "25px" }} />
            <div className={s.otherItem} style={{ width: "55px", height: "25px" }} />
          </div>
          <div className={s.description}>
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                className={s.descItem}
                key={index}
                style={{ width: "100%", height: "18px" }}
              />
            ))}
            <div className={s.descItem} style={{ width: "40%", height: "18px" }} />
          </div>
        </div>
      </div>
      <div className={s.section}>
        <div className={s.info}>
          <div className={s.infoItem} style={{ width: "150px", height: "25px" }} />
          <div className={s.infoItem} style={{ width: "40px", height: "40px" }} />
        </div>
        <div className={s.list}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div className={s.item} key={index}>
              <div className={s.itemImg} style={{ width: "140px", height: "100%" }} />
              <div className={s.itemInfo}>
                <div className={s.title} style={{ width: "90%", height: "25px" }} />
                <div className={s.itemDetails}>
                  <div className={s.detItem} style={{ width: "30%", height: "20px" }} />
                  <div className={s.detItem} style={{ width: "30%", height: "20px" }} />
                  <div className={s.detItem} style={{ width: "30%", height: "20px" }} />
                </div>
                <div className={s.season} style={{ width: "70%", height: "20px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SkeletonCharacter;
