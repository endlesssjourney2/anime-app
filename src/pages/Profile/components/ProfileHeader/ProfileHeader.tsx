import type { Profile, UpdateProfilePayload } from "../../../../types/Profile";
import { useRef, type FC } from "react";
import s from "./ProfileHeader.module.css";
import DialogProfile from "../DialogProfile/DialogProfile";
import { toast } from "sonner";
import ProfileImageDropdown from "../ProfileImageDropdown/ProfileImageDropdown";

type Props = {
  profile: Profile;
  loading: boolean;
  editProfile: (
    payload: Omit<UpdateProfilePayload, "avatar_path" | "banner_path">,
  ) => Promise<void>;
  editBanner: (file: File) => Promise<void>;
  editAvatar: (file: File) => Promise<void>;
  bannerUrl: string | null;
  avatarUrl: string | null;
  removeAvatar: () => Promise<void>;
  removeBanner: () => Promise<void>;
};

const ProfileHeader: FC<Props> = ({
  profile,
  loading,
  editProfile,
  editAvatar,
  editBanner,
  bannerUrl,
  avatarUrl,
  removeAvatar,
  removeBanner,
}) => {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await editAvatar(file);
      toast.success("Avatar updated successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update avatar");
    } finally {
      e.target.value = "";
    }
  };

  const handleEditBanner = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await editBanner(file);
      toast.success("Banner updated successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update banner");
    } finally {
      e.target.value = "";
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      await removeAvatar();
      toast.success("Avatar removed successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to remove avatar");
    }
  };

  const handleRemoveBanner = async () => {
    try {
      await removeBanner();
      toast.success("Banner removed successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to remove banner");
    }
  };

  return (
    <>
      <div className={s.bannerWrapper}>
        {bannerUrl ? (
          <img className={s.banner} src={bannerUrl} alt="" />
        ) : (
          <div className={s.banner} />
        )}
        <div className={s.bannerIcon}>
          <ProfileImageDropdown
            changeImage={() => bannerInputRef.current?.click()}
            removeImage={handleRemoveBanner}
            hasImage={Boolean(bannerUrl)}
            loading={loading}
          />
        </div>
      </div>

      <input
        ref={avatarInputRef}
        style={{ display: "none" }}
        onChange={handleAvatarChange}
        type="file"
        accept=".jpeg, .jpg, .png, .webp"
      />
      <input
        ref={bannerInputRef}
        style={{ display: "none" }}
        onChange={handleEditBanner}
        type="file"
        accept=".jpeg, .jpg, .png, .webp"
      />
      <div className={s.profileInfo}>
        <div className={s.avatarInfo}>
          {avatarUrl ? (
            <img className={s.avatar} src={avatarUrl} alt={profile.display_name} />
          ) : (
            <div className={s.avatar}>{profile.display_name.charAt(0).toUpperCase()}</div>
          )}

          <div className={s.avatarIcon}>
            <ProfileImageDropdown
              changeImage={() => avatarInputRef.current?.click()}
              removeImage={handleRemoveAvatar}
              hasImage={Boolean(avatarUrl)}
              loading={loading}
            />
          </div>
        </div>
        <div className={s.about}>
          <div className={s.top}>
            <h2 className={s.name}>{profile.display_name}</h2>
            <DialogProfile profile={profile} loading={loading} onSave={editProfile} />
          </div>
          <span className={s.description}>
            {profile.description?.trim() || "No description yet"}
          </span>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
