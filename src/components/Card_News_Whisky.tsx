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

export default function Card_News_Whisky() {
    return (
        <TouchableOpacity>
            <View
                style={{
                    width: 240,
                    height: 150,
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
                위스키 수입량 사상 최대치 달성…
            </Text>
            <Text
                style={{
                    fontFamily: "Spoqa Han Sans Neo",
                    fontWeight: "400",
                    fontSize: 12,
                    color: "#888888",
                }}
            >
                [위스키뉴스]ㅣ23.10.23
            </Text>
        </TouchableOpacity>
    );
}
