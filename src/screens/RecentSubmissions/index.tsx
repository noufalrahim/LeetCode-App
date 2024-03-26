import {View} from 'react-native';
import React from 'react';
import {HStack, ScrollView, Spinner, Text} from 'native-base';
import {getRecentAcSubmissions} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, RECENTPROBLEMSCOUNT} from '../../../util/AppConstants';

export default function RecentSubScreen() {
  const [data, setData] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchUserInfo = async () => {
    setIsLoading(true);
    const username: any = (await AsyncStorage.getItem('USERNAME')) ?? '';
    try {
      const recentAcSubmissions = await getRecentAcSubmissions(
        username,
        RECENTPROBLEMSCOUNT,
      );
      setData(recentAcSubmissions.recentAcSubmissionList);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchUserInfo();
  }, []);

  if (isLoading) {
    return (
      <HStack
        space={2}
        justifyContent="center"
        alignItems="center"
        flex={1}
        bgColor={COLORS.dark}>
        <Spinner color="warning.500" size={'lg'} />
      </HStack>
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{backgroundColor: COLORS.dark}}>
      {data != undefined &&
        data.map((sub: any, index: number) => {
          return (
            <View
              key={index}
              style={{
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: 'white',
                borderBottomWidth: 0.2,
                backgroundColor: index % 2 == 0 ? '#2A2A2A' : '#383838',
                paddingHorizontal: 10,
              }}>
              <Text color={'white'} fontSize={15} textAlign={'center'}>
                {sub.title}
              </Text>
            </View>
          );
        })}
    </ScrollView>
  );
}
