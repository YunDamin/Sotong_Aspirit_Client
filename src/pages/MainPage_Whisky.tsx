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
import Icon_Whisky from "../public/icons/icons/icon_whisky_svg.svg";
import Btn_Setting from "../public/icons/btn/btn_setting.svg";
import Btn_Bell_On from "../public/icons/btn/btn_bell_on.svg";
import Btn_Bell_Off from "../public/icons/btn/btn_bell_off.svg";
import Btn_OnOff_Right_Arrow from "../public/icons/btn/btn_onoff_right_arrow.svg";
import Btn_My from "../public/icons/btn/btn_my.svg";
import Btn_Drop from "../public/icons/btn/btn_drop.svg";
import Btn_Drop_Black from "../public/icons/btn/btn_drop_black.svg";
import Btn_Search from "../public/icons/btn/btn_search.svg";
import Btn_Check from "../public/icons/btn/btn_check.svg";
import Btn_Filter from "../public/icons/btn/btn_filter.svg";
import Btn_Next_Select from "../public/icons/btn/btn_next_select.svg";
import Btn_Select from "../public/icons/btn/btn_select.svg";

// Components
import Card_Rc_Whisky_Long from "../components/Card_Rc_Whisky_Long";

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

import { whisky, whisky_state } from "../atoms/get_whisky";

type selectedData = {
    first: {
        COM_CD: string;
        KOR_CD_NM: string;
    };
    second: {
        COM_CD: string;
        KOR_CD_NM: string;
    };
    third: {
        COM_CD: string;
        KOR_CD_NM: string;
    };
};

type thirdData = {
    COM_CD: string;
    KOR_CD_NM: string;
};

type secondData = {
    second: {
        COM_CD: string;
        KOR_CD_NM: string;
    };
    thirds: thirdData[];
};

type codeData = {
    first: {
        COM_CD: string;
        KOR_CD_NM: string;
    };
    seconds: secondData[];
};

