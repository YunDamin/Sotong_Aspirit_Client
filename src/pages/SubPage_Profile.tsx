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
    Modal,
} from "react-native";

import Profile_Svg from "../public/icons/photo/profile.svg";
import Btn_Toggle_On from "../public/icons/btn/btn_toggle_on.svg";
import Btn_Toggle_Off from "../public/icons/btn/btn_toggle_off.svg";

import { RadarChart, PieChart } from "react-native-charts-wrapper";

import Swiper from "react-native-web-swiper";

// Navigator
import CustomNavigator_Top from "../navigators/CustomNavigator_Top";

import Card_FAQ from "../components/Card_FAQ";
import Card_TasteNote_Whisky from "../components/Card_TasteNote_Whisky";
import Card_Graph from "../components/Card_Graph";
import Field_Text from "../components/Field_Text";

import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";
import { REACT_APP_API_KEY } from "@env";

import { useRecoilState } from "recoil";
import { login_data, login_state } from "../atoms/login_state";
import { user, user_state } from "../atoms/get_user";

function transformArray(fruits: string[]) {
    const counts: any = {};
    fruits.forEach((fruit) => {
        counts[fruit] = (counts[fruit] || 0) + 1;
    });

    return Object.keys(counts).map((key) => ({ name: key, num: counts[key] }));
}

