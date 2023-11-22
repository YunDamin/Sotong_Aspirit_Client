import React from "react";
import {
    View,
    StyleSheet,
    Pressable,
    StyleProp,
    ViewStyle,
    Text,
    Modal,
    TouchableOpacity,
    Linking,
} from "react-native";
import {
    createNavigatorFactory,
    DefaultNavigatorOptions,
    ParamListBase,
    CommonActions,
    TabActionHelpers,
    TabNavigationState,
    TabRouter,
    TabRouterOptions,
    useNavigationBuilder,
} from "@react-navigation/native";

import Home_Off_Svg from "../public/icons/tab_navigator/home_off.svg";
import Home_On_Svg from "../public/icons/tab_navigator/home_on.svg";
import Note_Off_Svg from "../public/icons/tab_navigator/note_off.svg";
import Note_On_Svg from "../public/icons/tab_navigator/note_on.svg";
import Whisky_Off_Svg from "../public/icons/tab_navigator/whisky_off.svg";
import Whisky_On_Svg from "../public/icons/tab_navigator/whisky_on.svg";
import Contents_Off_Svg from "../public/icons/tab_navigator/contents_off.svg";
import Contents_On_Svg from "../public/icons/tab_navigator/contents_on.svg";
import Funding_Off_Svg from "../public/icons/tab_navigator/funding_off.svg";
import Funding_On_Svg from "../public/icons/tab_navigator/funding_on.svg";

import Btn_OnOff from "../public/icons/btn/btn_onoff.svg";

type TabNavigationConfig = {};

type TabNavigationOptions = {
    title?: string;
};

type TabNavigationEventMap = {
    tabPress: {
        data: { isAlreadyFocused: boolean };
        canPreventDefault: true;
    };
};

type Props = DefaultNavigatorOptions<
    ParamListBase,
    TabNavigationState<ParamListBase>,
    TabNavigationOptions,
    TabNavigationEventMap
> &
    TabRouterOptions &
    TabNavigationConfig;

interface IconProps {
    id: number;
    on: boolean;
}

const Icon = (props: IconProps) => {
    switch (props.id) {
        case 0:
            if (props.on) return <Home_On_Svg />;
            else return <Home_Off_Svg />;
        case 1:
            if (props.on) return <Note_On_Svg />;
            else return <Note_Off_Svg />;
        case 2:
            if (props.on) return <Whisky_On_Svg />;
            else return <Whisky_Off_Svg />;
        case 3:
            if (props.on) return <Contents_On_Svg />;
            else return <Contents_Off_Svg />;
        case 4:
            if (props.on) return <Funding_On_Svg />;
            else return <Funding_Off_Svg />;
        default:
            return <Home_Off_Svg />;
    }
};

const TabName = (name: string): string => {
    let tabName: string;

    switch (name) {
        case "Navigator_Home":
            tabName = "홈";
            break;
        case "Navigator_Note":
            tabName = "노트";
            break;
        case "Navigator_Whisky":
            tabName = "위스키";
            break;
        case "Navigator_Contents":
            tabName = "콘텐츠";
            break;
        case "Navigator_Funding":
            tabName = "펀딩";
            break;
        default:
            tabName = "오류";
            break;
    }

    return tabName;
};

