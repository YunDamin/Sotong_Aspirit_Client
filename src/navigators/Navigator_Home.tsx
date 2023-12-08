import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// * Main
import MainPage_Home from "../pages/MainPage_Home";

// * Sub
import SubPage_Whisky from "../pages/SubPage_Whisky";

// * All
import SubPage_Alert from "../pages/SubPage_Alert";
import SubPage_MyPage from "../pages/SubPage_MyPage";
// ? Tasting Note
import SubPage_TastingNoteWriting from "../pages/SubPage_TastingNoteWriting";
// ? Content
import SubPage_Content from "../pages/SubPage_Content";

// ? Survey
import SurveyPage_Main from "../pages/SurveyPage_Main";

// ? My
import SubPage_EditMe from "../pages/SubPage_EditMe";
import SubPage_Profile from "../pages/SubPage_Profile";
import SubPage_Settings from "../pages/SubPage_Settings";
import SubPage_FAQ from "../pages/SubPage_FAQ";

// * SubNavigator
import SubNavigator_Login from "./SubNavigator_Login";

const Stack = createStackNavigator();

export default function Navigator_Home() {
    return (
        <Stack.Navigator initialRouteName="MainPage_Home">
            <Stack.Screen
                name="MainPage_Home"
                component={MainPage_Home}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SubPage_Whisky"
                component={SubPage_Whisky}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SubPage_Alert"
                component={SubPage_Alert}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SubPage_MyPage"
                component={SubPage_MyPage}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SubPage_TastingNoteWriting"
                component={SubPage_TastingNoteWriting}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SubPage_Content"
                component={SubPage_Content}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SubNavigator_Login"
                component={SubNavigator_Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SurveyPage_Main"
                component={SurveyPage_Main}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SubPage_EditMe"
                component={SubPage_EditMe}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SubPage_FAQ"
                component={SubPage_FAQ}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SubPage_Profile"
                component={SubPage_Profile}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SubPage_Settings"
                component={SubPage_Settings}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
