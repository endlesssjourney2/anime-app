import type { FC } from "react";
import s from "./CharacterDescription.module.css";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

type Props = {
  description: string | null;
};

const CharacterDescription: FC<Props> = ({ description }) => {
  return (
    <div className={s.description}>
      <ReactMarkdown
        components={{
          a: ({ href, children }) => {
            const match = href?.match(
              /^https?:\/\/(?:www\.)?anilist\.co\/(character|anime)\/(\d+)(?:\/|$|[?#])/,
            );

            if (match) {
              const [, type, id] = match;

              return <Link to={`/${type}/${id}`}>{children}</Link>;
            }

            return (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );
          },
        }}
      >
        {description}
      </ReactMarkdown>
    </div>
  );
};

export default CharacterDescription;
