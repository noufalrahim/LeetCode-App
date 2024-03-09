import { Box, Text } from "native-base";

export default function About() {
    return (
        <Box 
        flex={1}
        alignItems="center"
        justifyContent="center"
        >
            <Text 
            fontSize={20}
            >About Screen</Text>
            <Text>Coming Soon..!</Text>
        </Box>
    );
}