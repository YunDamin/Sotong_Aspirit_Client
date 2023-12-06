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

interface Props {
    whisky: whisky;
    press: () => void;
}

import { whisky } from "../atoms/get_whisky";

export default function Card_Rc_Whisky_Long(props: Props) {
    return (
        <TouchableOpacity onPress={props.press}>
            <View
                style={{
                    width: 150,
                    height: 200,
                    borderRadius: 20,
                    backgroundColor: "#757575",
                    overflow: "hidden",
                }}
            >
                <Image
                    source={{ uri: props.whisky.img_urls[0] }}
                    height={200}
                    style={{ resizeMode: "cover" }}
                />
            </View>
            <Text
                style={{
                    fontFamily: "Spoqa Han Sans Neo",
                    fontWeight: "700",
                    fontSize: 14,
                    color: "#000000",
                    marginTop: 15,
                }}
            >
                {props.whisky.name_kor}
            </Text>
            <Text
                style={{
                    fontFamily: "Spoqa Han Sans Neo",
                    fontWeight: "400",
                    fontSize: 12,
                    color: "#888888",
                }}
            >
                {props.whisky.name_eng}
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
                    {`${props.whisky.note_av.toFixed(
                        1
                    )} (${props.whisky.note_num.toLocaleString()})`}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
