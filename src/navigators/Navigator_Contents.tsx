import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MainPage_Contents from "../pages/MainPage_Contents";

// * All
import SubPage_Alert from "../pages/SubPage_Alert";
import SubPage_MyPage from "../pages/SubPage_MyPage";
// ? Tasting Note
import SubPage_TastingNoteWriting from "../pages/SubPage_TastingNoteWriting";
// ? Content
import SubPage_Content from "../pages/SubPage_Content";

// * SubNavigator
import SubNavigator_Login from "./SubNavigator_Login";

const Stack = createStackNavigator();

export default function Navigator_Contents() {
    return (
        <Stack.Navigator initialRouteName="MainPage_Home">
            <Stack.Screen
                name="MainPage_Contents"
                component={MainPage_Contents}
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
        </Stack.Navigator>
    );
}
