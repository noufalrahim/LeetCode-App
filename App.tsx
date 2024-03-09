// import React from 'react';
// import { Box, NativeBaseProvider } from 'native-base';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
// } from 'react-native/Libraries/NewAppScreen';
// import Home from './src/screens/Home';
// import { NavigationContainer } from '@react-navigation/native';

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <NavigationContainer>
//     <NativeBaseProvider>
//       <SafeAreaView style={backgroundStyle}>
//         <StatusBar
//           barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//           backgroundColor={backgroundStyle.backgroundColor}
//         />
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={backgroundStyle}>
//           <Box
//           background={isDarkMode ? Colors.dark : Colors.light}
//           >
//               <Home />
//           </Box>
//         </ScrollView>
//       </SafeAreaView>
//     </NativeBaseProvider>
//     </NavigationContainer>
//   );
// }

// export default App;

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Box, Image, NativeBaseProvider, StatusBar, Text} from 'native-base';
import About from './src/screens/About';
import Home from './src/screens/Home';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useColorScheme} from 'react-native';
function App() {
  const Tab = createBottomTabNavigator();
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#F89F1B" />
      <NativeBaseProvider>
        <Box
          alignItems="center"
          backgroundColor="#F89F1B"
          p={4}
          flexDirection="row"
          justifyContent={'flex-start'}>
          <Image
            source={require('./src/assets/images/leetcode.png')}
            alt="LeetCode"
            size={8}
            marginRight={2}
          />
          <Text
            fontSize="xl"
            fontWeight="bold"
            color={`${isDarkMode ? 'black' : 'white'}`}>
            LeetCode
          </Text>
        </Box>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: '#F89F1B',
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'black',
          }}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <Icon name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="About"
            component={About}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <Icon name="info-outline" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;
