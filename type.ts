// Define common types that might be reused across queries if necessary.
export interface Badge {
    name: string;
    icon: string;
  }
  
  export interface UserProfile {
    contestBadge: {
      name: string;
      expired: boolean;
      hoverText: string;
      icon: string;
    };
    username: string;
    githubUrl: string;
    twitterUrl: string;
    linkedinUrl: string;
    profile: {
      ranking: number;
      userAvatar: string;
      realName: string;
      aboutMe: string;
      school: string;
      websites: string[];
      countryName: string;
      company: string;
      jobTitle: string;
      skillTags: string[];
      postViewCount: number;
      postViewCountDiff: number;
      reputation: number;
      reputationDiff: number;
      solutionCount: number;
      solutionCountDiff: number;
      categoryDiscussCount: number;
      categoryDiscussCountDiff: number;
    };
  }
  
  export interface LanguageStats {
    languageProblemCount: {
      languageName: string;
      problemsSolved: number;
    }[];
  }
  
  export interface SkillStats {
    tagProblemCounts: {
      advanced: {
        tagName: string;
        tagSlug: string;
        problemsSolved: number;
      }[];
      intermediate: {
        tagName: string;
        tagSlug: string;
        problemsSolved: number;
      }[];
      fundamental: {
        tagName: string;
        tagSlug: string;
        problemsSolved: number;
      }[];
    };
  }
  
  export interface ContestRankingInfo {
    userContestRanking: {
      attendedContestsCount: number;
      rating: number;
      globalRanking: number;
      totalParticipants: number;
      topPercentage: number;
      badge: Badge;
    };
    userContestRankingHistory: {
      attended: boolean;
      trendDirection: string;
      problemsSolved: number;
      totalProblems: number;
      finishTimeInSeconds: number;
      rating: number;
      ranking: number;
      contest: {
        title: string;
        startTime: string;
      };
    }[];
  }
  
  export interface ProblemsSolvedStats {
    allQuestionsCount: {
      difficulty: string;
      count: number;
    }[];
    problemsSolvedBeatsStats: {
      difficulty: string;
      percentage: number;
    }[];
    submitStatsGlobal: {
      acSubmissionNum: {
        difficulty: string;
        count: number;
      }[];
    };
  }
  
  export interface BadgesStats {
    badges: {
      id: string;
      name: string;
      shortName: string;
      displayName: string;
      icon: string;
      hoverText: string;
      medal: {
        slug: string;
        config: {
          iconGif: string;
          iconGifBackground: string;
        };
      };
      creationDate: string;
      category: string;
    }[];
    upcomingBadges: {
      name: string;
      icon: string;
      progress: string;
    }[];
  }
  
  export interface UserProfileCalendar {
    userCalendar: {
      activeYears: number[];
      streak: number;
      totalActiveDays: number;
      dccBadges: {
        timestamp: number;
        badge: Badge;
      }[];
      submissionCalendar: string[];
    };
  }
  
  export interface RecentAcSubmissions {
    id: string;
    title: string;
    titleSlug: string;
    timestamp: number;
  }
  
  export interface StreakCounter {
    streakCount: number;
    daysSkipped: number;
    currentDayCompleted: boolean;
  }
  
export interface QuestionOfToday {
    activeDailyCodingChallengeQuestion: {
        date: string;
        userStatus: string;
        link: string;
        question: string;
    };
}
  
  export interface CodingChallengeMedal {
    name: string;
    config: {
      icon: string;
    };
  }
  
  export interface UserProfileActiveBadge {
    activeBadge: {
      displayName: string;
      icon: string;
    };
  }
  
  export interface GlobalData {
    userStatus: {
      userId: string;
      isSignedIn: boolean;
      isMockUser: boolean;
      isPremium: boolean;
      isVerified: boolean;
      username: string;
      avatar: string;
      isAdmin: boolean;
      isSuperuser: boolean;
      permissions: string[];
      isTranslator: boolean;
      activeSessionId: string;
      checkedInToday: boolean;
      notificationStatus: {
        lastModified: string;
        numUnread: number;
      };
    };
  }
  
  export interface SiteAnnouncement {
    siteAnnouncements: {
      title: string;
      content: string;
      blacklistUrls: string[];
      whitelistUrls: string[];
      navbarItem: string;
    };
  }
  
  export interface LanguageStatsQuery {
    matchedUser: LanguageStats;
  }
  
  export interface SkillStatsQuery {
    matchedUser: SkillStats;
  }
  
  export interface UserProblemsSolvedQuery {
    matchedUser: ProblemsSolvedStats;
  }
  
  export interface UserBadgesQuery {
    matchedUser: BadgesStats;
  }
  
  export interface UserProfileCalendarQuery {
    matchedUser: UserProfileCalendar;
  }
  
  export interface RecentAcSubmissionsQuery {
    recentAcSubmissionList: RecentAcSubmissions[];
  }
  
  export interface StreakCounterQuery {
    streakCounter: StreakCounter;
  }
  
  export interface CurrentTimestampQuery {
    currentTimestamp: string;
  }
  
  export interface QuestionOfTodayQuery {
    questionOfToday: QuestionOfToday;
  }
  
  export interface CodingChallengeMedalQuery {
    dailyChallengeMedal: CodingChallengeMedal;
  }
  
  export interface UserProfileActiveBadgeQuery {
    matchedUser: UserProfileActiveBadge;
  }
  