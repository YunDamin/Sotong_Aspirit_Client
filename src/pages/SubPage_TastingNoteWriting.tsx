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
    Image,
    Modal,
    TextInput,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import Btn_Next_Select from "../public/icons/btn/btn_next_select.svg";
import Btn_Select from "../public/icons/btn/btn_select.svg";
import Btn_Search from "../public/icons/btn/search_black.svg";
import Btn_OnOff_Arrow_Right from "../public/icons/btn/btn_onoff_right_arrow.svg";
import Photo_Btn_OnOff_Svg from "../public/icons/photo/btn_onoff.svg";
import Star_Rating from "../public/icons/btn/star_rating.svg";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import Icon_Star from "../public/icons/icons/icon_star.svg";

// Navigator
import CustomNavigator_Top from "../navigators/CustomNavigator_Top";

// Components
import SelectBar_Color from "../components/SelectBar_Color";
import Field_Text from "../components/Field_Text";

import StarRating, { StarRatingDisplay } from "react-native-star-rating-widget";

type photoType = {
    name: string;
    uri: string;
};

import axios from "axios";
import { API_KEY } from "@env";

import { useRecoilState } from "recoil";

import { login_data, login_state } from "../atoms/login_state";

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

export default function SubPage_TastingNoteWriting({ navigation }: any) {
    const [loginState, setLoginState] = useRecoilState<login_data>(login_state);

    const [review, setReview] = React.useState("");
    const change_review = (name: string, text: string) => {
        setReview(text);
    };

    const [photoWhisky, setPhotoWhisky] = React.useState<photoType[]>([]);
    const [photoBill, setPhotoBill] = React.useState<photoType[]>([]);

    const select_photo = async (type: string) => {
        const result = await launchImageLibrary({
            mediaType: "photo",
            selectionLimit: 0,
        });
        if (result.didCancel) {
            return;
        }
        if (result.errorCode) {
            return;
        }
        if (result.errorMessage) {
            return;
        }
        if (result.assets) {
            let pthoes: photoType[] = [];
            result.assets.map((asset) => {
                const img_name = asset.fileName ?? "";
                const img_path = asset.uri ?? "";

                pthoes.push({
                    name: img_name,
                    uri: img_path,
                });
            });
            if (type === "whisky") {
                setPhotoWhisky((previousPhotos) => [
                    ...previousPhotos,
                    ...pthoes,
                ]);
            } else if (type === "bill") {
                setPhotoBill((previousPhotos) => [
                    ...previousPhotos,
                    ...pthoes,
                ]);
            }
        }
    };

    const [isWhiskyModalVisible, setWhiskyModaVisible] = React.useState(false);
    const toggleWhiskyModal = () => {
        setWhiskyModaVisible(!isWhiskyModalVisible);
    };

    const [selectedWhisky, setSelectedWhisky] = React.useState("");
    const [whiskyData, setWhiskyData] = React.useState<any[]>([]);
    const consonants = [
        "ㄱ",
        "ㄲ",
        "ㄴ",
        "ㄷ",
        "ㄸ",
        "ㄹ",
        "ㅁ",
        "ㅂ",
        "ㅃ",
        "ㅅ",
        "ㅆ",
        "ㅇ",
        "ㅈ",
        "ㅉ",
        "ㅊ",
        "ㅋ",
        "ㅌ",
        "ㅍ",
        "ㅎ",
    ];
    function getFirstConsonant(char: string) {
        const koreanBase = 0xac00;

        const index = Math.floor((char.charCodeAt(0) - koreanBase) / 28 / 21);

        return consonants[index] || null;
    }
    const [searchText, setSearchText] = React.useState<string>("");
    const [isFocused, setIsFocused] = React.useState<boolean>(false);
    const get_selected_whisky = () => {
        if (selectedWhisky === "") {
            return whiskyData[0];
        }
        const whisky = whiskyData.filter((whisky) => {
            return whisky.whisky_id === selectedWhisky;
        });
        if (whisky.length === 0) {
            return whiskyData[0];
        }
        return whisky[0];
    };
    const get_whisky_name = (): string => {
        if (selectedWhisky === "") {
            return "‘’";
        } else {
            for (let whisky of whiskyData) {
                if (whisky.whisky_id.trim() == selectedWhisky.trim()) {
                    return `‘${whisky.name_kor}(${whisky.name_eng})’`;
                }
            }
        }

        return "‘’";
    };

    const [colorIndex, setColorIndex] = React.useState<number>(0);
    const change_color = (index: number) => {
        setColorIndex(index);
    };
    const change_color_to_common_code = (index: number): string => {
        switch (index) {
            case 0:
                return "WHI001.00001";
            case 1:
                return "WHI001.00002";
            case 2:
                return "WHI001.00003";
            case 3:
                return "WHI001.00004";
            case 4:
                return "WHI001.00005";
            case 5:
                return "WHI001.00006";
            case 6:
                return "WHI001.00007";
            default:
                return "WHI001.00001";
        }
    };

    const [isTasteModalVisible, setIsTasteModalVisible] = React.useState(false);
    const [tasteData, setTasteData] = React.useState<codeData[]>([]);
    const [whatTaste, setWhatTaste] = React.useState(0);
    const [selectedNoseData, setSelectedNoseData] = React.useState<
        selectedData[]
    >([]);
    const [selectedPalateData, setSelectedPalateData] = React.useState<
        selectedData[]
    >([]);
    const [selectedFinishData, setSelectedFinishData] = React.useState<
        selectedData[]
    >([]);

    const toggleTasteModal = () => {
        if (isTasteModalVisible) {
            setWhatTaste(0);
            setTabIndex(0);
            setSelectedFirst("");
        }
        setIsTasteModalVisible(!isTasteModalVisible);
    };

    const [tabIndex, setTabIndex] = React.useState(0);
    const [selectedFirst, setSelectedFirst] = React.useState("");

    useFocusEffect(
        React.useCallback(() => {
            console.log("SubPage_TastingNoteWriting Focus");
            axios.get(API_KEY + "/whiskys/").then((res) => {
                setWhiskyData(
                    res.data.sort((a: any, b: any) =>
                        a.name_kor.localeCompare(b.name_kor, "ko")
                    )
                );
            });
            axios.get(API_KEY + "/code/list/").then((res) => {
                setTasteData(res.data.results);
            });
            return () => {};
        }, [])
    );

    const [writing, setWriting] = React.useState(false);

    const next_step = () => {
        console.log("Write Tasting Note");
        setWriting(true);

        let frm = new FormData();

        frm.append("user_id", loginState.user_id);
        frm.append("whisky_id", selectedWhisky);
        frm.append("color_index", change_color_to_common_code(colorIndex));
        frm.append(
            "nose",
            selectedNoseData.map((data) => data.third.COM_CD)
        );
        frm.append(
            "palate",
            selectedPalateData.map((data) => data.third.COM_CD)
        );
        frm.append(
            "finish",
            selectedFinishData.map((data) => data.third.COM_CD)
        );
        frm.append("review", review);
        frm.append("noseRate", noseRate.toString());
        frm.append("palateRate", palateRate.toString());
        frm.append("finishRate", finishRate.toString());
        frm.append("allRate", allRate.toString());

        if (photoWhisky.length != 0) {
            photoWhisky.map((data) => {
                let extension = data.name?.split(".").pop()?.toLowerCase();

                let mimeType;
                if (extension == "jpg" || extension == "jpeg") {
                    mimeType = "image/jpeg";
                } else if (extension == "png") {
                    mimeType = "image/png";
                } else {
                    mimeType = "application/octet-stream";
                }

                frm.append("whisky_images", {
                    uri: data.uri,
                    name: data.name,
                    type: mimeType,
                });
            });
        }
        if (photoBill.length != 0) {
            photoBill.map((data) => {
                let extension = data.name?.split(".").pop()?.toLowerCase();

                let mimeType;
                if (extension == "jpg" || extension == "jpeg") {
                    mimeType = "image/jpeg";
                } else if (extension == "png") {
                    mimeType = "image/png";
                } else {
                    mimeType = "application/octet-stream";
                }

                frm.append("bill_images", {
                    uri: data.uri,
                    name: data.name,
                    type: mimeType,
                });
            });
        }

        axios
            .post(API_KEY + "/notes/", frm, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    authorization: loginState.accessToken,
                },
            })
            .then((res) => {
                if (res.data.ok) {
                    navigation.goBack();
                }
            });
    };

    const [pageIndex, setPageIndex] = React.useState(0);

    const [noseRate, setNoseRate] = React.useState(0.0);
    const [palateRate, setPalateRate] = React.useState(0.0);
    const [finishRate, setFinishRate] = React.useState(0.0);
    const [allRate, setAllRate] = React.useState(0.0);

    return (
        <>
            {pageIndex === 0 ? (
                <>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor={"white"}
                    />
                    <SafeAreaView style={{ flex: 0, backgroundColor: "white" }}>
                        <CustomNavigator_Top
                            title="테이스팅 노트 작성"
                            goBack={() => {
                                navigation.goBack();
                            }}
                        />
                    </SafeAreaView>
                    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                        {/* 향 모달 */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={isTasteModalVisible}
                            onRequestClose={() => {
                                toggleTasteModal();
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
                                                    toggleTasteModal();
                                                }
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
                                                {tabIndex === 0
                                                    ? "취소"
                                                    : "뒤로"}
                                            </Text>
                                        </TouchableOpacity>
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
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
                                                    if (whatTaste === 1) {
                                                        setSelectedNoseData([]);
                                                    } else if (
                                                        whatTaste === 2
                                                    ) {
                                                        setSelectedPalateData(
                                                            []
                                                        );
                                                    } else if (
                                                        whatTaste === 3
                                                    ) {
                                                        setSelectedFinishData(
                                                            []
                                                        );
                                                    }
                                                } else {
                                                    if (whatTaste === 1) {
                                                        setSelectedNoseData(
                                                            selectedNoseData.filter(
                                                                (data) =>
                                                                    data.first
                                                                        .COM_CD !=
                                                                    selectedFirst
                                                            )
                                                        );
                                                    } else if (
                                                        whatTaste === 2
                                                    ) {
                                                        setSelectedPalateData(
                                                            selectedPalateData.filter(
                                                                (data) =>
                                                                    data.first
                                                                        .COM_CD !=
                                                                    selectedFirst
                                                            )
                                                        );
                                                    } else if (
                                                        whatTaste === 3
                                                    ) {
                                                        setSelectedFinishData(
                                                            selectedFinishData.filter(
                                                                (data) =>
                                                                    data.first
                                                                        .COM_CD !=
                                                                    selectedFirst
                                                            )
                                                        );
                                                    }
                                                }
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
                                                ? tasteData.map(
                                                      (data, index) => {
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
                                                                          fontWeight:
                                                                              "400",
                                                                          fontSize: 12,
                                                                          color: "#000000",
                                                                          textAlign:
                                                                              "left",
                                                                      }}
                                                                  >
                                                                      {
                                                                          data
                                                                              .first
                                                                              .KOR_CD_NM
                                                                      }
                                                                  </Text>
                                                                  <TouchableOpacity
                                                                      onPress={() => {
                                                                          setTabIndex(
                                                                              1
                                                                          );
                                                                          setSelectedFirst(
                                                                              data
                                                                                  .first
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
                                                                      {whatTaste ===
                                                                      1 ? (
                                                                          selectedNoseData.length !=
                                                                          0 ? (
                                                                              selectedNoseData.filter(
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
                                                                                  .length !=
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
                                                                                      {selectedNoseData
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
                                                                      {whatTaste ===
                                                                      2 ? (
                                                                          selectedPalateData.length !=
                                                                          0 ? (
                                                                              selectedPalateData.filter(
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
                                                                                  .length !=
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
                                                                                      {selectedPalateData
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
                                                                      {whatTaste ===
                                                                      3 ? (
                                                                          selectedFinishData.length !=
                                                                          0 ? (
                                                                              selectedFinishData.filter(
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
                                                                                  .length !=
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
                                                                                      {selectedFinishData
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
                                                      }
                                                  )
                                                : tasteData
                                                      .filter(
                                                          (data) =>
                                                              selectedFirst ==
                                                              data.first.COM_CD
                                                      )
                                                      .map(
                                                          (f_data, f_index) => {
                                                              return f_data.seconds.map(
                                                                  (
                                                                      s_data,
                                                                      s_index
                                                                  ) => {
                                                                      return (
                                                                          <View
                                                                              key={
                                                                                  s_index
                                                                              }
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
                                                                                                          whatTaste ==
                                                                                                              1 &&
                                                                                                          selectedNoseData.filter(
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
                                                                                                          setSelectedNoseData(
                                                                                                              selectedNoseData.filter(
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
                                                                                                          whatTaste ==
                                                                                                              1 &&
                                                                                                          selectedNoseData.length <
                                                                                                              5
                                                                                                      ) {
                                                                                                          setSelectedNoseData(
                                                                                                              [
                                                                                                                  ...selectedNoseData,
                                                                                                                  {
                                                                                                                      first: f_data.first,
                                                                                                                      second: s_data.second,
                                                                                                                      third: t_data,
                                                                                                                  },
                                                                                                              ]
                                                                                                          );
                                                                                                      } else if (
                                                                                                          whatTaste ==
                                                                                                              2 &&
                                                                                                          selectedPalateData.filter(
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
                                                                                                          setSelectedPalateData(
                                                                                                              selectedPalateData.filter(
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
                                                                                                          whatTaste ==
                                                                                                              2 &&
                                                                                                          selectedPalateData.length <
                                                                                                              5
                                                                                                      ) {
                                                                                                          setSelectedPalateData(
                                                                                                              [
                                                                                                                  ...selectedPalateData,
                                                                                                                  {
                                                                                                                      first: f_data.first,
                                                                                                                      second: s_data.second,
                                                                                                                      third: t_data,
                                                                                                                  },
                                                                                                              ]
                                                                                                          );
                                                                                                      } else if (
                                                                                                          whatTaste ==
                                                                                                              3 &&
                                                                                                          selectedFinishData.filter(
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
                                                                                                          setSelectedFinishData(
                                                                                                              selectedFinishData.filter(
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
                                                                                                          whatTaste ==
                                                                                                              3 &&
                                                                                                          selectedFinishData.length <
                                                                                                              5
                                                                                                      ) {
                                                                                                          setSelectedFinishData(
                                                                                                              [
                                                                                                                  ...selectedFinishData,
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
                                                                                                  {whatTaste ===
                                                                                                      1 &&
                                                                                                  selectedNoseData.filter(
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
                                                                                                  ) : whatTaste ===
                                                                                                        2 &&
                                                                                                    selectedPalateData.filter(
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
                                                                                                  ) : whatTaste ===
                                                                                                        3 &&
                                                                                                    selectedFinishData.filter(
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
                                                          }
                                                      )}
                                        </View>
                                    </ScrollView>
                                    {/* 선택 완료 버튼 */}
                                    <TouchableOpacity
                                        disabled={
                                            !(
                                                (whatTaste === 1 &&
                                                    selectedNoseData.length !=
                                                        0) ||
                                                (whatTaste === 2 &&
                                                    selectedPalateData.length !=
                                                        0) ||
                                                (whatTaste === 3 &&
                                                    selectedFinishData.length !=
                                                        0)
                                            )
                                        }
                                        onPress={() => {
                                            toggleTasteModal();
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
                                            ((whatTaste === 1 &&
                                                selectedNoseData.length != 0) ||
                                                (whatTaste === 2 &&
                                                    selectedPalateData.length !=
                                                        0) ||
                                                (whatTaste === 3 &&
                                                    selectedFinishData.length !=
                                                        0)) && {
                                                opacity: 1.0,
                                            },
                                        ]}
                                    >
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "500",
                                                fontSize: 18,
                                                color: "#FFFFFF",
                                                textAlign: "center",
                                            }}
                                        >
                                            {`${
                                                whatTaste == 1 &&
                                                selectedNoseData.length != 0
                                                    ? `(+${selectedNoseData.length})`
                                                    : whatTaste == 2 &&
                                                      selectedPalateData.length !=
                                                          0
                                                    ? `(+${selectedPalateData.length})`
                                                    : whatTaste == 3 &&
                                                      selectedFinishData.length !=
                                                          0
                                                    ? `(+${selectedFinishData.length})`
                                                    : ""
                                            }선택 완료`}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        {/* 필터 모달 */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={isWhiskyModalVisible}
                            onRequestClose={() => {
                                toggleWhiskyModal();
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
                                    {/* 필터 탭 */}
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
                                                toggleWhiskyModal();
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "400",
                                                    fontSize: 14,
                                                    color: "#000000",
                                                    position: "absolute",
                                                    left: 10,
                                                    top: -6,
                                                }}
                                            >
                                                취소
                                            </Text>
                                        </TouchableOpacity>
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "700",
                                                fontSize: 16,
                                                color: "#000000",
                                                textAlign: "center",
                                            }}
                                        >
                                            위스키 선택
                                        </Text>
                                        <View />
                                    </View>
                                    {/* 선택 창 */}
                                    <ScrollView style={{ width: "100%" }}>
                                        <View
                                            style={{
                                                width: "100%",
                                                alignItems: "center",
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: 320,
                                                    borderRadius: 10,
                                                    backgroundColor: "#FBF8F2",
                                                    height: 50,
                                                    marginTop: 20,
                                                    paddingLeft: 20,
                                                    position: "relative",
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        position: "absolute",
                                                        right: 5,
                                                        top: 5,
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <Btn_Search />
                                                </View>
                                                <TextInput
                                                    placeholder="위스키명 입력"
                                                    style={{
                                                        height: 50,
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent:
                                                            "center",
                                                        fontFamily:
                                                            "Spoqa Han Sans Neo",
                                                        fontWeight: "400",
                                                        fontSize: 14,
                                                        color: "#000000",
                                                    }}
                                                    onFocus={() => {
                                                        setIsFocused(true);
                                                    }}
                                                    onBlur={() => {
                                                        searchText === ""
                                                            ? setIsFocused(
                                                                  false
                                                              )
                                                            : setIsFocused(
                                                                  true
                                                              );
                                                    }}
                                                    onChangeText={(text) => {
                                                        setSearchText(text);
                                                    }}
                                                />
                                            </View>
                                            {consonants.map(
                                                (consonant, index) => {
                                                    return (
                                                        <View
                                                            key={index}
                                                            style={{
                                                                width: 320,
                                                                alignItems:
                                                                    "center",
                                                            }}
                                                        >
                                                            <View
                                                                style={{
                                                                    width: 20,
                                                                    height: 20,
                                                                    borderRadius: 5,
                                                                    backgroundColor:
                                                                        "#D6690F",
                                                                    alignItems:
                                                                        "center",
                                                                    justifyContent:
                                                                        "center",
                                                                    marginTop: 20,
                                                                    alignSelf:
                                                                        "flex-start",
                                                                }}
                                                            >
                                                                <Text
                                                                    style={{
                                                                        fontFamily:
                                                                            "Spoqa Han Sans Neo",
                                                                        fontWeight:
                                                                            "500",
                                                                        fontSize: 14,
                                                                        color: "white",
                                                                    }}
                                                                >
                                                                    {consonant}
                                                                </Text>
                                                            </View>

                                                            {whiskyData
                                                                .filter(
                                                                    (whisky) =>
                                                                        getFirstConsonant(
                                                                            whisky.name_kor
                                                                        ) ===
                                                                        consonant
                                                                )
                                                                .filter(
                                                                    (
                                                                        whisky
                                                                    ) => {
                                                                        if (
                                                                            searchText ===
                                                                            ""
                                                                        ) {
                                                                            return true;
                                                                        }
                                                                        return (
                                                                            whisky.name_kor
                                                                                .toLowerCase()
                                                                                .indexOf(
                                                                                    searchText.toLowerCase()
                                                                                ) >
                                                                                -1 ||
                                                                            whisky.name_eng
                                                                                .toLowerCase()
                                                                                .indexOf(
                                                                                    searchText.toLowerCase()
                                                                                ) >
                                                                                -1
                                                                        );
                                                                    }
                                                                )
                                                                .map(
                                                                    (
                                                                        whisky,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <View
                                                                                key={
                                                                                    index
                                                                                }
                                                                            >
                                                                                <TouchableOpacity
                                                                                    onPress={() => {
                                                                                        setSelectedWhisky(
                                                                                            whisky.whisky_id
                                                                                        );
                                                                                        toggleWhiskyModal();
                                                                                    }}
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    style={{
                                                                                        width: 320,
                                                                                        height: 40,
                                                                                        marginTop: 5,
                                                                                        marginBottom: 5,
                                                                                        justifyContent:
                                                                                            "center",
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
                                                                                    >{`${whisky.name_kor} (${whisky.name_eng})`}</Text>
                                                                                </TouchableOpacity>
                                                                                <View
                                                                                    style={{
                                                                                        width: 320,
                                                                                        height: 1,
                                                                                        backgroundColor:
                                                                                            "#EAEAEA",
                                                                                    }}
                                                                                />
                                                                            </View>
                                                                        );
                                                                    }
                                                                )}
                                                        </View>
                                                    );
                                                }
                                            )}
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>
                        <ScrollView style={{ width: "100%" }}>
                            <View
                                style={{
                                    width: "100%",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {selectedWhisky !== "" ? (
                                    <View
                                        style={{
                                            width: 320,
                                            height: 110,
                                            marginTop: 25,
                                            borderColor: "#EDEDED",
                                            borderWidth: 1,
                                            borderRadius: 20,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "flex-start",
                                            paddingLeft: 20,
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: 60,
                                                height: 80,
                                                borderRadius: 5,
                                                overflow: "hidden",
                                            }}
                                        >
                                            <Image
                                                source={{
                                                    uri: get_selected_whisky()
                                                        .img_urls[0],
                                                }}
                                                height={80}
                                                style={{ resizeMode: "cover" }}
                                            />
                                        </View>
                                        <View style={{ marginLeft: 25 }}>
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "700",
                                                    fontSize: 14,
                                                    color: "#000000",
                                                }}
                                            >
                                                {get_selected_whisky().name_kor}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "400",
                                                    fontSize: 12,
                                                    color: "#888888",
                                                }}
                                            >
                                                {get_selected_whisky().name_eng}
                                            </Text>
                                            <View
                                                style={{
                                                    marginTop: 10,
                                                    flexDirection: "row",
                                                    height: 20,
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Icon_Star />
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Spoqa Han Sans Neo",
                                                        fontWeight: "700",
                                                        fontSize: 12,
                                                        color: "#000000",
                                                        marginLeft: 5,
                                                        textAlign: "center",
                                                    }}
                                                >{`${get_selected_whisky().note_av.toFixed(
                                                    1
                                                )} (${get_selected_whisky().note_num.toLocaleString()})`}</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setSelectedWhisky("");
                                            }}
                                            style={{
                                                width: 27,
                                                height: 27,
                                                position: "absolute",
                                                top: -5,
                                                right: -5,
                                            }}
                                        >
                                            <Photo_Btn_OnOff_Svg />
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => {
                                            toggleWhiskyModal();
                                        }}
                                        style={[
                                            {
                                                width: 320,
                                                height: 110,
                                                marginTop: 25,
                                                backgroundColor: "#FBF8F2",
                                            },
                                            styles.border_box,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.text,
                                                {
                                                    fontWeight: "500",
                                                    fontSize: 14,
                                                    color: "#000000",
                                                },
                                            ]}
                                        >
                                            + 위스키 선택
                                        </Text>
                                    </TouchableOpacity>
                                )}

                                <View style={{ marginTop: 40 }} />
                                <Text style={{ width: 320, marginBottom: 5 }}>
                                    <Text style={styles.subtitle_text}>색</Text>
                                </Text>
                                <SelectBar_Color
                                    index={colorIndex}
                                    setIndex={change_color}
                                    select_elements={[
                                        "투명한",
                                        "짚",
                                        "꿀",
                                        "금",
                                        "호박",
                                        "카라멜",
                                        "마호가니",
                                    ]}
                                />
                                <View style={{ marginTop: 40 }} />
                                <Text style={{ width: 320, marginBottom: 5 }}>
                                    <Text style={styles.subtitle_text}>
                                        노즈
                                    </Text>
                                    <Text style={styles.subtitle_des_text}>
                                        {" (향)"}
                                    </Text>
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        toggleTasteModal();
                                        setWhatTaste(1);
                                    }}
                                    style={[
                                        {
                                            width: 320,
                                            height: 50,
                                            marginTop: 5,
                                            backgroundColor: "#FBF8F2",
                                        },
                                        styles.border_box,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.text,
                                            {
                                                fontWeight: "500",
                                                fontSize: 14,
                                                color: "#000000",
                                            },
                                        ]}
                                    >
                                        {selectedNoseData.length != 0
                                            ? selectedNoseData
                                                  .map((data, index) => {
                                                      return data.third
                                                          .KOR_CD_NM;
                                                  })
                                                  .join(", ")
                                            : "+ 향 선택 (최대 5개)"}
                                    </Text>
                                </TouchableOpacity>

                                <View style={{ marginTop: 20 }} />
                                <Text style={{ width: 320, marginBottom: 5 }}>
                                    <Text style={styles.subtitle_text}>
                                        팔레트
                                    </Text>
                                    <Text style={styles.subtitle_des_text}>
                                        {" (중간맛)"}
                                    </Text>
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        toggleTasteModal();
                                        setWhatTaste(2);
                                    }}
                                    style={[
                                        {
                                            width: 320,
                                            height: 50,
                                            marginTop: 5,
                                            backgroundColor: "#FBF8F2",
                                        },
                                        styles.border_box,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.text,
                                            {
                                                fontWeight: "500",
                                                fontSize: 14,
                                                color: "#000000",
                                            },
                                        ]}
                                    >
                                        {selectedPalateData.length != 0
                                            ? selectedPalateData
                                                  .map((data, index) => {
                                                      return data.third
                                                          .KOR_CD_NM;
                                                  })
                                                  .join(", ")
                                            : "+ 맛 선택 (최대 5개)"}
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ marginTop: 20 }} />
                                <Text style={{ width: 320, marginBottom: 5 }}>
                                    <Text style={styles.subtitle_text}>
                                        피니시
                                    </Text>
                                    <Text style={styles.subtitle_des_text}>
                                        {" (끝맛)"}
                                    </Text>
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        toggleTasteModal();
                                        setWhatTaste(3);
                                    }}
                                    style={[
                                        {
                                            width: 320,
                                            height: 50,
                                            marginTop: 5,
                                            backgroundColor: "#FBF8F2",
                                        },
                                        styles.border_box,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.text,
                                            {
                                                fontWeight: "500",
                                                fontSize: 14,
                                                color: "#000000",
                                            },
                                        ]}
                                    >
                                        {selectedFinishData.length != 0
                                            ? selectedFinishData
                                                  .map((data, index) => {
                                                      return data.third
                                                          .KOR_CD_NM;
                                                  })
                                                  .join(", ")
                                            : "+ 맛 선택 (최대 5개)"}
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ marginTop: 40 }} />
                                <Text style={{ width: 320, marginBottom: 5 }}>
                                    <Text style={styles.subtitle_text}>
                                        상세 리뷰
                                    </Text>
                                    <Text
                                        style={[
                                            styles.subtitle_text,
                                            { color: "#D6690F" },
                                        ]}
                                    >
                                        {" *"}
                                    </Text>
                                </Text>
                                <Field_Text
                                    style={{
                                        height: 130,
                                    }}
                                    is_review={true}
                                    isNeccesary={false}
                                    id={"review"}
                                    value={review}
                                    changeValue={change_review}
                                    placeholder="상세 리뷰 입력"
                                    multiline={true}
                                />
                                <View style={{ marginTop: 40 }} />
                                <Text style={{ width: 320, marginBottom: 5 }}>
                                    <Text style={styles.subtitle_text}>
                                        사진 첨부
                                    </Text>
                                </Text>
                                <View
                                    style={{
                                        width: 320,
                                        marginTop: 5,
                                        flexDirection: "row",
                                        justifyContent: "flex-start",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            select_photo("whisky");
                                        }}
                                        style={[
                                            {
                                                width: 90,
                                                height: 90,
                                                backgroundColor: "#FBF8F2",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            },
                                            styles.border_box,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.text,
                                                {
                                                    fontWeight: "500",
                                                    fontSize: 14,
                                                    color: "#000000",
                                                    textAlign: "center",
                                                },
                                            ]}
                                        >
                                            {"+\n사진 첨부"}
                                        </Text>
                                    </TouchableOpacity>
                                    {photoWhisky.length > 0 &&
                                        photoWhisky.map((photo, index) => {
                                            return (
                                                <View
                                                    key={index}
                                                    style={[
                                                        {
                                                            width: 90,
                                                            height: 90,
                                                            backgroundColor:
                                                                "#FBF8F2",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                        },
                                                        index % 3 != 2 && {
                                                            marginLeft: 25,
                                                        },
                                                        index >= 2 && {
                                                            marginTop: 20,
                                                        },
                                                    ]}
                                                >
                                                    <Image
                                                        source={{
                                                            uri: photo.uri,
                                                        }}
                                                        style={{
                                                            width: 90,
                                                            height: 90,
                                                            borderRadius: 10,
                                                        }}
                                                    />
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setPhotoWhisky(
                                                                photoWhisky.filter(
                                                                    (
                                                                        photo,
                                                                        idx
                                                                    ) => {
                                                                        return (
                                                                            idx !=
                                                                            index
                                                                        );
                                                                    }
                                                                )
                                                            );
                                                        }}
                                                        style={{
                                                            width: 27,
                                                            height: 27,
                                                            position:
                                                                "absolute",
                                                            top: -5,
                                                            right: -5,
                                                        }}
                                                    >
                                                        <Photo_Btn_OnOff_Svg />
                                                    </TouchableOpacity>
                                                </View>
                                            );
                                        })}
                                </View>
                                <View style={{ marginTop: 40 }} />
                                <Text style={{ width: 320, marginBottom: 5 }}>
                                    <Text style={styles.subtitle_text}>
                                        영수증 사진 첨부
                                    </Text>
                                </Text>
                                <View
                                    style={{
                                        width: 320,
                                        marginTop: 5,
                                        flexDirection: "row",
                                        justifyContent: "flex-start",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            select_photo("bill");
                                        }}
                                        style={[
                                            {
                                                width: 90,
                                                height: 90,
                                                backgroundColor: "#FBF8F2",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            },
                                            styles.border_box,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.text,
                                                {
                                                    fontWeight: "500",
                                                    fontSize: 14,
                                                    color: "#000000",
                                                    textAlign: "center",
                                                },
                                            ]}
                                        >
                                            {"+\n영수증\n사진 첨부"}
                                        </Text>
                                    </TouchableOpacity>
                                    {photoBill.length > 0 &&
                                        photoBill.map((photo, index) => {
                                            return (
                                                <View
                                                    key={index}
                                                    style={[
                                                        {
                                                            width: 90,
                                                            height: 90,
                                                            backgroundColor:
                                                                "#FBF8F2",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                        },
                                                        index % 3 != 2 && {
                                                            marginLeft: 25,
                                                        },
                                                        index >= 2 && {
                                                            marginTop: 20,
                                                        },
                                                    ]}
                                                >
                                                    <Image
                                                        source={{
                                                            uri: photo.uri,
                                                        }}
                                                        style={{
                                                            width: 90,
                                                            height: 90,
                                                            borderRadius: 10,
                                                        }}
                                                    />
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setPhotoBill(
                                                                photoBill.filter(
                                                                    (
                                                                        photo,
                                                                        idx
                                                                    ) => {
                                                                        return (
                                                                            idx !=
                                                                            index
                                                                        );
                                                                    }
                                                                )
                                                            );
                                                        }}
                                                        style={{
                                                            width: 27,
                                                            height: 27,
                                                            position:
                                                                "absolute",
                                                            top: -5,
                                                            right: -5,
                                                        }}
                                                    >
                                                        <Photo_Btn_OnOff_Svg />
                                                    </TouchableOpacity>
                                                </View>
                                            );
                                        })}
                                </View>
                                <View style={{ marginTop: 40 }} />
                                <View style={{ marginTop: 20 }} />
                                <View style={{ marginTop: 20 }} />
                                <View style={{ marginTop: 20 }} />
                            </View>
                        </ScrollView>
                        <View
                            style={{
                                width: "100%",
                                alignItems: "center",
                                marginBottom: 20,
                            }}
                        >
                            <TouchableOpacity
                                disabled={
                                    !(
                                        selectedWhisky != "" &&
                                        selectedNoseData.length != 0 &&
                                        selectedPalateData.length != 0 &&
                                        selectedFinishData.length != 0 &&
                                        review.trim() != ""
                                    ) || writing
                                }
                                onPress={() => {
                                    setPageIndex(1);
                                }}
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
                                    selectedWhisky != "" &&
                                        selectedNoseData.length != 0 &&
                                        selectedPalateData.length != 0 &&
                                        selectedFinishData.length != 0 &&
                                        review.trim() != "" && { opacity: 1.0 },
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
                                    작성 완료
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </>
            ) : (
                <>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor={"white"}
                    />
                    <SafeAreaView style={{ flex: 0, backgroundColor: "white" }}>
                        <CustomNavigator_Top
                            title="테이스팅 노트 작성"
                            goBack={() => {
                                setPageIndex(0);
                            }}
                        />
                    </SafeAreaView>
                    <SafeAreaView
                        style={{ flex: 1, backgroundColor: "#FBF8F2" }}
                    >
                        <ScrollView style={{ width: "100%" }}>
                            <View
                                style={{
                                    width: "100%",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <View
                                    style={{
                                        paddingTop: 20,
                                        paddingBottom: 20,
                                        width: "100%",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "white",
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 320,
                                            height: 50,
                                            backgroundColor: "#FBF8F2",
                                            borderRadius: 30,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <View>
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "700",
                                                    fontSize: 12,
                                                    textAlign: "center",
                                                    color: "#000000",
                                                    marginBottom: 3,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: "#D6690F",
                                                    }}
                                                >
                                                    {get_whisky_name()}
                                                </Text>
                                                <Text>{"의"}</Text>
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "700",
                                                    fontSize: 12,
                                                    textAlign: "center",
                                                    color: "#000000",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: "#D6690F",
                                                    }}
                                                >
                                                    노즈(향)
                                                </Text>
                                                <Text>을 평가해주세요.</Text>
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            marginTop: 15,
                                            marginBottom: 25,
                                            width: 320,
                                            height: 100,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <StarRating
                                            maxStars={5}
                                            rating={noseRate}
                                            onChange={(rate) =>
                                                setNoseRate(rate)
                                            }
                                            style={{
                                                width: 320,
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                            starSize={50}
                                            starStyle={{
                                                width: 50,
                                            }}
                                            color={"#D6690F"}
                                        />
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "700",
                                                fontSize: 24,
                                                textAlign: "center",
                                            }}
                                        >
                                            {noseRate.toFixed(1)}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            width: 320,
                                            height: 50,
                                            backgroundColor: "#FBF8F2",
                                            borderRadius: 30,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <View>
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "700",
                                                    fontSize: 12,
                                                    textAlign: "center",
                                                    color: "#000000",
                                                    marginBottom: 3,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: "#D6690F",
                                                    }}
                                                >
                                                    {get_whisky_name()}
                                                </Text>
                                                <Text>{"의"}</Text>
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "700",
                                                    fontSize: 12,
                                                    textAlign: "center",
                                                    color: "#000000",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: "#D6690F",
                                                    }}
                                                >
                                                    팔레트(중간맛)
                                                </Text>
                                                <Text>을 평가해주세요.</Text>
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            marginTop: 15,
                                            marginBottom: 25,
                                            width: 320,
                                            height: 100,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <StarRating
                                            maxStars={5}
                                            rating={palateRate}
                                            onChange={(rate) =>
                                                setPalateRate(rate)
                                            }
                                            style={{
                                                width: 320,
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                            starSize={50}
                                            starStyle={{
                                                width: 50,
                                            }}
                                            color={"#D6690F"}
                                        />
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "700",
                                                fontSize: 24,
                                                textAlign: "center",
                                            }}
                                        >
                                            {palateRate.toFixed(1)}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            width: 320,
                                            height: 50,
                                            backgroundColor: "#FBF8F2",
                                            borderRadius: 30,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <View>
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "700",
                                                    fontSize: 12,
                                                    textAlign: "center",
                                                    color: "#000000",
                                                    marginBottom: 3,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: "#D6690F",
                                                    }}
                                                >
                                                    {get_whisky_name()}
                                                </Text>
                                                <Text>{"의"}</Text>
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Spoqa Han Sans Neo",
                                                    fontWeight: "700",
                                                    fontSize: 12,
                                                    textAlign: "center",
                                                    color: "#000000",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: "#D6690F",
                                                    }}
                                                >
                                                    피니시(끝맛)
                                                </Text>
                                                <Text>을 평가해주세요.</Text>
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            marginTop: 15,
                                            marginBottom: 25,
                                            width: 320,
                                            height: 100,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <StarRating
                                            maxStars={5}
                                            rating={finishRate}
                                            onChange={(rate) =>
                                                setFinishRate(rate)
                                            }
                                            style={{
                                                width: 320,
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                            starSize={50}
                                            starStyle={{
                                                width: 50,
                                            }}
                                            color={"#D6690F"}
                                        />
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "700",
                                                fontSize: 24,
                                                textAlign: "center",
                                            }}
                                        >
                                            {finishRate.toFixed(1)}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        marginTop: 20,
                                        marginBottom: 80,
                                        width: 320,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 52,
                                            height: 52,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Star_Rating />
                                    </View>
                                    <View>
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "700",
                                                fontSize: 18,
                                                textAlign: "center",
                                                color: "#000000",
                                                marginBottom: 10,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: "#D6690F",
                                                }}
                                            >
                                                {get_whisky_name()}
                                            </Text>
                                            <Text>{"의"}</Text>
                                        </Text>
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "Spoqa Han Sans Neo",
                                                fontWeight: "700",
                                                fontSize: 18,
                                                textAlign: "center",
                                                color: "#000000",
                                                marginBottom: 15,
                                            }}
                                        >
                                            <Text>총점을 입력해주세요.</Text>
                                        </Text>
                                    </View>
                                    <StarRating
                                        maxStars={5}
                                        rating={allRate}
                                        onChange={(rate) => setAllRate(rate)}
                                        style={{
                                            width: 320,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                        starSize={50}
                                        starStyle={{
                                            width: 50,
                                        }}
                                        color={"#D6690F"}
                                    />
                                    <Text
                                        style={{
                                            fontFamily: "Spoqa Han Sans Neo",
                                            fontWeight: "700",
                                            fontSize: 24,
                                            textAlign: "center",
                                        }}
                                    >
                                        {allRate.toFixed(1)}
                                    </Text>
                                </View>
                            </View>
                        </ScrollView>
                        <View
                            style={{
                                width: "100%",
                                alignItems: "center",
                                marginBottom: 20,
                            }}
                        >
                            <TouchableOpacity
                                disabled={
                                    !(
                                        noseRate != 0.0 &&
                                        palateRate != 0.0 &&
                                        finishRate != 0.0 &&
                                        allRate != 0.0
                                    ) || writing
                                }
                                onPress={() => {
                                    next_step();
                                }}
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
                                    noseRate != 0.0 &&
                                        palateRate != 0.0 &&
                                        finishRate != 0.0 &&
                                        allRate != 0.0 && { opacity: 1.0 },
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
                                    작성 완료
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </>
            )}
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
    text: {
        fontFamily: "Spoqa Han Sans Neo",
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
    border_box: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#E4E4E4",
        borderStyle: "dashed",
        alignItems: "center",
        justifyContent: "center",
    },
});
