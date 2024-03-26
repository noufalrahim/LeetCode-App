import {Box, Text, ScrollView, HStack, Spinner} from 'native-base';
import {Image} from 'react-native';
import React from 'react';
import Settings from '../../components/Settings';
import {getUserPublicProfile} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../../../util/AppConstants';

export default function About({navigation}: any) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({
    profile: {
      realName: '',
      userAvatar: '',
      ranking: 0,
      skillTags: [],
    },
  });

  const fetchUserInfo = async () => {
    setIsLoading(true);
    const username: any = (await AsyncStorage.getItem('USERNAME')) ?? '';
    try {
      const userPublicProfile = await getUserPublicProfile(username);
      console.log('fetchUserInfo', userPublicProfile);
      setUserData(userPublicProfile);
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
    <ScrollView>
      <Box
        flex={1}
        alignItems={'center'}
        paddingTop={10}
        backgroundColor={'black'}>
        {userData != undefined && userData != null ? (
          <Image
            source={{uri: userData.profile.userAvatar}}
            alt="User Avatar"
            style={{width: 200, height: 200, borderRadius: 100}}
          />
        ) : null}
        <Text fontSize={20} marginTop={5} color={'white'}>
          {userData.profile.realName}
        </Text>
        <Text fontSize={25} color={'white'} marginTop={5}>
          Rank: {userData.profile.ranking}
        </Text>
        <Box marginTop={5} alignItems={'center'}>
          <Text fontSize={15} color={'white'}>
            Skills
          </Text>
          {userData.profile.skillTags.map((skill: string, index: number) => {
            return (
              <Text fontSize={15} key={index} color={'white'}>
                {skill}
              </Text>
            );
          })}
        </Box>
      </Box>
      <Settings navigation={navigation} />
    </ScrollView>
  );
}
