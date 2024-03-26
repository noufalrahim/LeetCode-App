import {Box, Progress, Text} from 'native-base';
import React from 'react';
import {COLORS} from '../../../util/AppConstants';

export default function Statistics({Data, allData}: any) {
  const [statistics, setStatistics] = React.useState({
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    totalEasy: 0,
    totalMedium: 0,
    totalHard: 0,
  });

  const [percentage, setPercentage] = React.useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });

  React.useEffect(() => {
    if (Data[1] != undefined && Data.length > 0 && allData.length > 0) {
      setStatistics({
        easySolved: Data[1].count,
        mediumSolved: Data[2].count,
        hardSolved: Data[3].count,
        totalEasy: allData[1].count,
        totalMedium: allData[2].count,
        totalHard: allData[3].count,
      });

      setPercentage({
        easy: (Data[1].count / allData[1].count) * 100,
        medium: (Data[2].count / allData[2].count) * 100,
        hard: (Data[3].count / allData[3].count) * 100,
      });
    }
  }, [Data]);

  return (
    <Box justifyContent={'center'}>
      <Box backgroundColor={COLORS.dark} margin={5} borderRadius={10}>
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Text
            fontSize={20}
            textAlign={'left'}
            color={COLORS.light}
            marginBottom={2}>
            Easy
          </Text>
          <Text
            fontSize={20}
            textAlign={'right'}
            color={COLORS.light}
            marginBottom={2}>
            {statistics.easySolved}/{statistics.totalEasy}
          </Text>
        </Box>
        <Progress value={percentage.easy} colorScheme="emerald" />
      </Box>
      <Box backgroundColor={COLORS.dark} margin={5} borderRadius={10}>
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Text
            fontSize={20}
            textAlign={'left'}
            color={COLORS.light}
            marginBottom={2}>
            Medium
          </Text>
          <Text
            fontSize={20}
            textAlign={'right'}
            color={COLORS.light}
            marginBottom={2}>
            {statistics.mediumSolved}/{statistics.totalMedium}
          </Text>
        </Box>
        <Progress value={percentage.medium} colorScheme="warning" />
      </Box>
      <Box backgroundColor={COLORS.dark} margin={5} borderRadius={10}>
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Text
            fontSize={20}
            textAlign={'left'}
            color={COLORS.light}
            marginBottom={2}>
            Hard
          </Text>
          <Text
            fontSize={20}
            textAlign={'right'}
            color={COLORS.light}
            marginBottom={2}>
            {statistics.hardSolved}/{statistics.totalHard}
          </Text>
        </Box>
        <Progress value={percentage.hard} colorScheme="secondary" />
      </Box>
    </Box>
  );
}
