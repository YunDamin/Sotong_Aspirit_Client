import React from "react";

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from "recoil";

import { SafeAreaView, StatusBar, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createWhiskyPaletteBottomTabNavigator } from "./src/navigators/CustomNavigator_Bottom";

const Stack = createStackNavigator();
const Tab = createWhiskyPaletteBottomTabNavigator();

import Navigator_Home from "./src/navigators/Navigator_Home";
import Navigator_Note from "./src/navigators/Navigator_Note";
import Navigator_Whisky from "./src/navigators/Navigator_Whisky";
import Navigator_Contents from "./src/navigators/Navigator_Contents";
import Navigator_Funding from "./src/navigators/Navigator_Funding";

// Utils
import { getData } from "./src/utils/AsyncStorage";

import { login_data, login_state } from "./src/atoms/login_state";

import axios from "axios";
import { REACT_APP_API_KEY } from "@env";

const MainScreen = ({ navigation }: any) => {
    const [loginState, setLoginState] = useRecoilState<login_data>(login_state);

    const [isAutoLogin, setIsAutoLogin] = React.useState<boolean>(false);

    // getData("user_id").then(async (res) => {
    //     if (res) {
    //         const login_type = (await getData("login_type")) ?? "";
    //         const accessToken = (await getData("accessToken")) ?? "";
    //         const refreshToken = (await getData("refreshToken")) ?? "";

    //         setLoginState({
    //             is_login: false,
    //             user_id: res ?? "",
    //             login_type: login_type,
    //             accessToken: accessToken,
    //             refreshToken: refreshToken,
    //             survey: false,
    //         });

    //         setIsAutoLogin(true);
    //     }
    // });

    // React.useEffect(() => {
    //     if (!isAutoLogin) return;
    //     axios
    //         .post(
    //             API_KEY + "/users/refresh",
    //             {},
    //             {
    //                 headers: {
    //                     accessToken: loginState.accessToken,
    //                     refreshToken: loginState.refreshToken,
    //                 },
    //             }
    //         )
    //         .then((res) => {
    //             if (res.data.ok) {
    //                 axios
    //                     .get(
    //                         API_KEY +
    //                             "/users/check_survey/" +
    //                             loginState.user_id
    //                     )
    //                     .then((s_res) => {
    //                         setLoginState({
    //                             is_login: true,
    //                             user_id: loginState.user_id,
    //                             login_type: loginState.login_type,
    //                             accessToken: res.data.accessToken,
    //                             refreshToken: res.data.refreshToken,
    //                             survey: s_res.data.survey,
    //                         });
    //                         console.log("refresh success");
    //                     });
    //             } else {
    //                 axios
    //                     .get(
    //                         API_KEY +
    //                             "/users/check_survey/" +
    //                             loginState.user_id
    //                     )
    //                     .then((s_res) => {
    //                         setLoginState({
    //                             is_login: true,
    //                             user_id: loginState.user_id,
    //                             login_type: loginState.login_type,
    //                             accessToken: loginState.accessToken,
    //                             refreshToken: loginState.refreshToken,
    //                             survey: s_res.data.survey,
    //                         });
    //                     });
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             setLoginState({
    //                 is_login: false,
    //                 login_type: "",
    //                 user_id: "",
    //                 accessToken: "",
    //                 refreshToken: "",
    //                 survey: false,
    //             });
    //         });
    //     setIsAutoLogin(false);
    // }, [isAutoLogin]);

    return (
        <>
            <Tab.Navigator initialRouteName="Navigator_Home">
                <Tab.Screen name="Navigator_Home" component={Navigator_Home} />
                <Tab.Screen name="Navigator_Note" component={Navigator_Note} />
                <Tab.Screen
                    name="Navigator_Whisky"
                    component={Navigator_Whisky}
                />
                <Tab.Screen
                    name="Navigator_Contents"
                    component={Navigator_Contents}
                />
                <Tab.Screen
                    name="Navigator_Funding"
                    component={Navigator_Funding}
                />
            </Tab.Navigator>
        </>
    );
};

import SplashPage from "./src/pages/SplashPage";
import OnboardingPage from "./src/pages/OnBoardingPage";

import SystemNavigationBar from "react-native-system-navigation-bar";
import useInterval from "./src/useInterval";

function App(): JSX.Element {
    SystemNavigationBar.navigationHide();

    useInterval(() => {
        SystemNavigationBar.navigationHide();
    }, 2000);

    return (
        <RecoilRoot>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Splash">
                    <Stack.Screen
                        name="Splash"
                        component={SplashPage}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="Onboarding"
                        component={OnboardingPage}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="Main"
                        component={MainScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </RecoilRoot>
    );
}

export default App;
