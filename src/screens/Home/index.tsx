import React from 'react';
import {Box, HStack, ScrollView, Spinner, Text} from 'native-base';
import {Linking, Pressable} from 'react-native';
import Statistics from '../../components/Statistics';
import {COLORS} from '../../../util/AppConstants';
import Chart from '../../components/Chart/PieChart';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getUserProblemsSolved,
  getUserProfileCalendar,
  getQuestionOfToday,
} from '../../api';
import HeatMap from '../../components/Chart/HeatMap';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
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

  const [USERNAME, setUSERNAME] = React.useState('');

  React.useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const username = await AsyncStorage.getItem('USERNAME');
        console.log('username', username);
        if (username) {
          setUSERNAME(username);
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkLoggedIn();
    fetchUserInfo();
  }, [USERNAME]);

  const [todaysQn, setTodaysQn] = React.useState({
    activeDailyCodingChallengeQuestion: {
      question: {
        title: '',
        acRate: 0,
      },
      link: '',
    },
  });

  const [userProfileCalendar, setUserProfileCalendar] = React.useState({});

  const [isLoading, setIsLoading] = React.useState(false);

  const fetchUserInfo = async () => {
    setIsLoading(true);
    const username = USERNAME;
    if (username !== '') {
      try {
        const problemsSolvedStats = await getUserProblemsSolved(username);
        setProblemStats(problemsSolvedStats);
        const date = new Date();
        const year = date.getFullYear();
        const userProfileCalendarConst = await getUserProfileCalendar(
          username,
          year,
        );
        const calenderData = JSON.parse(
          userProfileCalendarConst.matchedUser.userCalendar.submissionCalendar,
        );
        setUserProfileCalendar(calenderData);
        const questionOfToday = await getQuestionOfToday();
        setTodaysQn(prev => ({
          ...prev,
          activeDailyCodingChallengeQuestion:
            questionOfToday.activeDailyCodingChallengeQuestion,
        }));
      } catch (error) {
        console.error(error);
      }
    }
    setIsLoading(false);
  };

  return isLoading && USERNAME != '' ? (
    <HStack
      space={2}
      justifyContent="center"
      alignItems="center"
      flex={1}
      bgColor={COLORS.dark}>
      <Spinner color="warning.500" size={'lg'} />
    </HStack>
  ) : (
    <ScrollView backgroundColor={COLORS.dark} flex={1}>
      <Chart
        Data={problemStats.matchedUser.submitStatsGlobal.acSubmissionNum}
        allData={problemStats.allQuestionsCount}
      />
      <Box>
        {problemStats.matchedUser != undefined && (
          <Text fontSize={20} textAlign={'center'} color={COLORS.light}>
            {
              problemStats.matchedUser.submitStatsGlobal.acSubmissionNum[0]
                .count
            }{' '}
            / {problemStats.allQuestionsCount[0].count}
          </Text>
        )}
        <Text fontSize={20} textAlign={'center'} color={COLORS.light} />
      </Box>
      <Statistics
        Data={problemStats.matchedUser.submitStatsGlobal.acSubmissionNum}
        allData={problemStats.allQuestionsCount}
      />
      <HeatMap Data={userProfileCalendar} />
      <Text
        fontSize={20}
        textAlign={'center'}
        marginBottom={3}
        color={COLORS.light}>
        Today's Question
      </Text>
      <Pressable
        onPress={() => {
          Linking.openURL(
            'https://leetcode.com' +
              todaysQn.activeDailyCodingChallengeQuestion.link,
          );
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
          paddingHorizontal: 20,
          marginBottom: 30,
        }}>
        <Text fontSize={16} textAlign={'center'} color={COLORS.light}>
          {todaysQn.activeDailyCodingChallengeQuestion.question.title}
        </Text>
        <Box flexDirection="row" alignItems="center">
          <Icons name="check-circle-outline" size={30} color={'green'} />
          <Text
            fontSize={16}
            textAlign={'center'}
            color={COLORS.light}
            marginLeft={2}>
            {todaysQn.activeDailyCodingChallengeQuestion.question.acRate.toFixed(
              2,
            )}
            %
          </Text>
        </Box>
      </Pressable>
    </ScrollView>
  );
}
