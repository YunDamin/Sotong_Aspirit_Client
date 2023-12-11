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
    TextInput,
    Modal,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import Bg_Cup from "../public/icons/bg/cup.svg";
import Icon_Note from "../public/icons/icons/icon_note.svg";
import Btn_Setting from "../public/icons/btn/btn_setting.svg";
import Btn_Bell_On from "../public/icons/btn/btn_bell_on.svg";
import Btn_Bell_Off from "../public/icons/btn/btn_bell_off.svg";
import Btn_My from "../public/icons/btn/btn_my.svg";
import Btn_Drop from "../public/icons/btn/btn_drop.svg";
import Btn_Drop_Black from "../public/icons/btn/btn_drop_black.svg";
import Btn_Search from "../public/icons/btn/btn_search.svg";
import Btn_Check from "../public/icons/btn/btn_check.svg";

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

import axios from "axios";
import { API_KEY } from "@env";
import Card_TasteNote_Whisky from "../components/Card_TasteNote_Whisky";

export default function MainPage_Note({ navigation }: any) {
    const [loginState, setLoginState] = useRecoilState<login_data>(login_state);

    const [searchCategory, setSearchCategory] = React.useState<string>("all");
    const [searchText, setSearchText] = React.useState<string>("");
    const [isFocused, setIsFocused] = React.useState<boolean>(false);

    const [sortCategory, setSortCategory] = React.useState<string>("new");

    const [tabIndex, setTabIndex] = React.useState<number>(0);

    const topPosition = React.useRef(new Animated.Value(170));

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

    const handleScroll = (event: any) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        Animated.timing(topPosition.current, {
            toValue: scrollY > 50 ? 70 : 170,
            duration: 50,
            useNativeDriver: false,
        }).start();

        const height = event.nativeEvent.layoutMeasurement.height;
        const contentHeight = event.nativeEvent.contentSize.height;
        if (scrollY + height >= contentHeight - 20) {
            loadMoreData();
        }
    };

    const [isCategoryModalVisible, setCategoryModaVisible] =
        React.useState(false);
    const toggleCategoryModal = () => {
        setCategoryModaVisible(!isCategoryModalVisible);
    };

    const [isSortModalVisible, setSortModalVisible] = React.useState(false);
    const toggleSortModal = () => {
        setSortModalVisible(!isSortModalVisible);
    };

    const [notes, setNotes] = React.useState<any>([]);
    const [viewNoteData, setViewNoteData] = React.useState<any>([]);
    const [view, setView] = React.useState(0);

    useFocusEffect(
        React.useCallback(() => {
            console.log("MainPage_Note Focus");

            if (loginState.is_login && !loginState.survey) {
                console.log("Go to SurveyPage_Main");
                navigation.navigate("SurveyPage_Main", {
                    edit: false,
                });
            }

            axios.get(API_KEY + "/notes/").then((res) => {
                setNotes(res.data?.data.slice().reverse());
                setViewNoteData(res.data?.data.slice().reverse().slice(0, 4));
                setView(4);
            });

            return () => {};
        }, [])
    );

    React.useEffect(() => {
        const filter_notes = notes
            .slice()
            .reverse()
            .filter((note: any) => {
                const text = searchText.trim().toLowerCase();

                if (text.length == 0) return true;

                if (searchCategory === "content") {
                    if (note.cont.toLowerCase().includes(text)) {
                        return true;
                    }
                } else if (searchCategory === "user") {
                    if (note.user_nick_name.toLowerCase().includes(text)) {
                        return true;
                    }
                }

                return false;
            });
        setViewNoteData(filter_notes.slice(0, 4));
        setNotes(filter_notes);
        setView(4);
    }, [searchText]);

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: "#974B1A" }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <View style={styles.page}>
                    {/* 제목 내용 카테고리 선택 모달 */}
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={isCategoryModalVisible}
                        onRequestClose={() => {
                            toggleCategoryModal();
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
                                    position: "absolute",
                                    bottom: 0,
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                    width: "100%",
                                    backgroundColor: "#ffffff",
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                }}
                            >
                                <View style={{ height: 20 }} />
                                <TouchableOpacity
                                    style={{
                                        marginTop: 10,
                                        marginBottom: 10,
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                    onPress={() => {
                                        setSearchCategory("content");
                                        toggleCategoryModal();
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
                                        내용
                                    </Text>
                                    <View style={{ height: 40 }}>
                                        {searchCategory === "content" && (
                                            <Btn_Check />
                                        )}
                                    </View>
                                </TouchableOpacity>
                                <View
                                    style={{
                                        width: "100%",
                                        height: 1,
                                        backgroundColor: "#EAEAEA",
                                    }}
                                />
                                <TouchableOpacity
                                    style={{
                                        marginTop: 10,
                                        marginBottom: 10,
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                    onPress={() => {
                                        setSearchCategory("user");
                                        toggleCategoryModal();
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
                                        작성자
                                    </Text>
                                    <View style={{ height: 40 }}>
                                        {searchCategory === "user" && (
                                            <Btn_Check />
                                        )}
                                    </View>
                                </TouchableOpacity>
                                <View style={{ height: 30 }} />
                            </View>
                        </View>
                    </Modal>
                    {/* 정렬 선택 모달 */}
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={isSortModalVisible}
                        onRequestClose={() => {
                            toggleSortModal();
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
                                    position: "absolute",
                                    bottom: 0,
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                    width: "100%",
                                    backgroundColor: "#ffffff",
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                }}
                            >
                                <View style={{ height: 20 }} />
                                <TouchableOpacity
                                    style={{
                                        marginTop: 10,
                                        marginBottom: 10,
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                    onPress={() => {
                                        setSortCategory("new");
                                        toggleSortModal();
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
                                        최신순
                                    </Text>
                                    <View style={{ height: 40 }}>
                                        {sortCategory === "new" && (
                                            <Btn_Check />
                                        )}
                                    </View>
                                </TouchableOpacity>
                                <View
                                    style={{
                                        width: "100%",
                                        height: 1,
                                        backgroundColor: "#EAEAEA",
                                    }}
                                />
                                <TouchableOpacity
                                    style={{
                                        marginTop: 10,
                                        marginBottom: 10,
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                    onPress={() => {
                                        setSortCategory("new");
                                        toggleSortModal();
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
                                        준비중입니다.
                                    </Text>
                                    <View style={{ height: 40 }}>
                                        {sortCategory === "" && <Btn_Check />}
                                    </View>
                                </TouchableOpacity>
                                <View
                                    style={{
                                        width: "100%",
                                        height: 1,
                                        backgroundColor: "#EAEAEA",
                                    }}
                                />
                                <TouchableOpacity
                                    style={{
                                        marginTop: 10,
                                        marginBottom: 10,
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                    onPress={() => {
                                        setSortCategory("new");
                                        toggleSortModal();
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
                                        준비중입니다.
                                    </Text>
                                    <View style={{ height: 40 }}>
                                        {sortCategory === "" && <Btn_Check />}
                                    </View>
                                </TouchableOpacity>
                                <View style={{ height: 30 }} />
                            </View>
                        </View>
                    </Modal>
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
                                    노트
                                </Text>
                                <View style={{ marginLeft: 5 }}>
                                    <Icon_Note />
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
                        {/* 검색 필드 */}
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                marginTop: 35,
                                width: "100%",
                                height: 50,
                                borderRadius: 10,
                            }}
                        >
                            {/* 뒷 배경 */}
                            <View
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: 50,
                                    backgroundColor: "#ffffff",
                                    opacity: 0.1,
                                    borderRadius: 10,
                                }}
                            />
                            <TouchableOpacity
                                style={{
                                    marginLeft: 15,
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    height: 50,
                                }}
                                onPress={() => {
                                    toggleCategoryModal();
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "400",
                                        fontSize: 14,
                                        color: "#ffffff",
                                        textAlign: "center",
                                    }}
                                >
                                    {
                                        {
                                            all: "제목+내용",
                                            title: "제목",
                                            content: "내용",
                                        }[searchCategory]
                                    }
                                </Text>
                                <View style={{ marginLeft: 5 }}>
                                    <Btn_Drop />
                                </View>
                                <View
                                    style={{
                                        width: 1,
                                        height: 20,
                                        backgroundColor: "#ffffff",
                                        opacity: 0.1,
                                        marginLeft: 20,
                                    }}
                                />
                            </TouchableOpacity>
                            <View
                                style={{
                                    flex: 2,
                                    paddingLeft: 20,
                                    paddingRight: 15,
                                    height: 50,
                                }}
                            >
                                {!isFocused && (
                                    <View
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            marginLeft: 20,
                                            width: "100%",
                                            height: 50,
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "400",
                                                fontSize: 14,
                                                color: "#ffffff",
                                            }}
                                        >
                                            검색어 입력
                                        </Text>
                                        <Btn_Search />
                                    </View>
                                )}
                                <TextInput
                                    style={{
                                        height: 50,
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
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
                            {/* 내용 탑 */}
                            <View
                                style={{
                                    width: "100%",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <View
                                    style={{
                                        marginTop: 10,
                                        width: 320,
                                        height: 30,
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
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
                                        <Text>전체 </Text>
                                        <Text style={{ color: "#D6690F" }}>{`(${
                                            notes
                                                .slice()
                                                .reverse()
                                                .filter((note: any) => {
                                                    const text = searchText
                                                        .trim()
                                                        .toLowerCase();

                                                    if (text.length == 0)
                                                        return true;

                                                    if (
                                                        note.cont
                                                            .toLowerCase()
                                                            .includes(text)
                                                    ) {
                                                        return true;
                                                    }

                                                    return false;
                                                })
                                                ?.length?.toLocaleString() ??
                                            "0"
                                        })`}</Text>
                                    </Text>
                                    <TouchableOpacity
                                        style={{
                                            width: 80,
                                            height: 30,
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            borderColor: "#E4E4E4",
                                            backgroundColor: "#FFFFFF",
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                        onPress={() => {
                                            toggleSortModal();
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
                                            {
                                                {
                                                    new: "최신순",
                                                }[sortCategory]
                                            }
                                        </Text>
                                        <View style={{ width: 14, height: 14 }}>
                                            <Btn_Drop_Black />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: 40 }} />
                                {viewNoteData?.map(
                                    (note: any, index: number) => {
                                        return (
                                            <Card_TasteNote_Whisky
                                                key={index}
                                                tasting_id={
                                                    note?.tasting_id ?? ""
                                                }
                                                user_id={note?.user_id ?? ""}
                                                whisky_id={
                                                    note?.whisky_id ?? ""
                                                }
                                                onPress={() => {
                                                    navigation.navigate(
                                                        "SubPage_Whisky",
                                                        {
                                                            whisky_id:
                                                                note?.whisky_id ??
                                                                "",
                                                        }
                                                    );
                                                }}
                                                onPressDetail={() => {
                                                    navigation.navigate(
                                                        "SubPage_TastingNote_Single",
                                                        {
                                                            user_id:
                                                                note?.user_id ??
                                                                "",
                                                            whisky_id:
                                                                note?.whisky_id ??
                                                                "",
                                                            tasting_id:
                                                                note?.tasting_id ??
                                                                "",
                                                        }
                                                    );
                                                }}
                                                onPressUser={() => {
                                                    navigation.navigate(
                                                        "SubPage_Profile",
                                                        {
                                                            user_id:
                                                                note?.user_id ??
                                                                "",
                                                        }
                                                    );
                                                }}
                                            />
                                        );
                                    }
                                )}
                                <View style={{ marginTop: 250 }} />
                            </View>
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
        paddingLeft: 20,
        paddingRight: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: "hidden",
    },
});
