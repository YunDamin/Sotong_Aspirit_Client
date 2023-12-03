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

import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";

// Navigator
import CustomNavigator_Top from "../navigators/CustomNavigator_Top";

function convertDateFormat(dateString: string) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
}

export default function SubPage_Whisky({ navigation, route }: any) {
    const { width } = useWindowDimensions();

    let source = {
        html: route.params.content.content,
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
                            <Text
                                style={{
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "700",
                                    fontSize: 16,
                                    color: "#000000",
                                    marginTop: 15,
                                    width: 320,
                                    textAlign: "left",
                                }}
                            >
                                {route.params.content.title}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "400",
                                    fontSize: 14,
                                    color: "#888888",
                                    marginTop: 5,
                                    marginBottom: 15,
                                    width: 320,
                                    textAlign: "left",
                                }}
                            >
                                {convertDateFormat(route.params.content.date)}
                            </Text>
                            <View
                                style={{
                                    width: 320,
                                    alignItems: "center",
                                }}
                            >
                                <RenderHtml
                                    contentWidth={320}
                                    source={source}
                                />
                            </View>
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
