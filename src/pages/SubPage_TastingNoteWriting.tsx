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

import Btn_OnOff_Arrow_Right from "../public/icons/btn/btn_onoff_right_arrow.svg";

// Navigator
import CustomNavigator_Top from "../navigators/CustomNavigator_Top";

// Components
import SelectBar_Color from "../components/SelectBar_Color";

export default function SubPage_TastingNoteWriting({ navigation }: any) {
    const next_step = () => {};

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={"white"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: "white" }}>
                <CustomNavigator_Top
                    title="테이스팅 노트 작성"
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
                        <TouchableOpacity
                            style={[
                                {
                                    width: 320,
                                    height: 110,
                                    marginTop: 25,
                                    backgroundColor: "#FBF8F2",
                                },
                                styles.border_box,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.text,
                                    {
                                        fontWeight: "500",
                                        fontSize: 14,
                                        color: "#000000",
                                    },
                                ]}
                            >
                                + 위스키 선택
                            </Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 40 }} />
                        <Text style={{ width: 320, marginBottom: 5 }}>
                            <Text style={styles.subtitle_text}>색</Text>
                        </Text>
                        <SelectBar_Color
                            select_elements={[
                                "투명한",
                                "짚",
                                "꿀",
                                "금",
                                "호박",
                                "카라멜",
                                "마호가니",
                            ]}
                        />
                        <View style={{ marginTop: 40 }} />
                        <Text style={{ width: 320, marginBottom: 5 }}>
                            <Text style={styles.subtitle_text}>노즈</Text>
                            <Text style={styles.subtitle_des_text}>
                                {" (향)"}
                            </Text>
                        </Text>
                        <View style={{ marginTop: 40 }} />
                        <Text style={{ width: 320, marginBottom: 5 }}>
                            <Text style={styles.subtitle_text}>팔레트</Text>
                            <Text style={styles.subtitle_des_text}>
                                {" (중간맛)"}
                            </Text>
                        </Text>
                        <View style={{ marginTop: 40 }} />
                        <Text style={{ width: 320, marginBottom: 5 }}>
                            <Text style={styles.subtitle_text}>피니시</Text>
                            <Text style={styles.subtitle_des_text}>
                                {" (끝맛)"}
                            </Text>
                        </Text>
                        <View style={{ marginTop: 40 }} />
                        <Text style={{ width: 320, marginBottom: 5 }}>
                            <Text style={styles.subtitle_text}>상세 리뷰</Text>
                            <Text
                                style={[
                                    styles.subtitle_text,
                                    { color: "#D6690F" },
                                ]}
                            >
                                {" *"}
                            </Text>
                        </Text>
                        <View style={{ marginTop: 40 }} />
                        <Text style={{ width: 320, marginBottom: 5 }}>
                            <Text style={styles.subtitle_text}>사진 첨부</Text>
                        </Text>
                        <View style={{ marginTop: 40 }} />
                        <Text style={{ width: 320, marginBottom: 5 }}>
                            <Text style={styles.subtitle_text}>
                                영수증 사진 첨부
                            </Text>
                        </Text>
                    </View>
                </ScrollView>
                <View style={{ width: "100%", alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={() => {
                            next_step();
                        }}
                        style={[
                            {
                                width: 320,
                                height: 55,
                                backgroundColor: "#974B1A",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                            },
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
                            작성 완료
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
    text: {
        fontFamily: "Spoqa Han Sans Neo",
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
    border_box: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#E4E4E4",
        borderStyle: "dashed",
        alignItems: "center",
        justifyContent: "center",
    },
});
