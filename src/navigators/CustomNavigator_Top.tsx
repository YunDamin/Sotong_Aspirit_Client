import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import Back_Btn_Svg from "../public/icons/btn/btn_back.svg";

import Btn_Share_Svg from "../public/icons/btn/btn_share.svg";

interface Props {
    title: string;
    goBack: () => void;
    whatBtn?: string;
}

export default function CustomNavigator_Top(props: Props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.goBack} style={styles.backBtn}>
                <Back_Btn_Svg />
            </TouchableOpacity>
            <Text style={styles.text}>{props.title}</Text>
            <TouchableOpacity
                onPress={
                    props.whatBtn === "share"
                        ? () => {}
                        : props.whatBtn === "modify"
                        ? () => {}
                        : props.whatBtn === "skip"
                        ? () => {}
                        : () => {}
                }
                style={styles.backBtn}
            >
                {props.whatBtn === "share" ? (
                    <Btn_Share_Svg />
                ) : props.whatBtn === "modify" ? (
                    <></>
                ) : props.whatBtn === "skip" ? (
                    <></>
                ) : (
                    <></>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        height: 60,
        position: "relative",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "transparent",
    },
    backBtn: {
        backgroundColor: "transparent",
        width: 40,
        height: 40,
    },
    text: {
        fontFamily: "Spoqa Han Sans Neo",
        fontWeight: "500",
        fontSize: 18,
        color: "#000000",
    },
});