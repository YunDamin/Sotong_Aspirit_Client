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
    Modal,
} from "react-native";

import Icon_Star from "../public/icons/icons/icon_star.svg";
import SSSS from "../public/icons/btn/ssss.svg";
import Profile_Svg from "../public/icons/photo/little_profile.svg";
import Icon_Check_Bill from "../public/icons/icons/icon_check_bill.svg";

import { RadarChart, PieChart } from "react-native-charts-wrapper";
import StarRating, { StarRatingDisplay } from "react-native-star-rating-widget";

import Swiper from "react-native-web-swiper";

// Navigator
import CustomNavigator_Top from "../navigators/CustomNavigator_Top";

import Card_FAQ from "../components/Card_FAQ";
import Card_Graph from "../components/Card_Graph";

import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";
import { API_KEY } from "@env";

import { useRecoilState } from "recoil";
import { login_data, login_state } from "../atoms/login_state";
import { user, user_state } from "../atoms/get_user";

export default function SubPage_TastingNote_Single({ navigation, route }: any) {
    const [loginState, setLoginState] = useRecoilState<login_data>(login_state);
    const [userState, setUserState] = useRecoilState<user>(user_state);

    const user_id = route.params.user_id;
    const whisky_id = route.params.whisky_id;
    const tasting_id = route.params.tasting_id;

    const [whisky, setWhisky] = React.useState<any>(null);
    const [note, setNote] = React.useState<any>(null);
    const [user, setUser] = React.useState<any>(null);

    let date: Date = new Date();

    useFocusEffect(
        React.useCallback(() => {
            console.log("SubPage_TastingNote_Signle Focus");
            if (whisky_id) {
                axios
                    .get(API_KEY + "/whiskys/whisky/" + whisky_id)
                    .then((res) => {
                        setWhisky(res.data.data);
                    });
            }
            axios.get(API_KEY + "/notes/note/" + tasting_id).then((res) => {
                setNote(res.data.data);
                date = new Date(res.data.data.date);
            });
            axios
                .get(API_KEY + "/users/user/" + user_id + "/summary")
                .then((res) => {
                    setUser(res.data);
                });
            return () => {};
        }, [])
    );

    const [modalImage, setModalImage] = React.useState<string>("");
    const [isModalVisible, setModaVisible] = React.useState(false);
    const toggleModal = () => {
        setModaVisible(!isModalVisible);
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={"white"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: "white" }}>
                <CustomNavigator_Top
                    title="테이스팅 노트 상세"
                    goBack={() => {
                        navigation.goBack();
                    }}
                    whatBtn="modify"
                    onModify={() => {}}
                />
            </SafeAreaView>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
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
                            <TouchableOpacity
                                onPress={() => {
                                    toggleModal();
                                }}
                                style={{
                                    width: 20,
                                    height: 40,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "700",
                                        fontSize: 24,
                                        color: "white",
                                    }}
                                >
                                    X
                                </Text>
                            </TouchableOpacity>
                            <Image
                                source={{ uri: modalImage }}
                                width={320}
                                height={320}
                                style={{ resizeMode: "cover" }}
                            />
                        </View>
                    </View>
                </Modal>
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
                                alignItems: "center",
                            }}
                        >
                            {whisky_id ? (
                                <View style={{ width: 320 }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate(
                                                "SubPage_Whisky",
                                                {
                                                    whisky_id: whisky_id,
                                                }
                                            );
                                        }}
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            borderColor: "#EDEDED",
                                            paddingLeft: 15,
                                            paddingRight: 15,
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
                                                    source={{
                                                        uri: whisky
                                                            ?.img_urls[0],
                                                    }}
                                                    height={80}
                                                    style={{
                                                        resizeMode: "cover",
                                                    }}
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
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
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
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
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
                                                        fontFamily:
                                                            "Spoqa Han Sans Neo",
                                                        fontWeight: "700",
                                                        fontSize: 12,
                                                        color: "#000000",
                                                        marginLeft: 5,
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {`${
                                                        whisky?.note_av?.toFixed(
                                                            1
                                                        ) ?? "0"
                                                    } (${
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
                                                right: 25,
                                            }}
                                        >
                                            <SSSS />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ) : null}
                            <View style={{ width: 320, marginTop: 20 }}>
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
                                        width: 320,
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
                                        width: 320,
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
                                        width: 320,
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
                                    width: 320,
                                    height: 1,
                                    backgroundColor: "#F7F7F7",
                                    marginTop: 15,
                                    marginBottom: 15,
                                }}
                            />
                            <View
                                style={{
                                    width: 320,
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
                                            get_color_index(
                                                note?.color_index ?? ""
                                            )
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
                                    width: 320,
                                    height: 1,
                                    backgroundColor: "#F7F7F7",
                                    marginTop: 15,
                                    marginBottom: 15,
                                }}
                            />
                            <View
                                style={{
                                    width: 320,
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
                                    width: 320,
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    marginTop: 7,
                                }}
                            >
                                {note?.nose?.map((data: any, index: number) => {
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
                                            <Text style={styles.text}>
                                                {data ?? ""}
                                            </Text>
                                        </View>
                                    );
                                })}
                            </View>
                            <View style={{ marginTop: 20 }} />
                            <View
                                style={{
                                    width: 320,
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
                                    width: 320,
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    marginTop: 7,
                                }}
                            >
                                {note?.palate?.map(
                                    (data: any, index: number) => {
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
                                                <Text style={styles.text}>
                                                    {data ?? ""}
                                                </Text>
                                            </View>
                                        );
                                    }
                                )}
                            </View>
                            <View style={{ marginTop: 20 }} />
                            <View
                                style={{
                                    width: 320,
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
                                    width: 320,
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    marginTop: 7,
                                }}
                            >
                                {note?.finish?.map(
                                    (data: any, index: number) => {
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
                                                <Text style={styles.text}>
                                                    {data ?? ""}
                                                </Text>
                                            </View>
                                        );
                                    }
                                )}
                            </View>
                            <View style={{ marginTop: 20 }} />
                            <View
                                style={{
                                    width: 320,
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
                                    >
                                        {(user?.img_urls?.length ?? 0) > 0 ? (
                                            <Image
                                                source={{
                                                    uri: user?.img_urls[0],
                                                }}
                                                width={36}
                                                height={36}
                                                style={{
                                                    borderRadius: 100,
                                                }}
                                            />
                                        ) : (
                                            <Profile_Svg />
                                        )}
                                    </View>
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
                                                style={{
                                                    color: "#757575",
                                                    fontWeight: "700",
                                                }}
                                            >
                                                {user?.user_notes?.length.toLocaleString() ??
                                                    ""}
                                            </Text>
                                            <Text>{"  |  "}</Text>
                                            <Text>평균평점</Text>
                                            <Text> </Text>
                                            <Text
                                                style={{
                                                    color: "#757575",
                                                    fontWeight: "700",
                                                }}
                                            >
                                                {user?.user_av?.toFixed(1) ??
                                                    ""}
                                            </Text>
                                        </Text>
                                    </View>
                                </View>
                                <Text
                                    style={[
                                        styles.text,
                                        { marginTop: 20, marginBottom: 20 },
                                    ]}
                                >
                                    {note?.review ?? ""}
                                </Text>
                            </View>
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
                                marginTop: 20,
                                width: 320,
                                alignItems: "flex-start",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "500",
                                    fontSize: 12,
                                    color: "#424242",
                                }}
                            >
                                {`사진 리뷰 (${
                                    note?.image_whisky?.length ?? 0
                                })`}
                            </Text>
                        </View>
                        {(note?.image_whisky?.length ?? 0) > 0 && (
                            <View
                                style={{
                                    width: 320,
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    flexWrap: "wrap",
                                }}
                            >
                                {note.image_whisky.map(
                                    (image: any, index: number) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setModalImage(image);
                                                    toggleModal();
                                                }}
                                                key={index}
                                                style={[
                                                    {
                                                        width: 90,
                                                        height: 90,
                                                        backgroundColor:
                                                            "#FBF8F2",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                        marginRight: 15,
                                                        marginTop: 10,
                                                    },
                                                ]}
                                            >
                                                <Image
                                                    source={{
                                                        uri: image,
                                                    }}
                                                    style={{
                                                        width: 90,
                                                        height: 90,
                                                        borderRadius: 10,
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        );
                                    }
                                )}
                            </View>
                        )}
                        <View
                            style={{
                                marginTop: 20,
                                width: 320,
                                alignItems: "flex-start",
                                flexDirection: "row",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "500",
                                    fontSize: 12,
                                    color: "#424242",
                                }}
                            >
                                {`영수증 인증`}
                            </Text>
                            <View style={{ marginLeft: 5, marginTop: 2 }}>
                                {(note?.image_bill?.length ?? 0) > 0 && (
                                    <Icon_Check_Bill />
                                )}
                            </View>
                        </View>
                        {(note?.image_bill?.length ?? 0) > 0 && (
                            <View
                                style={{
                                    width: 320,
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    flexWrap: "wrap",
                                }}
                            >
                                {note.image_bill.map(
                                    (image: any, index: number) => {
                                        console.log(image);
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setModalImage(image);
                                                    toggleModal();
                                                }}
                                                key={index}
                                                style={[
                                                    {
                                                        width: 90,
                                                        height: 90,
                                                        backgroundColor:
                                                            "#FBF8F2",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                        marginRight: 15,
                                                        marginTop: 10,
                                                    },
                                                ]}
                                            >
                                                <Image
                                                    source={{
                                                        uri: image,
                                                    }}
                                                    style={{
                                                        width: 90,
                                                        height: 90,
                                                        borderRadius: 10,
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        );
                                    }
                                )}
                            </View>
                        )}
                        <View style={{ marginVertical: 40 }} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

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

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "white",
        paddingLeft: 20,
        paddingRight: 20,
    },
    text: {
        fontFamily: "Spoqa Han Sans Neo",
        fontWeight: "500",
        fontSize: 12,
        textAlign: "left",
        color: "#424242",
    },
    m_text: {
        fontFamily: "Spoqa Han Sans Neo",
        fontWeight: "700",
        fontSize: 16,
        color: "#000000",
        textAlign: "left",
    },
});
