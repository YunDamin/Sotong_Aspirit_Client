import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MainPage_Home from "../pages/MainPage_Home";
import SubPage_Alert from "../pages/SubPage_Alert";
import SubPage_MyPage from "../pages/SubPage_MyPage";

const Stack = createStackNavigator();

export default function Navigator_Funding() {
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
        </Stack.Navigator>
    );
}
