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
    TextInput,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import Btn_Search from "../public/icons/btn/search_black.svg";
import Btn_OnOff_Arrow_Right from "../public/icons/btn/btn_onoff_right_arrow.svg";
import Photo_Btn_OnOff_Svg from "../public/icons/photo/btn_onoff.svg";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import Icon_Star from "../public/icons/icons/icon_star.svg";

// Navigator
import CustomNavigator_Top from "../navigators/CustomNavigator_Top";

// Components
import SelectBar_Color from "../components/SelectBar_Color";
import Field_Text from "../components/Field_Text";

type photoType = {
    name: string;
    uri: string;
};

import axios from "axios";
import { API_KEY } from "@env";

export default function SubPage_TastingNoteWriting({ navigation }: any) {
    const [review, setReview] = React.useState("");
    const change_review = (name: string, text: string) => {
        setReview(text);
    };

    const [photoWhisky, setPhotoWhisky] = React.useState<photoType[]>([]);
    const [photoBill, setPhotoBill] = React.useState<photoType[]>([]);

    const select_photo = async (type: string) => {
        const result = await launchImageLibrary({
            mediaType: "photo",
            selectionLimit: 0,
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

                pthoes.push({
                    name: img_name,
                    uri: img_path,
                });
            });
            if (type === "whisky") {
                setPhotoWhisky((previousPhotos) => [
                    ...previousPhotos,
                    ...pthoes,
                ]);
            } else if (type === "bill") {
                setPhotoBill((previousPhotos) => [
                    ...previousPhotos,
                    ...pthoes,
                ]);
            }
        }
    };

    const next_step = () => {};

    const [isWhiskyModalVisible, setWhiskyModaVisible] = React.useState(false);
    const toggleWhiskyModal = () => {
        setWhiskyModaVisible(!isWhiskyModalVisible);
    };

    const [selectedWhisky, setSelectedWhisky] = React.useState("");
    const [whiskyData, setWhiskyData] = React.useState<any[]>([]);
    const consonants = [
        "ㄱ",
        "ㄲ",
        "ㄴ",
        "ㄷ",
        "ㄸ",
        "ㄹ",
        "ㅁ",
        "ㅂ",
        "ㅃ",
        "ㅅ",
        "ㅆ",
        "ㅇ",
        "ㅈ",
        "ㅉ",
        "ㅊ",
        "ㅋ",
        "ㅌ",
        "ㅍ",
        "ㅎ",
    ];
    function getFirstConsonant(char: string) {
        const koreanBase = 0xac00;

        const index = Math.floor((char.charCodeAt(0) - koreanBase) / 28 / 21);

        return consonants[index] || null;
    }
    const [searchText, setSearchText] = React.useState<string>("");
    const [isFocused, setIsFocused] = React.useState<boolean>(false);
    const get_selected_whisky = () => {
        if (selectedWhisky === "") {
            return whiskyData[0];
        }
        const whisky = whiskyData.filter((whisky) => {
            return whisky.whisky_id === selectedWhisky;
        });
        if (whisky.length === 0) {
            return whiskyData[0];
        }
        return whisky[0];
    };

    useFocusEffect(
        React.useCallback(() => {
            axios.get(API_KEY + "/whiskys/").then((res) => {
                setWhiskyData(
                    res.data.sort((a: any, b: any) =>
                        a.name_kor.localeCompare(b.name_kor, "ko")
                    )
                );
            });
            return () => {};
        }, [])
    );

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
                {/* 필터 모달 */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isWhiskyModalVisible}
                    onRequestClose={() => {
                        toggleWhiskyModal();
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column-reverse",
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
                                paddingLeft: 20,
                                paddingRight: 20,
                                width: "100%",
                                flex: 1,
                                marginTop: 100,
                                backgroundColor: "#ffffff",
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                            }}
                        >
                            {/* 필터 탭 */}
                            <View
                                style={{
                                    width: "100%",
                                    height: 20,
                                    marginTop: 20,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        toggleWhiskyModal();
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: "Spoqa Han Sans Neo",
                                            fontWeight: "400",
                                            fontSize: 14,
                                            color: "#000000",
                                            position: "absolute",
                                            left: 10,
                                            top: -6,
                                        }}
                                    >
                                        취소
                                    </Text>
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "700",
                                        fontSize: 16,
                                        color: "#000000",
                                        textAlign: "center",
                                    }}
                                >
                                    위스키 선택
                                </Text>
                                <View />
                            </View>
                            {/* 선택 창 */}
                            <ScrollView style={{ width: "100%" }}>
                                <View
                                    style={{
                                        width: "100%",
                                        alignItems: "center",
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 320,
                                            borderRadius: 10,
                                            backgroundColor: "#FBF8F2",
                                            height: 50,
                                            marginTop: 20,
                                            paddingLeft: 20,
                                            position: "relative",
                                        }}
                                    >
                                        <View
                                            style={{
                                                position: "absolute",
                                                right: 5,
                                                top: 5,
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Btn_Search />
                                        </View>
                                        <TextInput
                                            placeholder="위스키명 입력"
                                            style={{
                                                height: 50,
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "center",
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "400",
                                                fontSize: 14,
                                                color: "#000000",
                                            }}
                                            onFocus={() => {
                                                setIsFocused(true);
                                            }}
                                            onBlur={() => {
                                                searchText === ""
                                                    ? setIsFocused(false)
                                                    : setIsFocused(true);
                                            }}
                                            onChangeText={(text) => {
                                                setSearchText(text);
                                            }}
                                        />
                                    </View>
                                    {consonants.map((consonant, index) => {
                                        return (
                                            <View
                                                key={index}
                                                style={{
                                                    width: 320,
                                                    alignItems: "center",
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 5,
                                                        backgroundColor:
                                                            "#D6690F",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                        marginTop: 20,
                                                        alignSelf: "flex-start",
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontFamily:
                                                                "Spoqa Han Sans Neo",
                                                            fontWeight: "500",
                                                            fontSize: 14,
                                                            color: "white",
                                                        }}
                                                    >
                                                        {consonant}
                                                    </Text>
                                                </View>

                                                {whiskyData
                                                    .filter(
                                                        (whisky) =>
                                                            getFirstConsonant(
                                                                whisky.name_kor
                                                            ) === consonant
                                                    )
                                                    .map((whisky, index) => {
                                                        return (
                                                            <View key={index}>
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        setSelectedWhisky(
                                                                            whisky.whisky_id
                                                                        );
                                                                        toggleWhiskyModal();
                                                                    }}
                                                                    key={index}
                                                                    style={{
                                                                        width: 320,
                                                                        height: 40,
                                                                        marginTop: 5,
                                                                        marginBottom: 5,
                                                                        justifyContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            fontFamily:
                                                                                "Spoqa Han Sans Neo",
                                                                            fontWeight:
                                                                                "500",
                                                                            fontSize: 14,
                                                                            color: "#000000",
                                                                        }}
                                                                    >{`${whisky.name_kor} (${whisky.name_eng})`}</Text>
                                                                </TouchableOpacity>
                                                                <View
                                                                    style={{
                                                                        width: 320,
                                                                        height: 1,
                                                                        backgroundColor:
                                                                            "#EAEAEA",
                                                                    }}
                                                                />
                                                            </View>
                                                        );
                                                    })}
                                            </View>
                                        );
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
                <ScrollView style={{ width: "100%" }}>
                    <View
                        style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {selectedWhisky !== "" ? (
                            <View
                                style={{
                                    width: 320,
                                    height: 110,
                                    marginTop: 25,
                                    borderColor: "#EDEDED",
                                    borderWidth: 1,
                                    borderRadius: 20,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    paddingLeft: 20,
                                }}
                            >
                                <View
                                    style={{
                                        width: 60,
                                        height: 80,
                                        borderRadius: 5,
                                        overflow: "hidden",
                                    }}
                                >
                                    <Image
                                        source={{
                                            uri: get_selected_whisky()
                                                .img_urls[0],
                                        }}
                                        height={80}
                                        style={{ resizeMode: "cover" }}
                                    />
                                </View>
                                <View style={{ marginLeft: 25 }}>
                                    <Text
                                        style={{
                                            fontFamily: "Spoqa Han Sans Neo",
                                            fontWeight: "700",
                                            fontSize: 14,
                                            color: "#000000",
                                        }}
                                    >
                                        {get_selected_whisky().name_kor}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: "Spoqa Han Sans Neo",
                                            fontWeight: "400",
                                            fontSize: 12,
                                            color: "#888888",
                                        }}
                                    >
                                        {get_selected_whisky().name_eng}
                                    </Text>
                                    <View
                                        style={{
                                            marginTop: 10,
                                            flexDirection: "row",
                                            height: 20,
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
                                        >{`${get_selected_whisky().note_av.toFixed(
                                            1
                                        )} (${get_selected_whisky().note_num.toLocaleString()})`}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedWhisky("");
                                    }}
                                    style={{
                                        width: 27,
                                        height: 27,
                                        position: "absolute",
                                        top: -5,
                                        right: -5,
                                    }}
                                >
                                    <Photo_Btn_OnOff_Svg />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity
                                onPress={() => {
                                    toggleWhiskyModal();
                                }}
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
                        )}

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
                        <TouchableOpacity
                            style={[
                                {
                                    width: 320,
                                    height: 50,
                                    marginTop: 5,
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
                                + 향 선택 (최대 5개)
                            </Text>
                        </TouchableOpacity>

                        <View style={{ marginTop: 20 }} />
                        <Text style={{ width: 320, marginBottom: 5 }}>
                            <Text style={styles.subtitle_text}>팔레트</Text>
                            <Text style={styles.subtitle_des_text}>
                                {" (중간맛)"}
                            </Text>
                        </Text>
                        <TouchableOpacity
                            style={[
                                {
                                    width: 320,
                                    height: 50,
                                    marginTop: 5,
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
                                + 맛 선택 (최대 5개)
                            </Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 20 }} />
                        <Text style={{ width: 320, marginBottom: 5 }}>
                            <Text style={styles.subtitle_text}>피니시</Text>
                            <Text style={styles.subtitle_des_text}>
                                {" (끝맛)"}
                            </Text>
                        </Text>
                        <TouchableOpacity
                            style={[
                                {
                                    width: 320,
                                    height: 50,
                                    marginTop: 5,
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
                                + 맛 선택 (최대 5개)
                            </Text>
                        </TouchableOpacity>
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
                        <Field_Text
                            style={{
                                height: 130,
                            }}
                            is_review={true}
                            isNeccesary={false}
                            id={"review"}
                            value={review}
                            changeValue={change_review}
                            placeholder="상세 리뷰 입력"
                            multiline={true}
                        />
                        <View style={{ marginTop: 40 }} />
                        <Text style={{ width: 320, marginBottom: 5 }}>
                            <Text style={styles.subtitle_text}>사진 첨부</Text>
                        </Text>
                        <View
                            style={{
                                width: 320,
                                marginTop: 5,
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                flexWrap: "wrap",
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    select_photo("whisky");
                                }}
                                style={[
                                    {
                                        width: 90,
                                        height: 90,
                                        backgroundColor: "#FBF8F2",
                                        alignItems: "center",
                                        justifyContent: "center",
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
                                            textAlign: "center",
                                        },
                                    ]}
                                >
                                    {"+\n사진 첨부"}
                                </Text>
                            </TouchableOpacity>
                            {photoWhisky.length > 0 &&
                                photoWhisky.map((photo, index) => {
                                    return (
                                        <View
                                            key={index}
                                            style={[
                                                {
                                                    width: 90,
                                                    height: 90,
                                                    backgroundColor: "#FBF8F2",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                },
                                                index % 3 != 2 && {
                                                    marginLeft: 25,
                                                },
                                                index >= 2 && {
                                                    marginTop: 20,
                                                },
                                            ]}
                                        >
                                            <Image
                                                source={{ uri: photo.uri }}
                                                style={{
                                                    width: 90,
                                                    height: 90,
                                                    borderRadius: 10,
                                                }}
                                            />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setPhotoWhisky(
                                                        photoWhisky.filter(
                                                            (photo, idx) => {
                                                                return (
                                                                    idx != index
                                                                );
                                                            }
                                                        )
                                                    );
                                                }}
                                                style={{
                                                    width: 27,
                                                    height: 27,
                                                    position: "absolute",
                                                    top: -5,
                                                    right: -5,
                                                }}
                                            >
                                                <Photo_Btn_OnOff_Svg />
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })}
                        </View>
                        <View style={{ marginTop: 40 }} />
                        <Text style={{ width: 320, marginBottom: 5 }}>
                            <Text style={styles.subtitle_text}>
                                영수증 사진 첨부
                            </Text>
                        </Text>
                        <View
                            style={{
                                width: 320,
                                marginTop: 5,
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                flexWrap: "wrap",
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    select_photo("bill");
                                }}
                                style={[
                                    {
                                        width: 90,
                                        height: 90,
                                        backgroundColor: "#FBF8F2",
                                        alignItems: "center",
                                        justifyContent: "center",
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
                                            textAlign: "center",
                                        },
                                    ]}
                                >
                                    {"+\n영수증\n사진 첨부"}
                                </Text>
                            </TouchableOpacity>
                            {photoBill.length > 0 &&
                                photoBill.map((photo, index) => {
                                    return (
                                        <View
                                            key={index}
                                            style={[
                                                {
                                                    width: 90,
                                                    height: 90,
                                                    backgroundColor: "#FBF8F2",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                },
                                                index % 3 != 2 && {
                                                    marginLeft: 25,
                                                },
                                                index >= 2 && {
                                                    marginTop: 20,
                                                },
                                            ]}
                                        >
                                            <Image
                                                source={{ uri: photo.uri }}
                                                style={{
                                                    width: 90,
                                                    height: 90,
                                                    borderRadius: 10,
                                                }}
                                            />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setPhotoBill(
                                                        photoBill.filter(
                                                            (photo, idx) => {
                                                                return (
                                                                    idx != index
                                                                );
                                                            }
                                                        )
                                                    );
                                                }}
                                                style={{
                                                    width: 27,
                                                    height: 27,
                                                    position: "absolute",
                                                    top: -5,
                                                    right: -5,
                                                }}
                                            >
                                                <Photo_Btn_OnOff_Svg />
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })}
                        </View>
                        <View style={{ marginTop: 40 }} />
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
