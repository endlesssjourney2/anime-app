import { Navigate, useParams } from "react-router-dom";
import usePublicProfile from "../../../hooks/usePublicProfile";
import s from "./PublicProfile.module.css";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import SkeletonProfile from "../components/SkeletonProfile/SkeletonProfile";
import { useAuth } from "../../../context/AuthContext";

const PublicProfile = () => {
  const { username } = useParams();
  const { user, loading } = useAuth();

  const { profile, initLoading, avatarUrl, bannerUrl } = usePublicProfile(username);

  if (loading) return <SkeletonProfile />;

  if (initLoading) return <SkeletonProfile />;

  if (!profile) return <div className={s.noProfile}>No profile found</div>;

  if (user?.id === profile.id) return <Navigate to="/profile" replace />;

  return (
    <div className={s.publicProfile}>
      <ProfileHeader profile={profile} avatarUrl={avatarUrl} bannerUrl={bannerUrl} />
    </div>
  );
};

export default PublicProfile;
