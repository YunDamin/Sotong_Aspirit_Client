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
    StatusBar,
} from "react-native";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";

import Splash_Gif from "../public/splash.gif";

export default function SplashPage({ navigation }: any) {
    const next = () => {
        navigation.replace("Onboarding");
    };

    React.useEffect(() => {
        const timer = setTimeout(() => {
            next();
        }, 1800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: "#974B1A" }} />
            <StatusBar barStyle="light-content" backgroundColor={"#974B1A"} />
            <SafeAreaView style={{ flex: 1, backgroundColor: "#D6690F" }}>
                <LinearGradient
                    colors={["#974B1A", "#D6690F"]}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <FastImage
                        style={{ width: "100%", height: "100%" }}
                        source={Splash_Gif}
                    />
                </LinearGradient>
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