function WhiskyPaletteBottomTabNavigator({
    initialRouteName,
    children,
    screenOptions,
}: Props) {
    const { state, navigation, descriptors, NavigationContent } =
        useNavigationBuilder<
            TabNavigationState<ParamListBase>,
            TabRouterOptions,
            TabActionHelpers<ParamListBase>,
            TabNavigationOptions,
            TabNavigationEventMap
        >(TabRouter, {
            children,
            screenOptions,
            initialRouteName,
        });

    const [tabBarVisible, setTabBarVisible] = React.useState(true);

    React.useEffect(() => {
        const route = state.routes[state.index].state;
        const isInitialPage = route && route.index ? route.index <= 0 : true;
        setTabBarVisible(isInitialPage);
    }, [state]);

    const [isModalVisible, setModalVisible] = React.useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <NavigationContent>
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
                            height: 190,
                            backgroundColor: "#ffffff",
                            borderRadius: 20,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <View
                            style={{
                                width: 290,
                            }}
                        >
                            <View
                                style={{
                                    width: 290,
                                    height: 40,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 10,
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
                                    펀딩 서비스
                                </Text>
                                <TouchableOpacity
                                    style={{
                                        width: 40,
                                        height: 40,
                                        position: "absolute",
                                        right: 0,
                                        top: 0,
                                    }}
                                    onPress={() => {
                                        toggleModal();
                                    }}
                                >
                                    <Btn_OnOff />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text
                            style={{
                                fontFamily: "Spoqa Han Sans Neo",
                                fontWeight: "500",
                                fontSize: 14,
                                color: "#000000",
                                textAlign: "center",
                            }}
                        >
                            크라우드 펀딩 서비스는 현재 준비중입니다.
                        </Text>
                        <TouchableOpacity
                            style={{
                                width: 290,
                                height: 55,
                                borderRadius: 10,
                                backgroundColor: "#974B1A",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 15,
                            }}
                            onPress={() => {
                                Linking.openURL("https://sotongfive.kr/");
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "500",
                                    fontSize: 16,
                                    color: "#ffffff",
                                }}
                            >
                                링크 이동
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={[{ flex: 1 }]}>
                {state.routes.map((route, i) => {
                    return (
                        <View
                            key={route.key}
                            style={[
                                StyleSheet.absoluteFill,
                                {
                                    display:
                                        i === state.index ? "flex" : "none",
                                },
                            ]}
                        >
                            {descriptors[route.key].render()}
                        </View>
                    );
                })}
            </View>
            {tabBarVisible && (
                <View
                    style={[{ flexDirection: "row" }, navigatorStyles.tabBar]}
                >
                    {state.routes.map((route, index) => {
                        return (
                            <Pressable
                                key={route.key}
                                onPress={() => {
                                    if (route.name === "Navigator_Funding") {
                                        toggleModal();
                                    } else {
                                        const event = navigation.emit({
                                            type: "tabPress",
                                            target: route.key,
                                            canPreventDefault: true,
                                            data: {
                                                isAlreadyFocused:
                                                    route.key ===
                                                    state.routes[state.index]
                                                        .key,
                                            },
                                        });

                                        if (!event.defaultPrevented) {
                                            navigation.dispatch({
                                                ...CommonActions.navigate(
                                                    route
                                                ),
                                                target: state.key,
                                            });
                                        }
                                    }
                                }}
                                style={[{ flex: 1 }, navigatorStyles.btns]}
                            >
                                <View
                                    style={
                                        route.key ===
                                        state.routes[state.index].key
                                            ? navigatorStyles.focusedBtnContainer
                                            : navigatorStyles.notfocusedBtnContainer
                                    }
                                >
                                    <Icon
                                        id={index}
                                        on={
                                            route.key ===
                                            state.routes[state.index].key
                                        }
                                    />
                                    {/* <View style={{ height: 32 }}>
                                        <Icon
                                            id={index}
                                            on={
                                                route.key ===
                                                state.routes[state.index].key
                                            }
                                        />
                                    </View> */}
                                    {/* <Text
                                        style={
                                            route.key ===
                                            state.routes[state.index].key
                                                ? navigatorStyles.focusedBtnTxt
                                                : navigatorStyles.notfocusedBtnTxt
                                        }
                                    >
                                        {TabName(route.name)}
                                    </Text> */}
                                </View>
                            </Pressable>
                        );
                    })}
                </View>
            )}
        </NavigationContent>
    );
}

const navigatorStyles = StyleSheet.create({
    notVisibileTabBar: {
        width: 0,
        height: 0,
    },
    tabBar: {
        height: 80,
        backgroundColor: "#ffffff",
        elevation: 10,
    },
    btns: {
        justifyContent: "center",
        alignItems: "center",
    },
    focusedBtnContainer: {
        flex: 1,
        backgroundColor: "transparent",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
    },
    notfocusedBtnContainer: {
        backgroundColor: "transparent",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
    },
    focusedBtnTxt: {
        fontFamily: "SpoqaHanSansNeo-Bold",
        fontSize: 14,
        color: "#e65b2c",
    },
    notfocusedBtnTxt: {
        fontFamily: "SpoqaHanSansNeo-Bold",
        fontSize: 14,
        color: "#bababa",
    },
});

export const createWhiskyPaletteBottomTabNavigator = createNavigatorFactory<
    TabNavigationState<ParamListBase>,
    TabNavigationOptions,
    TabNavigationEventMap,
    typeof WhiskyPaletteBottomTabNavigator
>(WhiskyPaletteBottomTabNavigator);
