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
    Image,
} from "react-native";

import Icon_Star from "../public/icons/icons/icon_star.svg";

import { content } from "../atoms/get_contents";

interface Props {
    content: content;
    onPress: () => void;
}

function convertDateFormat(dateString: string) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
}

export default function Card_News_Whisky(props: Props) {
    return (
        <TouchableOpacity
            onPress={() => {
                props.onPress();
            }}
        >
            <View
                style={{
                    width: 240,
                    height: 150,
                    marginRight: 20,
                    borderRadius: 20,
                    backgroundColor: "#757575",
                    overflow: "hidden",
                }}
            >
                {props.content.image_urls.length > 0 && (
                    <Image
                        source={{ uri: props.content.image_urls[0] }}
                        height={150}
                        style={{ resizeMode: "cover" }}
                    />
                )}
            </View>
            <Text
                style={{
                    width: 240,
                    fontFamily: "Spoqa Han Sans Neo",
                    fontWeight: "700",
                    fontSize: 14,
                    color: "#000000",
                    marginTop: 15,
                }}
            >
                {props.content.title}
            </Text>
            <Text
                style={{
                    fontFamily: "Spoqa Han Sans Neo",
                    fontWeight: "400",
                    fontSize: 12,
                    color: "#888888",
                }}
            >
                {convertDateFormat(props.content.date)}
            </Text>
        </TouchableOpacity>
    );
}
