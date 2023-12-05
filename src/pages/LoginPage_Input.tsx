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

import Btn_OnOff_Arrow_Right from "../public/icons/btn/btn_onoff_right_arrow.svg";

import DatePicker from "react-native-date-picker";

// Navigator
import CustomNavigator_Top from "../navigators/CustomNavigator_Top";

// Components
import Field_Text from "../components/Field_Text";
import Field_Select from "../components/Field_Select";

import axios from "axios";
import { API_KEY } from "@env";

export default function LoginPage_Input({ navigation, route }: any) {
    const [email, setEmail] = React.useState("");
    const change_email = (name: string, text: string) => {
        setEmail(text);
    };
    const [email_check, setEmail_check] = React.useState(0);

    const [password, setPassword] = React.useState("");
    const change_password = (name: string, text: string) => {
        setPassword(text);
    };
    const [password_check, setPassword_check] = React.useState("");
    const change_password_check = (name: string, text: string) => {
        setPassword_check(text);
    };

    const [name, setName] = React.useState("");
    const change_name = (name: string, text: string) => {
        setName(text);
    };

    const [sex, setSex] = React.useState(0);

    const [dateOpen, setDateOpen] = React.useState(false);
    const [date, setDate] = React.useState(new Date());

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

    const check_email = () => {
        axios
            .post(API_KEY + "/users/check_email", {
                email: email,
            })
            .then((res) => {
                if (res.data.ok) {
                    if (res.data.exists) {
                        setEmail_check(1);
                    } else {
                        setEmail_check(2);
                    }
                }
            });
    };

    const check_user_nick = () => {
        axios
            .post(API_KEY + "/users/check_user_nick", {
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
        let month = date.getMonth() + 1;
        let month_str = month < 10 ? "0" + month : month.toString();

        axios
            .post(API_KEY + "/users/signup", {
                email: email,
                password: password,
                user_name: name,
                sex: sex === 0 ? "M" : "F",
                date: `${date.getFullYear()}${month_str}${date.getDate()}`,
                phone_number: phone,
                user_nick: nickname,
                yn: route.params.check,
            })
            .then((res) => {
                if (res.data.ok) {
                    navigation.navigate("LoginPage_Thanks");
                }
            });

        // navigation.navigate("LoginPage_Thanks");
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={"white"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: "white" }}>
                <CustomNavigator_Top
                    title="정보입력"
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
                            isDisabled={false}
                            id={"email"}
                            value={email}
                            changeValue={change_email}
                            placeholder="아이디(이메일)"
                            success={email_check === 2}
                            success_text={"사용 가능한 이메일입니다."}
                            error={email_check === 1}
                            error_text={"중복된 이메일입니다."}
                            btn={true}
                            btn_text={"중복확인"}
                            btn_onPress={() => {
                                check_email();
                            }}
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
                            isDisabled={false}
                            id={"name"}
                            value={name}
                            changeValue={change_name}
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
                            value={sex}
                            setValue={setSex}
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
                            onPress={() => setDateOpen(true)}
                            style={{
                                width: 320,
                                height: 55,
                                borderWidth: 1,
                                borderColor: "#e4e4e4",
                                borderRadius: 10,
                                justifyContent: "center",
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
                                {date.getFullYear()}.{date.getMonth() + 1}.{" "}
                                {date.getDate()}
                            </Text>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            mode="date"
                            open={dateOpen}
                            date={date}
                            onConfirm={(date) => {
                                setDateOpen(false);
                                setDate(date);
                            }}
                            onCancel={() => {
                                setDateOpen(false);
                            }}
                        />
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
                                email != "" &&
                                password != "" &&
                                password_check != "" &&
                                name != "" &&
                                phone != "" &&
                                phone_check != "" &&
                                nickname != "" &&
                                password == password_check &&
                                email_check == 2 &&
                                nickname_check == 2
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
                            email != "" &&
                                password != "" &&
                                password_check != "" &&
                                name != "" &&
                                phone != "" &&
                                phone_check != "" &&
                                nickname != "" &&
                                password == password_check &&
                                email_check == 2 &&
                                nickname_check == 2 && { opacity: 1 },
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
                            다음
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