export default function SubPage_Profile({ navigation, route }: any) {
    const [loginState, setLoginState] = useRecoilState<login_data>(login_state);
    const [userState, setUserState] = useRecoilState<user>(user_state);
    const [user, setUser] = React.useState<any>(null);

    const [notes, setNotes] = React.useState<any[]>([]);
    const [viewNoteData, setViewNoteData] = React.useState<any>([]);
    const [view, setView] = React.useState(0);

    const [smells, setSmells] = React.useState<any[]>([]);
    const [tastes, setTastes] = React.useState<any[]>([]);
    const [finishs, setFinishs] = React.useState<any[]>([]);
    const user_id = route.params.user_id;

    useFocusEffect(
        React.useCallback(() => {
            console.log("SubPage_Profile Focus");
            axios
                .get(REACT_APP_API_KEY + "/users/user/" + user_id + "/summary")
                .then((res) => {
                    setUser(res.data);
                });
            axios
                .get(REACT_APP_API_KEY + "/users/user/" + user_id + "/palate")
                .then((res) => {
                    setNotes(res.data.notes);
                    setViewNoteData(
                        res.data?.notes.slice().reverse().slice(0, 4)
                    );
                    setView(4);

                    setSmells(res.data.smells);
                    setTastes(res.data.tastes);
                    setFinishs(res.data.finishs);
                });
            return () => {};
        }, [])
    );

    const [loading, setLoading] = React.useState(false);
    const loadMoreData = () => {
        if (!loading) {
            setLoading(true);

            setViewNoteData([
                ...viewNoteData,
                ...notes
                    .slice()
                    .reverse()
                    .slice(view, view + 4),
            ]);
            setView(view + 4);

            setLoading(false);
        }
    };

    const [isModalVisible, setModaVisible] = React.useState(false);
    const toggleModal = () => {
        setModaVisible(!isModalVisible);
        setReportType(0);
        setReportText("");
    };
    const [modalType, setModalType] = React.useState<string>("");

    const [isSettingsVisible, setSettingsVisible] = React.useState(false);
    const toggleSettings = () => {
        setSettingsVisible(!isSettingsVisible);
    };

    const [reportType, setReportType] = React.useState<number>(0);
    const [reportText, setReportText] = React.useState<string>("");

    const report = () => {
        let reason: string = "";

        switch (reportType) {
            case 0:
                reason = "비매너";
                break;
            case 1:
                reason = "욕설 및 비방";
                break;
            case 2:
                reason = "성희롱";
                break;
            case 3:
                reason = "프로필 이미지";
                break;
            case 4:
                reason = reportText;
                break;
        }

        axios
            .post(
                REACT_APP_API_KEY + "/users/report/",
                {
                    user_id: loginState.user_id,
                    target_user_id: user_id,
                    reason: reason,
                },
                {
                    headers: {
                        Authorization: loginState.accessToken,
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
            });
    };

    const block = () => {
        axios
            .post(
                REACT_APP_API_KEY + "/users/block/",
                {
                    user_id: loginState.user_id,
                    target_user_id: user_id,
                },
                {
                    headers: {
                        Authorization: loginState.accessToken,
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
                navigation.goBack();
            });
    };

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: "#FCECDE" }} />
            <StatusBar barStyle="light-content" backgroundColor={"#FCECDE"} />
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <CustomNavigator_Top
                    title="위스키 프로필"
                    goBack={() => {
                        navigation.goBack();
                    }}
                    onModify={() => {
                        toggleSettings();
                    }}
                    whatBtn={
                        loginState.user_id == user_id ? "share" : "share_modify"
                    }
                    background={true}
                />
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => {
                        toggleModal();
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                top: 0,
                                backgroundColor: "#000000",
                                opacity: 0.7,
                            }}
                        />
                        <View
                            style={{
                                width: 320,
                                position: "absolute",
                                alignItems: "flex-end",
                                justifyContent: "center",
                            }}
                        >
                            {modalType == "report" && (
                                <View
                                    style={{
                                        width: 320,
                                        backgroundColor: "#ffffff",
                                        borderRadius: 10,
                                        alignItems: "center",
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => toggleModal()}
                                        style={{
                                            position: "absolute",
                                            top: 20,
                                            right: 20,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "700",
                                                fontSize: 18,
                                                color: "#000000",
                                            }}
                                        >
                                            X
                                        </Text>
                                    </TouchableOpacity>
                                    <Text
                                        style={{
                                            fontFamily: "Spoqa Han Sans Neo",
                                            fontWeight: "700",
                                            fontSize: 16,
                                            marginTop: 20,
                                            marginBottom: 20,
                                            color: "#000000",
                                        }}
                                    >
                                        신고하기
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => setReportType(0)}
                                        style={{
                                            width: 320,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            paddingLeft: 20,
                                            marginBottom: 10,
                                        }}
                                    >
                                        {reportType == 0 ? (
                                            <Btn_Toggle_On />
                                        ) : (
                                            <Btn_Toggle_Off />
                                        )}
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "500",
                                                fontSize: 16,
                                                color: "#000000",
                                                marginLeft: 20,
                                            }}
                                        >
                                            비매너
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setReportType(1)}
                                        style={{
                                            width: 320,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            paddingLeft: 20,
                                            marginBottom: 10,
                                        }}
                                    >
                                        {reportType == 1 ? (
                                            <Btn_Toggle_On />
                                        ) : (
                                            <Btn_Toggle_Off />
                                        )}
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "500",
                                                fontSize: 16,
                                                color: "#000000",
                                                marginLeft: 20,
                                            }}
                                        >
                                            욕설 및 비방
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setReportType(2)}
                                        style={{
                                            width: 320,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            paddingLeft: 20,
                                            marginBottom: 10,
                                        }}
                                    >
                                        {reportType == 2 ? (
                                            <Btn_Toggle_On />
                                        ) : (
                                            <Btn_Toggle_Off />
                                        )}
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "500",
                                                fontSize: 16,
                                                color: "#000000",
                                                marginLeft: 20,
                                            }}
                                        >
                                            성희롱
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setReportType(3)}
                                        style={{
                                            width: 320,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            paddingLeft: 20,
                                            marginBottom: 10,
                                        }}
                                    >
                                        {reportType == 3 ? (
                                            <Btn_Toggle_On />
                                        ) : (
                                            <Btn_Toggle_Off />
                                        )}
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "500",
                                                fontSize: 16,
                                                color: "#000000",
                                                marginLeft: 20,
                                            }}
                                        >
                                            프로필 이미지
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setReportType(4)}
                                        style={{
                                            width: 320,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            paddingLeft: 20,
                                            marginBottom: 10,
                                        }}
                                    >
                                        {reportType == 4 ? (
                                            <Btn_Toggle_On />
                                        ) : (
                                            <Btn_Toggle_Off />
                                        )}
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "500",
                                                fontSize: 16,
                                                color: "#000000",
                                                marginLeft: 20,
                                            }}
                                        >
                                            기타
                                        </Text>
                                    </TouchableOpacity>
                                    <Field_Text
                                        placeholder="기타 사유 입력"
                                        style={{ width: 280 }}
                                        isDisabled={reportType != 4}
                                        isNeccesary={false}
                                        id={"text"}
                                        value={reportText}
                                        changeValue={(
                                            name: string,
                                            text: string
                                        ) => {
                                            setReportText(text);
                                        }}
                                    />
                                    <TouchableOpacity
                                        onPress={() =>
                                            setModalType("report_confirm")
                                        }
                                        style={{
                                            width: 280,
                                            height: 55,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: 10,
                                            backgroundColor: "#974B1A",
                                            marginVertical: 15,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "500",
                                                fontSize: 16,
                                                color: "#ffffff",
                                            }}
                                        >
                                            신고하기
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            {modalType == "report_confirm" && (
                                <View
                                    style={{
                                        width: 320,
                                        backgroundColor: "#ffffff",
                                        borderRadius: 10,
                                        alignItems: "center",
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => toggleModal()}
                                        style={{
                                            position: "absolute",
                                            top: 20,
                                            right: 20,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "700",
                                                fontSize: 18,
                                                color: "#000000",
                                            }}
                                        >
                                            X
                                        </Text>
                                    </TouchableOpacity>
                                    <Text
                                        style={{
                                            fontFamily: "Spoqa Han Sans Neo",
                                            fontWeight: "700",
                                            fontSize: 16,
                                            marginTop: 20,
                                            marginBottom: 20,
                                            color: "#000000",
                                        }}
                                    >
                                        신고하기
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: "Spoqa Han Sans Neo",
                                            fontWeight: "500",
                                            fontSize: 14,
                                            marginTop: 20,
                                            marginBottom: 20,
                                            color: "#000000",
                                        }}
                                    >
                                        허위 신고의 경우, 이용의 제한될 수
                                        있습니다.
                                    </Text>
                                    <View
                                        style={{
                                            width: 280,
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                toggleModal();
                                            }}
                                            style={{
                                                width: 133,
                                                height: 53,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderWidth: 1,
                                                borderColor: "#974B1A",
                                                borderRadius: 10,
                                                backgroundColor: "#ffffff",
                                                marginVertical: 15,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "500",
                                                    fontSize: 16,
                                                    color: "#974B1A",
                                                }}
                                            >
                                                취소
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                report();
                                                toggleModal();
                                            }}
                                            style={{
                                                width: 135,
                                                height: 55,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: 10,
                                                backgroundColor: "#974B1A",
                                                marginVertical: 15,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "500",
                                                    fontSize: 16,
                                                    color: "#ffffff",
                                                }}
                                            >
                                                확인
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            {modalType == "block" && (
                                <View
                                    style={{
                                        width: 320,
                                        backgroundColor: "#ffffff",
                                        borderRadius: 10,
                                        alignItems: "center",
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => toggleModal()}
                                        style={{
                                            position: "absolute",
                                            top: 20,
                                            right: 20,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "700",
                                                fontSize: 18,
                                                color: "#000000",
                                            }}
                                        >
                                            X
                                        </Text>
                                    </TouchableOpacity>
                                    <Text
                                        style={{
                                            fontFamily: "Spoqa Han Sans Neo",
                                            fontWeight: "700",
                                            fontSize: 16,
                                            marginTop: 20,
                                            marginBottom: 20,
                                            color: "#000000",
                                        }}
                                    >
                                        차다한기
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: "Spoqa Han Sans Neo",
                                            fontWeight: "500",
                                            fontSize: 14,
                                            marginTop: 20,
                                            marginBottom: 20,
                                            color: "#000000",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: "#D6690F",
                                                fontWeight: "700",
                                            }}
                                        >
                                            {user.user_nick_name ?? ""}
                                        </Text>
                                        <Text>님을 정말 차단하시겠습니까?</Text>
                                    </Text>
                                    <View
                                        style={{
                                            width: 280,
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                toggleModal();
                                            }}
                                            style={{
                                                width: 133,
                                                height: 53,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderWidth: 1,
                                                borderColor: "#974B1A",
                                                borderRadius: 10,
                                                backgroundColor: "#ffffff",
                                                marginVertical: 15,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "500",
                                                    fontSize: 16,
                                                    color: "#974B1A",
                                                }}
                                            >
                                                취소
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                block();
                                                toggleModal();
                                            }}
                                            style={{
                                                width: 135,
                                                height: 55,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: 10,
                                                backgroundColor: "#974B1A",
                                                marginVertical: 15,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "500",
                                                    fontSize: 16,
                                                    color: "#ffffff",
                                                }}
                                            >
                                                확인
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                </Modal>
                {isSettingsVisible && (
                    <View
                        style={{
                            width: 70,
                            height: 84,
                            borderRadius: 10,
                            borderColor: "#EDEDED",
                            borderWidth: 1,
                            position: "absolute",
                            backgroundColor: "white",
                            right: 20,
                            top: 40,
                            zIndex: 10,
                            overflow: "hidden",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                setModalType("block");
                                toggleSettings();
                                toggleModal();
                            }}
                            style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "500",
                                    fontSize: 14,
                                    color: "#000000",
                                }}
                            >
                                차단
                            </Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                width: 50,
                                height: 1,
                                backgroundColor: "#F7F7F7",
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setModalType("report");
                                toggleSettings();
                                toggleModal();
                            }}
                            style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "500",
                                    fontSize: 14,
                                    color: "#000000",
                                }}
                            >
                                신고
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
                <View
                    style={{
                        width: "100%",
                        backgroundColor: "#FCECDE",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            width: 320,
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
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
                            {(user?.img_urls?.length ?? 0) > 0 ? (
                                <Image
                                    source={{ uri: user?.img_urls[0] }}
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
                        <View style={{ marginLeft: 20 }}>
                            <Text
                                style={{
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "700",
                                    fontSize: 16,
                                    color: "#000000",
                                }}
                            >
                                {user?.user_nick_name ?? ""}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "400",
                                    fontSize: 12,
                                    color: "#888888",
                                    marginTop: 5,
                                }}
                            >
                                {user?.user_email ?? ""}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            width: 320,
                            borderRadius: 10,
                            backgroundColor: "#ffffff",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 15,
                            marginBottom: 25,
                            paddingLeft: 20,
                            paddingRight: 20,
                            paddingTop: 15,
                            paddingBottom: 15,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "Spoqa Han Sans Neo",
                                fontWeight: "700",
                                fontSize: 16,
                                color: "#000000",
                                textAlign: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "400",
                                    fontSize: 12,
                                    color: "#5B5B5B",
                                }}
                            >
                                {"작성노트\t\t "}
                            </Text>
                            <Text>
                                {(
                                    user?.user_notes?.length ?? 0
                                ).toLocaleString()}
                            </Text>
                        </Text>
                        <View
                            style={{
                                width: 1,
                                height: 25,
                                backgroundColor: "#E4E4E4",
                            }}
                        />
                        <Text
                            style={{
                                fontFamily: "Spoqa Han Sans Neo",
                                fontWeight: "700",
                                fontSize: 16,
                                color: "#000000",
                                textAlign: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "400",
                                    fontSize: 12,
                                    color: "#5B5B5B",
                                }}
                            >
                                {"평균평점\t\t "}
                            </Text>
                            <Text>{(user?.user_av ?? 0).toFixed(1)}</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView
                    style={{
                        flex: 1,
                        width: "100%",
                        marginTop: 15,
                    }}
                    scrollEventThrottle={16}
                >
                    <View
                        style={{
                            width: "100%",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                width: 320,
                                height: 45,
                                alignItems: "center",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text style={styles.m_text}>
                                {user?.user_nick_name ?? ""}님
                                <Text
                                    style={{
                                        fontWeight: "400",
                                    }}
                                >
                                    {" 위스키 취향 분석"}
                                </Text>
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate(
                                        "SubPage_Profile_Whisky",
                                        {
                                            smells: transformArray(smells),
                                            tastes: transformArray(tastes),
                                            finishs: transformArray(finishs),
                                        }
                                    );
                                }}
                            >
                                <Text
                                    style={[
                                        styles.m_text,
                                        {
                                            fontWeight: "400",
                                            color: "#888888",
                                        },
                                    ]}
                                >
                                    + 상세보기
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {smells.length > 0 &&
                            tastes.length > 0 &&
                            finishs.length > 0 && (
                                <Swiper
                                    loop={true}
                                    timeout={3}
                                    controlsEnabled={true}
                                    containerStyle={{
                                        width: 320,
                                        height: 240,
                                    }}
                                    controlsProps={{
                                        prevPos: false,
                                        nextPos: false,
                                        dotActiveStyle: {
                                            backgroundColor: "#D6690F",
                                        },
                                    }}
                                >
                                    {[
                                        <View key={0}>
                                            <View
                                                style={{
                                                    width: 320,
                                                    height: 30,
                                                    borderRadius: 20,
                                                    backgroundColor: "#F7F7F7",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Spoqa Han Sans Neo",
                                                        fontWeight: "700",
                                                        fontSize: 12,
                                                        color: "#000000",
                                                    }}
                                                >
                                                    선호하는 노즈 TOP5
                                                </Text>
                                            </View>
                                            <Card_Graph
                                                title="노즈"
                                                des="(향)"
                                                rates={transformArray(smells)}
                                                isSmall={true}
                                            />
                                        </View>,
                                        <View key={1}>
                                            <View
                                                style={{
                                                    width: 320,
                                                    height: 30,
                                                    borderRadius: 20,
                                                    backgroundColor: "#F7F7F7",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Spoqa Han Sans Neo",
                                                        fontWeight: "700",
                                                        fontSize: 12,
                                                        color: "#000000",
                                                    }}
                                                >
                                                    선호하는 팔레트 TOP5
                                                </Text>
                                            </View>
                                            <Card_Graph
                                                title="팔레트"
                                                des="(중간맛)"
                                                rates={transformArray(tastes)}
                                                isSmall={true}
                                            />
                                        </View>,
                                        <View key={2}>
                                            <View
                                                style={{
                                                    width: 320,
                                                    height: 30,
                                                    borderRadius: 20,
                                                    backgroundColor: "#F7F7F7",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Spoqa Han Sans Neo",
                                                        fontWeight: "700",
                                                        fontSize: 12,
                                                        color: "#000000",
                                                    }}
                                                >
                                                    선호하는 피니시 TOP5
                                                </Text>
                                            </View>
                                            <Card_Graph
                                                title="피니시"
                                                des="(끝맛)"
                                                rates={transformArray(finishs)}
                                                isSmall={true}
                                            />
                                        </View>,
                                    ]}
                                </Swiper>
                            )}
                        <View
                            style={{
                                width: "100%",
                                height: 4,
                                backgroundColor: "#F8F8F8",
                                marginVertical: 15,
                            }}
                        />
                        <View
                            style={{
                                width: 320,
                                height: 45,
                                alignItems: "center",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginBottom: 10,
                            }}
                        >
                            <Text style={[styles.m_text, { fontSize: 16 }]}>
                                테이스팅 노트
                                <Text
                                    style={{
                                        color: "#D6690F",
                                    }}
                                >
                                    {` (${notes?.length ?? 0})`}
                                </Text>
                            </Text>
                        </View>
                        {(viewNoteData?.length ?? 0) > 0 &&
                            viewNoteData.map((note: any, index: number) => {
                                return (
                                    <Card_TasteNote_Whisky
                                        key={index}
                                        onPress={() => {
                                            navigation.navigate(
                                                "SubPage_Whisky",
                                                { whisky_id: note.whisky }
                                            );
                                        }}
                                        onPressDetail={() => {
                                            navigation.navigate(
                                                "SubPage_TastingNote_Single",
                                                {
                                                    user_id: user_id,
                                                    whisky_id: note.whisky,
                                                    tasting_id: note.note,
                                                }
                                            );
                                        }}
                                        onPressUser={() => {
                                            navigation.navigate(
                                                "SubPage_Profile",
                                                { user_id: user_id }
                                            );
                                        }}
                                        whisky_id={note.whisky}
                                        tasting_id={note.note}
                                        user_id={user_id}
                                    />
                                );
                            })}
                        <TouchableOpacity
                            onPress={() => {
                                if (notes?.length > view) {
                                    setViewNoteData([
                                        ...viewNoteData,
                                        ...notes
                                            .slice()
                                            .reverse()
                                            .slice(view, view + 4),
                                    ]);
                                    setView(view + 4);
                                }
                            }}
                            style={[
                                {
                                    width: 320,
                                    height: 35,
                                    backgroundColor: "#974B1A",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 15,
                                    marginBottom: 20,
                                },
                            ]}
                        >
                            <Text
                                style={{
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "500",
                                    color: "#FFFFFF",
                                    textAlign: "center",
                                }}
                            >
                                + 더보기
                            </Text>
                        </TouchableOpacity>
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
    },
    m_text: {
        fontFamily: "Spoqa Han Sans Neo",
        fontWeight: "700",
        fontSize: 12,
        color: "#000000",
        textAlign: "left",
    },
});
