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

import ToolTip_Check from "../public/icons/tooltip/tooltip_check.svg";

import LinearGradient from "react-native-linear-gradient";

interface SelectBar_ColorProps {
    select_elements: string[];
}

const getColor = (index: number): string[] => {
    if (index == 0) return ["#FFFFFF", "#FFFFFF"];
    else if (index == 1) return ["#FFFFFF", "#F2DA6B"];
    else if (index == 2) return ["#F2DA6B", "#EFC964"];
    else if (index == 3) return ["#EFC964", "#E2A249"];
    else if (index == 4) return ["#E2A249", "#D06E3B"];
    else if (index == 5) return ["#D06E3B", "#A4422C"];
    else if (index == 6) return ["#A4422C", "#5D2518"];

    return ["#FFFFFF", "#5D2518"];
};

export default function SelectBar_Color(props: SelectBar_ColorProps) {
    const [selectElement, setSelctElement] = React.useState<number>(-1);

    return (
        <View
            style={[
                {
                    width: 320,
                },
            ]}
        >
            <View
                style={[
                    {
                        width: 320,
                        height: 55,
                        backgroundColor: "#F7F7F7",
                        flexDirection: "row",
                        alignItems: "center",
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderColor: "#F7F7F7",
                        borderWidth: 1,
                    },
                ]}
            >
                {props.select_elements.map((element, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                {
                                    flex: 1,
                                    padding: 0,
                                    margin: 0,
                                    backgroundColor: "transparent",
                                },
                            ]}
                            onPress={() => {
                                setSelctElement(index);
                            }}
                        >
                            <LinearGradient
                                colors={getColor(index)}
                                style={[
                                    {
                                        width: "100%",
                                        padding: 0,
                                        margin: 0,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    },
                                    index == 0 && {
                                        borderTopLeftRadius: 10,
                                    },
                                    index ==
                                        props.select_elements.length - 1 && {
                                        borderTopRightRadius: 10,
                                    },
                                    index != selectElement && {
                                        height: 55,
                                    },
                                    index == selectElement && {
                                        borderTopLeftRadius: 5,
                                        borderTopRightRadius: 5,
                                        borderWidth: 1,
                                        borderColor: "#F7F7F7",
                                        height: 60,
                                    },
                                ]}
                                useAngle={true}
                                angle={90}
                                angleCenter={{ x: 0.5, y: 0.5 }}
                            >
                                {index == selectElement ? (
                                    <View
                                        style={{
                                            width: 14,
                                            height: 14,
                                        }}
                                    >
                                        <ToolTip_Check />
                                    </View>
                                ) : (
                                    <View
                                        style={{
                                            width: 9,
                                            height: 9,
                                            backgroundColor: "#000000",
                                            opacity: 0.1,
                                            borderRadius: 200,
                                        }}
                                    />
                                )}
                            </LinearGradient>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <View
                style={{
                    width: 320,
                    height: 22,
                    backgroundColor: "#F7F7F7",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                {props.select_elements.map((element, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={{
                                flex: 1,
                                backgroundColor: "transparent",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "400",
                                    fontSize: 10,
                                    color: "#888888",
                                    textAlign: "center",
                                }}
                            >
                                {element}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}
