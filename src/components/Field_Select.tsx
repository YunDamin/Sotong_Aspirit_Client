import * as React from "react";
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Easing,
    TouchableOpacity,
    StyleProp,
    TextStyle,
    ScrollView,
} from "react-native";

/**
 * Svgs
 */
import Drop_Btn_On_Svg from "../public/icons/btn/brn_drop_on.svg";
import Drop_Btn_Off_Svg from "../public/icons/btn/brn_drop_off.svg";

type PetSelectType = {
    id: number;
    name: string;
};

type PetkyCheckySelectFieldProps = {
    label?: string;
    style?: StyleProp<TextStyle>;
    list: PetSelectType[];
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
};

type Props = PetkyCheckySelectFieldProps;

export default function Field_Select(props: Props) {
    const { label, style, list, value, setValue, ...restOfProps } = props;
    const [isClick, setIsClick] = React.useState(false);

    const clickAni = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
        Animated.timing(clickAni, {
            toValue: isClick
                ? list.length < 3
                    ? list.length * 40 + 20
                    : 120 + 20
                : 0,
            duration: 150,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: false,
        }).start();
    }, [clickAni, isClick]);

    return (
        <View
            style={{
                width: 320,
            }}
        >
            <TouchableOpacity
                onPress={() => {
                    setIsClick((prevClickState) => !prevClickState);
                }}
                style={[
                    {
                        width: 320,
                        height: 55,
                        borderWidth: 1,
                        borderColor: "#000000",
                        borderRadius: 10,
                    },
                    styles.selectedBtn,
                ]}
            >
                <Text style={styles.selectedValueTxt}>
                    {list.filter((list) => list.id === value)[0].name}
                </Text>
                <View
                    style={{
                        position: "absolute",
                        right: 10,
                    }}
                >
                    {isClick ? <Drop_Btn_On_Svg /> : <Drop_Btn_Off_Svg />}
                </View>
            </TouchableOpacity>
            <Animated.View
                style={{
                    width: "100%",
                    height: clickAni,
                    backgroundColor: "transparent",
                    zIndex: 200,
                    position: "relative",
                }}
            >
                {isClick && (
                    <ScrollView
                        style={{
                            marginTop: 10,
                            width: "100%",
                            height: 140,
                            borderWidth: 1,
                            borderRadius: 10,
                            marginBottom: 20,
                        }}
                    >
                        {list.map((select) => {
                            return (
                                <TouchableOpacity
                                    key={select.id}
                                    onPress={() => {
                                        setValue(select.id);
                                        setIsClick(false);
                                    }}
                                    style={{
                                        margin: 0,
                                        height: 40,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily:
                                                "SpoqaHanSansNeo-Medium",
                                            fontSize: 16,
                                            color: "#000000",
                                        }}
                                    >
                                        {select.name}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                )}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    selectedBtn: {
        backgroundColor: "transparent",
        justifyContent: "center",
        paddingLeft: 15,
    },
    selectedValueTxt: {
        fontFamily: "SpoqaHanSansNeo-Medium",
        fontSize: 14,
        color: "#000000",
    },
    selectView: {
        width: "100%",
        height: "100%",
        borderWidth: 1,
        borderColor: "#e85625",
        borderRadius: 10,
        paddingHorizontal: 15,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
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
        textAlign: "right",
    },
});
