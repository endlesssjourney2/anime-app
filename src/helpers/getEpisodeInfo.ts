export const getEpisodeInfo = (
  episodes: number | null,
  duration: number | null,
) => {
  const episodesText =
    episodes === null
      ? "Unknown episodes"
      : episodes === 1
        ? "1 episode"
        : `${episodes} episodes`;

  const durationText =
    duration === null ? "Unknown duration" : `${duration} minutes`;

  return { episodesText, durationText };
};
