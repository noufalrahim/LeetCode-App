import React from 'react';
import {Box, HStack, ScrollView, Spinner, Text} from 'native-base';
import {useColorScheme} from 'react-native';
import Statistics from '../../components/Statistics';
import {COLORS} from '../../../util/AppConstants';
import Chart from '../../components/Chart/PieChart';
import UserInfo from '../../api';
import HeatMap from '../../components/Chart/HeatMap';

export default function Home() {
  const isDarkMode = useColorScheme() === 'dark';

  const [userData, setUserData] = React.useState({
    totalSolved: 0,
    totalQuestions: 0,
    ranking: 0,
  });

  const [isLoading, setIsLoading] = React.useState(true);

  const fetchUserInfo = async () => {
    setIsLoading(true);
    const response = await UserInfo('noufalrahim');
    setIsLoading(false);
    setUserData(response);
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
