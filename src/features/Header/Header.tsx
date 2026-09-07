import { Link } from "react-router-dom";
import s from "./Header.module.css";

const Header = () => {
  return (
    <div className={s.header}>
      <div className={s.container}>
        <div className={s.logo}>
          <span className={s.logoAccent}>Ani</span>MEEEEe
        </div>

        <nav className={s.nav}>
          <Link className={s.navLink} to="/">
            Home
          </Link>
        </nav>

        {/* wip <div className={s.profile}>
          <div className={s.avatar} />
        </div> */}
      </div>
    </div>
  );
};

export default Header;
