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
    Image,
} from "react-native";

import Icon_Star from "../public/icons/icons/icon_star.svg";
import SSSS from "../public/icons/btn/ssss.svg";

import StarRating, { StarRatingDisplay } from "react-native-star-rating-widget";

interface Props {
    whisky_id?: string;
    onPress: () => void;
    tasting_id: string;
    user_id: string;
}

import axios from "axios";
import { API_KEY } from "@env";

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

export default function Card_TasteNote_Whisky(props: Props) {
    const [whisky, setWhisky] = React.useState<any>(null);
    const [note, setNote] = React.useState<any>(null);
    const [user, setUser] = React.useState<any>(null);

    let date: Date = new Date();

    React.useEffect(() => {
        if (props.whisky_id) {
            axios
                .get(API_KEY + "/whiskys/whisky/" + props.whisky_id)
                .then((res) => {
                    setWhisky(res.data.data);
                });
        }
        axios.get(API_KEY + "/notes/note/" + props.tasting_id).then((res) => {
            setNote(res.data.data);
            date = new Date(res.data.data.date);
        });
        axios
            .get(API_KEY + "/users/user/" + props.user_id + "/summary")
            .then((res) => {
                setUser(res.data);
            });
    }, []);

    return (
        <View
            style={{
                width: 316,
                borderWidth: 2,
                borderRadius: 10,
                borderColor: "#F7F7F7",
                overflow: "hidden",
                justifyContent: "center",
                paddingLeft: 13,
                paddingRight: 13,
                marginBottom: 20,
            }}
        >
            {props.whisky_id ? (
                <View style={{ width: 290 }}>
                    <TouchableOpacity
                        onPress={() => {
                            props.onPress();
                        }}
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                width: 60,
                                height: 80,
                                borderRadius: 10,
                                overflow: "hidden",
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                        >
                            {whisky?.img_urls[0] && (
                                <Image
                                    source={{ uri: whisky?.img_urls[0] }}
                                    height={80}
                                    style={{ resizeMode: "cover" }}
                                />
                            )}
                        </View>
                        <View
                            style={{
                                height: 80,
                                marginLeft: 20,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "700",
                                    fontSize: 14,
                                    color: "#000000",
                                    marginTop: 5,
                                }}
                            >
                                {whisky?.name_kor ?? ""}
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
                                {whisky?.name_eng ?? ""}
                            </Text>
                            <View
                                style={{
                                    height: 20,
                                    display: "flex",
                                    flexDirection: "row",
                                    marginTop: 15,
                                    alignItems: "center",
                                }}
                            >
                                <Icon_Star />
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "700",
                                        fontSize: 12,
                                        color: "#000000",
                                        marginLeft: 5,
                                        textAlign: "center",
                                    }}
                                >
                                    {`${whisky?.note_av?.toFixed(1) ?? "0"} (${
                                        whisky?.note_num?.toLocaleString() ??
                                        "0"
                                    })`}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                            }}
                        >
                            <SSSS />
                        </View>
                    </TouchableOpacity>
                    <View
                        style={{
                            width: 290,
                            height: 4,
                            backgroundColor: "#F7F7F7",
                        }}
                    />
                </View>
            ) : null}
            <View style={{ width: 290, marginTop: 20 }}>
                <View
                    style={{
                        width: 290,
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "Spoqa Han Sans Neo",
                            fontWeight: "700",
                            fontSize: 16,
                            textAlign: "left",
                            color: "#000000",
                        }}
                    >
                        총점
                    </Text>
                    <StarRatingDisplay
                        style={{
                            position: "absolute",
                            top: -3,
                            left: 97.4,
                            width: 0,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        starSize={20}
                        starStyle={{
                            width: 9,
                        }}
                        color={"#D6690F"}
                        maxStars={5}
                        rating={note?.allRate.toFixed(1) ?? ""}
                    />
                    <Text
                        style={[
                            styles.text,
                            {
                                position: "absolute",
                                top: -1,
                                left: 160,
                                fontWeight: "700",
                                fontSize: 16,
                            },
                        ]}
                    >
                        {note?.allRate.toFixed(1) ?? ""}
                    </Text>
                    <Text
                        style={{
                            fontFamily: "Spoqa Han Sans Neo",
                            fontWeight: "400",
                            fontSize: 12,
                            textAlign: "right",
                            color: "#888888",
                        }}
                    >
                        {`${date.getFullYear()}.${
                            date.getMonth() + 1
                        }.${date.getDate()}`}
                    </Text>
                </View>
                <View
                    style={{
                        width: 290,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 20,
                    }}
                >
                    <Text style={styles.text}>{"노  즈"}</Text>
                    <StarRatingDisplay
                        style={{
                            position: "absolute",
                            top: -3,
                            left: 60,
                            width: 0,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        starSize={20}
                        starStyle={{
                            width: 9,
                        }}
                        color={"#D6690F"}
                        maxStars={1}
                        rating={1}
                    />
                    <Text
                        style={[
                            styles.text,
                            {
                                position: "absolute",
                                top: -1,
                                left: 80,
                                fontSize: 14,
                            },
                        ]}
                    >
                        {note?.noseRate.toFixed(1) ?? ""}
                    </Text>
                </View>
                <View
                    style={{
                        width: 290,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 20,
                    }}
                >
                    <Text style={styles.text}>{"팔레트"}</Text>
                    <StarRatingDisplay
                        style={{
                            position: "absolute",
                            top: -3,
                            left: 60,
                            width: 0,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        starSize={20}
                        starStyle={{
                            width: 9,
                        }}
                        color={"#D6690F"}
                        maxStars={1}
                        rating={1}
                    />
                    <Text
                        style={[
                            styles.text,
                            {
                                position: "absolute",
                                top: -1,
                                left: 80,
                                fontSize: 14,
                            },
                        ]}
                    >
                        {note?.palateRate.toFixed(1) ?? ""}
                    </Text>
                </View>
                <View
                    style={{
                        width: 290,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 20,
                    }}
                >
                    <Text style={styles.text}>{"피니시"}</Text>
                    <StarRatingDisplay
                        style={{
                            position: "absolute",
                            top: -3,
                            left: 60,
                            width: 0,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        starSize={20}
                        starStyle={{
                            width: 9,
                        }}
                        color={"#D6690F"}
                        maxStars={1}
                        rating={1}
                    />
                    <Text
                        style={[
                            styles.text,
                            {
                                position: "absolute",
                                top: -1,
                                left: 80,
                                fontSize: 14,
                            },
                        ]}
                    >
                        {note?.finishRate.toFixed(1) ?? ""}
                    </Text>
                </View>
            </View>
            <View
                style={{
                    width: 290,
                    height: 1,
                    backgroundColor: "#F7F7F7",
                    marginTop: 15,
                    marginBottom: 15,
                }}
            />
            <View
                style={{
                    width: 290,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Text style={styles.text}>{"색"}</Text>
                <View
                    style={{
                        width: 23,
                        height: 23,
                        position: "absolute",
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: "#EDEDED",
                        top: -3,
                        left: 60,
                        backgroundColor: get_color(
                            get_color_index(note?.color_index ?? "")
                        ),
                    }}
                />
                <Text
                    style={[
                        styles.text,
                        {
                            fontSize: 14,
                            fontWeight: "500",
                            position: "absolute",
                            left: 90,
                        },
                    ]}
                >
                    {note?.color_index ?? ""}
                </Text>
            </View>
            <View
                style={{
                    width: 290,
                    height: 1,
                    backgroundColor: "#F7F7F7",
                    marginTop: 15,
                    marginBottom: 15,
                }}
            />
            <View
                style={{
                    width: 290,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Text style={styles.text}>
                    {"노즈 "}
                    <Text
                        style={{
                            fontSize: 10,
                            fontWeight: "400",
                            color: "#888888",
                        }}
                    >
                        (향)
                    </Text>
                </Text>
            </View>
            <View
                style={{
                    width: 290,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    marginTop: 7,
                }}
            >
                {note?.nose?.map((data: any, index: number) => {
                    return (
                        <View
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
                            <Text style={styles.text}>{data ?? ""}</Text>
                        </View>
                    );
                })}
            </View>
            <View style={{ marginTop: 20 }} />
            <View
                style={{
                    width: 290,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Text style={styles.text}>
                    {"팔레트 "}
                    <Text
                        style={{
                            fontSize: 10,
                            fontWeight: "400",
                            color: "#888888",
                        }}
                    >
                        (중간맛)
                    </Text>
                </Text>
            </View>
            <View
                style={{
                    width: 290,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    marginTop: 7,
                }}
            >
                {note?.palate?.map((data: any, index: number) => {
                    return (
                        <View
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
                            <Text style={styles.text}>{data ?? ""}</Text>
                        </View>
                    );
                })}
            </View>
            <View style={{ marginTop: 20 }} />
            <View
                style={{
                    width: 290,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Text style={styles.text}>
                    {"피니시 "}
                    <Text
                        style={{
                            fontSize: 10,
                            fontWeight: "400",
                            color: "#888888",
                        }}
                    >
                        (끝맛)
                    </Text>
                </Text>
            </View>
            <View
                style={{
                    width: 290,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    marginTop: 7,
                }}
            >
                {note?.finish?.map((data: any, index: number) => {
                    return (
                        <View
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
                            <Text style={styles.text}>{data ?? ""}</Text>
                        </View>
                    );
                })}
            </View>
            <View style={{ marginTop: 20 }} />
            <View
                style={{
                    width: 290,
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderRadius: 10,
                    backgroundColor: "#FBF8F2",
                    marginBottom: 20,
                }}
            >
                <View
                    style={{
                        width: 260,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        marginTop: 20,
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: 100,
                            backgroundColor: "white",
                        }}
                    ></View>
                    <View
                        style={{
                            height: 40,
                            marginLeft: 10,
                            justifyContent: "space-between",
                        }}
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
                            {user?.user_nick_name ?? ""}
                        </Text>
                        <Text style={styles.text}>
                            <Text>작성노트</Text>
                            <Text> </Text>
                            <Text
                                style={{ color: "#757575", fontWeight: "700" }}
                            >
                                {user?.user_notes?.length.toLocaleString() ??
                                    ""}
                            </Text>
                            <Text>{"  |  "}</Text>
                            <Text>평균평점</Text>
                            <Text> </Text>
                            <Text
                                style={{ color: "#757575", fontWeight: "700" }}
                            >
                                {user?.user_av?.toFixed(1) ?? ""}
                            </Text>
                        </Text>
                    </View>
                </View>
                <Text
                    style={[styles.text, { marginTop: 20, marginBottom: 20 }]}
                >
                    {note?.review ?? ""}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "Spoqa Han Sans Neo",
        fontWeight: "500",
        fontSize: 12,
        textAlign: "left",
        color: "#424242",
    },
});
