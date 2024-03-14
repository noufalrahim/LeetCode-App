import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'native-base';
import { useColorScheme } from "react-native";

export default function RecentSubScreen({ navigation, route }: any) {
    const isDarkMode = useColorScheme() === 'dark';
    const [subList, setSubList] = React.useState([]);
    React.useEffect(() => {
        setSubList(route.params.recentAcSubmissionList);
    },[route.params.recentAcSubmissionList]);
    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={{ backgroundColor: isDarkMode ? "black" : "white" }}
        >
            {
                subList != undefined && 
                subList.map((sub: any, index: number) => {
                    return (
                        <View key={index}
                        style={{
                            height: 60,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderBottomColor: 'white',
                            borderBottomWidth: 0.2,
                            backgroundColor: index % 2 == 0 ? "#2A2A2A" : "#383838"
                        }}
                        >
                            <Text>
                                {sub.title}
                            </Text>
                        </View>
                    )   
                }
                )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({})