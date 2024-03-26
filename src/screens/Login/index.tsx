import React from 'react';
import {
  Box,
  Heading,
  Pressable,
  Input,
  Text,
  VStack,
  Spinner,
  HStack,
} from 'native-base';
import {COLORS} from '../../../util/AppConstants';
import {getUserPublicProfile} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation, handleLogin}: any) {
  const [value, setValue] = React.useState('');
  const [isFound, setIsFound] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleValueChange = async (USERNAME: string) => {
    if (USERNAME === '') {
      setIsFound(false);
    } else {
      setIsLoading(true);
      try {
        console.log('handleValueChange', USERNAME);
        const userPublicProfile = await getUserPublicProfile(USERNAME);
        if (userPublicProfile === null) {
          setIsFound(false);
          return;
        } else {
          setIsFound(true);
          await AsyncStorage.setItem('USERNAME', USERNAME);
          navigation.navigate('Navigation');
          handleLogin(USERNAME);
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }
  };

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
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      bgColor={COLORS.dark}>
      <VStack w="90%" space={5} alignSelf="center" justifyContent={'center'}>
        <Box
          p={3}
          borderRadius={5}
          justifyContent={'center'}
          alignItems={'center'}>
          <Heading color={COLORS.light} size="lg">
            Leetcode
          </Heading>
        </Box>
        <Input
          placeholder="Enter Your Username"
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
        />
        <Pressable
          borderRadius={5}
          bgColor={'#F89F1B'}
          height={50}
          width="100%"
          justifyContent={'center'}
          onPress={() => handleValueChange(value)}>
          <Text fontSize={20} textAlign={'center'} color={COLORS.dark}>
            Login
          </Text>
        </Pressable>
      </VStack>
      {!isFound && !isLoading && (
        <Text
          fontSize={20}
          textAlign={'center'}
          color={COLORS.light}
          marginTop={5}>
          No User Found
        </Text>
      )}
    </Box>
  );
}
