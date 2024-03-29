import React from 'react';
import { Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Box } from 'native-base';

const PieChartExample = ({Data}: any) => {

  console.log("Data in PieChartExample: ");
  console.log(Data);

  const [population, setPopulation] = React.useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });

  React.useEffect(() => {
    if(Data.status === "success") {
      setPopulation({
        easy: (Data.easySolved / Data.totalEasy) * 100,
        medium: (Data.mediumSolved / Data.totalMedium) * 100,
        hard: (Data.hardSolved / Data.totalHard) * 100,
      });
    }
  }, [Data]);


  const data = [
    {
      name: 'Easy',
      population: population.easy,
      color: '#04AF9F',
      legendFontColor: 'white',
      legendFontSize: 15,
    },
    {
      name: 'Medium',
      population: population.medium,
      color: '#DAB71F',
      legendFontColor: 'white',
      legendFontSize: 15,
    },
    {
      name: 'Hard',
      population: population.hard,
      color: '#E13658',
      legendFontColor: 'white',
      legendFontSize: 15,
    },
  ];

  return (
    <Box
      justifyContent="center"
      marginY={5}
    >
      <PieChart
        data={data}
        width={Dimensions.get('window').width}
        height={Dimensions.get('window').height / 4}
        chartConfig={{
          backgroundGradientFrom: '#F89F1B',
          backgroundGradientTo: '#F89F1B',
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        hasLegend={false}
        center={[Dimensions.get('window').width / 4, 10]}
        absolute
      />
    </Box>
  );
};

export default PieChartExample;
