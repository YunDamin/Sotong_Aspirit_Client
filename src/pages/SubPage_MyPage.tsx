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
    Image,
} from "react-native";

import Btn_OnOff_Arrow_Right from "../public/icons/btn/btn_onoff_right_arrow.svg";
import Profile_Svg from "../public/icons/photo/profile.svg";

// Navigator
import CustomNavigator_Top from "../navigators/CustomNavigator_Top";

import { useRecoilState } from "recoil";
import { login_data, login_state } from "../atoms/login_state";
import { user, user_state } from "../atoms/get_user";

import { removeData } from "../utils/AsyncStorage";

export default function SubPage_MyPage({ navigation }: any) {
    const [loginState, setLoginState] = useRecoilState<login_data>(login_state);
    const [userState, setUserState] = useRecoilState<user>(user_state);

    const logout = () => {
        setLoginState({
            is_login: false,
            login_type: "",
            user_id: "",
            accessToken: "",
            refreshToken: "",
            survey: false,
        });
        removeData("user_id");
        removeData("login_type");
        removeData("accessToken");
        removeData("refreshToken");
        navigation.replace("Main");
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={"#FCECDE"} />
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
                    >
                        {userState.img_urls.length > 0 ? (
                            <Image
                                source={{ uri: userState.img_urls[0] }}
                                width={85}
                                height={85}
                                style={{
                                    borderRadius: 100,
                                }}
                            />
                        ) : (
                            <Profile_Svg />
                        )}
                    </View>
                    <Text
                        style={{
                            fontFamily: "Spoqa Han Sans Neo",
                            fontWeight: "700",
                            fontSize: 16,
                            color: "#000000",
                            marginBottom: 5,
                        }}
                    >
                        {userState.user_nick_name}
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
                        {userState.user_email}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("SubPage_Profile", {
                                user_id: loginState.user_id,
                            });
                        }}
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
                </View>
                <ScrollView
                    style={{
                        width: "100%",
                        backgroundColor: "white",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingTop: 20,
                        overflow: "hidden",
                    }}
                >
                    <View style={styles.under_page}>
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
                            onPress={() => {
                                navigation.navigate("SubPage_EditMe");
                            }}
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
                            onPress={() => {
                                navigation.navigate("SurveyPage_Main", {
                                    edit: true,
                                });
                            }}
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
                            onPress={() => {
                                navigation.navigate("SubPage_Profile", {
                                    user_id: loginState.user_id,
                                });
                            }}
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
                            onPress={() => {
                                navigation.navigate("SubPage_TastingNote", {
                                    user_id: loginState.user_id,
                                });
                            }}
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
                            onPress={() => {
                                navigation.navigate("SubPage_FAQ");
                            }}
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
                            onPress={() => {
                                navigation.navigate("SubPage_Settings");
                            }}
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
                        <TouchableOpacity
                            onPress={() => {
                                logout();
                            }}
                            style={{
                                flexDirection: "row",
                                width: "100%",
                                height: 40,
                                alignItems: "center",
                                justifyContent: "flex-start",
                                marginLeft: 20,
                                marginBottom: 5,
                                marginTop: 15,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "400",
                                    fontSize: 14,
                                    color: "#5B5B5B",
                                    textAlign: "left",
                                    textDecorationLine: "underline",
                                }}
                            >
                                로그아웃
                            </Text>
                        </TouchableOpacity>
                        <View style={{ marginVertical: 100 }} />
                    </View>
                </ScrollView>
                <View
                    style={{
                        width: "100%",
                        height: 300,
                        backgroundColor: "#FCECDE",
                        position: "absolute",
                        zIndex: -10,
                    }}
                />
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
    },
});
