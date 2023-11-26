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

import Icon_Star from "../public/icons/icons/icon_star.svg";

interface Props {
    press: () => void;
}

export default function Card_Rc_Whisky(props: Props) {
    return (
        <TouchableOpacity onPress={props.press}>
            <View
                style={{
                    width: 180,
                    height: 240,
                    marginRight: 20,
                    borderRadius: 20,
                    backgroundColor: "#757575",
                }}
            ></View>
            <Text
                style={{
                    fontFamily: "Spoqa Han Sans Neo",
                    fontWeight: "700",
                    fontSize: 14,
                    color: "#000000",
                    marginTop: 15,
                }}
            >
                잭다니엘
            </Text>
            <Text
                style={{
                    fontFamily: "Spoqa Han Sans Neo",
                    fontWeight: "400",
                    fontSize: 12,
                    color: "#888888",
                }}
            >
                Jack Daniel's
            </Text>
            <View
                style={{
                    height: 20,
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 10,
                    alignItems: "center",
                }}
            >
                <Icon_Star />
                <Text
                    style={{
                        fontFamily: "Spoqa Han Sans Neo",
                        fontWeight: "700",
                        fontSize: 12,
                        color: "#000000",
                        marginLeft: 5,
                        textAlign: "center",
                    }}
                >
                    4.0 (1,058)
                </Text>
            </View>
        </TouchableOpacity>
    );
}
