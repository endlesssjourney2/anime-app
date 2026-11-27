import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useProfile from "../../hooks/useProfile";
import s from "./Profile.module.css";
import ProfileHeader from "./components/ProfileHeader/ProfileHeader";
import SkeletonProfile from "./components/SkeletonProfile/SkeletonProfile";
import type { WatchStatus } from "../../types/UserAnime";
import useWatchList from "../../hooks/useWatchList";
import WatchList from "./components/WatchList/WatchList";
import StatusTabs from "./components/StatusTabs/StatusTabs";
import useAnimeList from "../../hooks/useAnimeList";

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

  const [watchStatus, setWatchStatus] = useState<WatchStatus | null>(null);

  const { getWatchStatus } = useAnimeList(watchStatus);

  const { watchList } = useWatchList(watchStatus);

  const { user, loading: authLoading } = useAuth();

  if (authLoading) return <SkeletonProfile />;

  if (!user) return <div className={s.noFound}>No user</div>;

  if (initLoading) return <SkeletonProfile />;

  if (!profile) return <div className={s.noFound}>No profile found</div>;

  return (
    <div className={s.profile}>
      <ProfileHeader
        profile={profile}
        bannerUrl={bannerUrl}
        avatarUrl={avatarUrl}
        actionLoading={actionLoading}
        actions={{ editProfile, editBanner, editAvatar, removeAvatar, removeBanner }}
      />
      <StatusTabs status={watchStatus} onChange={setWatchStatus} />
      <WatchList watchList={watchList} getWatchStatus={getWatchStatus} />
    </div>
  );
};

export default Profile;
