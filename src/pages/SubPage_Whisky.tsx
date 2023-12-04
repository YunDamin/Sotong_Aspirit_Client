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
} from "react-native";

import Btn_OnOff_Arrow_Right from "../public/icons/btn/btn_onoff_right_arrow.svg";

import StarRating, { StarRatingDisplay } from "react-native-star-rating-widget";

// Navigator
import CustomNavigator_Top from "../navigators/CustomNavigator_Top";

// Components
import SelectBar_Color from "../components/SelectBar_Color";
import Card_Graph from "../components/Card_Graph";

export default function SubPage_Whisky({ navigation }: any) {
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
                                    height: 480,
                                    backgroundColor: "#000000",
                                }}
                            ></View>
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
                                {"발렌타인"}
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
                                {"Ballantine"}
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
                                    rating={4.0}
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
                                    <Text>{"4.0"}</Text>
                                    <Text>{" (1,012)"}</Text>
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
                                        {"45.8도"}
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
                                        {"750ml"}
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
                                        {"Talisker Distillery"}
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
                                        {"스코틀랜드, 아일랜드"}
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
                                            width: 25,
                                            height: 25,
                                            borderRadius: 5,
                                            backgroundColor: get_color(2),
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
                                        짚 (0.5)
                                    </Text>
                                </View>
                            </View>
                            <SelectBar_Color disable={true} index={2} />
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
                                }}
                            >
                                <View
                                    style={{
                                        width: 38,
                                        height: 25,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: 5,
                                        borderColor: "#EDEDED",
                                        borderWidth: 1,
                                        marginRight: 5,
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
                                        피트
                                    </Text>
                                </View>
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
                                }}
                            >
                                <View
                                    style={{
                                        width: 38,
                                        height: 25,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: 5,
                                        borderColor: "#EDEDED",
                                        borderWidth: 1,
                                        marginRight: 5,
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
                                        복숭아
                                    </Text>
                                </View>
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
                                }}
                            >
                                <View
                                    style={{
                                        width: 38,
                                        height: 25,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: 5,
                                        borderColor: "#EDEDED",
                                        borderWidth: 1,
                                        marginRight: 5,
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
                                        레몬
                                    </Text>
                                </View>
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
                                    추천 페어링
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: 320,
                                    height: 55,
                                    borderColor: "#EDEDED",
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    flexDirection: "row",
                                    alignItems: "center",
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
                                    }}
                                />
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "500",
                                        fontSize: 14,
                                        color: "#000000",
                                        textAlign: "left",
                                    }}
                                >
                                    생선
                                </Text>
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
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "700",
                                        fontSize: 14,
                                        color: "#000000",
                                        textAlign: "center",
                                    }}
                                >
                                    {"Talisker Distillery"}
                                </Text>
                            </View>
                            <Text
                                style={{
                                    width: 320,
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "400",
                                    fontSize: 12,
                                    color: "#000000",
                                    textAlign: "left",
                                }}
                            >
                                {
                                    "스코틀랜드 스카이섬 Minginish반도 Carbost에 본사를 둔 섬 싱글 몰트 스카치 위스키 증류소입니다. 양조장 관련 정보 어쩌구 저쩌구 설명란입니다."
                                }
                            </Text>
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
                                >{` (${1021})`}</Text>
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
                                        {"4.0"}
                                    </Text>
                                    <StarRatingDisplay
                                        style={{
                                            width: 120,
                                            justifyContent: "center",
                                        }}
                                        starSize={20}
                                        starStyle={{
                                            width: 9,
                                        }}
                                        color={"#D6690F"}
                                        rating={4.0}
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
                                            rating={4.0}
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
                                            {"4.0"}
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
                                            rating={4.0}
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
                                            {"3.0"}
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
                                            rating={4.0}
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
                                            {"3.0"}
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
                                rates={[
                                    {
                                        name: "복숭아",
                                        num: 13,
                                    },
                                    {
                                        name: "레몬",
                                        num: 17,
                                    },
                                    {
                                        name: "블랙커런트 싹",
                                        num: 12,
                                    },
                                    {
                                        name: "훈연",
                                        num: 14,
                                    },
                                    {
                                        name: "피트",
                                        num: 15,
                                    },
                                    {
                                        name: "바나나",
                                        num: 9,
                                    },
                                ]}
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
                                rates={[
                                    {
                                        name: "복숭아",
                                        num: 13,
                                    },
                                    {
                                        name: "레몬",
                                        num: 17,
                                    },
                                    {
                                        name: "블랙커런트 싹",
                                        num: 12,
                                    },
                                    {
                                        name: "훈연",
                                        num: 14,
                                    },
                                    {
                                        name: "피트",
                                        num: 15,
                                    },
                                    {
                                        name: "바나나",
                                        num: 9,
                                    },
                                ]}
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
                                rates={[
                                    {
                                        name: "복숭아",
                                        num: 13,
                                    },
                                    {
                                        name: "레몬",
                                        num: 17,
                                    },
                                    {
                                        name: "블랙커런트 싹",
                                        num: 12,
                                    },
                                    {
                                        name: "훈연",
                                        num: 14,
                                    },
                                    {
                                        name: "피트",
                                        num: 15,
                                    },
                                    {
                                        name: "바나나",
                                        num: 9,
                                    },
                                ]}
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
                                <Text
                                    style={{ color: "#D6690F" }}
                                >{` (${1021})`}</Text>
                            </Text>
                            <TouchableOpacity
                                onPress={() => {}}
                                style={[
                                    {
                                        width: 320,
                                        height: 35,
                                        backgroundColor: "#974B1A",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: 15,
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
