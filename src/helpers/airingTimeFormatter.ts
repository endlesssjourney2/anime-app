export const airingTimeFormatter = (timeUntilAiring: number) => {
  const days = Math.floor(timeUntilAiring / (60 * 60 * 24));
  const hours = Math.floor((timeUntilAiring % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((timeUntilAiring % 3600) / 60);

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes > 0) {
    return `${minutes}m`;
  }
  return "Airing soon";
};
