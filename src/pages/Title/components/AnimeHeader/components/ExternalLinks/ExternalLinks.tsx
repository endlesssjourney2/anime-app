import type { ComponentType, FC } from "react";
import s from "./ExternalLinks.module.css";
import {
  SiCrunchyroll,
  SiInstagram,
  SiNetflix,
  SiTiktok,
  SiX,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import type { AniListExternalLink } from "../../../../../../types/AniList";
import { filterExternalLinks } from "../../../../../../helpers/filterExternalLinks";
import { IconWorld } from "@tabler/icons-react";

type Props = {
  externalLinks: AniListExternalLink[];
};

const siteIconMap: Record<
  string,
  ComponentType<{ size?: number; color?: string }>
> = {
  //something will be added 99%
  Crunchyroll: SiCrunchyroll,
  Netflix: SiNetflix,
  Twitter: SiX,
  YouTube: SiYoutube,
  Instagram: SiInstagram,
  TikTok: SiTiktok,
};

const ExternalLinks: FC<Props> = ({ externalLinks }) => {
  const links = filterExternalLinks(externalLinks ?? []);

  return (
    <div className={s.externalLinks}>
      {links.map((l) => {
        const Icon = siteIconMap[l.site] ?? IconWorld;
        return (
          <div className={s.linkContainer}>
            <a
              key={l.url}
              href={l.url}
              target="blank"
              rel="noopener noreferrer"
              className={s.linkIcon}
              title={l.site}
            >
              <Icon color={l.color ?? "#a8a5c4"} size={28} />
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default ExternalLinks;
