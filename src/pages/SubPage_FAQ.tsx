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
} from "react-native";

// Navigator
import CustomNavigator_Top from "../navigators/CustomNavigator_Top";

import Card_FAQ from "../components/Card_FAQ";

import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";
import { API_KEY } from "@env";

export default function SubPage_FAQ({ navigation }: any) {
    const [categories, setCategories] = React.useState<string[]>([]);
    const [faq, setFaq] = React.useState<any[]>([]);

    const [category, setCategory] = React.useState<string>("");

    useFocusEffect(
        React.useCallback(() => {
            console.log("SubPage_FAQ Focus");
            axios.get(API_KEY + "/contents/faq/").then((res) => {
                console.log(res.data);
                setCategories(res.data?.categories ?? []);
                setFaq(res.data?.faqs ?? []);
            });
            return () => {};
        }, [])
    );

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: "white" }} />
            <StatusBar barStyle="light-content" backgroundColor={"white"} />
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <CustomNavigator_Top
                    title="FAQ"
                    goBack={() => {
                        navigation.goBack();
                    }}
                />

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
                            setCategory("");
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "Spoqa Han Sans Neo",
                                fontWeight: "700",
                                fontSize: 14,
                                color:
                                    category.trim() == ""
                                        ? "#D6690F"
                                        : "#888888",
                                textAlign: "center",
                            }}
                        >
                            {"전체"}
                        </Text>
                        <View
                            style={{
                                marginTop: 10,
                                height: category.trim() == "" ? 3 : 1,
                                backgroundColor:
                                    category.trim() == ""
                                        ? "#D6690F"
                                        : "#888888",
                                opacity: category.trim() == "" ? 1 : 0.5,
                            }}
                        />
                    </TouchableOpacity>
                    {categories.map((item, index) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                }}
                                onPress={() => {
                                    setCategory(item.trim());
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "700",
                                        fontSize: 14,
                                        color:
                                            category.trim() == item.trim()
                                                ? "#D6690F"
                                                : "#888888",
                                        textAlign: "center",
                                    }}
                                >
                                    {item.trim()}
                                </Text>
                                <View
                                    style={{
                                        marginTop: 10,
                                        height:
                                            category.trim() == item.trim()
                                                ? 3
                                                : 1,
                                        backgroundColor:
                                            category.trim() == item.trim()
                                                ? "#D6690F"
                                                : "#888888",
                                        opacity:
                                            category.trim() == item.trim()
                                                ? 1
                                                : 0.5,
                                    }}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <View style={styles.page}>
                    <ScrollView
                        style={{
                            flex: 1,
                            width: "100%",
                            marginTop: 15,
                        }}
                        scrollEventThrottle={16}
                    >
                        <View
                            style={{
                                width: "100%",
                                alignItems: "center",
                            }}
                        >
                            {faq
                                .filter((faq) => {
                                    return (
                                        faq.caregory.trim() ==
                                            category.trim() || category == ""
                                    );
                                })
                                .map((item, index) => {
                                    return (
                                        <Card_FAQ
                                            key={index}
                                            title={item.title}
                                            des={item.content}
                                        />
                                    );
                                })}
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "white",
        paddingLeft: 20,
        paddingRight: 20,
    },
});
