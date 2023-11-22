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
} from "react-native";

import Bg_Cup from "../public/icons/bg/cup.svg";
import Icon_Contents from "../public/icons/icons/icon_contents.svg";
import Btn_Setting from "../public/icons/btn/btn_setting.svg";
import Btn_Bell_On from "../public/icons/btn/btn_bell_on.svg";
import Btn_Bell_Off from "../public/icons/btn/btn_bell_off.svg";
import Btn_My from "../public/icons/btn/btn_my.svg";

// Components
import Card_News_Whisky_Big from "../components/Card_News_Whisky_Big";

export default function MainPage_Contents({ navigation }: any) {
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

    return (
        <View style={styles.page}>
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
                            콘텐츠
                        </Text>
                        <View style={{ marginLeft: 5 }}>
                            <Icon_Contents />
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
                        <TouchableOpacity style={{ width: 40, height: 40 }}>
                            <Btn_Bell_On />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 40, height: 40 }}>
                            <Btn_My />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Vertical Line */}
                <View
                    style={{
                        marginTop: 20,
                        height: 1,
                        backgroundColor: "#ffffff",
                        opacity: 0.1,
                    }}
                />
                {/* 환영 인사 + 프로필 요약 && 설정 버튼 */}
                <View
                    style={{
                        marginTop: 20,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <View>
                        <Text
                            style={{
                                fontFamily: "Spoqa Han Sans Neo",
                                fontWeight: "700",
                                fontSize: 16,
                                color: "#ffffff",
                                marginTop: 5,
                            }}
                        >
                            환영합니다. 김스키님
                        </Text>
                        <Text
                            style={{
                                fontFamily: "Spoqa Han Sans Neo",
                                fontWeight: "400",
                                fontSize: 12,
                                color: "#ffffff",
                                opacity: 0.4,
                                marginTop: 5,
                            }}
                        >
                            <Text>작성노트 </Text>
                            <Text>73</Text>
                            <Text> · </Text>
                            <Text>평균평점 </Text>
                            <Text>4.5</Text>
                        </Text>
                    </View>
                    <TouchableOpacity style={{ width: 25, height: 25 }}>
                        <Btn_Setting />
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
                    {/* 탭 버튼 */}
                    <View
                        style={{
                            marginTop: 10,
                            width: "100%",
                            height: 30,
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                            }}
                            onPress={() => {
                                setTabIndex(0);
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "700",
                                    fontSize: 14,
                                    color:
                                        tabIndex === 0 ? "#D6690F" : "#888888",
                                    textAlign: "center",
                                }}
                            >
                                뉴스
                            </Text>
                            <View
                                style={{
                                    marginTop: 10,
                                    height: tabIndex === 0 ? 3 : 1,
                                    backgroundColor:
                                        tabIndex === 0 ? "#D6690F" : "#888888",
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                            }}
                            onPress={() => {
                                setTabIndex(1);
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "700",
                                    fontSize: 14,
                                    color:
                                        tabIndex === 1 ? "#D6690F" : "#888888",
                                    textAlign: "center",
                                }}
                            >
                                가이드
                            </Text>
                            <View
                                style={{
                                    marginTop: 10,
                                    height: tabIndex === 1 ? 3 : 1,
                                    backgroundColor:
                                        tabIndex === 1 ? "#D6690F" : "#888888",
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                            }}
                            onPress={() => {
                                setTabIndex(2);
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "700",
                                    fontSize: 14,
                                    color:
                                        tabIndex === 2 ? "#D6690F" : "#888888",
                                    textAlign: "center",
                                }}
                            >
                                아티클
                            </Text>
                            <View
                                style={{
                                    marginTop: 10,
                                    height: tabIndex === 2 ? 3 : 1,
                                    backgroundColor:
                                        tabIndex === 2 ? "#D6690F" : "#888888",
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                            }}
                            onPress={() => {
                                setTabIndex(3);
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "700",
                                    fontSize: 14,
                                    color:
                                        tabIndex === 3 ? "#D6690F" : "#888888",
                                    textAlign: "center",
                                }}
                            >
                                공지
                            </Text>
                            <View
                                style={{
                                    marginTop: 10,
                                    height: tabIndex === 3 ? 3 : 1,
                                    backgroundColor:
                                        tabIndex === 3 ? "#D6690F" : "#888888",
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    {/* 콘텐츠 */}
                    <View
                        style={{
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            marginTop: 20,
                            marginBottom: 20,
                            paddingLeft: 20,
                        }}
                    >
                        <View>
                            <Text
                                style={{
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "700",
                                    fontSize: 16,
                                    color: "#000000",
                                }}
                            >
                                위스키 뉴스 📰️
                            </Text>
                        </View>
                    </View>
                    {[0, 0, 0, 0, 0, 0, 0, 0].map((_, index) => {
                        return <Card_News_Whisky_Big key={index} />;
                    })}
                    <View style={{ height: 40 }} />
                    {/* 여분 */}
                    <View style={{ height: 60 }} />
                </ScrollView>
            </Animated.View>
        </View>
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
    },
});
