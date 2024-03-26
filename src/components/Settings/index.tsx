import React from 'react';
import {Box, Text} from 'native-base';
import {settingsTiles} from '../../../util/AppConstants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Alert, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings({navigation}: {navigation: any}) {
  return (
    <Box flex={1} paddingTop={10} backgroundColor={'black'} paddingBottom={10}>
      <Text
        fontSize={25}
        color={'white'}
        textAlign={'center'}
        marginBottom={10}>
        Settings
      </Text>
      {settingsTiles.map((tile: any, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 15,
              margin: 10,
              backgroundColor: '#2A2A2A',
              borderRadius: 10,
            }}
            onPress={() => {
              if (tile.title === 'Logout') {
                Alert.alert('Logout', 'Are you sure you want to logout?', [
                  {
                    text: 'No',
                    onPress: () => console.log('Cancel Logout'),
                  },
                  {
                    text: 'Yes',
                    onPress: () => {
                      AsyncStorage.removeItem('USERNAME');

                      navigation.reset({
                        index: 0,
                        routes: [{name: 'Login'}],
                      });
                      navigation.navigate('Login');
                    },
                  },
                ]);
              } else {
                tile.onPress();
              }
            }}
            activeOpacity={0.7}>
            <Text fontSize={20} color={'white'}>
              {tile.title}
            </Text>
            <Icon name={tile.icon} size={25} color={'white'} />
          </TouchableOpacity>
        );
      })}
    </Box>
  );
}
