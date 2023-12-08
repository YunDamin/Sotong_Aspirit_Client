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

import Profile_Svg from "../public/icons/photo/profile.svg";

import Swiper from "react-native-web-swiper";

// Navigator
import CustomNavigator_Top from "../navigators/CustomNavigator_Top";

import Card_FAQ from "../components/Card_FAQ";
import Card_TasteNote_Whisky from "../components/Card_TasteNote_Whisky";
import Card_Graph from "../components/Card_Graph";

import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";
import { API_KEY } from "@env";

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
    const [userState, setUserState] = useRecoilState<user>(user_state);
    const [user, setUser] = React.useState<any>(null);
    const [notes, setNotes] = React.useState<any[]>([]);
    const [smells, setSmells] = React.useState<any[]>([]);
    const [tastes, setTastes] = React.useState<any[]>([]);
    const [finishs, setFinishs] = React.useState<any[]>([]);
    const user_id = route.params.user_id;

    useFocusEffect(
        React.useCallback(() => {
            console.log("SubPage_Profile Focus");
            axios
                .get(API_KEY + "/users/user/" + user_id + "/summary")
                .then((res) => {
                    setUser(res.data);
                });
            axios
                .get(API_KEY + "/users/user/" + user_id + "/palate")
                .then((res) => {
                    setNotes(res.data.notes);
                    setSmells(res.data.smells);
                    setTastes(res.data.tastes);
                    setFinishs(res.data.finishs);
                });
            return () => {};
        }, [])
    );

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
                    whatBtn="share"
                    background={true}
                />
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
                                    {" "}
                                    위스키 취향 분석
                                </Text>
                            </Text>
                            <TouchableOpacity>
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
                        <Swiper
                            loop={true}
                            timeout={3}
                            controlsEnabled={true}
                            containerStyle={{
                                width: 300,
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
                                <>
                                    <Text>ssss</Text>
                                    <Card_Graph
                                        title="노즈"
                                        des="(향)"
                                        rates={transformArray(smells ?? [])}
                                    />
                                </>,
                                <Card_Graph
                                    title="팔레트"
                                    des="(중간맛)"
                                    rates={transformArray(smells ?? [])}
                                />,
                                <Card_Graph
                                    title="피니시"
                                    des="(끝맛)"
                                    rates={transformArray(smells ?? [])}
                                />,
                            ]}
                        </Swiper>
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
                        {(notes?.length ?? 0) > 0 &&
                            notes.map((note) => {
                                return (
                                    <Card_TasteNote_Whisky
                                        onPress={() => {
                                            navigation.navigate(
                                                "SubPage_Whisky",
                                                { whisky_id: note.whisky }
                                            );
                                        }}
                                        whisky_id={note.whisky}
                                        tasting_id={note.note}
                                        user_id={user_id}
                                    />
                                );
                            })}
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
