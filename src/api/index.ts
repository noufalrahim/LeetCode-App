import axios from 'axios';
import {
  GlobalData,
  SiteAnnouncement,
  UserProfile,
  LanguageStatsQuery,
  SkillStatsQuery,
  ContestRankingInfo,
  UserProblemsSolvedQuery,
  UserBadgesQuery,
  UserProfileCalendarQuery,
  RecentAcSubmissionsQuery,
  StreakCounterQuery,
  CurrentTimestampQuery,
  QuestionOfTodayQuery,
  CodingChallengeMedalQuery,
  UserProfileActiveBadgeQuery,
} from '../../type';

const leetCodeApiUrl = 'https://leetcode.com/graphql';

export async function getGlobalData(): Promise<GlobalData> {
  const query = `
    query globalData {
      userStatus {
        userId
        isSignedIn
        isMockUser
        isPremium
        isVerified
        username
        avatar
        isAdmin
        isSuperuser
        permissions
        isTranslator
        activeSessionId
        checkedInToday
        notificationStatus {
          lastModified
          numUnread
        }
      }
    }
  `;

  const response = await axios.post(leetCodeApiUrl, {query});
  return response.data.data as GlobalData;
}

export async function getSiteAnnouncements(): Promise<SiteAnnouncement> {
  const query = `
    query siteAnnouncements {
      siteAnnouncements {
        title
        content
        blacklistUrls
        whitelistUrls
        navbarItem
      }
    }
  `;

  const response = await axios.post(leetCodeApiUrl, {query});
  return response.data.data as SiteAnnouncement;
}

export async function getUserPublicProfile(
  username: string,
): Promise<UserProfile> {
  const query = `
    query userPublicProfile($username: String!) {
      matchedUser(username: $username) {
        contestBadge {
          name
          expired
          hoverText
          icon
        }
        username
        githubUrl
        twitterUrl
        linkedinUrl
        profile {
          ranking
          userAvatar
          realName
          aboutMe
          school
          websites
          countryName
          company
          jobTitle
          skillTags
          postViewCount
          postViewCountDiff
          reputation
          reputationDiff
          solutionCount
          solutionCountDiff
          categoryDiscussCount
          categoryDiscussCountDiff
        }
      }
    }
  `;

  const variables = {username};

  const response = await axios.post(leetCodeApiUrl, {query, variables});
  return response.data.data.matchedUser as UserProfile;
}

export async function getLanguageStats(
  username: string,
): Promise<LanguageStatsQuery> {
  const query = `
    query languageStats($username: String!) {
      matchedUser(username: $username) {
        languageProblemCount {
          languageName
          problemsSolved
        }
      }
    }
  `;

  const variables = {username};

  const response = await axios.post(leetCodeApiUrl, {query, variables});
  return response.data.data as LanguageStatsQuery;
}

export async function getSkillStats(
  username: string,
): Promise<SkillStatsQuery> {
  const query = `
    query skillStats($username: String!) {
      matchedUser(username: $username) {
        tagProblemCounts {
          advanced {
            tagName
            tagSlug
            problemsSolved
          }
          intermediate {
            tagName
            tagSlug
            problemsSolved
          }
          fundamental {
            tagName
            tagSlug
            problemsSolved
          }
        }
      }
    }
  `;

  const variables = {username};

  const response = await axios.post(leetCodeApiUrl, {query, variables});
  return response.data.data as SkillStatsQuery;
}

export async function getUserContestRankingInfo(
  username: string,
): Promise<ContestRankingInfo> {
  const query = `
    query userContestRankingInfo($username: String!) {
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
        badge {
          name
        }
      }
      userContestRankingHistory(username: $username) {
        attended
        trendDirection
        problemsSolved
        totalProblems
        finishTimeInSeconds
        rating
        ranking
        contest {
          title
          startTime
        }
      }
    }
  `;

  const variables = {username};

  const response = await axios.post(leetCodeApiUrl, {query, variables});
  return response.data.data as ContestRankingInfo;
}

