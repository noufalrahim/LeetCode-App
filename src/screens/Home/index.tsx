import React from 'react';
import {Box, HStack, ScrollView, Spinner, Text} from 'native-base';
import {useColorScheme} from 'react-native';
import Statistics from '../../components/Statistics';
import {COLORS} from '../../../util/AppConstants';
import Chart from '../../components/Chart/PieChart';
import {
  getGlobalData,
  getSiteAnnouncements,
  getUserPublicProfile,
  getLanguageStats,
  getSkillStats,
  getUserContestRankingInfo,
  getUserProblemsSolved,
  getUserBadges,
  getUserProfileCalendar,
  getRecentAcSubmissions,
  getStreakCounter,
  getCurrentTimestamp,
  getQuestionOfToday,
  getCodingChallengeMedal,
  getUserProfileActiveBadge,
} from '../../api';
import HeatMap from '../../components/Chart/HeatMap';

export default function Home() {
  const isDarkMode = useColorScheme() === 'dark';

  const [userData, setUserData] = React.useState({
    totalSolved: 0,
    totalQuestions: 0,
    ranking: 0,
  });

  const [isLoading, setIsLoading] = React.useState(true);

  // const fetchUserInfo = async () => {
  //   setIsLoading(true);
  //   const response = await UserInfo('noufalrahim');
  //   setIsLoading(false);
  //   setUserData(response);
  // };

  const fetchUserInfo = async () => {
    setIsLoading(true);
    const username = 'noufalrahim';
    try{
      const globalData = await getGlobalData();
    console.log('Global Data:', globalData);

    const siteAnnouncements = await getSiteAnnouncements();
    console.log('Site Announcements:', siteAnnouncements);

    const userPublicProfile = await getUserPublicProfile(username);
    console.log('User Public Profile:', userPublicProfile);

    const languageStats = await getLanguageStats(username);
    console.log('Language Stats:', languageStats);

    const skillStats = await getSkillStats(username);
    console.log('Skill Stats:', skillStats);

    const contestRankingInfo = await getUserContestRankingInfo(username);
    console.log('Contest Ranking Info:', contestRankingInfo);

    const problemsSolvedStats = await getUserProblemsSolved(username);
    console.log('Problems Solved Stats:', problemsSolvedStats);

    const userBadges = await getUserBadges('user8162l');
    console.log('User Badges:', userBadges);

    const userProfileCalendar = await getUserProfileCalendar(username, 2023);
    console.log('User Profile Calendar:', userProfileCalendar);

    const recentAcSubmissions = await getRecentAcSubmissions(username, 15);
    console.log('Recent AC Submissions:', recentAcSubmissions);

    const streakCounter = await getStreakCounter();
    console.log('Streak Counter:', streakCounter);

    const currentTimestamp = await getCurrentTimestamp();
    console.log('Current Timestamp:', currentTimestamp);

    const questionOfToday = await getQuestionOfToday();
    console.log('Question of Today:', questionOfToday);

    const codingChallengeMedal = await getCodingChallengeMedal(2023, 7);
    console.log('Coding Challenge Medal:', codingChallengeMedal);

    const userProfileActiveBadge = await getUserProfileActiveBadge(username);
    console.log('User Profile Active Badge:', userProfileActiveBadge);
      // setUserData(response);
    }catch(error){
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchUserInfo();
  }, []);

  return isLoading ? (
    <HStack
      space={2}
      justifyContent="center"
      alignItems="center"
      flex={1}
      bgColor={isDarkMode ? COLORS.dark : COLORS.light}>
      <Spinner color="warning.500" size={'lg'} />
    </HStack>
  ) : (
    <ScrollView
      backgroundColor={isDarkMode ? COLORS.dark : COLORS.light}
      flex={1}>
      <Chart Data={userData} />
      <Box>
        <Text
          fontSize={20}
          textAlign={'center'}
          color={isDarkMode ? COLORS.light : COLORS.dark}>
          {userData.totalSolved} / {userData.totalQuestions}
        </Text>
        <Text
          fontSize={20}
          textAlign={'center'}
          color={isDarkMode ? COLORS.light : COLORS.dark}>
          Rank: {userData.ranking}
        </Text>
      </Box>
      <Statistics Data={userData} />
      <HeatMap Data={userData} />
    </ScrollView>
  );
}
