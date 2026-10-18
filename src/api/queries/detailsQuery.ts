//one anime details query
export const DETAILS_QUERY = `
  query ($id: Int, $isMain: Boolean) {
    Media(id: $id, type: ANIME) {
      id
      title { romaji english native }
      description
      coverImage { large medium }
      bannerImage
      averageScore
      episodes
      status
      genres
      format
      startDate {year month day}
      endDate {year month day}
      season
      seasonYear
      characters(sort: ROLE, perPage: 9) {
        edges {
          role
          node {
            id
            name{full, native}
            image{large}
            gender
            dateOfBirth {
              month
              day
            }
            age
          }
        }
      }
      relations {
      edges {
        relationType
        node {
          id
          title { romaji english }
          coverImage { large }
          type
          format
          status
          episodes
          averageScore
          }
        }
      }
      recommendations(perPage: 6) {
        nodes {
          mediaRecommendation {
            id
            title {
              romaji
              english
              native
            }
            type
            format
            coverImage {
              large
              medium
            }
            averageScore
            episodes
            genres
          }
        }
      }
      nextAiringEpisode {
        episode
        timeUntilAiring
      }
      duration
      externalLinks {
        url
        color
        site
        type
      }
      trailer {
        site
        id
        thumbnail
      }
      studios(isMain: $isMain) {
        nodes {
          name
        }
      }
      rankings {
        allTime
        rank
        type
        format
        context
        year
        season
      }
    }
  }
`;
