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

import Bg_Cup from "../public/icons/bg/cup.svg";
import Icon_Whisky from "../public/icons/icons/icon_whisky_svg.svg";
import Btn_Setting from "../public/icons/btn/btn_setting.svg";
import Btn_Bell_On from "../public/icons/btn/btn_bell_on.svg";
import Btn_OnOff_Right_Arrow from "../public/icons/btn/btn_onoff_right_arrow.svg";
import Btn_My from "../public/icons/btn/btn_my.svg";
import Btn_Drop from "../public/icons/btn/btn_drop.svg";
import Btn_Drop_Black from "../public/icons/btn/btn_drop_black.svg";
import Btn_Search from "../public/icons/btn/btn_search.svg";
import Btn_Check from "../public/icons/btn/btn_check.svg";
import Btn_Filter from "../public/icons/btn/btn_filter.svg";

// Components
import Card_Rc_Whisky_Long from "../components/Card_Rc_Whisky_Long";

export default function MainPage_Whisky({ navigation }: any) {
    const [searchText, setSearchText] = React.useState<string>("");
    const [isFocused, setIsFocused] = React.useState<boolean>(false);

    const [sortCategory, setSortCategory] = React.useState<string>("rate");

    const [tabIndex, setTabIndex] = React.useState<number>(0);

    const topPosition = React.useRef(new Animated.Value(150));

    const handleScroll = (event: any) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        Animated.timing(topPosition.current, {
            toValue: scrollY > 50 ? 50 : 150,
            duration: 50,
            useNativeDriver: false,
        }).start();
    };

    const [isFilterModalVisible, setFilterModaVisible] = React.useState(false);
    const toggleFilterModal = () => {
        setFilterModaVisible(!isFilterModalVisible);
        setFilterCategory("filter");
    };

    /**
     * 필터 모달 데이터
     */
    type FilterDictionary = {
        country: string[];
        kind: string[];
        color: string[];
        smell: string[];
        taste: string[];
        age: string[];
        [key: string]: string[];
    };
    type FilterData = {
        id: string;
        value: string;
    };
    type FilterCategory =
        | "filter"
        | "country"
        | "kind"
        | "color"
        | "smell"
        | "taste"
        | "age";
    type Filter = {
        country: FilterData[];
        kind: FilterData[];
        color: FilterData[];
        smell: FilterData[];
        taste: FilterData[];
        age: FilterData[];
    };
    const [filterCategory, setFilterCategory] =
        React.useState<FilterCategory>("filter");
    const [filterDictionary, setFilterDictionary] =
        React.useState<FilterDictionary>({
            country: [],
            kind: [],
            color: [],
            smell: [],
            taste: [],
            age: [],
        });

    const filter = React.useRef<Filter>({
        country: [
            { id: "1", value: "한국" },
            { id: "2", value: "일본" },
            { id: "3", value: "미국" },
            { id: "4", value: "아일랜드" },
            { id: "5", value: "스코틀랜드" },
        ],
        kind: [
            { id: "1", value: "싱글몰트" },
            { id: "2", value: "블렌디드" },
            { id: "3", value: "그레인" },
            { id: "4", value: "버번" },
        ],
        color: [
            { id: "1", value: "연한골드" },
            { id: "2", value: "연한호박" },
            { id: "3", value: "연한갈색" },
            { id: "4", value: "갈색" },
            { id: "5", value: "진한갈색" },
            { id: "6", value: "진한호박" },
            { id: "7", value: "진한골드" },
        ],
        smell: [
            { id: "1", value: "향긋한" },
            { id: "2", value: "향기로운" },
        ],
        taste: [
            { id: "1", value: "달콤한" },
            { id: "2", value: "달달한" },
        ],
        age: [
            { id: "1", value: "1년" },
            { id: "2", value: "2년" },
            { id: "3", value: "3년" },
            { id: "4", value: "4년" },
            { id: "5", value: "5년" },
            { id: "6", value: "6년" },
            { id: "7", value: "7년" },
        ],
    });

    const isAbleReset = (category: string) => {
        if (category === "filter") {
            for (const key in filterDictionary) {
                if (
                    Array.isArray(filterDictionary[key]) &&
                    filterDictionary[key].length > 0
                )
                    return true;
            }
        }
        return (
            Array.isArray(filterDictionary[category]) &&
            filterDictionary[category].length > 0
        );
    };
    const setFilter = (category: string, value: string) => {
        if (
            Array.isArray(filterDictionary[category]) &&
            filterDictionary[category].includes(value)
        ) {
            setFilterDictionary({
                ...filterDictionary,
                [category]: filterDictionary[category].filter(
                    (item) => item !== value
                ),
            });
            return;
        }
        setFilterDictionary({
            ...filterDictionary,
            [category]: [...filterDictionary[category], value],
        });
    };
    const filterReset = (category: string) => {
        if (category === "filter")
            setFilterDictionary({
                country: [],
                kind: [],
                color: [],
                smell: [],
                taste: [],
                age: [],
            });
        else
            setFilterDictionary({
                ...filterDictionary,
                [category]: [],
            });
    };

    const [isSortModalVisible, setSortModalVisible] = React.useState(false);
    const toggleSortModal = () => {
        setSortModalVisible(!isSortModalVisible);
    };

    const whisky = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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
                                            if (filterCategory === "filter")
                                                toggleFilterModal();
                                            else setFilterCategory("filter");
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
                                            취소
                                        </Text>
                                    </TouchableOpacity>
                                    <Text
                                        style={{
                                            fontFamily: "Spoqa Han Sans Neo",
                                            fontWeight: "700",
                                            fontSize: 16,
                                            color: "#000000",
                                        }}
                                    >
                                        {
                                            {
                                                filter: "필터",
                                                country: "국가",
                                                kind: "종류",
                                                color: "색",
                                                smell: "향",
                                                taste: "맛",
                                                age: "숙성",
                                            }[filterCategory]
                                        }
                                    </Text>
                                    <TouchableOpacity
                                        disabled={!isAbleReset(filterCategory)}
                                        onPress={() => {
                                            filterReset(filterCategory);
                                            if (filterCategory === "filter")
                                                toggleFilterModal();
                                            else setFilterCategory("filter");
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "400",
                                                fontSize: 14,
                                                color: isAbleReset(
                                                    filterCategory
                                                )
                                                    ? "#000000"
                                                    : "#BABABA",
                                            }}
                                        >
                                            초기화
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <ScrollView
                                    style={{
                                        marginTop: 20,
                                    }}
                                >
                                    {filterCategory === "filter" ? (
                                        <View>
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "400",
                                                    fontSize: 12,
                                                    color: "#000000",
                                                }}
                                            >
                                                국가
                                            </Text>
                                            <TouchableOpacity
                                                style={{
                                                    marginTop: 10,
                                                    marginBottom: 10,
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                                onPress={() => {
                                                    setFilterCategory(
                                                        "country"
                                                    );
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Spoqa Han Sans Neo",
                                                        fontWeight: "500",
                                                        fontSize: 14,
                                                        color:
                                                            filterDictionary
                                                                .country
                                                                .length > 0
                                                                ? "#000000"
                                                                : "#BABABA",
                                                    }}
                                                >
                                                    {filterDictionary.country
                                                        .length > 0
                                                        ? filterDictionary.country.join(
                                                              ", "
                                                          ).length > 16
                                                            ? filterDictionary.country
                                                                  .join(", ")
                                                                  .substring(
                                                                      0,
                                                                      16
                                                                  ) + "..."
                                                            : filterDictionary.country.join(
                                                                  ", "
                                                              )
                                                        : "전체"}
                                                </Text>
                                                <Btn_OnOff_Right_Arrow />
                                            </TouchableOpacity>
                                            <View
                                                style={{
                                                    width: "100%",
                                                    height: 1,
                                                    backgroundColor: "#E4E4E4",
                                                }}
                                            />
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "400",
                                                    fontSize: 12,
                                                    color: "#000000",
                                                    marginTop: 20,
                                                }}
                                            >
                                                종류
                                            </Text>
                                            <TouchableOpacity
                                                style={{
                                                    marginTop: 10,
                                                    marginBottom: 10,
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                                onPress={() => {
                                                    setFilterCategory("kind");
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Spoqa Han Sans Neo",
                                                        fontWeight: "500",
                                                        fontSize: 14,
                                                        color:
                                                            filterDictionary
                                                                .kind.length > 0
                                                                ? "#000000"
                                                                : "#BABABA",
                                                    }}
                                                >
                                                    {filterDictionary.kind
                                                        .length > 0
                                                        ? filterDictionary.kind.join(
                                                              ", "
                                                          ).length > 16
                                                            ? filterDictionary.kind
                                                                  .join(", ")
                                                                  .substring(
                                                                      0,
                                                                      16
                                                                  ) + "..."
                                                            : filterDictionary.kind.join(
                                                                  ", "
                                                              )
                                                        : "전체"}
                                                </Text>
                                                <Btn_OnOff_Right_Arrow />
                                            </TouchableOpacity>
                                            <View
                                                style={{
                                                    width: "100%",
                                                    height: 1,
                                                    backgroundColor: "#E4E4E4",
                                                }}
                                            />
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "400",
                                                    fontSize: 12,
                                                    color: "#000000",
                                                    marginTop: 20,
                                                }}
                                            >
                                                색
                                            </Text>
                                            <TouchableOpacity
                                                style={{
                                                    marginTop: 10,
                                                    marginBottom: 10,
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                                onPress={() => {
                                                    setFilterCategory("color");
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Spoqa Han Sans Neo",
                                                        fontWeight: "500",
                                                        fontSize: 14,
                                                        color:
                                                            filterDictionary
                                                                .color.length >
                                                            0
                                                                ? "#000000"
                                                                : "#BABABA",
                                                    }}
                                                >
                                                    {filterDictionary.color
                                                        .length > 0
                                                        ? filterDictionary.color.join(
                                                              ", "
                                                          ).length > 16
                                                            ? filterDictionary.color
                                                                  .join(", ")
                                                                  .substring(
                                                                      0,
                                                                      16
                                                                  ) + "..."
                                                            : filterDictionary.color.join(
                                                                  ", "
                                                              )
                                                        : "전체"}
                                                </Text>
                                                <Btn_OnOff_Right_Arrow />
                                            </TouchableOpacity>
                                            <View
                                                style={{
                                                    width: "100%",
                                                    height: 1,
                                                    backgroundColor: "#E4E4E4",
                                                }}
                                            />
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "400",
                                                    fontSize: 12,
                                                    color: "#000000",
                                                    marginTop: 20,
                                                }}
                                            >
                                                향
                                            </Text>
                                            <TouchableOpacity
                                                style={{
                                                    marginTop: 10,
                                                    marginBottom: 10,
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                                onPress={() => {
                                                    setFilterCategory("smell");
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Spoqa Han Sans Neo",
                                                        fontWeight: "500",
                                                        fontSize: 14,
                                                        color:
                                                            filterDictionary
                                                                .smell.length >
                                                            0
                                                                ? "#000000"
                                                                : "#BABABA",
                                                    }}
                                                >
                                                    {filterDictionary.smell
                                                        .length > 0
                                                        ? filterDictionary.smell.join(
                                                              ", "
                                                          ).length > 16
                                                            ? filterDictionary.smell
                                                                  .join(", ")
                                                                  .substring(
                                                                      0,
                                                                      16
                                                                  ) + "..."
                                                            : filterDictionary.smell.join(
                                                                  ", "
                                                              )
                                                        : "전체"}
                                                </Text>
                                                <Btn_OnOff_Right_Arrow />
                                            </TouchableOpacity>
                                            <View
                                                style={{
                                                    width: "100%",
                                                    height: 1,
                                                    backgroundColor: "#E4E4E4",
                                                }}
                                            />
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "400",
                                                    fontSize: 12,
                                                    color: "#000000",
                                                    marginTop: 20,
                                                }}
                                            >
                                                맛
                                            </Text>
                                            <TouchableOpacity
                                                style={{
                                                    marginTop: 10,
                                                    marginBottom: 10,
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                                onPress={() => {
                                                    setFilterCategory("taste");
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Spoqa Han Sans Neo",
                                                        fontWeight: "500",
                                                        fontSize: 14,
                                                        color:
                                                            filterDictionary
                                                                .taste.length >
                                                            0
                                                                ? "#000000"
                                                                : "#BABABA",
                                                    }}
                                                >
                                                    {filterDictionary.taste
                                                        .length > 0
                                                        ? filterDictionary.taste.join(
                                                              ", "
                                                          ).length > 16
                                                            ? filterDictionary.taste
                                                                  .join(", ")
                                                                  .substring(
                                                                      0,
                                                                      16
                                                                  ) + "..."
                                                            : filterDictionary.taste.join(
                                                                  ", "
                                                              )
                                                        : "전체"}
                                                </Text>
                                                <Btn_OnOff_Right_Arrow />
                                            </TouchableOpacity>
                                            <View
                                                style={{
                                                    width: "100%",
                                                    height: 1,
                                                    backgroundColor: "#E4E4E4",
                                                }}
                                            />
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "400",
                                                    fontSize: 12,
                                                    color: "#000000",
                                                    marginTop: 20,
                                                }}
                                            >
                                                숙성
                                            </Text>
                                            <TouchableOpacity
                                                style={{
                                                    marginTop: 10,
                                                    marginBottom: 10,
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                                onPress={() => {
                                                    setFilterCategory("age");
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Spoqa Han Sans Neo",
                                                        fontWeight: "500",
                                                        fontSize: 14,
                                                        color:
                                                            filterDictionary.age
                                                                .length > 0
                                                                ? "#000000"
                                                                : "#BABABA",
                                                    }}
                                                >
                                                    {filterDictionary.age
                                                        .length > 0
                                                        ? filterDictionary.age.join(
                                                              ", "
                                                          ).length > 16
                                                            ? filterDictionary.age
                                                                  .join(", ")
                                                                  .substring(
                                                                      0,
                                                                      16
                                                                  ) + "..."
                                                            : filterDictionary.age.join(
                                                                  ", "
                                                              )
                                                        : "전체"}
                                                </Text>
                                                <Btn_OnOff_Right_Arrow />
                                            </TouchableOpacity>
                                            <View
                                                style={{
                                                    width: "100%",
                                                    height: 1,
                                                    backgroundColor: "#E4E4E4",
                                                }}
                                            />
                                        </View>
                                    ) : (
                                        <View>
                                            {filter.current[filterCategory].map(
                                                (item) => (
                                                    <View key={item.id}>
                                                        <TouchableOpacity
                                                            style={{
                                                                marginTop: 10,
                                                                marginBottom: 10,
                                                                display: "flex",
                                                                flexDirection:
                                                                    "row",
                                                                alignItems:
                                                                    "center",
                                                                justifyContent:
                                                                    "space-between",
                                                                height: 40,
                                                            }}
                                                            onPress={() => {
                                                                setFilter(
                                                                    filterCategory,
                                                                    item.value
                                                                );
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    fontFamily:
                                                                        "Spoqa Han Sans Neo",
                                                                    fontWeight:
                                                                        "500",
                                                                    fontSize: 14,
                                                                    color: filterDictionary[
                                                                        filterCategory
                                                                    ].includes(
                                                                        item.value
                                                                    )
                                                                        ? "#000000"
                                                                        : "#BABABA",
                                                                }}
                                                            >
                                                                {item.value}
                                                            </Text>
                                                            {filterDictionary[
                                                                filterCategory
                                                            ].includes(
                                                                item.value
                                                            ) && <Btn_Check />}
                                                        </TouchableOpacity>
                                                        <View
                                                            style={{
                                                                width: "100%",
                                                                height: 1,
                                                                backgroundColor:
                                                                    "#E4E4E4",
                                                            }}
                                                        />
                                                    </View>
                                                )
                                            )}
                                        </View>
                                    )}
                                </ScrollView>
                                <TouchableOpacity
                                    style={{
                                        width: "100%",
                                        height: 55,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: 10,
                                        marginBottom: 40,
                                        backgroundColor: isAbleReset(
                                            filterCategory
                                        )
                                            ? "#974B1A"
                                            : "#BABABA",
                                    }}
                                    disabled={!isAbleReset(filterCategory)}
                                    onPress={() => {
                                        if (filterCategory === "filter")
                                            toggleFilterModal();
                                        else setFilterCategory("filter");
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: "Spoqa Han Sans Neo",
                                            fontWeight: "500",
                                            fontSize: 18,
                                            color: "#ffffff",
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
                                        navigation.navigate("SubPage_Alert");
                                    }}
                                >
                                    <Btn_Bell_On />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ width: 40, height: 40 }}
                                    onPress={() => {
                                        navigation.navigate("SubPage_MyPage");
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
                                    >{`(${825})`}</Text>
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
                                {whisky
                                    .filter((_, index) => {
                                        return index % 2 === 0;
                                    })
                                    .map((_, index) => (
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
                                                press={() => {
                                                    navigation.navigate(
                                                        "SubPage_Whisky"
                                                    );
                                                }}
                                            />
                                            {whisky.length <=
                                            index * 2 + 1 ? null : (
                                                <Card_Rc_Whisky_Long
                                                    press={() => {
                                                        navigation.navigate(
                                                            "SubPage_Whisky"
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
                        </ScrollView>
                    </Animated.View>
                </View>
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
