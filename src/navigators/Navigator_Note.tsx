import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MainPage_Note from "../pages/MainPage_Note";
import SubPage_Alert from "../pages/SubPage_Alert";
import SubPage_MyPage from "../pages/SubPage_MyPage";

const Stack = createStackNavigator();

export default function Navigator_Note() {
    return (
        <Stack.Navigator initialRouteName="MainPage_Note">
            <Stack.Screen
                name="MainPage_Note"
                component={MainPage_Note}
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
