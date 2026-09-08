export const checkEpisodes = (episodes: number | null) => {
  if (episodes === 1) {
    return "1 episode";
  }

  if (episodes === null) {
    return "Episodes unknown";
  }

  return `${episodes} episodes`;
};
