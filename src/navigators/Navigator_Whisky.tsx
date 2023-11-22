import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MainPage_Whisky from "../pages/MainPage_Whisky";

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
        </Stack.Navigator>
    );
}
