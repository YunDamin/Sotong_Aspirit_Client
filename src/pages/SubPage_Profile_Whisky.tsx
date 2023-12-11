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
    StatusBar,
    processColor,
    Image,
} from "react-native";

import Profile_Svg from "../public/icons/photo/profile.svg";

import { RadarChart, PieChart } from "react-native-charts-wrapper";

import Swiper from "react-native-web-swiper";

// Navigator
import CustomNavigator_Top from "../navigators/CustomNavigator_Top";

import Card_FAQ from "../components/Card_FAQ";
import Card_TasteNote_Whisky from "../components/Card_TasteNote_Whisky";
import Card_Graph from "../components/Card_Graph";

import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";
import { REACT_APP_API_KEY } from "@env";

import { useRecoilState } from "recoil";
import { login_data, login_state } from "../atoms/login_state";
import { user, user_state } from "../atoms/get_user";

type Rate = {
    name: string;
    num: number;
};

function getTopRates(rates: Rate[]): Rate[] {
    const sortedRates = rates.sort((a, b) => b.num - a.num);

    return sortedRates.slice(0, Math.min(5, sortedRates.length));
}

function getSortedRatesgetTopRates(rates: Rate[]): Rate[] {
    const sortedRates = rates.sort((a, b) => b.num - a.num);

    return sortedRates;
}

interface Props {
    rates: Rate[];
}

function Graph(props: Props) {
    const sortedRates = getSortedRatesgetTopRates(props.rates);

    const topRates = getTopRates(props.rates);
    const dataSets = topRates.map((_rate, index) =>
        index === 0
            ? {
                  label: "",
                  values: topRates.map((c_rate, c_index) => ({
                      value: c_rate.num,
                  })),
                  config: {
                      color: processColor("#D6690F"),

                      drawFilled: true,
                      fillColor: processColor("#D6690F"),
                      fillAlpha: 40,
                      lineWidth: 2,
                  },
              }
            : {
                  label: "",
                  values: topRates.map((_rate, c_index) => ({
                      value: 0.0,
                  })),
                  config: {
                      color: processColor("#EDEDED"),

                      lineWidth: 2,
                  },
              }
    );
    const valueFormatter = topRates.map((rate) => rate.name);

    const [isModalVisible, setModaVisible] = React.useState(false);
    const toggleFilterModal = () => {
        setModaVisible(!isModalVisible);
    };

    return props.rates.length === 0 ? null : (
        <>
            <View
                style={{
                    width: 320,
                    height: 540,
                    borderRadius: 10,
                    backgroundColor: "#ffffff",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        width: 290,
                        alignItems: "center",
                        marginTop: 20,
                    }}
                ></View>
                <View
                    style={{
                        marginTop: 40,
                        width: 300,
                        height: 240,
                        overflow: "hidden",
                        alignItems: "center",
                        justifyContent: "flex-start",
                    }}
                >
                    {props.rates.length < 3 ? (
                        <PieChart
                            style={{
                                width: 280,
                                height: 280,
                                marginBottom: 20,
                            }}
                            data={{
                                dataSets: [
                                    {
                                        values: props.rates.map((rate) => {
                                            return {
                                                label: rate.name,
                                                value: rate.num,
                                            };
                                        }),
                                        label: "",
                                        config: {
                                            color: processColor("#D6690F"),
                                        },
                                    },
                                ],
                            }}
                            chartDescription={{ text: "" }}
                        />
                    ) : (
                        <RadarChart
                            style={{
                                width: 300,
                                height: 300,
                            }}
                            data={{
                                dataSets: dataSets,
                            }}
                            xAxis={{
                                drawLabels: true,
                                valueFormatter: valueFormatter,
                            }}
                            yAxis={{ drawLabels: false }}
                            webColor={processColor("#EDEDED")}
                            webColorInner={processColor("#EDEDED")}
                            chartDescription={{ text: "" }}
                        />
                    )}
                </View>
                <View
                    style={{
                        marginTop: 20,
                        width: 290,
                        height: 180,
                        backgroundColor: "#F7F7F7",
                        borderRadius: 10,
                    }}
                >
                    <ScrollView
                        style={{
                            marginTop: 20,
                            marginLeft: 30,
                        }}
                        nestedScrollEnabled={true}
                    >
                        {sortedRates.map((rate, index) => {
                            return (
                                <Text
                                    key={index}
                                    style={[
                                        index < 5
                                            ? {
                                                  color: "#D6690F",
                                              }
                                            : {
                                                  color: "#000000",
                                              },
                                        {
                                            fontFamily: "Spoqa Han Sans Neo",
                                            fontWeight: "700",
                                            fontSize: 14,
                                            marginBottom: 10,
                                        },
                                    ]}
                                >
                                    <Text style={{ fontWeight: "400" }}>{`${
                                        index + 1
                                    }위\t\t`}</Text>
                                    <Text>
                                        {rate.name + " (" + rate.num + ")"}
                                    </Text>
                                </Text>
                            );
                        })}
                    </ScrollView>
                </View>
            </View>
        </>
    );
}

export default function SubPage_Profile_Whisky({ navigation, route }: any) {
    const smells = route.params.smells as Rate[];
    const tastes = route.params.tastes as Rate[];
    const finishs = route.params.finishs as Rate[];

    useFocusEffect(
        React.useCallback(() => {
            console.log("SubPage_Profile_Whisky Focus");
            return () => {};
        }, [])
    );

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={"white"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: "white" }}>
                <CustomNavigator_Top
                    title="위스키 취향 분석 상세"
                    goBack={() => {
                        navigation.goBack();
                    }}
                />
            </SafeAreaView>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <ScrollView
                    style={{
                        flex: 1,
                        width: "100%",
                    }}
                    scrollEventThrottle={16}
                >
                    <View
                        style={{
                            width: "100%",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                width: 320,
                                height: 45,
                                alignItems: "center",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text style={styles.m_text}>선호하는 노즈(향)</Text>
                        </View>
                        <Graph rates={smells} />
                        <View
                            style={{
                                width: "100%",
                                height: 4,
                                backgroundColor: "#F8F8F8",
                                marginBottom: 20,
                            }}
                        />
                        <View
                            style={{
                                width: 320,
                                height: 45,
                                alignItems: "center",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text style={styles.m_text}>
                                선호하는 팔레트(중간맛)
                            </Text>
                        </View>
                        <Graph rates={tastes} />
                        <View
                            style={{
                                width: "100%",
                                height: 4,
                                backgroundColor: "#F8F8F8",
                                marginBottom: 20,
                            }}
                        />
                        <View
                            style={{
                                width: 320,
                                height: 45,
                                alignItems: "center",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text style={styles.m_text}>
                                선호하는 피니시(끝맛)
                            </Text>
                        </View>
                        <Graph rates={finishs} />
                        <View style={{ marginTop: 40 }} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "white",
        paddingLeft: 20,
        paddingRight: 20,
    },
    m_text: {
        fontFamily: "Spoqa Han Sans Neo",
        fontWeight: "700",
        fontSize: 16,
        color: "#000000",
        textAlign: "left",
    },
});
