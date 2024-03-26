import React from 'react';
import {Box} from 'native-base';
import {Dimensions} from 'react-native';
import {ContributionGraph} from 'react-native-chart-kit';
import {COLORS} from '../../../../util/AppConstants';
import {convertToObjectArray} from '../../../../util/TimeStampConverter';

export default function HeatMap({Data}: {Data: object}) {
  const [commitsData, setCommitsData] = React.useState<
    {date: string; count: any}[]
  >([]);
  React.useEffect(() => {
    if (Data !== undefined) {
      const outputArray = convertToObjectArray(Data);
      setCommitsData(outputArray);
    }
  }, [Data]);

  const chartConfig = {
    backgroundGradientFrom: `${COLORS.dark}`,
    backgroundGradientTo: `${COLORS.dark}`,
    color: (opacity = 1) => `rgba(16, 153, 50, ${opacity})`,
  };

  const date = new Date();
  return (
    <Box
      backgroundColor={COLORS.light}
      borderRadius={10}
      justifyContent={'center'}
      marginY={5}>
      <ContributionGraph
        values={commitsData}
        endDate={date}
        numDays={105}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={chartConfig}
      />
    </Box>
  );
}
