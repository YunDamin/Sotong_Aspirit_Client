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
    Modal,
} from "react-native";

import Login_Check_Svg from "../public/icons/onboarding/login_check.svg";
import Icon_Heart_Svg from "../public/icons/icons/icon_heart.svg";
import Icon_Fxxk_Svg from "../public/icons/icons/icon_fxxk.svg";
import Icon_Unchecked_Svg from "../public/icons/icons/icon_unchecked.svg";
import Icon_Checked_Svg from "../public/icons/icons/icon_checked.svg";
import Btn_Next_Select from "../public/icons/btn/btn_next_select.svg";
import Btn_Select from "../public/icons/btn/btn_select.svg";

// Navigator
import CustomNavigator_Top from "../navigators/CustomNavigator_Top";

// Components
import Field_Text from "../components/Field_Text";
import Field_Select from "../components/Field_Select";

type selectedData = {
    first: {
        COM_CD: string;
        KOR_CD_NM: string;
    };
    second: {
        COM_CD: string;
        KOR_CD_NM: string;
    };
    third: {
        COM_CD: string;
        KOR_CD_NM: string;
    };
};

type thirdData = {
    COM_CD: string;
    KOR_CD_NM: string;
};

type secondData = {
    second: {
        COM_CD: string;
        KOR_CD_NM: string;
    };
    thirds: thirdData[];
};

type codeData = {
    first: {
        COM_CD: string;
        KOR_CD_NM: string;
    };
    seconds: secondData[];
};

import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";
import { REACT_APP_API_KEY } from "@env";

import { useRecoilState } from "recoil";

import { login_data, login_state } from "../atoms/login_state";

