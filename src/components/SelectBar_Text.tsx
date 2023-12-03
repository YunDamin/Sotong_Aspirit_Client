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

interface SelectBar_TextProps {}

export default function SelectBar_Text(props: SelectBar_TextProps) {
    return (
        <TouchableOpacity
            style={[
                {
                    width: 320,
                    height: 110,
                    marginTop: 25,
                    backgroundColor: "#FBF8F2",
                },
                styles.border_box,
            ]}
        >
            <Text
                style={[
                    styles.text,
                    {
                        fontWeight: "500",
                        fontSize: 14,
                        color: "#000000",
                    },
                ]}
            >
                + 위스키 선택
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    border_box: {
        borderRadius: 10,
        borderColor: "#F7F7F7",
        borderWidth: 1,
    },
    text: {
        fontFamily: "Spoqa Han Sans Neo",
        fontWeight: "500",
        fontSize: 14,
        color: "#000000",
    },
});
