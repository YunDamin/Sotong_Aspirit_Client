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

import Btn_OnOff_Arrow_Right from "../public/icons/btn/btn_onoff_right_arrow.svg";

// Navigator
import CustomNavigator_Top from "../navigators/CustomNavigator_Top";

export default function SubPage_MyPage({ navigation }: any) {
    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: "#FCECDE" }}>
                <CustomNavigator_Top
                    title="마이페이지"
                    goBack={() => {
                        navigation.goBack();
                    }}
                />
            </SafeAreaView>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <View style={styles.page}>
                    <View
                        style={{
                            width: 85,
                            height: 85,
                            borderRadius: 100,
                            backgroundColor: "#ffffff",
                            marginTop: 25,
                            marginBottom: 15,
                        }}
                    ></View>
                    <Text
                        style={{
                            fontFamily: "Spoqa Han Sans Neo",
                            fontWeight: "700",
                            fontSize: 16,
                            color: "#000000",
                            marginBottom: 5,
                        }}
                    >
                        김위스키
                    </Text>
                    <Text
                        style={{
                            fontFamily: "Spoqa Han Sans Neo",
                            fontWeight: "400",
                            fontSize: 14,
                            color: "#888888",
                            marginBottom: 16,
                        }}
                    >
                        wis@naver.com
                    </Text>
                    <TouchableOpacity
                        style={{
                            width: 320,
                            height: 35,
                            borderRadius: 10,
                            backgroundColor: "#974B1A",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 30,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "Spoqa Han Sans Neo",
                                fontWeight: "500",
                                fontSize: 14,
                                color: "#FFFFFF",
                                textAlign: "center",
                            }}
                        >
                            위스키 프로필
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.under_page}>
                        <ScrollView
                            style={{
                                width: "100%",
                                marginTop: 25,
                            }}
                            scrollEventThrottle={16}
                        >
                            <Text
                                style={{
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "400",
                                    fontSize: 12,
                                    color: "#888888",
                                    textAlign: "left",
                                    marginLeft: 20,
                                    marginBottom: 5,
                                }}
                            >
                                내 정보
                            </Text>
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    width: "100%",
                                    height: 40,
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    marginLeft: 20,
                                    marginBottom: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "500",
                                        fontSize: 14,
                                        color: "#000000",
                                        textAlign: "left",
                                    }}
                                >
                                    내 정보 수정
                                </Text>
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        position: "absolute",
                                        right: 40,
                                    }}
                                >
                                    <Btn_OnOff_Arrow_Right />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    width: "100%",
                                    height: 40,
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    marginLeft: 20,
                                    marginBottom: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "500",
                                        fontSize: 14,
                                        color: "#000000",
                                        textAlign: "left",
                                    }}
                                >
                                    위스키 취향 수정
                                </Text>
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        position: "absolute",
                                        right: 40,
                                    }}
                                >
                                    <Btn_OnOff_Arrow_Right />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    width: "100%",
                                    height: 40,
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    marginLeft: 20,
                                    marginBottom: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "500",
                                        fontSize: 14,
                                        color: "#000000",
                                        textAlign: "left",
                                    }}
                                >
                                    위스키 프로필
                                </Text>
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        position: "absolute",
                                        right: 40,
                                    }}
                                >
                                    <Btn_OnOff_Arrow_Right />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    width: "100%",
                                    height: 40,
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    marginLeft: 20,
                                    marginBottom: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "500",
                                        fontSize: 14,
                                        color: "#000000",
                                        textAlign: "left",
                                    }}
                                >
                                    테이스팅 노트 관리
                                </Text>
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        position: "absolute",
                                        right: 40,
                                    }}
                                >
                                    <Btn_OnOff_Arrow_Right />
                                </View>
                            </TouchableOpacity>
                            <View
                                style={{
                                    width: "100%",
                                    height: 4,
                                    backgroundColor: "#F7F7F7",
                                    marginBottom: 15,
                                }}
                            />
                            <Text
                                style={{
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "400",
                                    fontSize: 12,
                                    color: "#888888",
                                    textAlign: "left",
                                    marginLeft: 20,
                                    marginBottom: 5,
                                }}
                            >
                                고객센터
                            </Text>
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    width: "100%",
                                    height: 40,
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    marginLeft: 20,
                                    marginBottom: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "500",
                                        fontSize: 14,
                                        color: "#000000",
                                        textAlign: "left",
                                    }}
                                >
                                    FAQ
                                </Text>
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        position: "absolute",
                                        right: 40,
                                    }}
                                >
                                    <Btn_OnOff_Arrow_Right />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    width: "100%",
                                    height: 40,
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    marginLeft: 20,
                                    marginBottom: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "500",
                                        fontSize: 14,
                                        color: "#000000",
                                        textAlign: "left",
                                    }}
                                >
                                    앱 설정
                                </Text>
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        position: "absolute",
                                        right: 40,
                                    }}
                                >
                                    <Btn_OnOff_Arrow_Right />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    width: "100%",
                                    height: 40,
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    marginLeft: 20,
                                    marginBottom: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "500",
                                        fontSize: 14,
                                        color: "#000000",
                                        textAlign: "left",
                                    }}
                                >
                                    의견 보내기
                                </Text>
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        position: "absolute",
                                        right: 40,
                                    }}
                                >
                                    <Btn_OnOff_Arrow_Right />
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
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
