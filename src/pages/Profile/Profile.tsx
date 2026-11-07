import useProfile from "../../hooks/useProfile";
import s from "./Profile.module.css";
import ProfileHeader from "./components/ProfileHeader/ProfileHeader";
import SkeletonProfile from "./components/SkeletonProfile/SkeletonProfile";

const Profile = () => {
  const { profile, actionLoading, editProfile, editAvatar, editBanner, initLoading } =
    useProfile();

  return (
    <div className={s.profile}>
      {initLoading || !profile ? (
        <SkeletonProfile />
      ) : (
        <ProfileHeader
          profile={profile}
          loading={actionLoading}
          editAvatar={editAvatar}
          editBanner={editBanner}
          editProfile={editProfile}
        />
      )}
    </div>
  );
};

export default Profile;
