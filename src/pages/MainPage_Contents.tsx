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

import { useFocusEffect } from "@react-navigation/native";

import Bg_Cup from "../public/icons/bg/cup.svg";
import Icon_Contents from "../public/icons/icons/icon_contents.svg";
import Btn_Setting from "../public/icons/btn/btn_setting.svg";
import Btn_Bell_On from "../public/icons/btn/btn_bell_on.svg";
import Btn_Bell_Off from "../public/icons/btn/btn_bell_off.svg";
import Btn_My from "../public/icons/btn/btn_my.svg";

// Components
import Card_News_Whisky_Big from "../components/Card_News_Whisky_Big";

import Btn_Floating from "../public/icons/btn/btn_floating.svg";
import is_login from "../isLogin";

interface Props {
    press: () => void;
}

const FloatingBtn = (props: Props) => {
    return (
        <TouchableOpacity
            style={{
                width: 70,
                height: 70,
                position: "absolute",
                bottom: 20,
                right: 20,
                backgroundColor: "transparent",
            }}
            onPress={props.press}
        >
            <Btn_Floating />
        </TouchableOpacity>
    );
};

import { useRecoilState } from "recoil";

import { login_data, login_state } from "../atoms/login_state";
import {
    content,
    contents_news,
    contents_guide,
    contents_article,
    contents_notice,
} from "../atoms/get_contents";

import axios from "axios";
import { API_KEY } from "@env";

import { user, user_state } from "../atoms/get_user";

