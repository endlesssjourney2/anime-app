import { Bouncy } from "ldrs/react";
import "ldrs/react/Bouncy.css";
import s from "./LoadingComponent.module.css";

const LoadingComponent = () => {
  return (
    <div className={s.loading}>
      <Bouncy size="45" speed="1" color="#7f77dd" />
    </div>
  );
};

export default LoadingComponent;
