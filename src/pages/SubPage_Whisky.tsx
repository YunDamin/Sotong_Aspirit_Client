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

// Navigator
import CustomNavigator_Top from "../navigators/CustomNavigator_Top";

export default function SubPage_Whisky({ navigation }: any) {
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
                        <Text>ss</Text>
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