export default function MainPage_Contents({ navigation }: any) {
    const [loginState, setLoginState] = useRecoilState<login_data>(login_state);
    const [userState, setUserState] = useRecoilState<user>(user_state);

    const [contentsNews, setContentsNews] =
        useRecoilState<content[]>(contents_news);
    const [contentsGuide, setContentsGuide] =
        useRecoilState<content[]>(contents_guide);
    const [contentsArticle, setContentsArticle] =
        useRecoilState<content[]>(contents_article);
    const [contentsNotice, setContentsNotice] =
        useRecoilState<content[]>(contents_notice);

    useFocusEffect(
        React.useCallback(() => {
            console.log("MainPage_Contents Focus");

            if (loginState.is_login && !loginState.survey) {
                console.log("Go to SurveyPage_Main");
                navigation.navigate("SurveyPage_Main", {
                    edit: false,
                });
            }

            axios.get(API_KEY + "/contents?type=news").then((res) => {
                setContentsNews(res.data);
            });
            axios.get(API_KEY + "/contents?type=guide").then((res) => {
                setContentsGuide(res.data);
            });
            axios.get(API_KEY + "/contents?type=article").then((res) => {
                setContentsArticle(res.data);
            });
            axios.get(API_KEY + "/contents?type=notice").then((res) => {
                setContentsNotice(res.data);
            });

            if (loginState.is_login) {
                axios
                    .get(
                        API_KEY +
                            "/users/user/" +
                            loginState.user_id +
                            "/summary",
                        {
                            headers: {
                                authorization: loginState.accessToken,
                            },
                        }
                    )
                    .then((res) => {
                        setUserState({
                            user_name: res.data.user_name,
                            user_birth: res.data.user_birth,
                            user_sex: res.data.user_sex,
                            user_email: res.data.user_email,
                            user_nick_name: res.data.user_nick_name,
                            user_notes: res.data.user_notes,
                            user_av: res.data.user_av,
                            img_urls: res.data.img_urls,
                        });
                    });
            }

            return () => {};
        }, [])
    );

    const [tabIndex, setTabIndex] = React.useState<number>(0);

    const topPosition = React.useRef(new Animated.Value(170));

    const handleScroll = (event: any) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        Animated.timing(topPosition.current, {
            toValue: scrollY > 50 ? 70 : 170,
            duration: 50,
            useNativeDriver: false,
        }).start();
    };

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: "#974B1A" }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <View style={styles.page}>
                    <View style={styles.top}>
                        {/* 얼룩 무늬 */}
                        <View
                            style={{
                                height: 150,
                                position: "absolute",
                                right: 0,
                            }}
                        >
                            <Bg_Cup />
                        </View>
                        {/* 위스키 콘텐츠 텍스트 및 알람 프로필 */}
                        <View
                            style={{
                                height: 40,
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "row",
                            }}
                        >
                            <View
                                style={{
                                    height: 40,
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    flexDirection: "row",
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "300",
                                        fontSize: 20,
                                        color: "#ffffff",
                                    }}
                                >
                                    위스키
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "700",
                                        fontSize: 20,
                                        color: "#ffffff",
                                        marginLeft: 5,
                                    }}
                                >
                                    콘텐츠
                                </Text>
                                <View style={{ marginLeft: 5 }}>
                                    <Icon_Contents />
                                </View>
                            </View>
                            <View
                                style={{
                                    height: 40,
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    flexDirection: "row",
                                }}
                            >
                                <TouchableOpacity
                                    style={{ width: 40, height: 40 }}
                                    onPress={() => {
                                        if (loginState.is_login)
                                            navigation.navigate(
                                                "SubPage_Alert"
                                            );
                                        else
                                            navigation.navigate(
                                                "SubNavigator_Login"
                                            );
                                    }}
                                >
                                    {loginState.is_login ? (
                                        <Btn_Bell_On />
                                    ) : (
                                        <Btn_Bell_Off />
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ width: 40, height: 40 }}
                                    onPress={() => {
                                        if (loginState.is_login)
                                            navigation.navigate(
                                                "SubPage_MyPage"
                                            );
                                        else
                                            navigation.navigate(
                                                "SubNavigator_Login"
                                            );
                                    }}
                                >
                                    <Btn_My />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* Vertical Line */}
                        <View
                            style={{
                                marginTop: 20,
                                height: 1,
                                backgroundColor: "#ffffff",
                                opacity: 0.1,
                            }}
                        />
                        {/* 환영 인사 + 프로필 요약 && 설정 버튼 */}
                        <View
                            style={{
                                marginTop: 20,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <View>
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "700",
                                        fontSize: 16,
                                        color: "#ffffff",
                                        marginTop: 5,
                                    }}
                                >
                                    {loginState.is_login
                                        ? `환영합니다. ${userState.user_nick_name}님`
                                        : "로그인이 필요합니다."}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "400",
                                        fontSize: 12,
                                        color: "#ffffff",
                                        opacity: 0.4,
                                        marginTop: 5,
                                    }}
                                >
                                    {loginState.is_login ? (
                                        <>
                                            <Text>작성노트 </Text>
                                            <Text>
                                                {userState.user_notes.length.toLocaleString()}
                                            </Text>
                                            <Text> · </Text>
                                            <Text>평균평점 </Text>
                                            <Text>
                                                {userState.user_av.toFixed(1)}
                                            </Text>
                                        </>
                                    ) : (
                                        "로그인이 필요합니다."
                                    )}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("SubPage_Settings")
                                }
                                style={{ width: 25, height: 25 }}
                            >
                                <Btn_Setting />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Animated.View
                        style={[styles.container, { top: topPosition.current }]}
                    >
                        <ScrollView
                            style={styles.scroll_container}
                            onScroll={handleScroll}
                            scrollEventThrottle={3}
                            showsVerticalScrollIndicator={false}
                        >
                            {/* 탭 버튼 */}
                            <View
                                style={{
                                    marginTop: 10,
                                    width: "100%",
                                    height: 30,
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                    }}
                                    onPress={() => {
                                        setTabIndex(0);
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: "Spoqa Han Sans Neo",
                                            fontWeight: "700",
                                            fontSize: 14,
                                            color:
                                                tabIndex === 0
                                                    ? "#D6690F"
                                                    : "#888888",
                                            textAlign: "center",
                                        }}
                                    >
                                        뉴스
                                    </Text>
                                    <View
                                        style={{
                                            marginTop: 10,
                                            height: tabIndex === 0 ? 3 : 1,
                                            backgroundColor:
                                                tabIndex === 0
                                                    ? "#D6690F"
                                                    : "#888888",
                                            opacity: tabIndex === 0 ? 1 : 0.5,
                                        }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                    }}
                                    onPress={() => {
                                        setTabIndex(1);
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: "Spoqa Han Sans Neo",
                                            fontWeight: "700",
                                            fontSize: 14,
                                            color:
                                                tabIndex === 1
                                                    ? "#D6690F"
                                                    : "#888888",
                                            textAlign: "center",
                                        }}
                                    >
                                        가이드
                                    </Text>
                                    <View
                                        style={{
                                            marginTop: 10,
                                            height: tabIndex === 1 ? 3 : 1,
                                            backgroundColor:
                                                tabIndex === 1
                                                    ? "#D6690F"
                                                    : "#888888",
                                            opacity: tabIndex === 1 ? 1 : 0.5,
                                        }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                    }}
                                    onPress={() => {
                                        setTabIndex(2);
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: "Spoqa Han Sans Neo",
                                            fontWeight: "700",
                                            fontSize: 14,
                                            color:
                                                tabIndex === 2
                                                    ? "#D6690F"
                                                    : "#888888",
                                            textAlign: "center",
                                        }}
                                    >
                                        아티클
                                    </Text>
                                    <View
                                        style={{
                                            marginTop: 10,
                                            height: tabIndex === 2 ? 3 : 1,
                                            backgroundColor:
                                                tabIndex === 2
                                                    ? "#D6690F"
                                                    : "#888888",
                                            opacity: tabIndex === 2 ? 1 : 0.5,
                                        }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                    }}
                                    onPress={() => {
                                        setTabIndex(3);
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: "Spoqa Han Sans Neo",
                                            fontWeight: "700",
                                            fontSize: 14,
                                            color:
                                                tabIndex === 3
                                                    ? "#D6690F"
                                                    : "#888888",
                                            textAlign: "center",
                                        }}
                                    >
                                        공지
                                    </Text>
                                    <View
                                        style={{
                                            marginTop: 10,
                                            height: tabIndex === 3 ? 3 : 1,
                                            backgroundColor:
                                                tabIndex === 3
                                                    ? "#D6690F"
                                                    : "#888888",
                                            opacity: tabIndex === 3 ? 1 : 0.5,
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                            {/* 콘텐츠 */}
                            <View
                                style={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    marginTop: 20,
                                    marginBottom: 20,
                                    paddingLeft: 20,
                                }}
                            >
                                <View>
                                    <Text
                                        style={{
                                            fontFamily: "Spoqa Han Sans Neo",
                                            fontWeight: "700",
                                            fontSize: 16,
                                            color: "#000000",
                                        }}
                                    >
                                        {
                                            [
                                                "위스키 뉴스 📰️",
                                                "가이드",
                                                "아티클",
                                                "공지",
                                            ][tabIndex]
                                        }
                                    </Text>
                                </View>
                            </View>
                            {tabIndex === 0 &&
                                contentsNews
                                    .slice()
                                    .reverse()
                                    .map((content, index) => {
                                        return (
                                            <Card_News_Whisky_Big
                                                key={index}
                                                content={content}
                                                onPress={() => {
                                                    navigation.navigate(
                                                        "SubPage_Content",
                                                        { content: content }
                                                    );
                                                }}
                                            />
                                        );
                                    })}
                            {tabIndex === 1 &&
                                contentsGuide
                                    .slice()
                                    .reverse()
                                    .map((content, index) => {
                                        return (
                                            <Card_News_Whisky_Big
                                                key={index}
                                                content={content}
                                                onPress={() => {
                                                    navigation.navigate(
                                                        "SubPage_Content",
                                                        { content: content }
                                                    );
                                                }}
                                            />
                                        );
                                    })}
                            {tabIndex === 2 &&
                                contentsArticle
                                    .slice()
                                    .reverse()
                                    .map((content, index) => {
                                        return (
                                            <Card_News_Whisky_Big
                                                key={index}
                                                content={content}
                                                onPress={() => {
                                                    navigation.navigate(
                                                        "SubPage_Content",
                                                        { content: content }
                                                    );
                                                }}
                                            />
                                        );
                                    })}
                            {tabIndex === 3 &&
                                contentsNotice
                                    .slice()
                                    .reverse()
                                    .map((content, index) => {
                                        return (
                                            <Card_News_Whisky_Big
                                                key={index}
                                                content={content}
                                                onPress={() => {
                                                    navigation.navigate(
                                                        "SubPage_Content",
                                                        { content: content }
                                                    );
                                                }}
                                            />
                                        );
                                    })}
                            <View style={{ height: 40 }} />
                            {/* 여분 */}
                            <View style={{ height: 60 }} />
                            <View style={{ height: 60 }} />
                            <View style={{ height: 60 }} />
                        </ScrollView>
                    </Animated.View>
                </View>
                <FloatingBtn
                    press={() => {
                        if (loginState.is_login)
                            navigation.navigate("SubPage_TastingNoteWriting");
                        else navigation.navigate("SubNavigator_Login");
                    }}
                />
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#974B1A",
    },
    top: {
        paddingLeft: 20,
        paddingRight: 20,
        ...Platform.select({
            ios: {
                paddingTop: 0,
            },
            android: {
                paddingTop: 20,
            },
        }),
        width: "100%",
        height: 150,
    },
    container: {
        position: "absolute",
        top: 150,
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        ...Platform.select({
            ios: {
                shadowColor: "rgb(50, 50, 50)",
                shadowOpacity: 0.5,
                shadowRadius: 10,
                shadowOffset: {
                    height: -2,
                    width: 0,
                },
            },
            android: {
                elevation: 3,
            },
        }),
    },
    scroll_container: {
        paddingTop: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: "hidden",
    },
});
