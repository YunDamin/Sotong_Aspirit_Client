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

import First_Svg from "../public/icons/onboarding/first.svg";
import Second_Svg from "../public/icons/onboarding/second.svg";
import Third_Svg from "../public/icons/onboarding/third.svg";

interface PageProps {
    press: () => void;
    skip: () => void;
}

const Button = (props: { index: number; press: () => void }) => {
    return (
        <TouchableOpacity
            style={[
                {
                    marginTop: 10,
                    width: "100%",
                    height: 55,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "#974B1A",
                    borderRadius: 10,
                },
                props.index === 2
                    ? { backgroundColor: "#974B1A" }
                    : { backgroundColor: "#ffffff" },
            ]}
            onPress={props.press}
        >
            <Text
                style={[
                    {
                        fontFamily: "Spoqa Han Sans Neo",
                        fontWeight: "500",
                        fontSize: 18,
                        textAlign: "center",
                    },
                    props.index === 2
                        ? { color: "#ffffff" }
                        : { color: "#974B1A" },
                ]}
            >
                {`${props.index === 2 ? "시작하기" : "다음"} (${
                    props.index + 1
                }/3)`}
            </Text>
        </TouchableOpacity>
    );
};

const FirstPage = (props: PageProps) => {
    return (
        <View style={styles.page}>
            <View
                style={{
                    width: "100%",
                    height: 20,
                    alignItems: "flex-end",
                    justifyContent: "center",
                    paddingRight: 20,
                    marginBottom: 40,
                }}
            >
                <TouchableOpacity onPress={props.skip}>
                    <Text
                        style={{
                            fontFamily: "Spoqa Han Sans Neo",
                            fontWeight: "500",
                            fontSize: 14,
                            textAlign: "center",
                            color: "#757575",
                        }}
                    >
                        {"SKIP >"}
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    width: "100%",
                    height: 70,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        fontFamily: "Spoqa Han Sans Neo",
                        fontWeight: "700",
                        fontSize: 22,
                        textAlign: "center",
                        color: "#D6690F",
                    }}
                >
                    {"무슨 위스키를 마셨었는지\n항상 잊어버리지 않나요?"}
                </Text>
            </View>
            <View
                style={{
                    marginTop: 22,
                    marginBottom: 25,
                    width: "100%",
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        fontFamily: "Spoqa Han Sans Neo",
                        fontWeight: "400",
                        fontSize: 12,
                        textAlign: "center",
                        color: "#757575",
                    }}
                >
                    {"‘테이스팅 노트’를 이용해서 편하고 자세하게 기록해봐요."}
                </Text>
            </View>
            <View
                style={{
                    height: 420,
                    marginBottom: 20,
                }}
            >
                <First_Svg />
            </View>
            <View style={{ width: "100%", paddingLeft: 20, paddingRight: 20 }}>
                <Button index={0} press={props.press} />
            </View>
        </View>
    );
};
const SecondPage = (props: PageProps) => {
    return (
        <View style={styles.page}>
            <View
                style={{
                    width: "100%",
                    height: 20,
                    alignItems: "flex-end",
                    justifyContent: "center",
                    paddingRight: 20,
                    marginBottom: 40,
                }}
            >
                <TouchableOpacity onPress={props.skip}>
                    <Text
                        style={{
                            fontFamily: "Spoqa Han Sans Neo",
                            fontWeight: "500",
                            fontSize: 14,
                            textAlign: "center",
                            color: "#757575",
                        }}
                    >
                        {"SKIP >"}
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    width: "100%",
                    height: 70,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        fontFamily: "Spoqa Han Sans Neo",
                        fontWeight: "700",
                        fontSize: 22,
                        textAlign: "center",
                        color: "#D6690F",
                    }}
                >
                    {"느껴지는 대로 기록하세요."}
                </Text>
            </View>
            <View
                style={{
                    marginTop: 22,
                    marginBottom: 25,
                    width: "100%",
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        fontFamily: "Spoqa Han Sans Neo",
                        fontWeight: "400",
                        fontSize: 12,
                        textAlign: "center",
                        color: "#757575",
                    }}
                >
                    {"세분화된 카테고리가 도와줄 거에요."}
                </Text>
            </View>
            <View
                style={{
                    height: 420,
                    marginBottom: 20,
                }}
            >
                <Second_Svg />
            </View>
            <View style={{ width: "100%", paddingLeft: 20, paddingRight: 20 }}>
                <Button index={1} press={props.press} />
            </View>
        </View>
    );
};
const ThirdPage = (props: PageProps) => {
    return (
        <View style={styles.page}>
            <View
                style={{
                    width: "100%",
                    height: 20,
                    alignItems: "flex-end",
                    justifyContent: "center",
                    paddingRight: 20,
                    marginBottom: 40,
                }}
            >
                <TouchableOpacity onPress={props.skip}>
                    <Text
                        style={{
                            fontFamily: "Spoqa Han Sans Neo",
                            fontWeight: "500",
                            fontSize: 14,
                            textAlign: "center",
                            color: "#757575",
                        }}
                    >
                        {"SKIP >"}
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    width: "100%",
                    height: 70,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        fontFamily: "Spoqa Han Sans Neo",
                        fontWeight: "700",
                        fontSize: 22,
                        textAlign: "center",
                        color: "#D6690F",
                    }}
                >
                    {"초보자를 위한\n위스키 가이드도 있어요."}
                </Text>
            </View>
            <View
                style={{
                    marginTop: 22,
                    marginBottom: 25,
                    width: "100%",
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        fontFamily: "Spoqa Han Sans Neo",
                        fontWeight: "400",
                        fontSize: 12,
                        textAlign: "center",
                        color: "#757575",
                    }}
                >
                    {
                        "하지만 위스키를 즐기는 것에 정답은 없으니,\n자신이 마시고 싶은 방법대로 마시는 것도 좋아요."
                    }
                </Text>
            </View>
            <View
                style={{
                    height: 420,
                    marginBottom: 20,
                }}
            >
                <Third_Svg />
            </View>
            <View style={{ width: "100%", paddingLeft: 20, paddingRight: 20 }}>
                <Button index={2} press={props.press} />
            </View>
        </View>
    );
};

export default function OnboardingPage({ navigation }: any) {
    const [index, setIndex] = React.useState(0);

    const skip = () => {
        navigation.replace("Main");
    };

    return (
        <>
            <SafeAreaView
                style={{ flex: 0, backgroundColor: "white" }}
            ></SafeAreaView>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                {index === 0 && (
                    <FirstPage press={() => setIndex(1)} skip={() => skip()} />
                )}
                {index === 1 && (
                    <SecondPage press={() => setIndex(2)} skip={() => skip()} />
                )}
                {index === 2 && (
                    <ThirdPage press={() => skip()} skip={() => skip()} />
                )}
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: "transparent",
        width: "100%",
        height: "100%",
        alignItems: "center",
        padding: 0,
    },
});
