import React from 'react';
import {
  Box,
  HStack,
  Input,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import {COLORS, RECENTPROBLEMSCOUNTSEARCH} from '../../../util/AppConstants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Statistics from '../../components/Statistics';
import RecentSubScreen from '../RecentSubmissions';
import {Pressable} from 'react-native';
import {
  getRecentAcSubmissions,
  getUserProblemsSolved,
  getUserPublicProfile,
} from '../../api';

export default function Search() {
  const [value, setValue] = React.useState('');
  const [isFetched, setIsFetched] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [data, setData] = React.useState({
    About: {},
    recentSubmission: {},
    problemSolved: {},
    submissionCalender: {},
  });
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
  const handleValueChange = (USERNAME: string) => {
    console.log('handleValueChange', USERNAME);
    fetchUserInfo(USERNAME);
    setIsFetched(true);
  };

  const fetchUserInfo = async (USERNAME: string) => {
    const username = USERNAME;
    setIsLoading(true);
    try {
      const userPublicProfile = await getUserPublicProfile(username);
      if (userPublicProfile === null) {
        setIsLoading(false);
        setIsFetched(false);
        return;
      }
      setData(prev => ({...prev, About: userPublicProfile}));
      const recentAcSubmissions = await getRecentAcSubmissions(
        username,
        RECENTPROBLEMSCOUNTSEARCH,
      );
      setData(prev => ({...prev, recentSubmission: recentAcSubmissions}));
      const problemsSolvedStats = await getUserProblemsSolved(username);
      setProblemStats(problemsSolvedStats);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <Box backgroundColor={COLORS.dark} flex={1}>
      <VStack
        w="90%"
        marginY={5}
        space={5}
        alignSelf="center"
        justifyContent={'center'}>
        <Input
          placeholder="Search Username"
          width="100%"
          borderRadius="4"
          fontSize={15}
          py="3"
          px="5"
          placeholderTextColor={COLORS.dark}
          bgColor={COLORS.light}
          value={value}
          onChange={e => setValue(e.nativeEvent.text)}
          color={COLORS.dark}
          _focus={{borderColor: COLORS.light, borderWidth: 1}}
          InputRightElement={
            <Pressable onPress={() => handleValueChange(value)}>
              <Icon
                name="search"
                size={20}
                color={COLORS.dark}
                marginRight={5}
              />
            </Pressable>
          }
        />
      </VStack>
      {!isFetched && !isLoading ? (
        <HStack
          space={2}
          justifyContent="center"
          alignItems="center"
          flex={1}
          bgColor={COLORS.dark}>
          <Text fontSize={20} textAlign={'center'} color={COLORS.light}>
            No User Found
          </Text>
        </HStack>
      ) : isLoading ? (
        <HStack
          space={2}
          justifyContent="center"
          alignItems="center"
          flex={1}
          bgColor={COLORS.dark}>
          <Spinner color="warning.500" size={'lg'} />
        </HStack>
      ) : (
        <VStack space={5} w="100%" alignSelf="center" justifyContent={'center'}>
          {isFetched && !isLoading && (
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              marginBottom={100}>
              <Box marginTop={10}>
                <Text fontSize={20} textAlign={'center'} color={COLORS.light}>
                  {data.About.profile.realName}
                </Text>
              </Box>
              {problemStats.matchedUser != undefined && (
                <Text
                  fontSize={20}
                  marginTop={5}
                  textAlign={'center'}
                  color={COLORS.light}>
                  {
                    problemStats.matchedUser.submitStatsGlobal
                      .acSubmissionNum[0].count
                  }{' '}
                  / {problemStats.allQuestionsCount[0].count}
                </Text>
              )}
              <Box w="100%" bgColor={COLORS.dark} borderRadius={10} p={5}>
                <Text fontSize={20} textAlign={'center'} color={COLORS.light}>
                  Statistics
                </Text>
                <Statistics
                  Data={
                    problemStats.matchedUser.submitStatsGlobal.acSubmissionNum
                  }
                  allData={problemStats.allQuestionsCount}
                />
              </Box>
              <Box w="100%" bgColor={COLORS.dark} borderRadius={10} p={5}>
                <Text
                  fontSize={20}
                  textAlign={'center'}
                  color={COLORS.light}
                  marginBottom={10}>
                  Recent Submissions
                </Text>
                <RecentSubScreen
                  route={{
                    params: {
                      recentAcSubmissionList:
                        data.recentSubmission.recentAcSubmissionList,
                    },
                  }}
                />
              </Box>
            </ScrollView>
          )}
        </VStack>
      )}
    </Box>
  );
}
