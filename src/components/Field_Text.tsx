import * as React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TextInputProps,
    Animated,
    Easing,
} from "react-native";

type PetkyCheckyTextFieldProps = {
    label?: string;
    isNeccesary: boolean;
    isDisabled?: boolean;
    id: string;
    value: string;
    changeValue: (name: string, text: string) => void;
};

type Props = TextInputProps & PetkyCheckyTextFieldProps;

export default function Field_Text(props: Props) {
    const { label, style, isNeccesary, isDisabled, ...restOfProps } = props;
    const [isFocused, setIsFocused] = React.useState(false);

    const focusAni = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(focusAni, {
            toValue: isFocused ? -8 : 20,
            duration: 150,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: false,
        }).start();
    }, [focusAni, isFocused]);

    return (
        <View style={[style, styles.inputView]}>
            <Animated.View
                style={[
                    {
                        backgroundColor: "#ffffff",
                        position: "absolute",
                        marginLeft: 10,
                        paddingHorizontal: 5,
                        top: isDisabled || props.value !== "" ? -8 : focusAni,
                    },
                ]}
            >
                <Text style={styles.label}>
                    <Text>{label}</Text>
                    {isNeccesary && <Text style={{ color: "#e65b2c" }}>*</Text>}
                </Text>
            </Animated.View>
            <TextInput
                style={styles.input}
                {...restOfProps}
                editable={!isDisabled}
                onFocus={() => {
                    setIsFocused(true);
                }}
                onBlur={() => {
                    props.value === ""
                        ? setIsFocused(false)
                        : setIsFocused(true);
                }}
                onChangeText={(text) => props.changeValue(props.id, text)}
            />
            {isDisabled && (
                <View
                    style={[
                        style,
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
        </View>
    );
}

const styles = StyleSheet.create({
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
