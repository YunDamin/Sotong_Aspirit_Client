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
    processColor,
    Image,
} from "react-native";

import Profile_Svg from "../public/icons/photo/profile.svg";

import { RadarChart, PieChart } from "react-native-charts-wrapper";

import Swiper from "react-native-web-swiper";

// Navigator
import CustomNavigator_Top from "../navigators/CustomNavigator_Top";

import Card_FAQ from "../components/Card_FAQ";
import Card_TasteNote_Whisky from "../components/Card_TasteNote_Whisky";
import Card_Graph from "../components/Card_Graph";

import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";
import { REACT_APP_API_KEY } from "@env";

import { useRecoilState } from "recoil";
import { login_data, login_state } from "../atoms/login_state";
import { user, user_state } from "../atoms/get_user";

export default function SubPage_TastingNote({ navigation, route }: any) {
    const user_id = route.params.user_id;

    const [notes, setNotes] = React.useState<any[]>([]);
    const [viewNoteData, setViewNoteData] = React.useState<any>([]);
    const [view, setView] = React.useState(0);

    useFocusEffect(
        React.useCallback(() => {
            console.log("SubPage_TastingNote Focus");
            axios
                .get(REACT_APP_API_KEY + "/users/user/" + user_id + "/palate")
                .then((res) => {
                    setNotes(res.data.notes);
                    setViewNoteData(
                        res.data?.notes.slice().reverse().slice(0, 4)
                    );
                    setView(4);
                });
            return () => {};
        }, [])
    );

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={"white"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: "white" }}>
                <CustomNavigator_Top
                    title="테이스팅 노트 관리"
                    goBack={() => {
                        navigation.goBack();
                    }}
                />
            </SafeAreaView>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <ScrollView
                    style={{
                        flex: 1,
                        width: "100%",
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
                                                { user_id: note?.user_id ?? "" }
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
        fontSize: 16,
        color: "#000000",
        textAlign: "left",
    },
});
