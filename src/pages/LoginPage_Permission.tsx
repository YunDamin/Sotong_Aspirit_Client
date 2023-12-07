import * as React from "react";
import {
    Animated,
    Platform,
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    StatusBar,
    TouchableOpacity,
} from "react-native";

/**
 * Svgs
 */
import On_Checkbox from "../public/icons/btn/btn_checkbox_on.svg";
import Off_Checkbox from "../public/icons/btn/btn_checkbox_off.svg";

// Navigator
import CustomNavigator_Top from "../navigators/CustomNavigator_Top";

import Card_Dropdown from "../components/Card_Dropdown";

import AcceptData from "../public/json/loginpage_permission.json";

export default function LoginPage_Permission({ navigation }: any) {
    const [checkeds, setCheckeds] = React.useState<boolean[]>([
        false,
        false,
        false,
        false,
    ]);

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={"white"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: "white" }}>
                <CustomNavigator_Top
                    title="약관동의"
                    goBack={() => {
                        navigation.goBack();
                    }}
                />
            </SafeAreaView>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <View style={styles.allSelectBtn}>
                        <TouchableOpacity
                            onPress={() => {
                                setCheckeds((prevCheckeds) => {
                                    if (prevCheckeds[3])
                                        return [false, false, false, false];
                                    else return [true, true, true, true];
                                });
                            }}
                            style={{ flexDirection: "row" }}
                        >
                            <View style={{ width: 25, height: 25 }}>
                                {checkeds[3] ? (
                                    <On_Checkbox />
                                ) : (
                                    <Off_Checkbox />
                                )}
                            </View>
                            <Text
                                style={{
                                    fontFamily: "SpoqaHanSansNeo-Bold",
                                    fontSize: 16,
                                    marginLeft: 10,
                                    color: "#000000",
                                }}
                            >
                                전체 동의
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={styles.dropDownBtnView}
                    >
                        {[0, 1, 2].map((index) => {
                            return (
                                <Card_Dropdown
                                    key={index}
                                    acceptData={AcceptData.accept_list[index]}
                                    index={index}
                                    checkeds={checkeds}
                                    setCheckeds={setCheckeds}
                                />
                            );
                        })}

                        <View style={{ marginBottom: 20 }} />
                    </ScrollView>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("LoginPage_Checking", {
                                check: checkeds[2],
                            });
                        }}
                        disabled={!(checkeds[0] && checkeds[1])}
                        style={[
                            {
                                width: 320,
                                height: 55,
                                backgroundColor: "#974B1A",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                            },
                            { opacity: 0.4 },
                            checkeds[0] && checkeds[1] && { opacity: 1 },
                        ]}
                    >
                        <Text
                            style={{
                                fontFamily: "Spoqa Han Sans Neo",
                                fontWeight: "500",
                                fontSize: 18,
                                color: "#FFFFFF",
                                textAlign: "center",
                            }}
                        >
                            다음
                        </Text>
                    </TouchableOpacity>
                    <View style={{ marginBottom: 20 }} />
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#FCECDE",
        width: "100%",
        alignItems: "center",
    },
    under_page: {
        width: "100%",
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
    },
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "space-between",
    },
    normarlView: {
        width: 320,
        justifyContent: "center",
        alignItems: "center",
    },
    dropDownBtnView: {
        flex: 1,
    },
    btnView: {
        width: "100%",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 45,
        backgroundColor: "#ffffff",
    },
    allowBtn: {
        backgroundColor: "#e65b2c",
        borderRadius: 10,
        height: 50,
    },
    allSelectBtn: {
        width: 320,
        height: 30,
        marginBottom: 15,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
