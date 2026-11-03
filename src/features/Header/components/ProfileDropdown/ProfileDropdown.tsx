import s from "./ProfileDropdown.module.css";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import type { Profile } from "../../../../types/Profile";
import { IconLogout, IconUser } from "@tabler/icons-react";

type Props = {
  handleLogout: () => Promise<void>;
  profile: Profile;
};

const ProfileDropdown: FC<Props> = ({ handleLogout, profile }) => {
  const firstProfileLetter = profile?.display_name
    ? profile.display_name.charAt(0).toUpperCase()
    : "";

  const navigate = useNavigate();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button type="button" className={s.trigger} aria-label="Profile menu">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="" className={s.avatar} />
          ) : (
            <span>{firstProfileLetter}</span>
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.content} align="end" sideOffset={8}>
          <DropdownMenu.Item className={s.item} onSelect={() => navigate("profile")}>
            <IconUser size={17} />
            My profile
          </DropdownMenu.Item>

          <DropdownMenu.Separator className={s.separator} />

          <DropdownMenu.Item
            className={`${s.item} ${s.logout}`}
            onSelect={() => handleLogout()}
          >
            <IconLogout size={17} />
            Log out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ProfileDropdown;
