import React from "react";
import { Box } from "native-base";
import { Dimensions, useColorScheme } from "react-native";
import { ContributionGraph } from "react-native-chart-kit";
import { COLORS } from "../../../../util/AppConstants";
import UserInfo from "../../../api";
import { convertToObjectArray } from "../../../../util/TimeStampConverter";

export default function HeatMap({Data}: {Data: any}) {
    const [commitsData, setCommitsData] = React.useState<{ date: string; count: any; }[]>([]);

     const isDarkMode = useColorScheme() === 'dark';

    React.useEffect(() => {
        if(Data.status === "success") {
            const outputArray = convertToObjectArray(Data.submissionCalendar);
            setCommitsData(outputArray);
        }
    }, [Data]);

    const chartConfig = {
        backgroundGradientFrom: `${isDarkMode ? COLORS.dark : COLORS.light}`,
        backgroundGradientTo: `${isDarkMode ? COLORS.dark : COLORS.light}`,
        color: (opacity = 1) => `rgba(16, 153, 50, ${opacity})`,
    };

    const date = new Date();
    return (
        <Box
            backgroundColor={isDarkMode ? COLORS.light : COLORS.dark}
            borderRadius={10}
            justifyContent={"center"}
            marginY={5}
        >
            <ContributionGraph
                values={commitsData}
                endDate={date}
                numDays={105}
                width={Dimensions.get("window").width}
                height={220}
                chartConfig={chartConfig}
            />
        </Box>
    )
}