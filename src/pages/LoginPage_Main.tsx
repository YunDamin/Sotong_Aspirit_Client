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

import Logo_Login_Svg from "../public/icons/logo/logo_login.svg";
import Sns_Apple_Svg from "../public/icons/sns/sns_apple.svg";
import Sns_KakaoTalk_Svg from "../public/icons/sns/sns_kakaotalk.svg";
import Sns_Naver_Svg from "../public/icons/sns/sns_naver.svg";
import Sns_Google_Svg from "../public/icons/sns/sns_google.svg";
import Sns_Facebook_Svg from "../public/icons/sns/sns_facebook.svg";

// Navigator
import CustomNavigator_Top from "../navigators/CustomNavigator_Top";

import Field_Text from "../components/Field_Text";

export default function LoginPage_Main({ navigation }: any) {
    const [loginData, setLoginData] = React.useState({
        id: "",
        password: "",
    });
    const handleChangeText = (name: string, text: string) => {
        setLoginData({ ...loginData, [name]: text });
    };

    const id_field_props = {
        label: "아이디(이메일) 입력",
        isNeccesary: false,
        isDisabled: false,
        id: "id",
        value: loginData["id"],
        changeValue: handleChangeText,
    };
    const password_field_props = {
        label: "비밀번호 입력",
        isNeccesary: false,
        isDisabled: false,
        id: "password",
        value: loginData["password"],
        changeValue: handleChangeText,
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={"white"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: "white" }}>
                <CustomNavigator_Top
                    title="로그인"
                    goBack={() => {
                        navigation.replace("Main");
                    }}
                />
            </SafeAreaView>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        justifyContent: "space-between",
                    }}
                >
                    <View style={{ width: "100%", alignItems: "center" }}>
                        <View style={{ marginTop: 40 }} />
                        <Logo_Login_Svg />
                        <View style={{ marginTop: 40 }} />
                        <Field_Text
                            style={{
                                width: 320,
                                height: 55,
                            }}
                            placeholder="아이디(이메일) 입력"
                            {...id_field_props}
                        />
                        <View style={{ marginTop: 10 }} />
                        <Field_Text
                            style={{
                                width: 320,
                                height: 55,
                            }}
                            {...password_field_props}
                            placeholder="비밀번호 입력"
                        />
                        <View
                            style={{
                                width: 320,
                                justifyContent: "space-between",
                                flexDirection: "row",
                                marginTop: 10,
                            }}
                        >
                            <View>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate(
                                            "LoginPage_Permission"
                                        )
                                    }
                                >
                                    <Text style={styles.text}>회원가입</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity>
                                    <Text style={styles.text}>아이디 찾기</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}>{"  |  "}</Text>
                                <TouchableOpacity>
                                    <Text style={styles.text}>
                                        비밀번호 찾기
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ marginTop: 20 }} />
                        <TouchableOpacity
                            style={{
                                width: 320,
                                height: 55,
                                backgroundColor: "#974B1A",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                            }}
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
                                로그인
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "100%", alignItems: "center" }}>
                        <Text
                            style={{
                                fontFamily: "Spoqa Han Sans Neo",
                                fontWeight: "400",
                                fontSize: 12,
                                color: "#888888",
                                textAlign: "center",
                            }}
                        >
                            SNS 시작하기
                        </Text>
                        <View style={{ marginTop: 20 }} />
                        <View
                            style={{
                                width: 320,
                                justifyContent: "space-between",
                                flexDirection: "row",
                            }}
                        >
                            <TouchableOpacity style={{ width: 54, height: 54 }}>
                                <Sns_Apple_Svg />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 54, height: 54 }}>
                                <Sns_KakaoTalk_Svg />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 54, height: 54 }}>
                                <Sns_Naver_Svg />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 54, height: 54 }}>
                                <Sns_Google_Svg />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 54, height: 54 }}>
                                <Sns_Facebook_Svg />
                            </TouchableOpacity>
                        </View>
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
    text: {
        fontFamily: "Spoqa Han Sans Neo",
        fontWeight: "400",
        fontSize: 12,
        color: "#757575",
        textAlign: "center",
    },
});
