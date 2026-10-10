import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import s from "./BackButton.module.css";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className={s.backButton} onClick={() => navigate(-1)}>
      <IconArrowLeft size={18} />
    </div>
  );
};

export default BackButton;
