import { Box, Text } from "native-base";
import { Image } from "react-native";
import React from "react";
import { useColorScheme } from "react-native";


export default function About({ navigation, route }: any) {
  const [userData, setUserData] = React.useState({
    profile: {
      userAvatar: "",
      realName: "",
      skillTags: [],
    },
    username: "",
  });

  React.useEffect(() => {
    setUserData(route.params);
  }
    , [route.params]);

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Box flex={1} alignItems="center"
      paddingTop={10}
      backgroundColor={isDarkMode ? "black" : "white"}
    >
      {
        userData != undefined ? (
          <Image
            source={{ uri: userData.profile.userAvatar }}
            alt="User Avatar"
            style={{ width: 200, height: 200, borderRadius: 100 }}
          />
        ) : null
      }
      <Text
        fontSize={20}
        marginTop={5}
        color={isDarkMode ? "white" : "black"}
      >
        {userData.profile.realName}
      </Text>
      <Box
      marginTop={5}
      alignItems={'center'}
      >
        <Text
          fontSize={15}
          color={isDarkMode ? "white" : "black"}
        >
          Skills
        </Text>
        {
          userData.profile.skillTags.map((skill: string, index: number) => {
            return (

              <Text
                fontSize={15}
                color={isDarkMode ? "white" : "black"}
              >
                {skill}
              </Text>
            );
          })
        }
      </Box>
    </Box>
  );
}
