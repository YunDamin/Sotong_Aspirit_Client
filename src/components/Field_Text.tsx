import * as React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TextInputProps,
    Animated,
    Easing,
    Touchable,
    TouchableOpacity,
} from "react-native";

type PetkyCheckyTextFieldProps = {
    label?: string;
    isNeccesary: boolean;
    isDisabled?: boolean;
    id: string;
    value: string;
    changeValue: (name: string, text: string) => void;
    success?: boolean;
    success_text?: string;
    error?: boolean;
    error_text?: string;
    btn?: boolean;
    btn_text?: string;
    btn_onPress?: () => void;
    is_review?: boolean;
};

// import Blue_C from "../public/icons/tooltip/blue_c.svg";
// import Blue_S from "../public/icons/tooltip/blue_s.svg";
// import Red_C from "../public/icons/tooltip/red_c.svg";
// import Red_S from "../public/icons/tooltip/red_s.svg";
import Error_Svg from "../public/icons/tooltip/error.svg";
import Pass_Svg from "../public/icons/tooltip/pass.svg";

type Props = TextInputProps & PetkyCheckyTextFieldProps;

export default function Field_Text(props: Props) {
    const { label, style, isNeccesary, isDisabled, ...restOfProps } = props;

    return (
        <>
            <View
                style={[
                    styles.box,
                    styles.inputView,
                    props.success && {
                        borderColor: "#0094E8",
                    },
                    props.error && {
                        borderColor: "#D60F3F",
                    },
                    style,
                    props.is_review && {
                        paddingTop: 10,
                        paddingBottom: 10,
                        justifyContent: "flex-start",
                    },
                ]}
            >
                <TextInput
                    style={styles.input}
                    {...restOfProps}
                    editable={!isDisabled}
                    onChangeText={(text) => props.changeValue(props.id, text)}
                />
                {isDisabled && (
                    <View
                        style={[
                            styles.box,
                            styles.inputView,
                            {
                                borderWidth: 0,
                                position: "absolute",
                                backgroundColor: "#000000",
                                opacity: 0.08,
                            },
                        ]}
                    />
                )}
                {props.btn && (
                    <TouchableOpacity
                        onPress={props.btn_onPress}
                        style={{
                            position: "absolute",
                            right: 10,
                            width: 65,
                            height: 35,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#000000",
                            borderRadius: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "Spoqa Han Sans Neo",
                                fontWeight: "400",
                                fontSize: 12,
                                color: "#FFFFFF",
                                textAlign: "center",
                            }}
                        >
                            {props.btn_text}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
            {props.success && (
                <View
                    style={{
                        width: 320,
                        height: 16,
                        marginTop: 4,
                        flexDirection: "row",
                    }}
                >
                    <Pass_Svg />
                    <Text
                        style={{
                            fontFamily: "Spoqa Han Sans Neo",
                            fontWeight: "400",
                            fontSize: 12,
                            color: "#0094E8",
                            textAlign: "left",
                            marginLeft: 4,
                        }}
                    >
                        {props.success_text}
                    </Text>
                </View>
            )}
            {props.error && (
                <View
                    style={{
                        width: 320,
                        height: 16,
                        marginTop: 4,
                        flexDirection: "row",
                    }}
                >
                    <Error_Svg />
                    <Text
                        style={{
                            fontFamily: "Spoqa Han Sans Neo",
                            fontWeight: "400",
                            fontSize: 12,
                            color: "#D60F3F",
                            textAlign: "left",
                            marginLeft: 4,
                        }}
                    >
                        {props.error_text}
                    </Text>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    box: {
        marginTop: 10,
        width: 320,
        height: 55,
        backgroundColor: "#F2F2F2",
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    inputView: {
        borderWidth: 1,
        borderColor: "#e4e4e4",
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: "transparent",
        justifyContent: "center",
        overflow: "visible",
    },
    input: {
        justifyContent: "center",
        fontFamily: "SpoqaHanSansNeo-Medium",
        fontSize: 14,
        color: "#000000",
    },
    label: {
        fontFamily: "SpoqaHanSansNeo-Regular",
        fontSize: 12,
        color: "#757575",
    },
});
