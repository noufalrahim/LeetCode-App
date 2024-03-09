import { Box, Progress, Text } from "native-base";
import UserInfo from "../../api";
import React from "react";

import { useColorScheme } from "react-native";
import { COLORS } from "../../../util/AppConstants";

export default function Statistics({Data}: any) {

    const isDarkMode = useColorScheme() === 'dark';

    const [statistics, setStatistics] = React.useState({
        easySolved: 0,
        mediumSolved: 0,
        hardSolved: 0,
        totalEasy: 0,
        totalMedium: 0,
        totalHard: 0,
    });

    const [percentage, setPercentage] = React.useState({
        easy: 0,
        medium: 0,
        hard: 0,
    });

    React.useEffect(() => {
        if(Data.status === "success") {
            setStatistics({
                easySolved: Data.easySolved,
                mediumSolved: Data.mediumSolved,
                hardSolved: Data.hardSolved,
                totalEasy: Data.totalEasy,
                totalMedium: Data.totalMedium,
                totalHard: Data.totalHard,
            });

            setPercentage({
                easy: (Data.easySolved / Data.totalEasy) * 100,
                medium: (Data.mediumSolved / Data.totalMedium) * 100,
                hard: (Data.hardSolved / Data.totalHard) * 100,
            });
        }
    }, [Data]);

    return (
        <Box justifyContent={"center"}>
            <Box
                backgroundColor={isDarkMode ? COLORS.dark : COLORS.light}
                margin={5}
                borderRadius={10}
            >
                <Box
                flexDirection={"row"}
                justifyContent={"space-between"}
                >
                    <Text
                        fontSize={20}
                        textAlign={"left"}
                        color={isDarkMode ? COLORS.light : COLORS.dark}
                        marginBottom={2}
                    >
                        Easy
                    </Text>
                    <Text
                        fontSize={20}
                        textAlign={"right"}
                        color={isDarkMode ? COLORS.light : COLORS.dark}
                        marginBottom={2}
                    >
                        {statistics.easySolved}/{statistics.totalEasy}
                    </Text>
                </Box>
                <Progress value={percentage.easy} colorScheme="emerald" />
            </Box>
            <Box
                backgroundColor={isDarkMode ? COLORS.dark : COLORS.light}
                margin={5}
                borderRadius={10}
            >
                <Box
                flexDirection={"row"}
                justifyContent={"space-between"}
                >
                    <Text
                        fontSize={20}
                        textAlign={"left"}
                        color={isDarkMode ? COLORS.light : COLORS.dark}
                        marginBottom={2}
                    >
                        Medium
                    </Text>
                    <Text
                        fontSize={20}
                        textAlign={"right"}
                        color={isDarkMode ? COLORS.light : COLORS.dark}
                        marginBottom={2}
                    >
                        {statistics.mediumSolved}/{statistics.totalMedium}
                    </Text>
                </Box>
                <Progress value={percentage.medium} colorScheme="warning" />
            </Box>
            <Box
                backgroundColor={isDarkMode ? COLORS.dark : COLORS.light}
                margin={5}
                borderRadius={10}
            >
                <Box
                flexDirection={"row"}
                justifyContent={"space-between"}
                >
                    <Text
                        fontSize={20}
                        textAlign={"left"}
                        color={isDarkMode ? COLORS.light : COLORS.dark}
                        marginBottom={2}
                    >
                        Hard
                    </Text>
                    <Text
                        fontSize={20}
                        textAlign={"right"}
                        color={isDarkMode ? COLORS.light : COLORS.dark}
                        marginBottom={2}
                    >
                        {statistics.hardSolved}/{statistics.totalHard}
                    </Text>
                </Box>
                <Progress value={percentage.hard} colorScheme="secondary" />
            </Box>
        </Box>
    )
}