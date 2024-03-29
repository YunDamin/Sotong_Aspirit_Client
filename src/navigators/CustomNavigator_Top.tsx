import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import Back_Btn_Svg from "../public/icons/btn/btn_back.svg";

import Btn_Share_Svg from "../public/icons/btn/btn_share.svg";
import Btn_Modify_Svg from "../public/icons/btn/btn_modify.svg";

interface Props {
    title: string;
    goBack: () => void;
    whatBtn?: string;
    background?: boolean;
    onShare?: () => void;
    isMe?: boolean;
    onModify?: () => void;
    onModifyBtn?: () => void;
    onDeleteBtn?: () => void;
    isBlock?: boolean;
    onBlockBtn?: () => void;
    isReport?: boolean;
    onReportBtn?: () => void;
}

export default function CustomNavigator_Top(props: Props) {
    return (
        <View
            style={[
                styles.container,
                props.background && {
                    backgroundColor: "#FCECDE",
                },
            ]}
        >
            <TouchableOpacity onPress={props.goBack} style={styles.backBtn}>
                <Back_Btn_Svg />
            </TouchableOpacity>
            <Text style={styles.text}>{props.title}</Text>
            <TouchableOpacity
                onPress={
                    props.whatBtn === "share"
                        ? () => {}
                        : props.whatBtn === "modify" ||
                          props.whatBtn === "share_modify"
                        ? () => {
                              props.onModify && props.onModify();
                          }
                        : props.whatBtn === "skip"
                        ? () => {}
                        : () => {}
                }
                style={[
                    styles.backBtn,
                    { flexDirection: "row", justifyContent: "flex-end" },
                    { overflow: "hidden" },
                ]}
            >
                {props.whatBtn === "share" ? (
                    <Btn_Share_Svg />
                ) : props.whatBtn === "modify" ||
                  props.whatBtn === "share_modify" ? (
                    <View
                        style={{
                            position: "absolute",
                            right: 10,
                        }}
                    >
                        <Btn_Modify_Svg />
                    </View>
                ) : props.whatBtn === "skip" ? (
                    <></>
                ) : (
                    <></>
                )}
            </TouchableOpacity>
            {props.whatBtn === "share_modify" && (
                <TouchableOpacity
                    onPress={() => {
                        props.onShare && props.onShare();
                    }}
                    style={[
                        styles.backBtn,
                        { flexDirection: "row", justifyContent: "flex-end" },
                        { position: "absolute", right: 50 },
                    ]}
                >
                    <View
                        style={{
                            position: "absolute",
                            right: 8,
                        }}
                    >
                        <Btn_Share_Svg />
                    </View>
                </TouchableOpacity>
            )}
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