export async function getUserProblemsSolved(
  username: string,
): Promise<UserProblemsSolvedQuery> {
  const query = `
    query userProblemsSolved($username: String!) {
      allQuestionsCount {
        difficulty
        count
      }
      matchedUser(username: $username) {
        problemsSolvedBeatsStats {
          difficulty
          percentage
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;

  const variables = {username};

  const response = await axios.post(leetCodeApiUrl, {query, variables});
  return response.data.data as UserProblemsSolvedQuery;
}

export async function getUserBadges(
  username: string,
): Promise<UserBadgesQuery> {
  const query = `
    query userBadges($username: String!) {
      matchedUser(username: $username) {
        badges {
          id
          name
          shortName
          displayName
          icon
          hoverText
          medal {
            slug
            config {
              iconGif
              iconGifBackground
            }
          }
          creationDate
          category
        }
        upcomingBadges {
          name
          icon
          progress
        }
      }
    }
  `;

  const variables = {username};

  const response = await axios.post(leetCodeApiUrl, {query, variables});
  return response.data.data as UserBadgesQuery;
}

export async function getUserProfileCalendar(
  username: string,
  year: number,
): Promise<UserProfileCalendarQuery> {
  const query = `
    query userProfileCalendar($username: String!, $year: Int) {
      matchedUser(username: $username) {
        userCalendar(year: $year) {
          activeYears
          streak
          totalActiveDays
          dccBadges {
            timestamp
            badge {
              name
              icon
            }
          }
          submissionCalendar
        }
      }
    }
  `;

  const variables = {username, year};

  const response = await axios.post(leetCodeApiUrl, {query, variables});
  return response.data.data as UserProfileCalendarQuery;
}

export async function getRecentAcSubmissions(
  username: string,
  limit: number,
): Promise<RecentAcSubmissionsQuery> {
  const query = `
    query recentAcSubmissions($username: String!, $limit: Int!) {
      recentAcSubmissionList(username: $username, limit: $limit) {
        id
        title
        titleSlug
        timestamp
      }
    }
  `;

  const variables = {username, limit};

  const response = await axios.post(leetCodeApiUrl, {query, variables});
  return response.data.data as RecentAcSubmissionsQuery;
}

export async function getStreakCounter(): Promise<StreakCounterQuery> {
  const query = `
    query getStreakCounter {
      streakCounter {
        streakCount
        daysSkipped
        currentDayCompleted
      }
    }
  `;

  const response = await axios.post(leetCodeApiUrl, {query});
  return response.data.data as StreakCounterQuery;
}

export async function getCurrentTimestamp(): Promise<CurrentTimestampQuery> {
  const query = `
    query currentTimestamp {
      currentTimestamp
    }
  `;

  const response = await axios.post(leetCodeApiUrl, {query});
  return response.data.data as CurrentTimestampQuery;
}

export async function getQuestionOfToday(): Promise<QuestionOfTodayQuery> {
  const query = `
    query questionOfToday {
      activeDailyCodingChallengeQuestion {
        date
        userStatus
        link
        question {
          acRate
          difficulty
          freqBar
          frontendQuestionId: questionFrontendId
          isFavor
          paidOnly: isPaidOnly
          status
          title
          titleSlug
          hasVideoSolution
          hasSolution
          topicTags {
            name
            id
            slug
          }
        }
      }
    }
  `;

  const response = await axios.post(leetCodeApiUrl, {query});
  return response.data.data as QuestionOfTodayQuery;
}

export async function getCodingChallengeMedal(
  year: number,
  month: number,
): Promise<CodingChallengeMedalQuery> {
  const query = `
    query codingChallengeMedal($year: Int!, $month: Int!) {
      dailyChallengeMedal(year: $year, month: $month) {
        name
        config {
          icon
        }
      }
    }
  `;

  const variables = {year, month};

  const response = await axios.post(leetCodeApiUrl, {query, variables});
  return response.data.data as CodingChallengeMedalQuery;
}

export async function getUserProfileActiveBadge(
  username: string,
): Promise<UserProfileActiveBadgeQuery> {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        activeBadge {
          displayName
          icon
        }
      }
    }
  `;

  const variables = {username};

  const response = await axios.post(leetCodeApiUrl, {query, variables});
  return response.data.data as UserProfileActiveBadgeQuery;
}
