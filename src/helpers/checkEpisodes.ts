export const checkEpisodes = (
  episodes: number | null,
  duration: number | null,
) => {
  const episodesText =
    episodes === null
      ? "Episodes unknown"
      : episodes === 1
        ? "1 episode"
        : `${episodes} episodes`;

  const durationText = duration === null ? null : `${duration} minutes`;

  if (!durationText) return episodesText;

  return `${episodesText} / ${durationText}`;
};
