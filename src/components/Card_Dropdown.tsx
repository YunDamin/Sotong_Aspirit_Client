import * as React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Animated,
    Easing,
} from "react-native";

/**
 * Svgs
 */
import On_Checkbox from "../public/icons/btn/btn_checkbox_on.svg";
import Off_Checkbox from "../public/icons/btn/btn_checkbox_off.svg";
import On_Drop from "../public/icons/btn/brn_drop_on.svg";
import Off_Drop from "../public/icons/btn/brn_drop_off.svg";

type AcceptData = {
    title: string;
    small_title?: string;
    content: string;
};

interface Card_DropdownProps {
    acceptData: AcceptData;
    index: number;
    checkeds: boolean[];
    setCheckeds: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export default function Card_Dropdown(props: Card_DropdownProps) {
    const [droped, setDroped] = React.useState<boolean>(false);

    const dropAniHeight = React.useRef(new Animated.Value(1)).current;
    const dropAniMargin = React.useRef(new Animated.Value(0)).current;
    const dropAniBorder = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(dropAniHeight, {
            toValue: droped ? 250 : 1,
            duration: 300,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: false,
        }).start();
        Animated.timing(dropAniMargin, {
            toValue: droped ? 15 : 0,
            duration: 300,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: false,
        }).start();
        Animated.timing(dropAniBorder, {
            toValue: droped ? 1 : 0.5,
            duration: 300,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: false,
        }).start();
    }, [dropAniHeight, dropAniMargin, droped]);

    return (
        <View style={styles.container}>
            <View style={styles.dropMenu}>
                <TouchableOpacity
                    onPress={() => {
                        const newCheckeds = [...props.checkeds];
                        newCheckeds[props.index as number] =
                            !newCheckeds[props.index as number];
                        props.setCheckeds(newCheckeds);
                    }}
                    style={{ flexDirection: "row" }}
                >
                    <View style={{ width: 25, height: 25 }}>
                        {props.checkeds[props.index as number] ? (
                            <On_Checkbox />
                        ) : (
                            <Off_Checkbox />
                        )}
                    </View>
                    <Text style={styles.titleTxt}>
                        {props.acceptData.title}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ width: 30, height: 30 }}
                    onPress={() => {
                        setDroped(!droped);
                    }}
                >
                    {droped ? <On_Drop /> : <Off_Drop />}
                </TouchableOpacity>
            </View>
            <Animated.View
                style={[
                    styles.dropContent,
                    {
                        height: dropAniHeight,
                        marginBottom: dropAniMargin,
                        borderWidth: dropAniBorder,
                    },
                ]}
            >
                <ScrollView style={styles.contentView}>
                    <Text>
                        {props.acceptData.small_title && (
                            <Text style={styles.smallTitleTxt}>
                                {`${props.acceptData.small_title} + \n\n`}
                            </Text>
                        )}
                        <Text style={styles.contentDesTxt}>
                            {props.acceptData.content}
                        </Text>
                    </Text>
                </ScrollView>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 320,
        marginTop: 20,
    },
    dropMenu: {
        width: 320,
        height: 30,
        marginBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    titleTxt: {
        fontFamily: "SpoqaHanSansNeo-Regular",
        fontSize: 16,
        color: "#000000",
        marginHorizontal: 10,
    },
    dropContent: {
        width: 319,
        overflow: "hidden",
        backgroundColor: "#f7f7f7",
        borderRadius: 10,
        borderColor: "#e4e4e4",
    },
    contentView: {
        width: 320,
        height: 220,
        paddingHorizontal: 10,
        position: "absolute",
        top: 15,
    },
    smallTitleTxt: {
        fontFamily: "SpoqaHanSansNeo-Bold",
        fontSize: 12,
        color: "#333333",
    },
    contentDesTxt: {
        fontFamily: "SpoqaHanSansNeo-Regular",
        fontSize: 12,
        color: "#333333",
    },
});
