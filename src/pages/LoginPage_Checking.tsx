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

import Login_Check_Svg from "../public/icons/onboarding/login_check.svg";
import Icon_Heart_Svg from "../public/icons/icons/icon_heart.svg";

// Navigator
import CustomNavigator_Top from "../navigators/CustomNavigator_Top";

export default function LoginPage_Checking({ navigation, route }: any) {
    const next_step = () => {
        navigation.navigate("LoginPage_Input", {
            check: route.params.check,
        });
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={"white"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: "white" }}>
                <CustomNavigator_Top
                    title="본인인증"
                    goBack={() => {
                        navigation.goBack();
                    }}
                />
            </SafeAreaView>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <>
                        <View
                            style={{
                                width: 320,
                                height: 150,
                                borderRadius: 10,
                                backgroundColor: "#FCECDE",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Icon_Heart_Svg />
                            <View style={{ marginTop: 10 }} />
                            <Text
                                style={{
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "400",
                                    fontSize: 14,
                                    color: "#3D1909",
                                    textAlign: "center",
                                }}
                            >
                                {
                                    "위스키 팔레트 서비스를 이용하기 위해서\n본인인증이 필요합니다."
                                }
                            </Text>
                        </View>
                        <Login_Check_Svg />
                    </>
                    <TouchableOpacity
                        onPress={() => {
                            next_step();
                        }}
                        style={[
                            {
                                width: 320,
                                height: 55,
                                backgroundColor: "#974B1A",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                            },
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
                            본인인증하기
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
