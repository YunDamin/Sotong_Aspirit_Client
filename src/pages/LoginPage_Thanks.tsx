import * as React from "react";
import {
    Animated,
    Platform,
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    StatusBar,
    TouchableOpacity,
} from "react-native";

import Thanks_Onboarding_Svg from "../public/icons/onboarding/thanks.svg";

// Navigator
import CustomNavigator_Top from "../navigators/CustomNavigator_Top";

export default function LoginPage_Thanks({ navigation }: any) {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={"#FBF8F2"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: "#FBF8F2" }}>
                <CustomNavigator_Top
                    title="가입완료"
                    goBack={() => {
                        navigation.replace("Main");
                    }}
                />
            </SafeAreaView>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#FBF8F2" }}>
                <ScrollView style={{ width: "100%" }}>
                    <View
                        style={{
                            width: "100%",
                            alignItems: "center",
                            marginTop: 20,
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                fontFamily: "Spoqa Han Sans Neo",
                                fontWeight: "400",
                                fontSize: 24,
                                color: "#000000",
                                marginTop: 40,
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "700",
                                }}
                            >
                                위스키팔레트
                            </Text>
                            <Text>의</Text>
                        </Text>
                        <Text
                            style={{
                                textAlign: "center",
                                fontFamily: "Spoqa Han Sans Neo",
                                fontWeight: "400",
                                fontSize: 24,
                                color: "#000000",
                                marginTop: 10,
                                marginBottom: 120,
                            }}
                        >
                            회원가입을 축하합니다.
                        </Text>
                        <Thanks_Onboarding_Svg />
                    </View>
                </ScrollView>
                <View
                    style={{
                        width: "100%",
                        alignItems: "center",
                        marginTop: 20,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            navigation.replace("Main");
                        }}
                        style={[
                            {
                                width: 320,
                                height: 55,
                                backgroundColor: "#974B1A",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                                marginBottom: 20,
                            },
                            { opacity: 0.4 },
                            { opacity: 1 },
                        ]}
                    >
                        <Text
                            style={{
                                fontFamily: "Spoqa Han Sans Neo",
                                fontWeight: "500",
                                fontSize: 18,
                                color: "#FFFFFF",
                                textAlign: "center",
                            }}
                        >
                            로그인 하기
                        </Text>
                    </TouchableOpacity>
                </View>
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
