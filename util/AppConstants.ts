import {Alert, Linking} from 'react-native';

export const CONSTANTS = {
  APP_NAME: 'LeetCode',
  APP_VERSION: '1.0.0',
  APP_DESCRIPTION:
    'LeetCode is a platform for learning and practicing coding skills.',
  APP_AUTHOR: 'LeetCode',
};

export const API = {
  BASE_URL: 'https://leetcode-stats-api.herokuapp.com/',
};

export const COLORS = {
  dark: '#1A1A1A',
  light: '#FFFFFF',
};

export const RECENTPROBLEMSCOUNT = 100;
export const RECENTPROBLEMSCOUNTSEARCH = 10;

export const settingsTiles = [
  {
    title: 'About',
    icon: 'info-outline',
    onPress: () => {
      Alert.alert(
        'About',
        'LeetCode is a platform for learning and practicing coding skills.',
      );
    },
  },
  {
    title: 'Help',
    icon: 'help-outline',
    onPress: () =>
      Alert.alert(
        'Help',
        'For any help, please contact us at \nnoufalrahim6784@gmail.com',
      ),
  },
  {
    title: 'Github Reository',
    icon: 'chevron-right',
    onPress: () =>
      Linking.openURL('https://github.com/noufalrahim/LeetCode-App'),
  },
  {
    title: 'Logout',
    icon: 'logout',
    onPress: () => {},
  },
];
