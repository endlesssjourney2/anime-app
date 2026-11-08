import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useProfile from "../../hooks/useProfile";
import s from "./Profile.module.css";
import ProfileHeader from "./components/ProfileHeader/ProfileHeader";
import SkeletonProfile from "./components/SkeletonProfile/SkeletonProfile";

const Profile = () => {
  const {
    profile,
    avatarUrl,
    bannerUrl,
    actionLoading,
    editProfile,
    editAvatar,
    editBanner,
    initLoading,
    removeAvatar,
    removeBanner,
  } = useProfile();

  const { user, loading: authLoading } = useAuth();

  if (authLoading) return <SkeletonProfile />;

  if (!user) return <Navigate to="/" replace />;

  if (initLoading) return <SkeletonProfile />;

  if (!profile) return <div className={s.noProfile}>No profile found</div>;

  return (
    <div className={s.profile}>
      <ProfileHeader
        profile={profile}
        bannerUrl={bannerUrl}
        avatarUrl={avatarUrl}
        loading={actionLoading}
        editAvatar={editAvatar}
        editBanner={editBanner}
        editProfile={editProfile}
        removeAvatar={removeAvatar}
        removeBanner={removeBanner}
      />
    </div>
  );
};

export default Profile;
