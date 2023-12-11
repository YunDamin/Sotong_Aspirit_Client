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
    Image,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import Btn_OnOff_Arrow_Right from "../public/icons/btn/btn_onoff_right_arrow.svg";
import Profile_Svg from "../public/icons/photo/profile.svg";

import SNS_KAKAO from "../public/icons/sns/sns_kakaotalk.svg";
import SNS_NAVER from "../public/icons/sns/sns_naver.svg";
import SNS_GOOGLE from "../public/icons/sns/sns_google.svg";
import SNS_FACEBOOK from "../public/icons/sns/sns_facebook.svg";

import DatePicker from "react-native-date-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

// Navigator
import CustomNavigator_Top from "../navigators/CustomNavigator_Top";

// Components
import Field_Text from "../components/Field_Text";
import Field_Select from "../components/Field_Select";

import axios from "axios";
import { REACT_APP_API_KEY } from "@env";

import { useRecoilState } from "recoil";
import { login_data, login_state } from "../atoms/login_state";
import { user, user_state } from "../atoms/get_user";

type photoType = {
    name: string;
    uri: string;
};

export default function SubPage_EditMe({ navigation, route }: any) {
    const [loginState, setLoginState] = useRecoilState<login_data>(login_state);
    const [userState, setUserState] = useRecoilState<user>(user_state);

    const [userImage, setUserImage] = React.useState<photoType | null>(null);
    const select_photo = async () => {
        const result = await launchImageLibrary({
            mediaType: "photo",
            selectionLimit: 1,
        });
        if (result.didCancel) {
            return;
        }
        if (result.errorCode) {
            return;
        }
        if (result.errorMessage) {
            return;
        }
        if (result.assets) {
            let pthoes: photoType[] = [];
            result.assets.map((asset) => {
                const img_name = asset.fileName ?? "";
                const img_path = asset.uri ?? "";

                setUserImage({
                    name: img_name,
                    uri: img_path,
                });
            });
        }
    };

    const [password, setPassword] = React.useState("");
    const change_password = (name: string, text: string) => {
        setPassword(text);
    };
    const [password_check, setPassword_check] = React.useState("");
    const change_password_check = (name: string, text: string) => {
        setPassword_check(text);
    };

    const [name, setName] = React.useState("");
    const [sex, setSex] = React.useState(0);
    const [realSex, setRealSex] = React.useState("");
    const [birth, setBirth] = React.useState("");

    const [phone, setPhone] = React.useState("");
    const change_phone = (name: string, text: string) => {
        setPhone(text);
    };
    const [phone_check, setPhone_check] = React.useState("");
    const change_phone_check = (name: string, text: string) => {
        setPhone_check(text);
    };

    const [nickname, setNickname] = React.useState("");
    const change_nickname = (name: string, text: string) => {
        setNickname(text);
    };
    const [nickname_check, setNickname_check] = React.useState(0);

    const check_user_nick = () => {
        axios
            .post(REACT_APP_API_KEY + "/users/check_user_nick", {
                user_nick: nickname,
            })
            .then((res) => {
                if (res.data.ok) {
                    if (res.data.exists) {
                        setNickname_check(1);
                    } else {
                        setNickname_check(2);
                    }
                }
            });
    };

    const signUp = () => {
        let frm = new FormData();

        frm.append("user_id", loginState.user_id);
        frm.append("password", password);

        frm.append("phone", phone);
        frm.append("phone_check", phone_check);
        frm.append("nick", nickname);
        frm.append("nick_check", nickname_check.toString());

        if (userImage) {
            let extension = userImage.name?.split(".").pop()?.toLowerCase();

            let mimeType;
            if (extension == "jpg" || extension == "jpeg") {
                mimeType = "image/jpeg";
            } else if (extension == "png") {
                mimeType = "image/png";
            } else {
                mimeType = "application/octet-stream";
            }

            frm.append("user_image", {
                uri: userImage.uri,
                name: userImage.name,
                type: mimeType,
            });
        }

        axios
            .post(
                REACT_APP_API_KEY + "/users/user/edit/" + loginState.user_id,
                frm,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Accept: "application/json",
                        authorization: loginState.accessToken,
                    },
                }
            )
            .then((res) => {
                if (res.data.ok) {
                    navigation.replace("Main");
                }
            });
    };

    useFocusEffect(
        React.useCallback(() => {
            console.log("SubPage_EditMe Focus");
            axios
                .get(
                    REACT_APP_API_KEY +
                        "/users/user/" +
                        loginState.user_id +
                        "/detail"
                )
                .then((res) => {
                    if (res.data.ok) {
                        setName(res.data.name);
                        setRealSex(res.data.sex);
                        setBirth(res.data.birth);
                    }
                });
            return () => {};
        }, [])
    );

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={"white"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: "white" }}>
                <CustomNavigator_Top
                    title="내 정보 수정"
                    goBack={() => {
                        navigation.goBack();
                    }}
                />
            </SafeAreaView>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <ScrollView style={{ width: "100%" }}>
                    <View
                        style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <View style={{ marginTop: 15 }} />
                        <View style={{ width: 320, alignItems: "center" }}>
                            <View
                                style={{
                                    width: 86,
                                    height: 86,
                                    borderRadius: 100,
                                    backgroundColor: "#FFFFFF",
                                    borderWidth: 1,
                                    borderColor: "#E4E4E4",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {userImage ? (
                                    <Image
                                        source={{ uri: userImage.uri }}
                                        width={85}
                                        height={85}
                                        style={{
                                            borderRadius: 100,
                                        }}
                                    />
                                ) : userState.img_urls.length > 0 ? (
                                    <Image
                                        source={{
                                            uri: userState.img_urls[0],
                                        }}
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
                            <TouchableOpacity
                                onPress={() => {
                                    select_photo();
                                }}
                                style={{
                                    marginTop: 20,
                                    marginBottom: 20,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "400",
                                        fontSize: 12,
                                        color: "#000000",
                                        textAlign: "center",
                                        textDecorationLine: "underline",
                                    }}
                                >
                                    프로필 이미지 변경
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ width: 320 }}>
                            <Text style={styles.subtitle_text}>
                                아이디(이메일)
                            </Text>
                            <Text
                                style={[
                                    styles.subtitle_text,
                                    { color: "#D6690F" },
                                ]}
                            >
                                {" *"}
                            </Text>
                        </Text>
                        <Field_Text
                            isNeccesary={false}
                            isDisabled={true}
                            id={"email"}
                            value={userState.user_email}
                            changeValue={(name: string, text: string) => {}}
                        />
                        <View style={{ marginTop: 25 }} />
                        <Text style={{ width: 320 }}>
                            <Text style={styles.subtitle_text}>비밀번호</Text>
                            <Text
                                style={[
                                    styles.subtitle_text,
                                    { color: "#D6690F" },
                                ]}
                            >
                                {" *"}
                            </Text>
                        </Text>
                        <Field_Text
                            isNeccesary={false}
                            isDisabled={false}
                            id={"password"}
                            value={password}
                            changeValue={change_password}
                            placeholder="비밀번호 입력"
                        />
                        <Field_Text
                            isNeccesary={false}
                            isDisabled={false}
                            id={"password_check"}
                            value={password_check}
                            changeValue={change_password_check}
                            placeholder="비밀번호 한 번 더 입력"
                        />
                        <View style={{ marginTop: 25 }} />
                        <Text style={{ width: 320 }}>
                            <Text style={styles.subtitle_text}>이름</Text>
                            <Text
                                style={[
                                    styles.subtitle_text,
                                    { color: "#D6690F" },
                                ]}
                            >
                                {" *"}
                            </Text>
                        </Text>
                        <Field_Text
                            isNeccesary={false}
                            isDisabled={true}
                            id={"name"}
                            value={name}
                            changeValue={(name: string, text: string) => {}}
                            placeholder="이름"
                        />
                        <View style={{ marginTop: 25 }} />
                        <Text style={{ width: 320, marginBottom: 10 }}>
                            <Text style={styles.subtitle_text}>성별</Text>
                            <Text
                                style={[
                                    styles.subtitle_text,
                                    { color: "#D6690F" },
                                ]}
                            >
                                {" *"}
                            </Text>
                        </Text>
                        <Field_Select
                            list={[
                                { id: 0, name: "남" },
                                { id: 1, name: "여" },
                            ]}
                            value={realSex == "M" ? 0 : 1}
                            setValue={setSex}
                            isDisabled={true}
                        />
                        <View style={{ marginTop: 25 }} />
                        <Text style={{ width: 320, marginBottom: 10 }}>
                            <Text style={styles.subtitle_text}>생년월일</Text>
                            <Text
                                style={[
                                    styles.subtitle_text,
                                    { color: "#D6690F" },
                                ]}
                            >
                                {" *"}
                            </Text>
                        </Text>
                        <TouchableOpacity
                            disabled={true}
                            onPress={() => {}}
                            style={{
                                width: 320,
                                height: 55,
                                borderWidth: 1,
                                borderColor: "#E5E5E5",
                                borderRadius: 10,
                                justifyContent: "center",
                                backgroundColor: "#E5E5E5",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "400",
                                    fontSize: 14,
                                    color: "#000000",
                                    textAlign: "left",
                                    marginLeft: 15,
                                }}
                            >
                                {birth}
                            </Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 25 }} />
                        <Text style={{ width: 320 }}>
                            <Text style={styles.subtitle_text}>휴대폰번호</Text>
                            <Text
                                style={[
                                    styles.subtitle_text,
                                    { color: "#D6690F" },
                                ]}
                            >
                                {" *"}
                            </Text>
                        </Text>
                        <Field_Text
                            isNeccesary={false}
                            isDisabled={false}
                            id={"phone"}
                            value={phone}
                            changeValue={change_phone}
                            placeholder="휴대폰번호 입력"
                            keyboardType="phone-pad"
                            success={true}
                            success_text={"인증번호 전송하였습니다."}
                            error={false}
                            error_text={"중복된 휴대폰번호입니다."}
                            btn={true}
                            btn_text={"인증번호"}
                            btn_onPress={() => {}}
                        />
                        <Field_Text
                            isNeccesary={false}
                            isDisabled={false}
                            id={"phone_check"}
                            value={phone_check}
                            changeValue={change_phone_check}
                            placeholder="인증번호 입력"
                            success={false}
                            success_text={"인증번호가 일치합니다."}
                            error={true}
                            error_text={"인증번호가 일치하지 않습니다."}
                        />
                        <View style={{ marginTop: 25 }} />
                        <Text style={{ width: 320 }}>
                            <Text style={styles.subtitle_text}>닉네임</Text>
                            <Text
                                style={[
                                    styles.subtitle_text,
                                    { color: "#D6690F" },
                                ]}
                            >
                                {" *"}
                            </Text>
                        </Text>
                        <Field_Text
                            isNeccesary={false}
                            isDisabled={false}
                            id={"nickname"}
                            value={nickname}
                            changeValue={change_nickname}
                            placeholder="닉네임 입력"
                            success={nickname_check === 2}
                            success_text={"사용 가능한 닉네임입니다."}
                            error={nickname_check === 1}
                            error_text={"중복된 닉네임입니다."}
                            btn={true}
                            btn_text={"중복확인"}
                            btn_onPress={() => {
                                check_user_nick();
                            }}
                        />
                        <View style={{ marginTop: 40 }} />
                        <Text style={{ width: 320 }}>
                            <Text style={styles.subtitle_text}>SNS 연동</Text>
                        </Text>
                        <View
                            style={{
                                width: 320,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <SNS_KAKAO />
                                <Text
                                    style={{
                                        marginLeft: 20,
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "500",
                                        fontSize: 14,
                                        color: "#000000",
                                        textAlign: "left",
                                    }}
                                >
                                    카카오톡
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={{
                                    width: 65,
                                    height: 35,
                                    borderRadius: 10,
                                    backgroundColor: "#974B1A",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "500",
                                        fontSize: 12,
                                        color: "#FFFFFF",
                                        textAlign: "center",
                                    }}
                                >
                                    연동하기
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                width: 320,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <SNS_NAVER />
                                <Text
                                    style={{
                                        marginLeft: 20,
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "500",
                                        fontSize: 14,
                                        color: "#000000",
                                        textAlign: "left",
                                    }}
                                >
                                    네이버
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={{
                                    width: 65,
                                    height: 35,
                                    borderRadius: 10,
                                    backgroundColor: "#974B1A",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "500",
                                        fontSize: 12,
                                        color: "#FFFFFF",
                                        textAlign: "center",
                                    }}
                                >
                                    연동하기
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                width: 320,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <SNS_GOOGLE />
                                <Text
                                    style={{
                                        marginLeft: 20,
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "500",
                                        fontSize: 14,
                                        color: "#000000",
                                        textAlign: "left",
                                    }}
                                >
                                    구글
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={{
                                    width: 65,
                                    height: 35,
                                    borderRadius: 10,
                                    backgroundColor: "#974B1A",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "500",
                                        fontSize: 12,
                                        color: "#FFFFFF",
                                        textAlign: "center",
                                    }}
                                >
                                    연동하기
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                width: 320,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <SNS_FACEBOOK />
                                <Text
                                    style={{
                                        marginLeft: 20,
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "500",
                                        fontSize: 14,
                                        color: "#000000",
                                        textAlign: "left",
                                    }}
                                >
                                    페이스북
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={{
                                    width: 65,
                                    height: 35,
                                    borderRadius: 10,
                                    backgroundColor: "#974B1A",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "500",
                                        fontSize: 12,
                                        color: "#FFFFFF",
                                        textAlign: "center",
                                    }}
                                >
                                    연동하기
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 40 }} />
                        <TouchableOpacity
                            style={{ width: 320, alignItems: "center" }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "400",
                                    fontSize: 14,
                                    color: "#5B5B5B",
                                    textAlign: "center",
                                    textDecorationLine: "underline",
                                }}
                            >
                                회원탈퇴
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 40 }} />
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
                            signUp();
                        }}
                        disabled={
                            !(
                                password != "" &&
                                password_check != "" &&
                                // phone != "" &&
                                // phone_check != "" &&
                                password == password_check &&
                                nickname_check != 1
                            )
                        }
                        style={[
                            {
                                width: 320,
                                height: 55,
                                backgroundColor: "#974B1A",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                            },
                            { opacity: 0.4 },
                            password != "" &&
                                password_check != "" &&
                                // phone != "" &&
                                // phone_check != "" &&
                                password == password_check &&
                                nickname_check != 1 && { opacity: 1 },
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
                            수정완료
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
});
