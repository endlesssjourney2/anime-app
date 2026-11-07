import { IconCamera } from "@tabler/icons-react";
import type { Profile, UpdateProfilePayload } from "../../../../types/Profile";
import { useRef, type FC } from "react";
import s from "./ProfileHeader.module.css";
import DialogProfile from "../DialogProfile/DialogProfile";
import { toast } from "sonner";

type Props = {
  profile: Profile;
  loading: boolean;
  editProfile: (
    payload: Omit<UpdateProfilePayload, "avatar_url" | "banner_url">,
  ) => Promise<void>;
  editBanner: (file: File) => Promise<void>;
  editAvatar: (file: File) => Promise<void>;
};

const ProfileHeader: FC<Props> = ({
  profile,
  loading,
  editProfile,
  editAvatar,
  editBanner,
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

  return (
    <>
      <div className={s.bannerWrapper}>
        {profile.banner_url ? (
          <img className={s.banner} src={profile.banner_url} alt="" />
        ) : (
          <div className={s.banner} />
        )}

        <button
          type="button"
          className={s.bannerIcon}
          onClick={() => bannerInputRef.current?.click()}
          disabled={loading}
          aria-label="Change banner"
          title="Change banner"
        >
          <IconCamera size={20} stroke={1.8} />
        </button>
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
          {profile.avatar_url ? (
            <img
              className={s.avatar}
              src={profile.avatar_url}
              alt={profile.display_name}
            />
          ) : (
            <div className={s.avatar}>{profile.display_name.charAt(0).toUpperCase()}</div>
          )}

          <button
            type="button"
            className={s.avatarIcon}
            onClick={() => avatarInputRef.current?.click()}
            disabled={loading}
            aria-label="Change avatar"
            title="Change avatar"
          >
            <IconCamera size={18} stroke={1.8} />
          </button>
        </div>
        <div className={s.about}>
          <div className={s.top}>
            <h2 className={s.name}>{profile.display_name}</h2>
            <DialogProfile profile={profile} loading={loading} onSave={editProfile} />
          </div>
          <span className={s.description}>{profile.description ?? "Description"}</span>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
