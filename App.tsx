import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Box, Image, NativeBaseProvider, StatusBar, Text} from 'native-base';
import About from './src/screens/About';
import Home from './src/screens/Home';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RecentSubScreen from './src/screens/RecentSubmissions';
import Search from './src/screens/Search';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const [isLoggedIn, setIsLoggedIn] = React.useState<any>(() => {
    const checkLoggedIn = async () => {
      try {
        const username = await AsyncStorage.getItem('USERNAME');
        if (username != null) {
          return true;
        }
        return false;
      } catch (error) {
        console.error(error);
      }
    };

    checkLoggedIn();
  });

  const handleLogin = async (USERNAME: string) => {
    if (USERNAME === '') {
      setIsLoggedIn(false);
    } else {
      try {
        await AsyncStorage.setItem('USERNAME', USERNAME);
        setIsLoggedIn(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  function Navigation() {
    return (
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
          name="Submissions"
          component={RecentSubScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="history" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="search" color={color} size={size} />
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
    );
  }

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
          <Text fontSize="xl" fontWeight="bold" color={'black'}>
            LeetCode
          </Text>
        </Box>

        {isLoggedIn ? (
          <>
            <Stack.Navigator
              initialRouteName="Navigation"
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="Navigation" component={Navigation} />
              <Stack.Screen name="Login">
                {(props: any) => <Login {...props} handleLogin={handleLogin} />}
              </Stack.Screen>
            </Stack.Navigator>
          </>
        ) : (
          <>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="Login">
                {(props: any) => <Login {...props} handleLogin={handleLogin} />}
              </Stack.Screen>
              <Stack.Screen name="Navigation" component={Navigation} />
            </Stack.Navigator>
          </>
        )}
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;
