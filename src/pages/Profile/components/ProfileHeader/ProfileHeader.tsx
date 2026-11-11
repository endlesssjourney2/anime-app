import type { Profile, UpdateProfilePayload } from "../../../../types/Profile";
import { useRef, type FC } from "react";
import s from "./ProfileHeader.module.css";
import DialogProfile from "../DialogProfile/DialogProfile";
import { toast } from "sonner";
import ProfileImageDropdown from "../ProfileImageDropdown/ProfileImageDropdown";
import { IconAt, IconCopy } from "@tabler/icons-react";

type ProfileActions = {
  editProfile: (
    payload: Omit<UpdateProfilePayload, "avatar_path" | "banner_path">,
  ) => Promise<void>;
  editBanner: (file: File) => Promise<void>;
  editAvatar: (file: File) => Promise<void>;
  removeAvatar: () => Promise<void>;
  removeBanner: () => Promise<void>;
};

type Props = {
  profile: Profile;
  actionLoading?: boolean;
  actions?: ProfileActions;
  bannerUrl: string | null;
  avatarUrl: string | null;
};

const ProfileHeader: FC<Props> = ({
  profile,
  actionLoading,
  bannerUrl,
  avatarUrl,
  actions,
}) => {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !actions) return;

    try {
      await actions.editAvatar(file);
      toast.success("Avatar updated successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update avatar");
    } finally {
      e.target.value = "";
    }
  };

  const handleEditBanner = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !actions) return;

    try {
      await actions.editBanner(file);
      toast.success("Banner updated successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update banner");
    } finally {
      e.target.value = "";
    }
  };

  const handleRemoveAvatar = async () => {
    if (!actions) return;

    try {
      await actions.removeAvatar();
      toast.success("Avatar removed successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to remove avatar");
    }
  };

  const handleRemoveBanner = async () => {
    if (!actions) return;

    try {
      await actions.removeBanner();
      toast.success("Banner removed successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to remove banner");
    }
  };

  const handleCopyUsername = async (username: string) => {
    try {
      await navigator.clipboard.writeText(username);
      toast.success("Username copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy the username");
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
        {actions && (
          <div className={s.bannerIcon}>
            <ProfileImageDropdown
              changeImage={() => bannerInputRef.current?.click()}
              removeImage={handleRemoveBanner}
              hasImage={Boolean(bannerUrl)}
              loading={actionLoading}
            />
          </div>
        )}
      </div>

      {actions && (
        <>
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
        </>
      )}
      <div className={s.profileInfo}>
        <div className={s.avatarInfo}>
          {avatarUrl ? (
            <img className={s.avatar} src={avatarUrl} alt={profile.display_name} />
          ) : (
            <div className={s.noAvatar}>
              {profile.display_name.charAt(0).toUpperCase()}
            </div>
          )}
          {actions && (
            <div className={s.avatarIcon}>
              <ProfileImageDropdown
                changeImage={() => avatarInputRef.current?.click()}
                removeImage={handleRemoveAvatar}
                hasImage={Boolean(avatarUrl)}
                loading={actionLoading}
              />
            </div>
          )}
        </div>
        <div className={s.about}>
          <div className={s.top}>
            <div className={s.nameInfo}>
              <h2 className={s.name}>{profile.display_name}</h2>
              <div className={s.usernameCont}>
                <div className={s.usernameWrapper}>
                  <IconAt size={14} className={s.atIcon} />
                  <span className={s.username}>{profile.username}</span>
                </div>
                <button
                  type="button"
                  className={s.copyBtn}
                  onClick={() => handleCopyUsername(profile.username)}
                >
                  <IconCopy size={16} />
                </button>
              </div>
            </div>
            {actions && (
              <DialogProfile
                profile={profile}
                loading={actionLoading}
                onSave={actions.editProfile}
              />
            )}
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
