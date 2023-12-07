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
import Drop_Btn_On_Svg from "../public/icons/btn/btn_dropdrop_on.svg";
import Drop_Btn_Off_Svg from "../public/icons/btn/btn_dropdrop_off.svg";

type Card_FAQProps = {
    title: string;
    des: string;
};

export default function Card_FAQ(props: Card_FAQProps) {
    const [isClick, setIsClick] = React.useState(false);
    const clickOpenAni = React.useRef(new Animated.Value(0)).current;
    const clickBorderAni = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(clickOpenAni, {
            toValue: isClick
                ? 30 + (Math.floor(props.des.length / 25) + 1) * 20
                : 0,
            duration: 150,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: false,
        }).start();
        Animated.timing(clickBorderAni, {
            toValue: isClick ? 0 : 10,
            duration: 150,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: false,
        }).start();
    }, [clickOpenAni, clickBorderAni, isClick]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => setIsClick((prevClickState) => !prevClickState)}
            >
                <Animated.View
                    style={{
                        width: 319,
                        height: 59,
                        borderWidth: 1,
                        borderColor: "#e4e4e4",
                        backgroundColor: "#ffffff",
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomLeftRadius: clickBorderAni,
                        borderBottomRightRadius: clickBorderAni,
                        flexDirection: "row",
                        paddingHorizontal: 15,
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text>
                        <Text style={[styles.title, { color: "#e65b2c" }]}>
                            Q.
                        </Text>
                        <Text style={styles.title}>{props.title}</Text>
                    </Text>
                    <View style={{ width: 30, height: 30 }}>
                        {isClick ? <Drop_Btn_On_Svg /> : <Drop_Btn_Off_Svg />}
                    </View>
                </Animated.View>
            </TouchableOpacity>
            <Animated.View
                style={{
                    width: 320,
                    height: clickOpenAni,
                    backgroundColor: "#fdf5ed",
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                }}
            >
                {isClick && (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ width: "100%", height: 100 }}
                    >
                        <Text
                            style={{
                                width: "100%",
                                paddingHorizontal: 15,
                                marginVertical: 15,
                            }}
                        >
                            <Text style={[styles.des, { color: "#e65b2c" }]}>
                                A.
                            </Text>
                            <Text style={styles.des}>{props.des}</Text>
                        </Text>
                    </ScrollView>
                )}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    title: {
        fontFamily: "SpoqaHanSansNeo-Bold",
        fontSize: 14,
        color: "#000000",
    },
    des: {
        fontFamily: "SpoqaHanSansNeo-Regular",
        fontSize: 14,
        color: "#000000",
    },
});
