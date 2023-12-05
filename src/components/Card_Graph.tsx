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
    processColor,
    Modal,
} from "react-native";

import Icon_Star from "../public/icons/icons/icon_star.svg";

import { content } from "../atoms/get_contents";

import { RadarChart } from "react-native-charts-wrapper";

type Rate = {
    name: string;
    num: number;
};

interface Props {
    title: string;
    des: string;
    rates: Rate[];
}

function getTopRates(rates: Rate[]): Rate[] {
    const sortedRates = rates.sort((a, b) => b.num - a.num);

    return sortedRates.slice(0, Math.min(5, sortedRates.length));
}

function getSortedRatesgetTopRates(rates: Rate[]): Rate[] {
    const sortedRates = rates.sort((a, b) => b.num - a.num);

    return sortedRates;
}

export default function Card_Graph(props: Props) {
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    toggleFilterModal();
                }}
            >
                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                >
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
                        >
                            <Text
                                style={{
                                    fontFamily: "Spoqa Han Sans Neo",
                                    fontWeight: "700",
                                    fontSize: 16,
                                    color: "#000000",
                                    textAlign: "center",
                                }}
                            >
                                {props.title + props.des + " 상세"}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    toggleFilterModal();
                                }}
                                style={{
                                    position: "absolute",
                                    right: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "800",
                                        fontSize: 20,
                                        color: "#000000",
                                    }}
                                >
                                    x
                                </Text>
                            </TouchableOpacity>
                        </View>
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
                            />
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
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "700",
                                                    fontSize: 14,
                                                    marginBottom: 10,
                                                },
                                            ]}
                                        >
                                            <Text
                                                style={{ fontWeight: "400" }}
                                            >{`${index + 1}위\t\t`}</Text>
                                            <Text>
                                                {rate.name +
                                                    " (" +
                                                    rate.num +
                                                    ")"}
                                            </Text>
                                        </Text>
                                    );
                                })}
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={{ width: 320, alignItems: "center" }}>
                <View
                    style={{
                        width: 320,
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Text>
                        <Text
                            style={{
                                fontFamily: "Spoqa Han Sans Neo",
                                fontWeight: "700",
                                fontSize: 14,
                                color: "#000000",
                            }}
                        >
                            {props.title}
                        </Text>
                        <Text
                            style={{
                                fontFamily: "Spoqa Han Sans Neo",
                                fontWeight: "400",
                                fontSize: 12,
                                color: "#888888",
                            }}
                        >
                            {" " + props.des}
                        </Text>
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            toggleFilterModal();
                        }}
                        style={{
                            width: 50,
                            height: 20,
                            borderWidth: 1,
                            borderColor: "#888888",
                            borderRadius: 50,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "Spoqa Han Sans Neo",
                                fontWeight: "500",
                                fontSize: 12,
                                color: "#000000",
                            }}
                        >
                            상세
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        width: 300,
                        height: 240,
                        overflow: "hidden",
                        alignItems: "center",
                        justifyContent: "flex-start",
                    }}
                >
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
                        yAxis={{
                            drawLabels: false,
                        }}
                        webColor={processColor("#EDEDED")}
                        webColorInner={processColor("#EDEDED")}
                    />
                </View>
            </View>
        </>
    );
}
