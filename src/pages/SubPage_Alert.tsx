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

// Navigator
import CustomNavigator_Top from "../navigators/CustomNavigator_Top";

interface Props {
    title: string;
    content: string;
    date: number;
}

function Card_Alert(props: Props) {
    const dateStr = (unixTimestamp: number) => {
        const now = Date.now();
        const diff = now - unixTimestamp;
        const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "오늘";
        return `${diffDays}일전`;
    };

    return (
        <View
            style={[
                {
                    width: "100%",
                    borderRadius: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    marginBottom: 10,
                    flexDirection: "column",
                    justifyContent: "space-between",
                },
                props.title === "공지"
                    ? { backgroundColor: "#FCECDE" }
                    : { backgroundColor: "#FBF8F2" },
            ]}
        >
            <View
                style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 20,
                    marginBottom: 10,
                }}
            >
                <Text
                    style={{
                        fontFamily: "Spoqa Han Sans Neo",
                        fontWeight: "500",
                        fontSize: 12,
                        color: "#D6690F",
                    }}
                >
                    {props.title}
                </Text>
                <Text
                    style={{
                        fontFamily: "Spoqa Han Sans Neo",
                        fontWeight: "400",
                        fontSize: 12,
                        color: "#888888",
                    }}
                >
                    {dateStr(props.date)}
                </Text>
            </View>
            <Text
                style={{
                    fontFamily: "Spoqa Han Sans Neo",
                    fontWeight: "500",
                    fontSize: 14,
                    color: "#000000",
                    marginBottom: 20,
                }}
            >
                {props.content}
            </Text>
        </View>
    );
}

export default function SubPage_Alert({ navigation }: any) {
    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: "white" }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <CustomNavigator_Top
                    title="알림"
                    goBack={() => {
                        navigation.goBack();
                    }}
                />
                <View style={styles.page}>
                    <ScrollView
                        style={{
                            flex: 1,
                            width: "100%",
                            marginTop: 25,
                        }}
                        scrollEventThrottle={16}
                    >
                        <Card_Alert
                            title="공지"
                            content="15일은 정기점검일입니다."
                            date={1700999999999}
                        />
                        <Card_Alert
                            title="이벤트"
                            content="15일은 정기점검일입니다."
                            date={1700199999999}
                        />
                        <Card_Alert
                            title="이벤트"
                            content="15일은 정기점검일입니다."
                            date={1700199999999}
                        />
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
