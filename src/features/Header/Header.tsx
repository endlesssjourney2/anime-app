import { Link } from "react-router-dom";
import s from "./Header.module.css";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../db/supabase";
import useProfile from "../../hooks/useProfile";
import ProfileDropdown from "./components/ProfileDropdown/ProfileDropdown";

const Header = () => {
  const { user } = useAuth();
  const { profile } = useProfile();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className={s.header}>
      <div className={s.container}>
        <div className={s.logo}>
          <span className={s.logoAccent}>Ani</span>MEEEEe
        </div>

        <nav className={s.nav}>
          <div className={s.right}>
            <Link className={s.navLink} to="/">
              Anime
            </Link>
            <Link className={s.navLink} to={"/characters"}>
              Characters
            </Link>
          </div>
          {user ? (
            <ProfileDropdown handleLogout={handleLogout} profile={profile} />
          ) : (
            <div className={s.left}>
              <Link className={s.navLink} to={"/signup"}>
                Sign Up
              </Link>
              <Link className={s.navLink} to={"/signin"}>
                Sign In
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
