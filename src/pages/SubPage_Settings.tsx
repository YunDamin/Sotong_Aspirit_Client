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

import SSSS from "../public/icons/btn/ssss.svg";

// Navigator
import CustomNavigator_Top from "../navigators/CustomNavigator_Top";

import Card_FAQ from "../components/Card_FAQ";

import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";
import { REACT_APP_API_KEY } from "@env";

export default function SubPage_Settings({ navigation }: any) {
    const [faq, setFaq] = React.useState<any[]>([]);

    useFocusEffect(
        React.useCallback(() => {
            console.log("SubPage_Settings Focus");
            return () => {};
        }, [])
    );

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: "white" }} />
            <StatusBar barStyle="light-content" backgroundColor={"white"} />
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <CustomNavigator_Top
                    title="앱 설정"
                    goBack={() => {
                        navigation.goBack();
                    }}
                />
                <ScrollView
                    style={{
                        flex: 1,
                        width: "100%",
                        marginTop: 15,
                    }}
                    scrollEventThrottle={16}
                >
                    <View style={styles.page}>
                        <Text style={{ width: 320, marginBottom: 10 }}>
                            <Text style={styles.subtitle_text}>알림 설정</Text>
                        </Text>
                        <View
                            style={{
                                width: 320,
                                height: 45,
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                        >
                            <Text style={styles.m_text}>앱 푸쉬 알림</Text>
                        </View>
                        <View
                            style={{
                                width: 320,
                                height: 45,
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                        >
                            <Text style={styles.m_text}>
                                마케팅/이벤트 알림
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                            marginBottom: 20,
                            height: 4,
                            backgroundColor: "#F7F7F7",
                        }}
                    />
                    <View style={styles.page}>
                        <Text style={{ width: 320, marginBottom: 10 }}>
                            <Text style={styles.subtitle_text}>기타</Text>
                        </Text>
                        <TouchableOpacity
                            style={{
                                width: 320,
                                height: 45,
                                alignItems: "center",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text style={styles.m_text}>이용약관</Text>
                            <SSSS />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: 320,
                                height: 45,
                                alignItems: "center",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text style={styles.m_text}>개인정보처리방침</Text>
                            <SSSS />
                        </TouchableOpacity>
                        <View
                            style={{
                                width: 320,
                                height: 45,
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                        >
                            <Text style={styles.m_text}>버전 v.1.0.0</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "white",
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: "center",
    },
    under_page: {
        width: "100%",
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
    },
    subtitle_text: {
        fontFamily: "Spoqa Han Sans Neo",
        fontWeight: "500",
        fontSize: 12,
        color: "#424242",
        textAlign: "left",
    },
    subtitle_des_text: {
        fontFamily: "Spoqa Han Sans Neo",
        fontWeight: "400",
        fontSize: 10,
        color: "#888888",
        textAlign: "left",
    },
    m_text: {
        fontFamily: "Spoqa Han Sans Neo",
        fontWeight: "500",
        fontSize: 14,
        color: "#000000",
        textAlign: "left",
    },
});