export default function MainPage_Whisky({ navigation }: any) {
    const [loginState, setLoginState] = useRecoilState<login_data>(login_state);

    const [searchText, setSearchText] = React.useState<string>("");
    const [isFocused, setIsFocused] = React.useState<boolean>(false);

    const [sortCategory, setSortCategory] = React.useState<string>("rate");

    const topPosition = React.useRef(new Animated.Value(170));

    const [viewWhiskyData, setViewWhiskyData] = React.useState<whisky[]>([]);
    const [view, setView] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const loadMoreData = () => {
        if (!loading) {
            setLoading(true);

            setViewWhiskyData([
                ...viewWhiskyData,
                ...get_whisky().slice(view, view + 4),
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

    // Filter
    const [tabIndex, setTabIndex] = React.useState<number>(0);
    const [filterCategory, setFilterCategory] = React.useState<number>(0);

    // Select
    const [filterOrigins, setFilterOrigins] = React.useState<string[]>([]);
    const [filterColors, setFilterColors] = React.useState<string[]>([]);
    const [filterNoses, setFilterNoses] = React.useState<string[]>([]);
    const [filterPalates, setFilterPalates] = React.useState<string[]>([]);
    const [filterFinishes, setFilterFinishes] = React.useState<string[]>([]);
    const [filterBewerys, setFilterBewerys] = React.useState<string[]>([]);
    const [filterPairings, setFilterPairings] = React.useState<string[]>([]);

    // Data
    type FilterData = {
        code: string;
        name: string;
    };
    const [filterOriginData, setFilterOriginData] = React.useState<
        FilterData[]
    >([]);
    const [filterColorData, setFilterColorData] = React.useState<FilterData[]>(
        []
    );
    const [filterBeweryData, setFilterBeweryData] = React.useState<
        FilterData[]
    >([]);
    const [filterPairingData, setFilterPairingData] = React.useState<
        FilterData[]
    >([]);
    //
    const [filterTasteData, setFilterTasteData] = React.useState<codeData[]>(
        []
    );

    const [isFilterModalVisible, setFilterModaVisible] = React.useState(false);
    const toggleFilterModal = () => {
        setTabIndex(0);
        setFilterCategory(0);
        setFilterModaVisible(!isFilterModalVisible);
    };

    // Sort

    const [isSortModalVisible, setSortModalVisible] = React.useState(false);
    const toggleSortModal = () => {
        setSortModalVisible(!isSortModalVisible);
    };

    const get_whisky = (): whisky[] => {
        let filter_whisky = whiskyState
            .slice()
            .filter((whisky) => {
                const text = searchText.trim().toLowerCase();

                if (text.length == 0) return true;

                if (whisky.name_kor.toLowerCase().includes(text)) {
                    return true;
                } else if (whisky.name_eng.toLowerCase().includes(text)) {
                    return true;
                }

                return false;
            })
            .filter((whisky) => {
                if (filterOrigins.length == 0) return true;

                for (let origin of filterOrigins) {
                    if (whisky.origins.includes(origin.trim())) {
                        return true;
                    }
                }

                return false;
            })
            .filter((whisky) => {
                if (filterColors.length == 0) return true;

                for (let color of filterColors) {
                    if (whisky.color.includes(color.trim())) {
                        return true;
                    }
                }

                return false;
            })
            .filter((whisky) => {
                if (filterBewerys.length == 0) return true;

                for (let bewery of filterBewerys) {
                    if (whisky.bewerys.includes(bewery.trim())) {
                        return true;
                    }
                }
            })
            .filter((whisky) => {
                if (filterPairings.length == 0) return true;

                for (let pairing of filterPairings) {
                    if (whisky.pairings.includes(pairing.trim())) {
                        return true;
                    }
                }
            });

        if (sortCategory === "rate") {
            return filter_whisky.slice().sort((a, b) => {
                return b.note_av - a.note_av;
            });
        } else if (sortCategory === "new") {
            return filter_whisky.slice().reverse();
        } else if (sortCategory === "review") {
            return filter_whisky.slice().sort((a, b) => {
                return b.note_num - a.note_num;
            });
        }

        return filter_whisky;
    };

    const [whiskyState, setWhiskyState] =
        useRecoilState<whisky[]>(whisky_state);

    useFocusEffect(
        React.useCallback(() => {
            console.log("MainPage_Whisky Focus");

            if (loginState.is_login && !loginState.survey) {
                console.log("Go to SurveyPage_Main");
                navigation.navigate("SurveyPage_Main", {
                    edit: false,
                });
            }

            axios.get(API_KEY + "/whiskys/").then((res) => {
                setWhiskyState(res.data);
            });
            axios.get(API_KEY + "/code/filter/whiskys").then((res) => {
                setFilterOriginData(res.data.origins);
                setFilterColorData(res.data.colors);
                setFilterBeweryData(res.data.bewerys);
                setFilterPairingData(res.data.pairings);
            });
            axios.get(API_KEY + "/code/list/").then((res) => {
                setFilterTasteData(res.data.results);
            });

            return () => {};
        }, [])
    );

    React.useEffect(() => {
        setViewWhiskyData(get_whisky().slice(0, 4));
        setView(4);
    }, [whiskyState]);

    React.useEffect(() => {
        setViewWhiskyData(get_whisky().slice(0, 4));
        setView(4);
    }, [sortCategory]);

    React.useEffect(() => {
        setViewWhiskyData(get_whisky().slice(0, 4));
        setView(4);
    }, [
        searchText,
        filterOrigins,
        filterColors,
        filterNoses,
        filterPalates,
        filterFinishes,
        filterBewerys,
        filterPairings,
    ]);

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: "#974B1A" }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <View style={styles.page}>
                    {/* 필터 모달 */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isFilterModalVisible}
                        onRequestClose={() => {
                            toggleFilterModal();
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
                                {/* 향 탭 */}
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
                                            if (tabIndex === 0) {
                                                toggleFilterModal();
                                            } else {
                                                if (tabIndex === 1) {
                                                    setFilterCategory(0);
                                                }
                                                setTabIndex(tabIndex - 1);
                                            }
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "400",
                                                fontSize: 14,
                                                color: "#000000",
                                            }}
                                        >
                                            {tabIndex === 0 ? "취소" : "뒤로"}
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
                                        {filterCategory === 0 && "필터"}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (tabIndex === 0) {
                                                setFilterOrigins([]);
                                                setFilterColors([]);
                                                setFilterNoses([]);
                                                setFilterPalates([]);
                                                setFilterFinishes([]);
                                                setFilterBewerys([]);
                                                setFilterPairings([]);
                                                toggleFilterModal();
                                            } else if (
                                                tabIndex === 1 &&
                                                (filterCategory < 3 ||
                                                    filterCategory > 5)
                                            ) {
                                                if (filterCategory == 1) {
                                                    setFilterOrigins([]);
                                                } else if (
                                                    filterCategory == 2
                                                ) {
                                                    setFilterColors([]);
                                                } else if (
                                                    filterCategory == 6
                                                ) {
                                                    setFilterBewerys([]);
                                                } else if (
                                                    filterCategory == 7
                                                ) {
                                                    setFilterPairings([]);
                                                }
                                            }
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "400",
                                                fontSize: 14,
                                                color: "#000000",
                                            }}
                                        >
                                            초기화
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                {/* 선택 창 */}
                                <ScrollView style={{ width: "100%" }}>
                                    <View
                                        style={{
                                            width: "100%",
                                            alignItems: "center",
                                            paddingTop: 20,
                                        }}
                                    >
                                        {tabIndex === 0 &&
                                            [
                                                {
                                                    name: "국가",
                                                    selected: filterOrigins,
                                                },
                                                {
                                                    name: "색",
                                                    selected: filterColors,
                                                },
                                                {
                                                    name: "노즈 (향)",
                                                    selected: filterNoses,
                                                },
                                                {
                                                    name: "팔레트 (중간맛)",
                                                    selected: filterPalates,
                                                },
                                                {
                                                    name: "피니시 (끝맛)",
                                                    selected: filterFinishes,
                                                },
                                                {
                                                    name: "양조장",
                                                    selected: filterBewerys,
                                                },
                                                {
                                                    name: "페어링",
                                                    selected: filterPairings,
                                                },
                                            ].map(
                                                (data: any, index: number) => {
                                                    return (
                                                        <View key={index}>
                                                            <View
                                                                style={{
                                                                    width: 320,
                                                                }}
                                                            >
                                                                <Text
                                                                    style={{
                                                                        width: 320,
                                                                        fontFamily:
                                                                            "Spoqa Han Sans Neo",
                                                                        fontWeight:
                                                                            "400",
                                                                        fontSize: 12,
                                                                        color: "#000000",
                                                                        textAlign:
                                                                            "left",
                                                                    }}
                                                                >
                                                                    {data.name}
                                                                </Text>
                                                            </View>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    setTabIndex(
                                                                        1
                                                                    );
                                                                    setFilterCategory(
                                                                        index +
                                                                            1
                                                                    );
                                                                }}
                                                                style={{
                                                                    width: 320,
                                                                    height: 40,
                                                                    marginBottom: 5,
                                                                    flexDirection:
                                                                        "row",
                                                                    alignItems:
                                                                        "center",
                                                                    justifyContent:
                                                                        "space-between",
                                                                }}
                                                            >
                                                                <Text
                                                                    style={[
                                                                        {
                                                                            fontFamily:
                                                                                "Spoqa Han Sans Neo",
                                                                            fontWeight:
                                                                                "500",
                                                                            fontSize: 14,
                                                                            color: "#000000",
                                                                        },
                                                                        data
                                                                            .selected
                                                                            .length ===
                                                                            0 && {
                                                                            color: "#BABABA",
                                                                        },
                                                                    ]}
                                                                >
                                                                    {data
                                                                        .selected
                                                                        .length ===
                                                                    0
                                                                        ? "전체"
                                                                        : data.selected.join(
                                                                              ","
                                                                          )}
                                                                </Text>
                                                                <Btn_Next_Select />
                                                            </TouchableOpacity>
                                                            <View
                                                                style={{
                                                                    width: 320,
                                                                    height: 1,
                                                                    backgroundColor:
                                                                        "#E4E4E4",
                                                                    marginBottom: 10,
                                                                }}
                                                            />
                                                        </View>
                                                    );
                                                }
                                            )}
                                        {tabIndex == 1 &&
                                            (filterCategory < 3 ||
                                                filterCategory > 5) &&
                                            [
                                                filterOriginData,
                                                filterColorData,
                                                [],
                                                [],
                                                [],
                                                filterBeweryData,
                                                filterPairingData,
                                            ][filterCategory - 1].map(
                                                (data, index) => {
                                                    return (
                                                        <View key={index}>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    if (
                                                                        [
                                                                            filterOrigins,
                                                                            filterColors,
                                                                            [],
                                                                            [],
                                                                            [],
                                                                            filterBewerys,
                                                                            filterPairings,
                                                                        ][
                                                                            filterCategory -
                                                                                1
                                                                        ].filter(
                                                                            (
                                                                                f_data
                                                                            ) => {
                                                                                return (
                                                                                    f_data ==
                                                                                    data.name
                                                                                );
                                                                            }
                                                                        )
                                                                            .length !=
                                                                        0
                                                                    ) {
                                                                        if (
                                                                            filterCategory ==
                                                                            1
                                                                        ) {
                                                                            setFilterOrigins(
                                                                                filterOrigins.filter(
                                                                                    (
                                                                                        f_data
                                                                                    ) => {
                                                                                        return (
                                                                                            f_data !=
                                                                                            data.name
                                                                                        );
                                                                                    }
                                                                                )
                                                                            );
                                                                        } else if (
                                                                            filterCategory ==
                                                                            2
                                                                        ) {
                                                                            setFilterColors(
                                                                                filterColors.filter(
                                                                                    (
                                                                                        f_data
                                                                                    ) => {
                                                                                        return (
                                                                                            f_data !=
                                                                                            data.name
                                                                                        );
                                                                                    }
                                                                                )
                                                                            );
                                                                        } else if (
                                                                            filterCategory ==
                                                                            6
                                                                        ) {
                                                                            setFilterBewerys(
                                                                                filterBewerys.filter(
                                                                                    (
                                                                                        f_data
                                                                                    ) => {
                                                                                        return (
                                                                                            f_data !=
                                                                                            data.name
                                                                                        );
                                                                                    }
                                                                                )
                                                                            );
                                                                        } else if (
                                                                            filterCategory ==
                                                                            7
                                                                        ) {
                                                                            setFilterPairings(
                                                                                filterPairings.filter(
                                                                                    (
                                                                                        f_data
                                                                                    ) => {
                                                                                        return (
                                                                                            f_data !=
                                                                                            data.name
                                                                                        );
                                                                                    }
                                                                                )
                                                                            );
                                                                        }
                                                                    } else {
                                                                        if (
                                                                            filterCategory ==
                                                                            1
                                                                        ) {
                                                                            setFilterOrigins(
                                                                                [
                                                                                    ...filterOrigins,
                                                                                    data.name,
                                                                                ]
                                                                            );
                                                                        } else if (
                                                                            filterCategory ==
                                                                            2
                                                                        ) {
                                                                            setFilterColors(
                                                                                [
                                                                                    ...filterColors,
                                                                                    data.name,
                                                                                ]
                                                                            );
                                                                        } else if (
                                                                            filterCategory ==
                                                                            6
                                                                        ) {
                                                                            setFilterBewerys(
                                                                                [
                                                                                    ...filterBewerys,
                                                                                    data.name,
                                                                                ]
                                                                            );
                                                                        } else if (
                                                                            filterCategory ==
                                                                            7
                                                                        ) {
                                                                            setFilterPairings(
                                                                                [
                                                                                    ...filterPairings,
                                                                                    data.name,
                                                                                ]
                                                                            );
                                                                        }
                                                                    }
                                                                }}
                                                                style={{
                                                                    width: 320,
                                                                    height: 40,
                                                                    marginBottom: 5,
                                                                    flexDirection:
                                                                        "row",
                                                                    alignItems:
                                                                        "center",
                                                                    justifyContent:
                                                                        "space-between",
                                                                }}
                                                            >
                                                                <Text
                                                                    style={[
                                                                        {
                                                                            fontFamily:
                                                                                "Spoqa Han Sans Neo",
                                                                            fontWeight:
                                                                                "500",
                                                                            fontSize: 14,
                                                                            color: "#000000",
                                                                        },
                                                                    ]}
                                                                >
                                                                    {data.name}
                                                                </Text>
                                                                {[
                                                                    filterOrigins,
                                                                    filterColors,
                                                                    [],
                                                                    [],
                                                                    [],
                                                                    filterBewerys,
                                                                    filterPairings,
                                                                ][
                                                                    filterCategory -
                                                                        1
                                                                ].filter(
                                                                    (
                                                                        f_data
                                                                    ) => {
                                                                        return (
                                                                            f_data ==
                                                                            data.name
                                                                        );
                                                                    }
                                                                ).length !=
                                                                    0 && (
                                                                    <Btn_Select />
                                                                )}
                                                            </TouchableOpacity>
                                                            <View
                                                                style={{
                                                                    width: 320,
                                                                    height: 1,
                                                                    backgroundColor:
                                                                        "#E4E4E4",
                                                                    marginBottom: 10,
                                                                }}
                                                            />
                                                        </View>
                                                    );
                                                }
                                            )}
                                    </View>
                                    <View style={{ marginVertical: 40 }} />
                                </ScrollView>
                                {/* 선택 완료 버튼 */}
                                <TouchableOpacity
                                    onPress={() => {
                                        toggleFilterModal();
                                    }}
                                    style={[
                                        {
                                            width: 320,
                                            height: 55,
                                            backgroundColor: "#974B1A",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: 10,
                                            alignSelf: "center",
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
                                        선택 완료
                                    </Text>
                                </TouchableOpacity>
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
                                        setSortCategory("rate");
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
                                        평점순
                                    </Text>
                                    <View style={{ height: 40 }}>
                                        {sortCategory === "rate" && (
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
                                        setSortCategory("review");
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
                                        리뷰순
                                    </Text>
                                    <View style={{ height: 40 }}>
                                        {sortCategory === "review" && (
                                            <Btn_Check />
                                        )}
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
                                    리스트
                                </Text>
                                <View style={{ marginLeft: 5 }}>
                                    <Icon_Whisky />
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
                        {/* 검색 필드 + 필터 */}
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
                            {/* 검색 필드 */}
                            <View
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    height: 50,
                                    borderRadius: 10,
                                    flexDirection: "row",
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
                                <View
                                    style={{
                                        flex: 1,
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
                            <TouchableOpacity
                                style={{
                                    marginLeft: 10,
                                    width: 50,
                                    height: 50,
                                    borderRadius: 10,
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onPress={() => {
                                    toggleFilterModal();
                                }}
                            >
                                <Btn_Filter />
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
                            {/* 내용 탑 */}
                            <View
                                style={{
                                    marginTop: 10,
                                    width: "100%",
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
                                    <Text
                                        style={{ color: "#D6690F" }}
                                    >{`(${get_whisky().length.toLocaleString()})`}</Text>
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
                                            fontFamily: "Spoqa Han Sans Neo",
                                            fontWeight: "500",
                                            fontSize: 12,
                                            color: "#000000",
                                            textAlign: "center",
                                        }}
                                    >
                                        {
                                            {
                                                rate: "평점순",
                                                new: "최신순",
                                                review: "리뷰순",
                                            }[sortCategory]
                                        }
                                    </Text>
                                    <View style={{ width: 14, height: 14 }}>
                                        <Btn_Drop_Black />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                {viewWhiskyData
                                    .filter((_, index) => {
                                        return index % 2 === 0;
                                    })
                                    .map((whisky, index) => (
                                        <View
                                            key={index}
                                            style={{
                                                display: "flex",
                                                width: "100%",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                marginTop: 20,
                                            }}
                                        >
                                            <Card_Rc_Whisky_Long
                                                whisky={whisky}
                                                press={() => {
                                                    navigation.navigate(
                                                        "SubPage_Whisky",
                                                        {
                                                            whisky_id:
                                                                whisky.whisky_id,
                                                        }
                                                    );
                                                }}
                                            />
                                            {viewWhiskyData.length <=
                                            index * 2 + 1 ? null : (
                                                <Card_Rc_Whisky_Long
                                                    whisky={
                                                        viewWhiskyData[
                                                            index * 2 + 1
                                                        ]
                                                    }
                                                    press={() => {
                                                        navigation.navigate(
                                                            "SubPage_Whisky",
                                                            {
                                                                whisky_id:
                                                                    viewWhiskyData[
                                                                        index +
                                                                            1
                                                                    ].whisky_id,
                                                            }
                                                        );
                                                    }}
                                                />
                                            )}
                                        </View>
                                    ))}
                            </View>
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
        paddingLeft: 20,
        paddingRight: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: "hidden",
    },
});
