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

import StarRating, { StarRatingDisplay } from "react-native-star-rating-widget";
import Swiper from "react-native-web-swiper";

// Navigator
import CustomNavigator_Top from "../navigators/CustomNavigator_Top";

// Components
import SelectBar_Color from "../components/SelectBar_Color";
import Card_Graph from "../components/Card_Graph";
import Card_TasteNote_Whisky from "../components/Card_TasteNote_Whisky";

import axios from "axios";
import { API_KEY } from "@env";

function transformArray(fruits: string[]) {
    const counts: any = {};
    fruits.forEach((fruit) => {
        counts[fruit] = (counts[fruit] || 0) + 1;
    });

    return Object.keys(counts).map((key) => ({ name: key, num: counts[key] }));
}

export default function SubPage_Whisky({ navigation, route }: any) {
    let whisky_id = route.params.whisky_id;

    const [data, setData] = React.useState<any>(null);
    const [noteData, setNoteData] = React.useState<any>([]);
    const [viewNoteData, setViewNoteData] = React.useState<any>([]);
    const [view, setView] = React.useState(0);

    useFocusEffect(
        React.useCallback(() => {
            console.log("SubPage_Whisky Focus");
            axios.get(API_KEY + "/whiskys/whisky/" + whisky_id).then((res) => {
                setData(res.data?.data);
            });

            axios.get(API_KEY + "/notes/whisky/" + whisky_id).then((res) => {
                setNoteData(res.data?.data);
                setViewNoteData(res.data?.data.slice().reverse().slice(0, 4));
                setView(view + 4);
            });

            return () => {};
        }, [])
    );

    const get_color = (index: number): string => {
        if (index == 0) return "#FFFFFF";
        else if (index == 1) return "#F2DA6B";
        else if (index == 2) return "#EFC964";
        else if (index == 3) return "#E2A249";
        else if (index == 4) return "#D06E3B";
        else if (index == 5) return "#A4422C";
        else if (index == 6) return "#5D2518";

        return "#FFFFFF";
    };
    const get_color_index = (color: string): number => {
        switch (color.trim()) {
            case "투명한":
                return 0;
            case "짚":
                return 1;
            case "꿀":
                return 2;
            case "금":
                return 3;
            case "호박":
                return 4;
            case "카라멜":
                return 5;
            case "마호가니":
                return 6;
            default:
                return 0;
        }
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={"white"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: "white" }}>
                <CustomNavigator_Top
                    title=""
                    goBack={() => {
                        navigation.goBack();
                    }}
                    whatBtn="share"
                />
            </SafeAreaView>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <View
                    style={{
                        flex: 1,
                        width: "100%",
                    }}
                >
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
                                    width: "100%",
                                    height: 440,
                                    backgroundColor: "#000000",
                                }}
                            >
                                {(data?.img_urls?.length ?? 0) > 0 && (
                                    <Swiper
                                        loop={true}
                                        timeout={3}
                                        controlsEnabled={true}
                                        containerStyle={{
                                            width: "100%",
                                            height: 440,
                                        }}
                                        controlsProps={{
                                            prevPos: false,
                                            nextPos: false,
                                            dotActiveStyle: {
                                                backgroundColor: "#D6690F",
                                            },
                                        }}
                                    >
                                        {data.img_urls.map(
                                            (item: any, index: number) => {
                                                return (
                                                    <Image
                                                        key={index}
                                                        source={{ uri: item }}
                                                        height={440}
                                                        style={{
                                                            resizeMode: "cover",
                                                        }}
                                                    />
                                                );
                                            }
                                        )}
                                    </Swiper>
                                )}
                            </View>
                            <Text
                                style={{
                                    width: 320,
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "700",
                                    fontSize: 20,
                                    color: "#000000",
                                    textAlign: "left",
                                    marginTop: 20,
                                }}
                            >
                                {data?.name_kor}
                            </Text>
                            <Text
                                style={{
                                    width: 320,
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "400",
                                    fontSize: 16,
                                    color: "#888888",
                                    textAlign: "left",
                                    marginTop: 5,
                                }}
                            >
                                {data?.name_eng}
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignSelf: "flex-start",
                                    marginLeft: 20,
                                    marginTop: 20,
                                }}
                            >
                                <StarRatingDisplay
                                    style={{
                                        width: 120,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    starSize={20}
                                    starStyle={{
                                        width: 9,
                                    }}
                                    color={"#D6690F"}
                                    rating={data?.note_av.toFixed(1) ?? 0}
                                />
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "700",
                                        fontSize: 14,
                                        color: "#000000",
                                        textAlign: "left",
                                    }}
                                >
                                    <Text>
                                        {data?.note_av.toFixed(1) ?? ""}
                                    </Text>
                                    <Text>{` (${
                                        data?.note_num.toLocaleString() ?? ""
                                    })`}</Text>
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: 320,
                                    marginTop: 20,
                                    marginBottom: 20,
                                    backgroundColor: "#FBF8F2",
                                    borderRadius: 10,
                                    alignItems: "flex-start",
                                    justifyContent: "space-between",
                                    paddingTop: 20,
                                    paddingBottom: 20,
                                    paddingLeft: 20,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "400",
                                        fontSize: 14,
                                        color: "#000000",
                                        textAlign: "left",
                                        marginBottom: 10,
                                    }}
                                >
                                    <Text>{"도   수 : "}</Text>
                                    <Text style={{ fontWeight: "700" }}>
                                        {data?.abv ?? ""}
                                    </Text>
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "400",
                                        fontSize: 14,
                                        color: "#000000",
                                        textAlign: "left",
                                        marginBottom: 10,
                                    }}
                                >
                                    <Text>{"용   량 : "}</Text>
                                    <Text style={{ fontWeight: "700" }}>
                                        {data?.ml ?? ""}
                                    </Text>
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "400",
                                        fontSize: 14,
                                        color: "#000000",
                                        textAlign: "left",
                                        marginBottom: 10,
                                    }}
                                >
                                    <Text>{"양조장 : "}</Text>
                                    <Text style={{ fontWeight: "700" }}>
                                        {data?.brewery_id.join(", ") ?? ""}
                                    </Text>
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "400",
                                        fontSize: 14,
                                        color: "#000000",
                                        textAlign: "left",
                                    }}
                                >
                                    <Text>{"원산지 : "}</Text>
                                    <Text style={{ fontWeight: "700" }}>
                                        {data?.origin_dcds.join(", ") ?? ""}
                                    </Text>
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: "100%",
                                    height: 4,
                                    backgroundColor: "#F8F8F8",
                                }}
                            />
                            <View
                                style={{
                                    width: 320,
                                    marginTop: 20,
                                    marginBottom: 20,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "700",
                                        fontSize: 14,
                                        color: "#000000",
                                        textAlign: "left",
                                    }}
                                >
                                    색
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 24,
                                            height: 24,
                                            borderWidth: 1,
                                            borderColor: "#EDEDED",
                                            borderRadius: 5,
                                            backgroundColor: get_color(
                                                get_color_index(
                                                    data?.color_dcd[0] ?? ""
                                                )
                                            ),
                                            marginRight: 10,
                                        }}
                                    />
                                    <Text
                                        style={{
                                            fontFamily: "Spoqa Han Sans Neo",
                                            fontWeight: "500",
                                            fontSize: 14,
                                            color: "#000000",
                                            textAlign: "right",
                                        }}
                                    >
                                        {data?.color_dcd ?? ""}
                                    </Text>
                                </View>
                            </View>
                            <SelectBar_Color
                                disable={true}
                                index={get_color_index(
                                    data?.color_dcd[0] ?? ""
                                )}
                            />
                            <View
                                style={{
                                    width: 320,
                                    marginTop: 20,
                                    marginBottom: 10,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "700",
                                        fontSize: 14,
                                        color: "#000000",
                                        textAlign: "left",
                                    }}
                                >
                                    <Text>노즈</Text>
                                    <Text
                                        style={{
                                            fontWeight: "400",
                                            fontSize: 12,
                                            color: "#888888",
                                        }}
                                    >
                                        {" (향)"}
                                    </Text>
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: 320,
                                    alignItems: "flex-start",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                }}
                            >
                                {data?.nose_dcds.map(
                                    (item: any, index: any) => {
                                        if (item == "") return null;
                                        return (
                                            <View
                                                key={index}
                                                style={{
                                                    height: 25,
                                                    paddingLeft: 5,
                                                    paddingRight: 5,
                                                    borderWidth: 1,
                                                    borderRadius: 5,
                                                    borderColor: "#EDEDED",
                                                    justifyContent: "center",
                                                    marginRight: 7,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Spoqa Han Sans Neo",
                                                        fontWeight: "500",
                                                        fontSize: 12,
                                                        color: "#000000",
                                                        textAlign: "left",
                                                    }}
                                                >
                                                    {item}
                                                </Text>
                                            </View>
                                        );
                                    }
                                ) ?? null}
                            </View>
                            <View
                                style={{
                                    width: 320,
                                    marginTop: 20,
                                    marginBottom: 10,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "700",
                                        fontSize: 14,
                                        color: "#000000",
                                        textAlign: "left",
                                    }}
                                >
                                    <Text>팔레트</Text>
                                    <Text
                                        style={{
                                            fontWeight: "400",
                                            fontSize: 12,
                                            color: "#888888",
                                        }}
                                    >
                                        {" (중간맛)"}
                                    </Text>
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: 320,
                                    alignItems: "flex-start",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                }}
                            >
                                {data?.palate_dcds.map(
                                    (item: any, index: any) => {
                                        if (item == "") return null;
                                        return (
                                            <View
                                                key={index}
                                                style={{
                                                    height: 25,
                                                    paddingLeft: 5,
                                                    paddingRight: 5,
                                                    borderWidth: 1,
                                                    borderRadius: 5,
                                                    borderColor: "#EDEDED",
                                                    justifyContent: "center",
                                                    marginRight: 7,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Spoqa Han Sans Neo",
                                                        fontWeight: "500",
                                                        fontSize: 12,
                                                        color: "#000000",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {item}
                                                </Text>
                                            </View>
                                        );
                                    }
                                ) ?? null}
                            </View>
                            <View
                                style={{
                                    width: 320,
                                    marginTop: 20,
                                    marginBottom: 10,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "700",
                                        fontSize: 14,
                                        color: "#000000",
                                        textAlign: "left",
                                    }}
                                >
                                    <Text>피니시</Text>
                                    <Text
                                        style={{
                                            fontWeight: "400",
                                            fontSize: 12,
                                            color: "#888888",
                                        }}
                                    >
                                        {" (끝맛)"}
                                    </Text>
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: 320,
                                    alignItems: "flex-start",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                }}
                            >
                                {data?.finish_dcds.map(
                                    (item: any, index: any) => {
                                        if (item == "") return null;
                                        return (
                                            <View
                                                key={index}
                                                style={{
                                                    height: 25,
                                                    paddingLeft: 5,
                                                    paddingRight: 5,
                                                    borderWidth: 1,
                                                    borderRadius: 5,
                                                    borderColor: "#EDEDED",
                                                    justifyContent: "center",
                                                    marginRight: 7,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Spoqa Han Sans Neo",
                                                        fontWeight: "500",
                                                        fontSize: 12,
                                                        color: "#000000",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {item}
                                                </Text>
                                            </View>
                                        );
                                    }
                                ) ?? null}
                            </View>
                            <View
                                style={{
                                    width: "100%",
                                    height: 4,
                                    backgroundColor: "#F8F8F8",
                                    marginTop: 20,
                                    marginBottom: 20,
                                }}
                            />
                            <View
                                style={{
                                    width: 320,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "700",
                                        fontSize: 14,
                                        color: "#000000",
                                        textAlign: "left",
                                    }}
                                >
                                    추천 페어링
                                </Text>
                            </View>
                            {data?.pairing_id.map((item: any, index: any) => {
                                if (item == "") return null;
                                return (
                                    <View
                                        key={index}
                                        style={{
                                            width: 320,
                                            height: 55,
                                            borderColor: "#EDEDED",
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginTop: 10,
                                        }}
                                    >
                                        <View
                                            style={{
                                                marginLeft: 10,
                                                marginRight: 15,
                                                width: 35,
                                                height: 35,
                                                borderRadius: 100,
                                                backgroundColor: "#000000",
                                                overflow: "hidden",
                                            }}
                                        >
                                            <Image
                                                source={{
                                                    uri: data
                                                        ?.pairing_image_urls_set[
                                                        index
                                                    ][0],
                                                }}
                                                height={35}
                                                style={{ resizeMode: "cover" }}
                                            />
                                        </View>
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "500",
                                                fontSize: 14,
                                                color: "#000000",
                                                textAlign: "left",
                                            }}
                                        >
                                            {item}
                                        </Text>
                                    </View>
                                );
                            }) ?? null}
                            <View
                                style={{
                                    width: "100%",
                                    height: 4,
                                    backgroundColor: "#F8F8F8",
                                    marginTop: 20,
                                    marginBottom: 20,
                                }}
                            />
                            <View
                                style={{
                                    width: 320,
                                    marginBottom: 10,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "700",
                                        fontSize: 14,
                                        color: "#000000",
                                        textAlign: "left",
                                    }}
                                >
                                    양조장 정보
                                </Text>
                            </View>
                            {data?.brewery_id.map((item: any, index: any) => {
                                if (item == "") return null;
                                return (
                                    <View key={index}>
                                        <View
                                            style={{
                                                marginTop: 10,
                                                marginBottom: 20,
                                                width: 320,
                                                height: 35,
                                                borderColor: "#EFEFEF",
                                                borderWidth: 1,
                                                borderRadius: 10,
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    width: 320,
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "700",
                                                    fontSize: 14,
                                                    color: "#000000",
                                                    textAlign: "center",
                                                }}
                                            >
                                                {item ?? ""}
                                            </Text>
                                        </View>
                                        <Text
                                            style={{
                                                width: 320,
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "400",
                                                fontSize: 12,
                                                color: "#000000",
                                                textAlign: "left",
                                            }}
                                        >
                                            {data.brewery_des[index] ?? ""}
                                        </Text>
                                    </View>
                                );
                            }) ?? null}

                            <View
                                style={{
                                    width: "100%",
                                    height: 4,
                                    backgroundColor: "#F8F8F8",
                                    marginTop: 20,
                                    marginBottom: 20,
                                }}
                            />
                            <Text
                                style={{
                                    width: 320,
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "700",
                                    fontSize: 14,
                                    color: "#000000",
                                    textAlign: "left",
                                    marginBottom: 20,
                                }}
                            >
                                <Text>총 평점</Text>
                                <Text
                                    style={{ color: "#D6690F" }}
                                >{` (${data?.note_num.toLocaleString()})`}</Text>
                            </Text>
                            <View style={{ width: 320, flexDirection: "row" }}>
                                <View
                                    style={{
                                        width: 120,
                                    }}
                                >
                                    <Text
                                        style={{
                                            width: 120,
                                            fontFamily: "Spoqa Han Sans Neo",
                                            fontWeight: "700",
                                            fontSize: 24,
                                            color: "#000000",
                                            textAlign: "center",
                                            marginBottom: 10,
                                        }}
                                    >
                                        {data?.note_av.toFixed(1) ?? ""}
                                    </Text>
                                    <StarRatingDisplay
                                        style={{
                                            width: 120,
                                            justifyContent: "center",
                                            position: "absolute",
                                            bottom: 15,
                                            left: -5,
                                        }}
                                        starSize={20}
                                        starStyle={{
                                            width: 9,
                                        }}
                                        color={"#D6690F"}
                                        rating={data?.note_av.toFixed(1) ?? 0.0}
                                    />
                                </View>
                                <View
                                    style={{
                                        width: 1,
                                        height: 74,
                                        backgroundColor: "#EDEDED",
                                        marginLeft: 10,
                                        marginRight: 10,
                                    }}
                                />
                                <View
                                    style={{
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                width: 40,
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "700",
                                                fontSize: 14,
                                                color: "#000000",
                                                textAlign: "left",
                                            }}
                                        >
                                            {"노즈"}
                                        </Text>
                                        <StarRatingDisplay
                                            style={{
                                                width: 120,
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                            starSize={20}
                                            starStyle={{
                                                width: 9,
                                            }}
                                            color={"#D6690F"}
                                            rating={
                                                data?.note_nose_av.toFixed(1) ??
                                                0.0
                                            }
                                        />
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "700",
                                                fontSize: 14,
                                                color: "#000000",
                                                textAlign: "left",
                                            }}
                                        >
                                            {data?.note_nose_av.toFixed(1) ??
                                                ""}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                width: 40,
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "700",
                                                fontSize: 14,
                                                color: "#000000",
                                                textAlign: "left",
                                            }}
                                        >
                                            {"팔레트"}
                                        </Text>
                                        <StarRatingDisplay
                                            style={{
                                                width: 120,
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                            starSize={20}
                                            starStyle={{
                                                width: 9,
                                            }}
                                            color={"#D6690F"}
                                            rating={
                                                data?.note_palate_av.toFixed(
                                                    1
                                                ) ?? ""
                                            }
                                        />
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "700",
                                                fontSize: 14,
                                                color: "#000000",
                                                textAlign: "left",
                                            }}
                                        >
                                            {data?.note_palate_av.toFixed(1) ??
                                                ""}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                width: 40,
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "700",
                                                fontSize: 14,
                                                color: "#000000",
                                                textAlign: "left",
                                            }}
                                        >
                                            {"피니시"}
                                        </Text>
                                        <StarRatingDisplay
                                            style={{
                                                width: 120,
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                            starSize={20}
                                            starStyle={{
                                                width: 9,
                                            }}
                                            color={"#D6690F"}
                                            rating={
                                                data?.note_finish_av.toFixed(
                                                    1
                                                ) ?? 0.0
                                            }
                                        />
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "700",
                                                fontSize: 14,
                                                color: "#000000",
                                                textAlign: "left",
                                            }}
                                        >
                                            {data?.note_finish_av.toFixed(1) ??
                                                ""}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{
                                    width: 320,
                                    height: 1,
                                    backgroundColor: "#F7F7F7",
                                    marginTop: 10,
                                    marginBottom: 20,
                                }}
                            />
                            <Card_Graph
                                title="노즈"
                                des="(향)"
                                rates={transformArray(
                                    data?.note_nose_taste ?? []
                                )}
                            />
                            <View
                                style={{
                                    width: 320,
                                    height: 1,
                                    backgroundColor: "#F7F7F7",
                                    marginTop: 10,
                                    marginBottom: 20,
                                }}
                            />
                            <Card_Graph
                                title="팔레트"
                                des="(맛)"
                                rates={transformArray(
                                    data?.note_palate_taste ?? []
                                )}
                            />
                            <View
                                style={{
                                    width: 320,
                                    height: 1,
                                    backgroundColor: "#F7F7F7",
                                    marginTop: 10,
                                    marginBottom: 20,
                                }}
                            />
                            <Card_Graph
                                title="피니시"
                                des="(맛)"
                                rates={transformArray(
                                    data?.note_finish_taste ?? []
                                )}
                            />
                            <View
                                style={{
                                    width: "100%",
                                    height: 4,
                                    backgroundColor: "#F8F8F8",
                                    marginTop: 20,
                                    marginBottom: 20,
                                }}
                            />
                            <Text
                                style={{
                                    width: 320,
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "700",
                                    fontSize: 14,
                                    color: "#000000",
                                    textAlign: "left",
                                    marginBottom: 20,
                                }}
                            >
                                <Text>테이스팅 노트</Text>
                                <Text style={{ color: "#D6690F" }}>{` (${
                                    data?.note_num.toLocaleString() ?? ""
                                })`}</Text>
                            </Text>
                            {viewNoteData.map((data: any, index: any) => {
                                return (
                                    <Card_TasteNote_Whisky
                                        key={index}
                                        tasting_id={data.tasting_id}
                                        user_id={data.user_id}
                                        onPressDetail={() => {
                                            navigation.navigate(
                                                "SubPage_TastingNote_Single",
                                                {
                                                    user_id: data.user_id,
                                                    whisky_id: whisky_id,
                                                    tasting_id: data.tasting_id,
                                                }
                                            );
                                        }}
                                        onPressUser={() => {
                                            navigation.navigate(
                                                "SubPage_Profile",
                                                { user_id: data.user_id }
                                            );
                                        }}
                                        onPress={() => {}}
                                    />
                                );
                            })}
                            <TouchableOpacity
                                onPress={() => {
                                    if (noteData.length > view) {
                                        setViewNoteData([
                                            ...viewNoteData,
                                            ...noteData
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
                                        fontSize: 18,
                                        color: "#FFFFFF",
                                        textAlign: "center",
                                    }}
                                >
                                    + 더보기
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
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
