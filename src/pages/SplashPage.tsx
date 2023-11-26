import * as React from "react";
import {
    Animated,
    Platform,
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";

export default function SplashPage({ navigation }: any) {
    const next = () => {
        navigation.replace("Onboarding");
    };

    React.useEffect(() => {
        const timer = setTimeout(() => {
            next();
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <SafeAreaView
                style={{ flex: 0, backgroundColor: "#974B1A" }}
            ></SafeAreaView>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#D6690F" }}>
                <LinearGradient
                    colors={["#974B1A", "#D6690F"]}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                ></LinearGradient>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#FCECDE",
        width: "100%",
        alignItems: "center",
    },
    under_page: {
        width: "100%",
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
    },
});
