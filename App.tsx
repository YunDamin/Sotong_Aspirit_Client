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

const MainScreen = ({ navigation }: any) => {
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
