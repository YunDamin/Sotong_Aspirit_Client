import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// * Main
import MainPage_Whisky from "../pages/MainPage_Whisky";

// * Sub
import SubPage_Whisky from "../pages/SubPage_Whisky";

// * All
import SubPage_Alert from "../pages/SubPage_Alert";
import SubPage_MyPage from "../pages/SubPage_MyPage";
// ? Tasting Note
import SubPage_TastingNoteWriting from "../pages/SubPage_TastingNoteWriting";

// * SubNavigator
import SubNavigator_Login from "./SubNavigator_Login";

const Stack = createStackNavigator();

export default function Navigator_Whisky() {
    return (
        <Stack.Navigator initialRouteName="MainPage_Whisky">
            <Stack.Screen
                name="MainPage_Whisky"
                component={MainPage_Whisky}
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
                name="SubNavigator_Login"
                component={SubNavigator_Login}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