export default function SurveyPage_Main({ navigation, route }: any) {
    const [loginState, setLoginState] = useRecoilState<login_data>(login_state);

    const edit = route.params.edit ?? false;

    const edit_step = () => {
        console.log("Edit Step");
        axios
            .patch(
                REACT_APP_API_KEY + "/users/survey/" + loginState.user_id,
                {
                    survey: {
                        liked_smell: likedSmell.map(
                            (data) => data.third.COM_CD
                        ),
                        liked_taste: likedTaste.map(
                            (data) => data.third.COM_CD
                        ),
                        hated_smell: hatedSmell.map(
                            (data) => data.third.COM_CD
                        ),
                        hated_taste: hatedTaste.map(
                            (data) => data.third.COM_CD
                        ),
                    },
                    add_survey: {},
                },
                {
                    headers: {
                        authorization: loginState.accessToken,
                    },
                }
            )
            .then((res) => {
                if (res.data.ok) {
                    console.log("Success Survey");
                    navigation.goBack();
                }
            });
    };

    const next_step = () => {
        console.log("Survey Step");
        axios
            .post(
                REACT_APP_API_KEY + "/users/survey/" + loginState.user_id,
                {
                    survey: {
                        liked_smell: likedSmell.map(
                            (data) => data.third.COM_CD
                        ),
                        liked_taste: likedTaste.map(
                            (data) => data.third.COM_CD
                        ),
                        hated_smell: hatedSmell.map(
                            (data) => data.third.COM_CD
                        ),
                        hated_taste: hatedTaste.map(
                            (data) => data.third.COM_CD
                        ),
                    },
                    add_survey: {
                        exist: addSurvey,
                        add_survey_route:
                            wsRoute == 0 ? null : wsRoutes[wsRoute],
                        add_survey_purchase:
                            wsPurchase == 0 ? null : wsPurchases[wsPurchase],
                        add_survey_place: place == "" ? null : place,
                        add_survey_nick: nick == "" ? null : nick,
                    },
                },
                {
                    headers: {
                        authorization: loginState.accessToken,
                    },
                }
            )
            .then((res) => {
                if (res.data.ok) {
                    setLoginState({
                        is_login: loginState.is_login,
                        login_type: loginState.login_type,
                        user_id: loginState.user_id,
                        accessToken: loginState.accessToken,
                        refreshToken: loginState.refreshToken,
                        survey: true,
                    });
                    console.log("Success Survey");
                    navigation.replace("Main");
                }
            });
    };

    const [likedSmell, setLikedSmell] = React.useState<selectedData[]>([]); // 1
    const [likedTaste, setLikedTaste] = React.useState<selectedData[]>([]); // 2
    const [hatedSmell, setHatedSmell] = React.useState<selectedData[]>([]); // 3
    const [hatedTaste, setHatedTaste] = React.useState<selectedData[]>([]); // 4

    const [addSurvey, setAddSurvey] = React.useState<boolean>(false);

    const [tasteData, setTasteData] = React.useState<codeData[]>([]);
    const [surveyMode, setSurveyMode] = React.useState<number>(0);
    const [tabIndex, setTabIndex] = React.useState(0);
    const [selectedFirst, setSelectedFirst] = React.useState("");
    const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
    const toggleModal = () => {
        if (isModalVisible) {
            setSurveyMode(0);
            setTabIndex(0);
            setSelectedFirst("");
        }
        setIsModalVisible(!isModalVisible);
    };

    const [isAddSurveyView, setIsAddSurveyView] =
        React.useState<boolean>(false);
    const toggleAddSurveyView = () => {
        // console.log(!isAddSurveyView);
        setIsAddSurveyView(!isAddSurveyView);
    };

    const [wsRoute, setWsRoute] = React.useState(0);
    const wsRoutes = [
        { id: 0, name: "선택하기" },
        { id: 1, name: "블로그" },
        { id: 2, name: "지인" },
        { id: 3, name: "기타" },
    ];
    const [wsPurchase, setWsPurchase] = React.useState(0);
    const wsPurchases = [
        { id: 0, name: "선택하기" },
        { id: 1, name: "인터넷" },
        { id: 2, name: "오프라인" },
        { id: 3, name: "기타" },
    ];
    const [place, setPlace] = React.useState("");
    const change_place = (name: string, text: string) => {
        setPlace(text);
    };
    const [nick, setNick] = React.useState("");
    const change_nick = (name: string, text: string) => {
        setNick(text);
    };

    React.useEffect(() => {
        setAddSurvey(
            wsRoute != 0 || wsPurchase != 0 || place != "" || nick != ""
        );
    }, [wsRoute, wsPurchase, place, nick]);

    // React.useEffect(() => {
    //     console.log(wsRoute, wsPurchase, place, nick);
    //     console.log(addSurvey);
    // }, [addSurvey]);

    useFocusEffect(
        React.useCallback(() => {
            console.log("SubPage_TastingNoteWriting Focus");
            axios.get(REACT_APP_API_KEY + "/code/list/").then((res) => {
                setTasteData(res.data.results);
            });
            return () => {};
        }, [])
    );

    React.useEffect(() => {
        if (tasteData.length == 0) return;
        if (!edit) return;
        axios
            .get(REACT_APP_API_KEY + "/users/survey/" + loginState.user_id, {
                headers: {
                    authorization: loginState.accessToken,
                },
            })
            .then((res) => {
                if (res.data.ok) {
                    if (res.data.survey.liked_smell.length != 0) {
                        setLikedSmell(
                            res.data.survey.liked_smell.map((data: any) => {
                                for (let first of tasteData) {
                                    for (let second of first.seconds) {
                                        for (let third of second.thirds) {
                                            if (third.COM_CD == data) {
                                                return {
                                                    first: first.first,
                                                    second: second.second,
                                                    third: third,
                                                };
                                            }
                                        }
                                    }
                                }
                                return {
                                    first: {
                                        COM_CD: "",
                                        KOR_CD_NM: "",
                                    },
                                    second: {
                                        COM_CD: "",
                                        KOR_CD_NM: "",
                                    },
                                    third: {
                                        COM_CD: "",
                                        KOR_CD_NM: "",
                                    },
                                };
                            })
                        );
                    }
                    if (res.data.survey.liked_taste.length != 0) {
                        setLikedTaste(
                            res.data.survey.liked_taste.map((data: any) => {
                                for (let first of tasteData) {
                                    for (let second of first.seconds) {
                                        for (let third of second.thirds) {
                                            if (third.COM_CD == data) {
                                                return {
                                                    first: first.first,
                                                    second: second.second,
                                                    third: third,
                                                };
                                            }
                                        }
                                    }
                                }
                                return {
                                    first: {
                                        COM_CD: "",
                                        KOR_CD_NM: "",
                                    },
                                    second: {
                                        COM_CD: "",
                                        KOR_CD_NM: "",
                                    },
                                    third: {
                                        COM_CD: "",
                                        KOR_CD_NM: "",
                                    },
                                };
                            })
                        );
                    }
                    if (res.data.survey.hated_smell.length != 0) {
                        setHatedSmell(
                            res.data.survey.hated_smell.map((data: any) => {
                                for (let first of tasteData) {
                                    for (let second of first.seconds) {
                                        for (let third of second.thirds) {
                                            if (third.COM_CD == data) {
                                                return {
                                                    first: first.first,
                                                    second: second.second,
                                                    third: third,
                                                };
                                            }
                                        }
                                    }
                                }
                                return {
                                    first: {
                                        COM_CD: "",
                                        KOR_CD_NM: "",
                                    },
                                    second: {
                                        COM_CD: "",
                                        KOR_CD_NM: "",
                                    },
                                    third: {
                                        COM_CD: "",
                                        KOR_CD_NM: "",
                                    },
                                };
                            })
                        );
                    }
                    if (res.data.survey.hated_taste.length != 0) {
                        setHatedTaste(
                            res.data.survey.hated_taste.map((data: any) => {
                                for (let first of tasteData) {
                                    for (let second of first.seconds) {
                                        for (let third of second.thirds) {
                                            if (third.COM_CD == data) {
                                                return {
                                                    first: first.first,
                                                    second: second.second,
                                                    third: third,
                                                };
                                            }
                                        }
                                    }
                                }
                                return {
                                    first: {
                                        COM_CD: "",
                                        KOR_CD_NM: "",
                                    },
                                    second: {
                                        COM_CD: "",
                                        KOR_CD_NM: "",
                                    },
                                    third: {
                                        COM_CD: "",
                                        KOR_CD_NM: "",
                                    },
                                };
                            })
                        );
                    }
                }
            });
    }, [tasteData]);

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={"white"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: "white" }}>
                <CustomNavigator_Top
                    title={isAddSurveyView ? "추가 설문조사" : "위스키 취향"}
                    goBack={() => {
                        if (isAddSurveyView) {
                            toggleAddSurveyView();
                        } else {
                            navigation.goBack();
                        }
                    }}
                />
            </SafeAreaView>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                {/* 향 모달 */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => {
                        toggleModal();
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column-reverse",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                top: 0,
                                backgroundColor: "#000000",
                                opacity: 0.7,
                            }}
                        />
                        <View
                            style={{
                                paddingLeft: 20,
                                paddingRight: 20,
                                width: "100%",
                                flex: 1,
                                marginTop: 100,
                                backgroundColor: "#ffffff",
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                            }}
                        >
                            {/* 향 탭 */}
                            <View
                                style={{
                                    width: "100%",
                                    height: 20,
                                    marginTop: 20,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedFirst("");
                                        if (tabIndex != 0) {
                                            setTabIndex(0);
                                        } else {
                                            toggleModal();
                                        }
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: "Spoqa Han Sans Neo",
                                            fontWeight: "400",
                                            fontSize: 14,
                                            color: "#000000",
                                        }}
                                    >
                                        {tabIndex === 0 ? "취소" : "뒤로"}
                                    </Text>
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "700",
                                        fontSize: 16,
                                        color: "#000000",
                                        textAlign: "center",
                                    }}
                                >
                                    향 선택
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (tabIndex === 0) {
                                            if (surveyMode === 1) {
                                                setLikedSmell([]);
                                            } else if (surveyMode === 2) {
                                                setLikedTaste([]);
                                            } else if (surveyMode === 3) {
                                                setHatedSmell([]);
                                            } else if (surveyMode === 4) {
                                                setHatedTaste([]);
                                            }
                                        } else {
                                            if (surveyMode === 1) {
                                                setLikedSmell(
                                                    likedSmell.filter(
                                                        (data) =>
                                                            data.first.COM_CD !=
                                                            selectedFirst
                                                    )
                                                );
                                            } else if (surveyMode === 2) {
                                                setLikedTaste(
                                                    likedTaste.filter(
                                                        (data) =>
                                                            data.first.COM_CD !=
                                                            selectedFirst
                                                    )
                                                );
                                            } else if (surveyMode === 3) {
                                                setHatedSmell(
                                                    hatedSmell.filter(
                                                        (data) =>
                                                            data.first.COM_CD !=
                                                            selectedFirst
                                                    )
                                                );
                                            } else if (surveyMode === 4) {
                                                setHatedTaste(
                                                    hatedTaste.filter(
                                                        (data) =>
                                                            data.first.COM_CD !=
                                                            selectedFirst
                                                    )
                                                );
                                            }
                                        }
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: "Spoqa Han Sans Neo",
                                            fontWeight: "400",
                                            fontSize: 14,
                                            color: "#000000",
                                        }}
                                    >
                                        초기화
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {/* 선택 창 */}
                            <ScrollView style={{ width: "100%" }}>
                                <View
                                    style={{
                                        width: "100%",
                                        alignItems: "center",
                                        paddingTop: 20,
                                    }}
                                >
                                    {tabIndex === 0
                                        ? tasteData.map((data, index) => {
                                              return (
                                                  <View
                                                      key={index}
                                                      style={{
                                                          width: 320,
                                                      }}
                                                  >
                                                      <Text
                                                          style={{
                                                              width: 320,
                                                              fontFamily:
                                                                  "Spoqa Han Sans Neo",
                                                              fontWeight: "400",
                                                              fontSize: 12,
                                                              color: "#000000",
                                                              textAlign: "left",
                                                          }}
                                                      >
                                                          {data.first.KOR_CD_NM}
                                                      </Text>
                                                      <TouchableOpacity
                                                          onPress={() => {
                                                              setTabIndex(1);
                                                              setSelectedFirst(
                                                                  data.first
                                                                      .COM_CD
                                                              );
                                                          }}
                                                          style={{
                                                              width: 320,
                                                              height: 40,
                                                              marginBottom: 5,
                                                              flexDirection:
                                                                  "row",
                                                              alignItems:
                                                                  "center",
                                                              justifyContent:
                                                                  "space-between",
                                                          }}
                                                      >
                                                          {surveyMode === 1 ? (
                                                              likedSmell.length !=
                                                              0 ? (
                                                                  likedSmell.filter(
                                                                      (
                                                                          s_data
                                                                      ) =>
                                                                          s_data
                                                                              .first
                                                                              .COM_CD ==
                                                                          data
                                                                              .first
                                                                              .COM_CD
                                                                  ).length !=
                                                                  0 ? (
                                                                      <Text
                                                                          style={{
                                                                              fontFamily:
                                                                                  "Spoqa Han Sans Neo",
                                                                              fontWeight:
                                                                                  "500",
                                                                              fontSize: 14,
                                                                              color: "#000000",
                                                                          }}
                                                                      >
                                                                          {likedSmell
                                                                              .filter(
                                                                                  (
                                                                                      s_data
                                                                                  ) =>
                                                                                      s_data
                                                                                          .first
                                                                                          .COM_CD ==
                                                                                      data
                                                                                          .first
                                                                                          .COM_CD
                                                                              )
                                                                              .map(
                                                                                  (
                                                                                      s_data
                                                                                  ) =>
                                                                                      s_data
                                                                                          .third
                                                                                          .KOR_CD_NM
                                                                              )
                                                                              .join(
                                                                                  ", "
                                                                              )}
                                                                      </Text>
                                                                  ) : (
                                                                      <Text
                                                                          style={{
                                                                              fontFamily:
                                                                                  "Spoqa Han Sans Neo",
                                                                              fontWeight:
                                                                                  "500",
                                                                              fontSize: 14,
                                                                              color: "#BABABA",
                                                                          }}
                                                                      >
                                                                          전체
                                                                      </Text>
                                                                  )
                                                              ) : (
                                                                  <Text
                                                                      style={{
                                                                          fontFamily:
                                                                              "Spoqa Han Sans Neo",
                                                                          fontWeight:
                                                                              "500",
                                                                          fontSize: 14,
                                                                          color: "#BABABA",
                                                                      }}
                                                                  >
                                                                      전체
                                                                  </Text>
                                                              )
                                                          ) : null}
                                                          {surveyMode === 2 ? (
                                                              likedTaste.length !=
                                                              0 ? (
                                                                  likedTaste.filter(
                                                                      (
                                                                          s_data
                                                                      ) =>
                                                                          s_data
                                                                              .first
                                                                              .COM_CD ==
                                                                          data
                                                                              .first
                                                                              .COM_CD
                                                                  ).length !=
                                                                  0 ? (
                                                                      <Text
                                                                          style={{
                                                                              fontFamily:
                                                                                  "Spoqa Han Sans Neo",
                                                                              fontWeight:
                                                                                  "500",
                                                                              fontSize: 14,
                                                                              color: "#000000",
                                                                          }}
                                                                      >
                                                                          {likedTaste
                                                                              .filter(
                                                                                  (
                                                                                      s_data
                                                                                  ) =>
                                                                                      s_data
                                                                                          .first
                                                                                          .COM_CD ==
                                                                                      data
                                                                                          .first
                                                                                          .COM_CD
                                                                              )
                                                                              .map(
                                                                                  (
                                                                                      s_data
                                                                                  ) =>
                                                                                      s_data
                                                                                          .third
                                                                                          .KOR_CD_NM
                                                                              )
                                                                              .join(
                                                                                  ", "
                                                                              )}
                                                                      </Text>
                                                                  ) : (
                                                                      <Text
                                                                          style={{
                                                                              fontFamily:
                                                                                  "Spoqa Han Sans Neo",
                                                                              fontWeight:
                                                                                  "500",
                                                                              fontSize: 14,
                                                                              color: "#BABABA",
                                                                          }}
                                                                      >
                                                                          전체
                                                                      </Text>
                                                                  )
                                                              ) : (
                                                                  <Text
                                                                      style={{
                                                                          fontFamily:
                                                                              "Spoqa Han Sans Neo",
                                                                          fontWeight:
                                                                              "500",
                                                                          fontSize: 14,
                                                                          color: "#BABABA",
                                                                      }}
                                                                  >
                                                                      전체
                                                                  </Text>
                                                              )
                                                          ) : null}
                                                          {surveyMode === 3 ? (
                                                              hatedSmell.length !=
                                                              0 ? (
                                                                  hatedSmell.filter(
                                                                      (
                                                                          s_data
                                                                      ) =>
                                                                          s_data
                                                                              .first
                                                                              .COM_CD ==
                                                                          data
                                                                              .first
                                                                              .COM_CD
                                                                  ).length !=
                                                                  0 ? (
                                                                      <Text
                                                                          style={{
                                                                              fontFamily:
                                                                                  "Spoqa Han Sans Neo",
                                                                              fontWeight:
                                                                                  "500",
                                                                              fontSize: 14,
                                                                              color: "#000000",
                                                                          }}
                                                                      >
                                                                          {hatedSmell
                                                                              .filter(
                                                                                  (
                                                                                      s_data
                                                                                  ) =>
                                                                                      s_data
                                                                                          .first
                                                                                          .COM_CD ==
                                                                                      data
                                                                                          .first
                                                                                          .COM_CD
                                                                              )
                                                                              .map(
                                                                                  (
                                                                                      s_data
                                                                                  ) =>
                                                                                      s_data
                                                                                          .third
                                                                                          .KOR_CD_NM
                                                                              )
                                                                              .join(
                                                                                  ", "
                                                                              )}
                                                                      </Text>
                                                                  ) : (
                                                                      <Text
                                                                          style={{
                                                                              fontFamily:
                                                                                  "Spoqa Han Sans Neo",
                                                                              fontWeight:
                                                                                  "500",
                                                                              fontSize: 14,
                                                                              color: "#BABABA",
                                                                          }}
                                                                      >
                                                                          전체
                                                                      </Text>
                                                                  )
                                                              ) : (
                                                                  <Text
                                                                      style={{
                                                                          fontFamily:
                                                                              "Spoqa Han Sans Neo",
                                                                          fontWeight:
                                                                              "500",
                                                                          fontSize: 14,
                                                                          color: "#BABABA",
                                                                      }}
                                                                  >
                                                                      전체
                                                                  </Text>
                                                              )
                                                          ) : null}
                                                          {surveyMode === 4 ? (
                                                              hatedTaste.length !=
                                                              0 ? (
                                                                  hatedTaste.filter(
                                                                      (
                                                                          s_data
                                                                      ) =>
                                                                          s_data
                                                                              .first
                                                                              .COM_CD ==
                                                                          data
                                                                              .first
                                                                              .COM_CD
                                                                  ).length !=
                                                                  0 ? (
                                                                      <Text
                                                                          style={{
                                                                              fontFamily:
                                                                                  "Spoqa Han Sans Neo",
                                                                              fontWeight:
                                                                                  "500",
                                                                              fontSize: 14,
                                                                              color: "#000000",
                                                                          }}
                                                                      >
                                                                          {hatedTaste
                                                                              .filter(
                                                                                  (
                                                                                      s_data
                                                                                  ) =>
                                                                                      s_data
                                                                                          .first
                                                                                          .COM_CD ==
                                                                                      data
                                                                                          .first
                                                                                          .COM_CD
                                                                              )
                                                                              .map(
                                                                                  (
                                                                                      s_data
                                                                                  ) =>
                                                                                      s_data
                                                                                          .third
                                                                                          .KOR_CD_NM
                                                                              )
                                                                              .join(
                                                                                  ", "
                                                                              )}
                                                                      </Text>
                                                                  ) : (
                                                                      <Text
                                                                          style={{
                                                                              fontFamily:
                                                                                  "Spoqa Han Sans Neo",
                                                                              fontWeight:
                                                                                  "500",
                                                                              fontSize: 14,
                                                                              color: "#BABABA",
                                                                          }}
                                                                      >
                                                                          전체
                                                                      </Text>
                                                                  )
                                                              ) : (
                                                                  <Text
                                                                      style={{
                                                                          fontFamily:
                                                                              "Spoqa Han Sans Neo",
                                                                          fontWeight:
                                                                              "500",
                                                                          fontSize: 14,
                                                                          color: "#BABABA",
                                                                      }}
                                                                  >
                                                                      전체
                                                                  </Text>
                                                              )
                                                          ) : null}
                                                          <Btn_Next_Select />
                                                      </TouchableOpacity>
                                                      <View
                                                          style={{
                                                              width: 320,
                                                              height: 1,
                                                              backgroundColor:
                                                                  "#E4E4E4",
                                                              marginBottom: 20,
                                                          }}
                                                      />
                                                  </View>
                                              );
                                          })
                                        : tasteData
                                              .filter(
                                                  (data) =>
                                                      selectedFirst ==
                                                      data.first.COM_CD
                                              )
                                              .map((f_data, f_index) => {
                                                  return f_data.seconds.map(
                                                      (s_data, s_index) => {
                                                          return (
                                                              <View
                                                                  key={s_index}
                                                                  style={{
                                                                      width: 320,
                                                                  }}
                                                              >
                                                                  <Text
                                                                      style={{
                                                                          width: 320,
                                                                          fontFamily:
                                                                              "Spoqa Han Sans Neo",
                                                                          fontWeight:
                                                                              "400",
                                                                          fontSize: 12,
                                                                          color: "#D6690F",
                                                                          textAlign:
                                                                              "left",
                                                                      }}
                                                                  >
                                                                      {
                                                                          s_data
                                                                              .second
                                                                              .KOR_CD_NM
                                                                      }
                                                                  </Text>
                                                                  {s_data.thirds.map(
                                                                      (
                                                                          t_data,
                                                                          t_index
                                                                      ) => {
                                                                          return (
                                                                              <View
                                                                                  key={
                                                                                      t_index
                                                                                  }
                                                                              >
                                                                                  <TouchableOpacity
                                                                                      onPress={() => {
                                                                                          if (
                                                                                              surveyMode ==
                                                                                                  1 &&
                                                                                              likedSmell.filter(
                                                                                                  (
                                                                                                      data
                                                                                                  ) =>
                                                                                                      data
                                                                                                          .third
                                                                                                          .COM_CD ==
                                                                                                      t_data.COM_CD
                                                                                              )
                                                                                                  .length !=
                                                                                                  0
                                                                                          ) {
                                                                                              setLikedSmell(
                                                                                                  likedSmell.filter(
                                                                                                      (
                                                                                                          data
                                                                                                      ) =>
                                                                                                          data
                                                                                                              .third
                                                                                                              .COM_CD !=
                                                                                                          t_data.COM_CD
                                                                                                  )
                                                                                              );
                                                                                          } else if (
                                                                                              surveyMode ==
                                                                                                  1 &&
                                                                                              likedSmell.length <
                                                                                                  5
                                                                                          ) {
                                                                                              setLikedSmell(
                                                                                                  [
                                                                                                      ...likedSmell,
                                                                                                      {
                                                                                                          first: f_data.first,
                                                                                                          second: s_data.second,
                                                                                                          third: t_data,
                                                                                                      },
                                                                                                  ]
                                                                                              );
                                                                                          } else if (
                                                                                              surveyMode ==
                                                                                                  2 &&
                                                                                              likedTaste.filter(
                                                                                                  (
                                                                                                      data
                                                                                                  ) =>
                                                                                                      data
                                                                                                          .third
                                                                                                          .COM_CD ==
                                                                                                      t_data.COM_CD
                                                                                              )
                                                                                                  .length !=
                                                                                                  0
                                                                                          ) {
                                                                                              setLikedTaste(
                                                                                                  likedTaste.filter(
                                                                                                      (
                                                                                                          data
                                                                                                      ) =>
                                                                                                          data
                                                                                                              .third
                                                                                                              .COM_CD !=
                                                                                                          t_data.COM_CD
                                                                                                  )
                                                                                              );
                                                                                          } else if (
                                                                                              surveyMode ==
                                                                                                  2 &&
                                                                                              likedTaste.length <
                                                                                                  5
                                                                                          ) {
                                                                                              setLikedTaste(
                                                                                                  [
                                                                                                      ...likedTaste,
                                                                                                      {
                                                                                                          first: f_data.first,
                                                                                                          second: s_data.second,
                                                                                                          third: t_data,
                                                                                                      },
                                                                                                  ]
                                                                                              );
                                                                                          } else if (
                                                                                              surveyMode ==
                                                                                                  3 &&
                                                                                              hatedSmell.filter(
                                                                                                  (
                                                                                                      data
                                                                                                  ) =>
                                                                                                      data
                                                                                                          .third
                                                                                                          .COM_CD ==
                                                                                                      t_data.COM_CD
                                                                                              )
                                                                                                  .length !=
                                                                                                  0
                                                                                          ) {
                                                                                              setHatedSmell(
                                                                                                  hatedSmell.filter(
                                                                                                      (
                                                                                                          data
                                                                                                      ) =>
                                                                                                          data
                                                                                                              .third
                                                                                                              .COM_CD !=
                                                                                                          t_data.COM_CD
                                                                                                  )
                                                                                              );
                                                                                          } else if (
                                                                                              surveyMode ==
                                                                                                  3 &&
                                                                                              hatedSmell.length <
                                                                                                  5
                                                                                          ) {
                                                                                              setHatedSmell(
                                                                                                  [
                                                                                                      ...hatedSmell,
                                                                                                      {
                                                                                                          first: f_data.first,
                                                                                                          second: s_data.second,
                                                                                                          third: t_data,
                                                                                                      },
                                                                                                  ]
                                                                                              );
                                                                                          } else if (
                                                                                              surveyMode ==
                                                                                                  4 &&
                                                                                              hatedTaste.filter(
                                                                                                  (
                                                                                                      data
                                                                                                  ) =>
                                                                                                      data
                                                                                                          .third
                                                                                                          .COM_CD ==
                                                                                                      t_data.COM_CD
                                                                                              )
                                                                                                  .length !=
                                                                                                  0
                                                                                          ) {
                                                                                              setHatedTaste(
                                                                                                  hatedTaste.filter(
                                                                                                      (
                                                                                                          data
                                                                                                      ) =>
                                                                                                          data
                                                                                                              .third
                                                                                                              .COM_CD !=
                                                                                                          t_data.COM_CD
                                                                                                  )
                                                                                              );
                                                                                          } else if (
                                                                                              surveyMode ==
                                                                                                  4 &&
                                                                                              hatedTaste.length <
                                                                                                  5
                                                                                          ) {
                                                                                              setHatedTaste(
                                                                                                  [
                                                                                                      ...hatedTaste,
                                                                                                      {
                                                                                                          first: f_data.first,
                                                                                                          second: s_data.second,
                                                                                                          third: t_data,
                                                                                                      },
                                                                                                  ]
                                                                                              );
                                                                                          }
                                                                                      }}
                                                                                      style={{
                                                                                          width: 320,
                                                                                          height: 40,
                                                                                          marginBottom: 5,
                                                                                          flexDirection:
                                                                                              "row",
                                                                                          alignItems:
                                                                                              "center",
                                                                                          justifyContent:
                                                                                              "space-between",
                                                                                      }}
                                                                                  >
                                                                                      <Text
                                                                                          style={{
                                                                                              fontFamily:
                                                                                                  "Spoqa Han Sans Neo",
                                                                                              fontWeight:
                                                                                                  "500",
                                                                                              fontSize: 14,
                                                                                              color: "#000000",
                                                                                          }}
                                                                                      >
                                                                                          {
                                                                                              t_data.KOR_CD_NM
                                                                                          }
                                                                                      </Text>
                                                                                      {surveyMode ===
                                                                                          1 &&
                                                                                      likedSmell.filter(
                                                                                          (
                                                                                              data
                                                                                          ) =>
                                                                                              data
                                                                                                  .third
                                                                                                  .COM_CD ==
                                                                                              t_data.COM_CD
                                                                                      )
                                                                                          .length !=
                                                                                          0 ? (
                                                                                          <Btn_Select />
                                                                                      ) : surveyMode ===
                                                                                            2 &&
                                                                                        likedTaste.filter(
                                                                                            (
                                                                                                data
                                                                                            ) =>
                                                                                                data
                                                                                                    .third
                                                                                                    .COM_CD ==
                                                                                                t_data.COM_CD
                                                                                        )
                                                                                            .length !=
                                                                                            0 ? (
                                                                                          <Btn_Select />
                                                                                      ) : surveyMode ===
                                                                                            3 &&
                                                                                        hatedSmell.filter(
                                                                                            (
                                                                                                data
                                                                                            ) =>
                                                                                                data
                                                                                                    .third
                                                                                                    .COM_CD ==
                                                                                                t_data.COM_CD
                                                                                        )
                                                                                            .length !=
                                                                                            0 ? (
                                                                                          <View
                                                                                              style={{
                                                                                                  width: 40,
                                                                                                  height: 40,
                                                                                              }}
                                                                                          >
                                                                                              <Btn_Select />
                                                                                          </View>
                                                                                      ) : surveyMode ===
                                                                                            4 &&
                                                                                        hatedTaste.filter(
                                                                                            (
                                                                                                data
                                                                                            ) =>
                                                                                                data
                                                                                                    .third
                                                                                                    .COM_CD ==
                                                                                                t_data.COM_CD
                                                                                        )
                                                                                            .length !=
                                                                                            0 ? (
                                                                                          <View
                                                                                              style={{
                                                                                                  width: 40,
                                                                                                  height: 40,
                                                                                              }}
                                                                                          >
                                                                                              <Btn_Select />
                                                                                          </View>
                                                                                      ) : null}
                                                                                  </TouchableOpacity>
                                                                                  <View
                                                                                      style={{
                                                                                          width: 320,
                                                                                          height: 1,
                                                                                          backgroundColor:
                                                                                              "#E4E4E4",
                                                                                      }}
                                                                                  />
                                                                              </View>
                                                                          );
                                                                      }
                                                                  )}
                                                                  <View
                                                                      style={{
                                                                          marginBottom: 40,
                                                                      }}
                                                                  />
                                                              </View>
                                                          );
                                                      }
                                                  );
                                              })}
                                </View>
                            </ScrollView>
                            {/* 선택 완료 버튼 */}
                            <TouchableOpacity
                                disabled={
                                    !(
                                        (surveyMode === 1 &&
                                            likedSmell.length == 5) ||
                                        (surveyMode === 2 &&
                                            likedTaste.length == 5) ||
                                        (surveyMode === 3 &&
                                            hatedSmell.length == 5) ||
                                        (surveyMode === 4 &&
                                            hatedTaste.length == 5)
                                    )
                                }
                                onPress={() => {
                                    toggleModal();
                                }}
                                style={[
                                    {
                                        width: 320,
                                        height: 55,
                                        backgroundColor: "#974B1A",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: 10,
                                        alignSelf: "center",
                                        marginBottom: 20,
                                    },
                                    { opacity: 0.4 },
                                    ((surveyMode === 1 &&
                                        likedSmell.length == 5) ||
                                        (surveyMode === 2 &&
                                            likedTaste.length == 5) ||
                                        (surveyMode === 3 &&
                                            hatedSmell.length == 5) ||
                                        (surveyMode === 4 &&
                                            hatedTaste.length == 5)) && {
                                        opacity: 1.0,
                                    },
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
                                    {`${
                                        surveyMode == 1 &&
                                        likedSmell.length != 0
                                            ? `(+${likedSmell.length})`
                                            : surveyMode == 2 &&
                                              likedTaste.length != 0
                                            ? `(+${likedTaste.length})`
                                            : surveyMode == 3 &&
                                              hatedSmell.length != 0
                                            ? `(+${hatedSmell.length})`
                                            : surveyMode == 4 &&
                                              hatedTaste.length != 0
                                            ? `(+${hatedTaste.length})`
                                            : ""
                                    }선택 완료`}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <ScrollView style={{ width: "100%", flex: 1 }}>
                    <View
                        style={{
                            width: "100%",
                            height: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
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
                                    height: 150,
                                    borderRadius: 10,
                                    backgroundColor: "#FCECDE",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Icon_Fxxk_Svg />
                                <View style={{ marginTop: 2 }} />
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "400",
                                        fontSize: 14,
                                        color: "#3D1909",
                                        textAlign: "center",
                                        marginBottom: 6,
                                    }}
                                >
                                    서비스 이용에 필요한
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "400",
                                        fontSize: 14,
                                        color: "#3D1909",
                                        textAlign: "center",
                                        marginBottom: 6,
                                    }}
                                >
                                    추가 설문조사를 진행합니다.
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontWeight: "400",
                                        fontSize: 14,
                                        color: "#3D1909",
                                        textAlign: "center",
                                    }}
                                >
                                    향후 서비스 개선에 큰 도움이 됩니다.
                                </Text>
                            </View>
                            {isAddSurveyView ? (
                                <View style={{}}>
                                    <Text
                                        style={{
                                            width: 320,
                                            marginBottom: 10,
                                            marginTop: 20,
                                        }}
                                    >
                                        <Text style={styles.subtitle_text}>
                                            위스키 팔레트를 알게 된 경로
                                        </Text>
                                    </Text>
                                    <Field_Select
                                        list={wsRoutes}
                                        value={wsRoute}
                                        setValue={setWsRoute}
                                    />
                                    <Text
                                        style={{
                                            width: 320,
                                            marginBottom: 10,
                                            marginTop: 20,
                                        }}
                                    >
                                        <Text style={styles.subtitle_text}>
                                            자주 이용하는 위스키 구매 방식
                                        </Text>
                                    </Text>
                                    <Field_Select
                                        list={wsPurchases}
                                        value={wsPurchase}
                                        setValue={setWsPurchase}
                                    />
                                    <Text
                                        style={{
                                            width: 320,
                                            marginBottom: 0,
                                            marginTop: 20,
                                        }}
                                    >
                                        <Text style={styles.subtitle_text}>
                                            위스키를 주로 마시는 장소
                                        </Text>
                                    </Text>
                                    <Field_Text
                                        isNeccesary={false}
                                        isDisabled={false}
                                        id={"place"}
                                        value={place}
                                        changeValue={change_place}
                                        placeholder="장소 입력"
                                    />
                                    <Text
                                        style={{
                                            width: 320,
                                            marginBottom: 0,
                                            marginTop: 20,
                                        }}
                                    >
                                        <Text style={styles.subtitle_text}>
                                            추천인 닉네임
                                        </Text>
                                    </Text>
                                    <Field_Text
                                        isNeccesary={false}
                                        isDisabled={false}
                                        id={"nick"}
                                        value={nick}
                                        changeValue={change_nick}
                                        placeholder="닉네임 입력"
                                    />
                                </View>
                            ) : (
                                <View style={{}}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            toggleModal();
                                            setSurveyMode(1);
                                        }}
                                        style={[
                                            {
                                                width: 320,
                                                height: 55,
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                borderColor: "#EDEDED",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginTop: 20,
                                            },
                                            likedSmell.length == 5 && {
                                                backgroundColor: "#FBF8F2",
                                                borderColor: "#D6690F",
                                            },
                                        ]}
                                    >
                                        <View
                                            style={{
                                                width: 290,
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "400",
                                                    fontSize: 14,
                                                    color: "#000000",
                                                }}
                                            >
                                                <Text>선호하는</Text>
                                                <Text
                                                    style={{
                                                        fontWeight: "700",
                                                    }}
                                                >
                                                    {" "}
                                                    노즈(향){" "}
                                                </Text>
                                                <Text>5가지</Text>
                                                <Text
                                                    style={{ color: "#D6690F" }}
                                                >
                                                    {" "}
                                                    *
                                                </Text>
                                            </Text>
                                            {likedSmell.length == 5 ? (
                                                <Icon_Checked_Svg />
                                            ) : (
                                                <Icon_Unchecked_Svg />
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            toggleModal();
                                            setSurveyMode(2);
                                        }}
                                        style={[
                                            {
                                                width: 320,
                                                height: 55,
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                borderColor: "#EDEDED",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginTop: 20,
                                            },
                                            likedTaste.length == 5 && {
                                                backgroundColor: "#FBF8F2",
                                                borderColor: "#D6690F",
                                            },
                                        ]}
                                    >
                                        <View
                                            style={{
                                                width: 290,
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "400",
                                                    fontSize: 14,
                                                    color: "#000000",
                                                }}
                                            >
                                                <Text>선호하는</Text>
                                                <Text
                                                    style={{
                                                        fontWeight: "700",
                                                    }}
                                                >
                                                    {" "}
                                                    맛{" "}
                                                </Text>
                                                <Text>5가지</Text>
                                                <Text
                                                    style={{ color: "#D6690F" }}
                                                >
                                                    {" "}
                                                    *
                                                </Text>
                                            </Text>
                                            {likedTaste.length == 5 ? (
                                                <Icon_Checked_Svg />
                                            ) : (
                                                <Icon_Unchecked_Svg />
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            toggleModal();
                                            setSurveyMode(3);
                                        }}
                                        style={[
                                            {
                                                width: 320,
                                                height: 55,
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                borderColor: "#EDEDED",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginTop: 20,
                                            },
                                            hatedSmell.length == 5 && {
                                                backgroundColor: "#FBF8F2",
                                                borderColor: "#D6690F",
                                            },
                                        ]}
                                    >
                                        <View
                                            style={{
                                                width: 290,
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "400",
                                                    fontSize: 14,
                                                    color: "#000000",
                                                }}
                                            >
                                                <Text>싫어하는</Text>
                                                <Text
                                                    style={{
                                                        fontWeight: "700",
                                                    }}
                                                >
                                                    {" "}
                                                    노즈(향){" "}
                                                </Text>
                                                <Text>5가지</Text>
                                                <Text
                                                    style={{ color: "#D6690F" }}
                                                >
                                                    {" "}
                                                    *
                                                </Text>
                                            </Text>
                                            {hatedSmell.length == 5 ? (
                                                <Icon_Checked_Svg />
                                            ) : (
                                                <Icon_Unchecked_Svg />
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            toggleModal();
                                            setSurveyMode(4);
                                        }}
                                        style={[
                                            {
                                                width: 320,
                                                height: 55,
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                borderColor: "#EDEDED",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginTop: 20,
                                            },
                                            hatedTaste.length == 5 && {
                                                backgroundColor: "#FBF8F2",
                                                borderColor: "#D6690F",
                                            },
                                        ]}
                                    >
                                        <View
                                            style={{
                                                width: 290,
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "400",
                                                    fontSize: 14,
                                                    color: "#000000",
                                                }}
                                            >
                                                <Text>싫어하는</Text>
                                                <Text
                                                    style={{
                                                        fontWeight: "700",
                                                    }}
                                                >
                                                    {" "}
                                                    맛{" "}
                                                </Text>
                                                <Text>5가지</Text>
                                                <Text
                                                    style={{ color: "#D6690F" }}
                                                >
                                                    {" "}
                                                    *
                                                </Text>
                                            </Text>
                                            {hatedTaste.length == 5 ? (
                                                <Icon_Checked_Svg />
                                            ) : (
                                                <Icon_Unchecked_Svg />
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        disabled={edit}
                                        onPress={() => {
                                            toggleAddSurveyView();
                                        }}
                                        style={[
                                            {
                                                width: 320,
                                                height: 55,
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                borderColor: "#EDEDED",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginTop: 20,
                                            },
                                            addSurvey && {
                                                backgroundColor: "#FBF8F2",
                                                borderColor: "#D6690F",
                                            },
                                        ]}
                                    >
                                        <View
                                            style={{
                                                width: 290,
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "400",
                                                    fontSize: 14,
                                                    color: "#000000",
                                                }}
                                            >
                                                <Text>추가 설문조사</Text>
                                            </Text>
                                            {addSurvey ? (
                                                <Icon_Checked_Svg />
                                            ) : (
                                                <Icon_Unchecked_Svg />
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                </ScrollView>
                <View
                    style={{
                        width: "100%",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            if (isAddSurveyView) {
                                toggleAddSurveyView();
                            } else {
                                if (edit) {
                                    edit_step();
                                } else {
                                    next_step();
                                }
                            }
                        }}
                        disabled={
                            !(
                                !isAddSurveyView &&
                                likedSmell.length == 5 &&
                                likedTaste.length == 5 &&
                                hatedSmell.length == 5 &&
                                hatedTaste.length == 5
                            ) && !(isAddSurveyView && addSurvey)
                        }
                        style={[
                            {
                                width: 320,
                                height: 55,
                                backgroundColor: "#974B1A",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                                marginBottom: 20,
                            },
                            { backgroundColor: "#BABABA" },
                            isAddSurveyView &&
                                addSurvey && {
                                    backgroundColor: "#974B1A",
                                },
                            !isAddSurveyView &&
                                likedSmell.length == 5 &&
                                likedTaste.length == 5 &&
                                hatedSmell.length == 5 &&
                                hatedTaste.length == 5 && {
                                    opacity: 1,
                                    backgroundColor: "#974B1A",
                                },
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
                            {edit ? "수정 완료" : "완료"}
                        </Text>
                    </TouchableOpacity>
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
    subtitle_text: {
        fontFamily: "Spoqa Han Sans Neo",
        fontWeight: "500",
        fontSize: 12,
        color: "#424242",
        textAlign: "left",
    },
    subtitle_des_text: {
        fontFamily: "Spoqa Han Sans Neo",
        fontWeight: "400",
        fontSize: 10,
        color: "#888888",
        textAlign: "left",
    },
});
