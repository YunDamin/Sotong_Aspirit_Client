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

export default function SubPage_Alert({ navigation }: any) {
    const [faq, setFaq] = React.useState<any[]>([]);

    useFocusEffect(
        React.useCallback(() => {
            console.log("SubPage_FAQ Focus");
            axios.get(API_KEY + "/contents/faq/").then((res) => {
                setFaq(res.data);
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
                            {faq.map((item, index) => {
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
