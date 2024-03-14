import React from 'react';
import { Box, HStack, Icon, ScrollView, Spinner, Text } from 'native-base';
import { Linking, Pressable, useColorScheme } from 'react-native';
import Statistics from '../../components/Statistics';
import { COLORS } from '../../../util/AppConstants';
import Chart from '../../components/Chart/PieChart';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
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

export default function Home({ route }: { route: any }) {
  const isDarkMode = useColorScheme() === 'dark';
  const [problemStats, setProblemStats] = React.useState({
    matchedUser: {
      submitStatsGlobal: {
        acSubmissionNum: [
          {
            count: 0,
          },
        ],
      },
    },
    allQuestionsCount: [
      {
        count: 0,
      },
    ],
  });
  const [todaysQn, setTodaysQn] = React.useState({
    activeDailyCodingChallengeQuestion: {
      question: {
        title: '',
        acRate: 0,
      },
      link: ''
    }
  });

  const [userProfileCalendar, setUserProfileCalendar] = React.useState({
    submissionCalender: {}
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const fetchUserInfo = async () => {
    setIsLoading(true);
    const username = 'noufalrahim';
    try {
      const problemsSolvedStats = await getUserProblemsSolved(username);
      setProblemStats(problemsSolvedStats);
      const userProfileCalendar = await getUserProfileCalendar(username, 2023);
      setUserProfileCalendar(userProfileCalendar.matchedUser.userCalendar.submissionCalendar);

      const questionOfToday = await getQuestionOfToday();
      setTodaysQn((prev) => ({
        ...prev,
        activeDailyCodingChallengeQuestion: questionOfToday.activeDailyCodingChallengeQuestion
      }));
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
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
      <Chart Data={problemStats.matchedUser.submitStatsGlobal.acSubmissionNum} allData={problemStats.allQuestionsCount}/>
      <Box>
        {
          problemStats.matchedUser != undefined && (
            <Text
              fontSize={20}
              textAlign={'center'}
              color={isDarkMode ? COLORS.light : COLORS.dark}>
              {problemStats.matchedUser.submitStatsGlobal.acSubmissionNum[0].count} / {problemStats.allQuestionsCount[0].count}
            </Text>
          )
        }
        <Text
          fontSize={20}
          textAlign={'center'}
          color={isDarkMode ? COLORS.light : COLORS.dark}>
        </Text>
      </Box>
       <Statistics Data={problemStats.matchedUser.submitStatsGlobal.acSubmissionNum} allData={problemStats.allQuestionsCount} />
      <HeatMap Data={userProfileCalendar} /> 
      <Text
        fontSize={20}
        textAlign={'center'}
        marginBottom={3}
        color={isDarkMode ? COLORS.light : COLORS.dark}
      >
        Today's Question
      </Text>
      <Pressable
      onPress={() => {
        Linking.openURL('https://leetcode.com'+todaysQn.activeDailyCodingChallengeQuestion.link)
      }}
      style={{
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 70,
        alignItems: 'center',
        paddingHorizontal: 20
      }}
      >
      <Text
        fontSize={16}
        textAlign={'center'}
        color={COLORS.light} 
      >
        {todaysQn.activeDailyCodingChallengeQuestion.question.title}
      </Text>
      <Box
      flexDirection="row"
      alignItems="center"
      >
      <Icons name="check-circle-outline" size={30} color={'green'} />
      <Text
        fontSize={16}
        textAlign={'center'}
        color={COLORS.light}
        marginLeft={2}
      >
        {todaysQn.activeDailyCodingChallengeQuestion.question.acRate.toFixed(2)}%
      </Text>
      </Box>
      </Pressable>

    </ScrollView>
  );
}
